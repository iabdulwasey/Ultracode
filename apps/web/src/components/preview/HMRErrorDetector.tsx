/**
 * HMR Error Detector - Real-time error detection for preview iframe
 * Based on Open-Lovable's HMRErrorDetector component
 * 
 * This component monitors the preview iframe for Vite error overlays
 * and automatically suggests fixes for common issues like missing packages.
 */

import { useEffect, useRef, useCallback } from 'react';

interface HMRError {
  type: 'npm-missing' | 'syntax-error' | 'import-error' | 'build-error';
  message: string;
  package?: string;
  file?: string;
  line?: number;
  suggestion?: string;
}

interface HMRErrorDetectorProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  onErrorDetected: (errors: HMRError[]) => void;
  onErrorResolved?: () => void;
  isActive?: boolean;
}

export default function HMRErrorDetector({ 
  iframeRef, 
  onErrorDetected, 
  onErrorResolved,
  isActive = true 
}: HMRErrorDetectorProps) {
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastErrorsRef = useRef<string>('');

  const parseViteError = useCallback((errorText: string): HMRError[] => {
    const errors: HMRError[] = [];

    // Parse import resolution errors
    const importMatch = errorText.match(/Failed to resolve import "([^"]+)"/);
    if (importMatch) {
      const packageName = importMatch[1];
      if (!packageName.startsWith('.')) {
        // Extract base package name
        let finalPackage = packageName;
        if (packageName.startsWith('@')) {
          const parts = packageName.split('/');
          finalPackage = parts.length >= 2 ? parts.slice(0, 2).join('/') : packageName;
        } else {
          finalPackage = packageName.split('/')[0];
        }

        errors.push({
          type: 'npm-missing',
          message: `Missing package: ${finalPackage}`,
          package: finalPackage,
          suggestion: `Install ${finalPackage} to resolve this error`
        });
      } else {
        errors.push({
          type: 'import-error',
          message: `Failed to resolve local import: ${packageName}`,
          file: packageName,
          suggestion: 'Check if the imported file exists and has the correct export'
        });
      }
    }

    // Parse syntax errors
    const syntaxMatch = errorText.match(/SyntaxError: (.+?)(?:\n|$)/);
    if (syntaxMatch) {
      errors.push({
        type: 'syntax-error',
        message: `Syntax error: ${syntaxMatch[1]}`,
        suggestion: 'Check for unmatched brackets, quotes, or JSX tags'
      });
    }

    // Parse TypeScript errors
    const tsErrorMatch = errorText.match(/TS(\d+): (.+?)(?:\n|$)/);
    if (tsErrorMatch) {
      errors.push({
        type: 'build-error',
        message: `TypeScript error: ${tsErrorMatch[2]}`,
        suggestion: 'Check type definitions and imports'
      });
    }

    // Parse build errors
    const buildErrorMatch = errorText.match(/Build failed with (\d+) error/);
    if (buildErrorMatch) {
      errors.push({
        type: 'build-error',
        message: `Build failed with ${buildErrorMatch[1]} error(s)`,
        suggestion: 'Check the console for detailed error information'
      });
    }

    // Parse React component errors
    const reactErrorMatch = errorText.match(/React.*?Error: (.+?)(?:\n|$)/);
    if (reactErrorMatch) {
      errors.push({
        type: 'syntax-error',
        message: `React error: ${reactErrorMatch[1]}`,
        suggestion: 'Check component syntax and prop types'
      });
    }

    return errors;
  }, []);

  const checkForHMRErrors = useCallback(() => {
    if (!isActive || !iframeRef.current) return;

    try {
      const iframeDoc = iframeRef.current.contentDocument;
      if (!iframeDoc) return;

      // Check for Vite error overlay
      const errorOverlay = iframeDoc.querySelector('vite-error-overlay');
      if (errorOverlay) {
        // Try to extract error message from shadow DOM
        let errorText = '';
        
        try {
          const messageElement = errorOverlay.shadowRoot?.querySelector('.message-body');
          if (messageElement) {
            errorText = messageElement.textContent || '';
          }
          
          // Fallback: try to get text from the overlay itself
          if (!errorText) {
            errorText = errorOverlay.textContent || '';
          }
        } catch (shadowError) {
          // Shadow DOM access might fail, try alternative approaches
          const iframeWindow = iframeRef.current.contentWindow;
          if (iframeWindow && (iframeWindow as any).__vite_error_overlay) {
            errorText = (iframeWindow as any).__vite_error_overlay.message || '';
          }
        }

        // Only process if error text changed
        if (errorText && errorText !== lastErrorsRef.current) {
          lastErrorsRef.current = errorText;
          
          const parsedErrors = this.parseViteError(errorText);
          if (parsedErrors.length > 0) {
            onErrorDetected(parsedErrors);
          }
        }
      } else {
        // No error overlay found - errors might be resolved
        if (lastErrorsRef.current) {
          lastErrorsRef.current = '';
          onErrorResolved?.();
        }
      }

      // Also check for console errors in iframe
      this.checkConsoleErrors(iframeDoc);

    } catch (error) {
      // Cross-origin errors are expected and should be ignored
      // Only log unexpected errors
      if (error instanceof Error && !error.message.includes('cross-origin')) {
        console.warn('HMR Error Detector: Unexpected error', error.message);
      }
    }
  }, [isActive, iframeRef, onErrorDetected, onErrorResolved, parseViteError]);

  /**
   * Check for console errors in the iframe
   */
  private checkConsoleErrors = useCallback((iframeDoc: Document) => {
    try {
      // Override console.error in iframe to capture errors
      const iframeWindow = iframeRef.current?.contentWindow;
      if (iframeWindow && !(iframeWindow as any).__errorDetectorInstalled) {
        const originalConsoleError = iframeWindow.console.error;
        
        iframeWindow.console.error = (...args: any[]) => {
          originalConsoleError.apply(iframeWindow.console, args);
          
          // Parse console errors for useful information
          const errorMessage = args.join(' ');
          if (errorMessage.includes('Failed to fetch')) {
            onErrorDetected([{
              type: 'build-error',
              message: 'Failed to fetch module - build might be broken',
              suggestion: 'Try refreshing the preview or check for build errors'
            }]);
          }
        };

        (iframeWindow as any).__errorDetectorInstalled = true;
      }
    } catch (error) {
      // Console override might fail due to security restrictions
    }
  }, [iframeRef, onErrorDetected]);

  useEffect(() => {
    if (!isActive) {
      // Clear interval if detector is disabled
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
      return;
    }

    // Check immediately and then every 2 seconds
    checkForHMRErrors();
    checkIntervalRef.current = setInterval(checkForHMRErrors, 2000);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    };
  }, [isActive, checkForHMRErrors]);

  // This component doesn't render anything visible
  return null;
}

/**
 * Hook for using HMR error detection in components
 */
export function useHMRErrorDetection(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  onError?: (errors: HMRError[]) => void
) {
  const handleErrorDetected = useCallback((errors: HMRError[]) => {
    console.warn('HMR Errors detected:', errors);
    onError?.(errors);
  }, [onError]);

  const handleErrorResolved = useCallback(() => {
    console.log('HMR Errors resolved');
  }, []);

  return {
    HMRErrorDetector: () => (
      <HMRErrorDetector
        iframeRef={iframeRef}
        onErrorDetected={handleErrorDetected}
        onErrorResolved={handleErrorResolved}
      />
    ),
    handleErrorDetected,
    handleErrorResolved
  };
}