#!/usr/bin/env node

// Simple WebSocket test script
import { io } from 'socket.io-client';

console.log('🚀 Testing WebSocket infrastructure...\n');

// Connect to the WebSocket server
const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
  autoConnect: true,
});

let isAuthenticated = false;
const testProjectId = 'test-project-123';

// Connection event handlers
socket.on('connect', () => {
  console.log('✅ WebSocket connected:', socket.id);
  
  // Simulate authentication (you'll need a real token in production)
  socket.emit('authenticate', {
    token: 'test-token', // This would be a real JWT token
    projectId: testProjectId
  });
});

socket.on('authenticated', (data) => {
  console.log('✅ Authenticated as user:', data.userId);
  isAuthenticated = true;
  
  // Join a test project
  socket.emit('join-project', { projectId: testProjectId });
});

socket.on('joined-project', (data) => {
  console.log('✅ Joined project room:', data.projectId);
  
  // Test broadcasting a build status update
  setTimeout(() => {
    console.log('📤 Sending test build status update...');
    socket.emit('build-status-update', {
      projectId: testProjectId,
      status: 'building',
      message: 'Test build in progress...',
      progress: 50,
      userId: 'test-user'
    });
  }, 1000);
});

socket.on('auth-error', (data) => {
  console.log('❌ Authentication error:', data.message);
});

socket.on('error', (data) => {
  console.log('❌ WebSocket error:', data.message);
});

socket.on('disconnect', () => {
  console.log('📡 WebSocket disconnected');
});

// Business logic event handlers
socket.on('files-updated', (data) => {
  console.log('📁 Files updated event received:', {
    projectId: data.projectId,
    fileCount: data.files.length,
    userId: data.userId
  });
});

socket.on('preview-rebuild', (data) => {
  console.log('🔄 Preview rebuild event received:', {
    projectId: data.projectId,
    status: data.status,
    message: data.message,
    progress: data.progress
  });
});

socket.on('build-status', (data) => {
  console.log('🔧 Build status event received:', {
    projectId: data.projectId,
    status: data.status,
    message: data.message,
    progress: data.progress
  });
});

socket.on('chat-generation-complete', (data) => {
  console.log('💬 Chat generation complete event received:', {
    projectId: data.projectId,
    fileCount: data.generatedFiles.length
  });
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down WebSocket test...');
  socket.disconnect();
  process.exit(0);
});

// Keep the script running
console.log('🔄 WebSocket test running... Press Ctrl+C to stop\n');