import { BlogPostType } from '../types/blog';

export const samplePosts: BlogPostType[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    excerpt: 'Learn how to build modern web applications using React with TypeScript for better type safety and developer experience.',
    author: 'Jane Smith',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['React', 'TypeScript', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    content: `# Getting Started with React and TypeScript

React and TypeScript make a powerful combination for building modern web applications. In this comprehensive guide, we'll explore how to set up and use these technologies together.

## Why TypeScript with React?

TypeScript brings several benefits to React development:

- **Type Safety**: Catch errors at compile time rather than runtime
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as inline documentation
- **Easier Refactoring**: Confidently make changes across large codebases

## Setting Up Your Project

First, let's create a new React project with TypeScript:

\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

This creates a new React application with TypeScript configuration out of the box.

## Basic Component Types

Here's how to type a simple functional component:

\`\`\`typescript
import React from 'react';

interface Props {
  name: string;
  age?: number;
}

const UserProfile: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {age && <p>Age: {age}</p>}
    </div>
  );
};

export default UserProfile;
\`\`\`

## State Management with TypeScript

When using hooks like \`useState\`, TypeScript can often infer the type:

\`\`\`typescript
const [count, setCount] = useState(0); // TypeScript infers number
const [user, setUser] = useState<User | null>(null); // Explicit typing
\`\`\`

## Best Practices

1. **Use interfaces for props**: Define clear contracts for your components
2. **Leverage type inference**: Let TypeScript infer types when possible
3. **Use strict mode**: Enable strict TypeScript settings for better type checking
4. **Type your event handlers**: Properly type onClick, onChange, etc.

## Conclusion

React and TypeScript together provide a robust foundation for building scalable web applications. The initial setup investment pays off with improved developer experience and fewer runtime errors.

Start small, gradually add types to your existing React projects, and enjoy the benefits of type-safe development!`
  },
  {
    id: '2',
    title: 'Building Responsive Layouts with Tailwind CSS',
    excerpt: 'Master the art of creating beautiful, responsive web layouts using Tailwind CSS utility classes and modern design principles.',
    author: 'Mike Johnson',
    date: '2024-01-12',
    readTime: '6 min read',
    tags: ['CSS', 'Tailwind', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    content: `# Building Responsive Layouts with Tailwind CSS

Tailwind CSS revolutionizes how we approach styling by providing utility-first classes that make building responsive layouts intuitive and efficient.

## The Utility-First Approach

Instead of writing custom CSS, Tailwind provides low-level utility classes:

\`\`\`html
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  <h2 class="text-xl font-bold mb-2">Card Title</h2>
  <p class="text-blue-100">Card content goes here</p>
</div>
\`\`\`

## Responsive Design Made Easy

Tailwind's responsive prefixes make it simple to create adaptive layouts:

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Grid items -->
</div>
\`\`\`

This creates:
- 1 column on mobile
- 2 columns on tablets (md breakpoint)
- 3 columns on desktop (lg breakpoint)

## Flexbox Layouts

Creating flexible layouts is straightforward:

\`\`\`html
<div class="flex flex-col md:flex-row items-center justify-between">
  <div class="mb-4 md:mb-0">Logo</div>
  <nav class="flex space-x-4">
    <a href="#" class="hover:text-blue-500">Home</a>
    <a href="#" class="hover:text-blue-500">About</a>
  </nav>
</div>
\`\`\`

## Custom Components

You can extract common patterns into components:

\`\`\`css
@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors;
  }
}
\`\`\`

## Dark Mode Support

Tailwind makes dark mode implementation simple:

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content that adapts to dark mode
</div>
\`\`\`

## Performance Benefits

- **Smaller bundle sizes**: Only the classes you use are included
- **No CSS conflicts**: Utility classes prevent specificity issues
- **Faster development**: No context switching between HTML and CSS

## Conclusion

Tailwind CSS empowers developers to build responsive, beautiful interfaces quickly and maintainably. Its utility-first approach, combined with excellent responsive design features, makes it an ideal choice for modern web development.`
  },
  {
    id: '3',
    title: 'Modern JavaScript Features You Should Know',
    excerpt: 'Explore the latest JavaScript features that will improve your code quality and development productivity in 2024.',
    author: 'Sarah Wilson',
    date: '2024-01-10',
    readTime: '10 min read',
    tags: ['JavaScript', 'ES2024', 'Programming'],
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
    content: `# Modern JavaScript Features You Should Know

JavaScript continues to evolve with new features that make our code more expressive, readable, and efficient. Let's explore the most important modern features every developer should master.

## Optional Chaining (?.)

Safely access nested object properties without worrying about null or undefined:

\`\`\`javascript
const user = {
  profile: {
    social: {
      twitter: '@johndoe'
    }
  }
};

// Old way
const twitter = user && user.profile && user.profile.social && user.profile.social.twitter;

// Modern way
const twitter = user?.profile?.social?.twitter;
\`\`\`

## Nullish Coalescing (??)

Provide default values only for null or undefined:

\`\`\`javascript
const config = {
  theme: null,
  debug: false,
  timeout: 0
};

// Using || would incorrectly use defaults for falsy values
const theme = config.theme ?? 'light';     // 'light'
const debug = config.debug ?? true;       // false (correct!)
const timeout = config.timeout ?? 5000;   // 0 (correct!)
\`\`\`

## Destructuring with Default Values

Extract values from objects and arrays with fallbacks:

\`\`\`javascript
const { name = 'Anonymous', age = 0 } = user;
const [first, second = 'default'] = array;

// Nested destructuring
const { profile: { email = 'no-email' } = {} } = user;
\`\`\`

## Template Literals and Tagged Templates

Create dynamic strings and custom string processing:

\`\`\`javascript
const name = 'World';
const greeting = \`Hello, \${name}!\`;

// Tagged templates for custom processing
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] ? \`<mark>\${values[i]}</mark>\` : '');
  }, '');
}

const message = highlight\`Welcome \${name} to our site!\`;
\`\`\`

## Async/Await and Promise Improvements

Handle asynchronous operations more elegantly:

\`\`\`javascript
// Promise.allSettled - wait for all promises regardless of outcome
const results = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]);

// Top-level await (in modules)
const data = await fetch('/api/data').then(r => r.json());

// Error handling with async/await
try {
  const user = await fetchUser(id);
  const posts = await fetchUserPosts(user.id);
  return { user, posts };
} catch (error) {
  console.error('Failed to load user data:', error);
}
\`\`\`

## Array Methods for Functional Programming

Modern array methods make data transformation elegant:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Method chaining
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((sum, n) => sum + n, 0);

// Array.from for creating arrays
const range = Array.from({ length: 5 }, (_, i) => i + 1);
// [1, 2, 3, 4, 5]

// flatMap for flattening and mapping
const words = ['hello world', 'javascript rocks'];
const allWords = words.flatMap(phrase => phrase.split(' '));
// ['hello', 'world', 'javascript', 'rocks']
\`\`\`

## Object Property Shorthand

Cleaner object creation and manipulation:

\`\`\`javascript
const name = 'John';
const age = 30;

// Shorthand properties
const user = { name, age };

// Computed property names
const field = 'email';
const user2 = {
  name,
  [field]: 'john@example.com'
};

// Object spread for immutable updates
const updatedUser = { ...user, age: 31 };
\`\`\`

## Classes and Private Fields

Modern class syntax with true privacy:

\`\`\`javascript
class BankAccount {
  #balance = 0; // Private field
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  deposit(amount) {
    this.#balance += amount;
    return this;
  }
  
  get balance() {
    return this.#balance;
  }
  
  // Static method
  static createSavingsAccount(balance) {
    return new BankAccount(balance);
  }
}
\`\`\`

## Modules (ES6+)

Organize code with import/export:

\`\`\`javascript
// utils.js
export const formatCurrency = (amount) => \`$\${amount.toFixed(2)}\`;
export default class Calculator {
  add(a, b) { return a + b; }
}

// main.js
import Calculator, { formatCurrency } from './utils.js';

const calc = new Calculator();
console.log(formatCurrency(calc.add(10, 20))); // $30.00
\`\`\`

## Conclusion

These modern JavaScript features significantly improve code readability, maintainability, and developer experience. Start incorporating them into your projects to write more expressive and robust JavaScript code.

The language continues to evolve, so stay curious and keep learning!`
  },
  {
    id: '4',
    title: 'State Management in React: A Complete Guide',
    excerpt: 'Compare different state management solutions in React, from useState to Redux Toolkit, and learn when to use each approach.',
    author: 'Alex Chen',
    date: '2024-01-08',
    readTime: '12 min read',
    tags: ['React', 'State Management', 'Redux'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    content: `# State Management in React: A Complete Guide

State management is one of the most crucial aspects of React development. As applications grow, choosing the right state management approach becomes critical for maintainability and performance.

## Local State with useState

For simple, component-specific state, \`useState\` is perfect:

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## Lifting State Up

When multiple components need the same state:

\`\`\`javascript
function App() {
  const [user, setUser] = useState(null);
  
  return (
    <div>
      <Header user={user} />
      <LoginForm onLogin={setUser} />
      <Dashboard user={user} />
    </div>
  );
}
\`\`\`

## Context API for Global State

For state that needs to be accessed by many components:

\`\`\`javascript
const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
\`\`\`

## useReducer for Complex State Logic

When state updates are complex or interdependent:

\`\`\`javascript
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <input 
        type="number" 
        value={state.step}
        onChange={(e) => dispatch({ 
          type: 'setStep', 
          payload: Number(e.target.value) 
        })}
      />
    </div>
  );
}
\`\`\`

## Redux Toolkit for Large Applications

For complex applications with many interconnected features:

\`\`\`javascript
// store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    const response = await api.getUser(userId);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    clearUser: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
\`\`\`

## Custom Hooks for Reusable State Logic

Extract common state patterns into custom hooks:

\`\`\`javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
\`\`\`

## When to Use Each Approach

### useState
- Component-specific state
- Simple state updates
- Small to medium components

### Context API
- Theme, user authentication
- Configuration that rarely changes
- Avoiding prop drilling

### useReducer
- Complex state logic
- Multiple related state variables
- State transitions that depend on previous state

### Redux Toolkit
- Large applications
- Complex state interactions
- Need for time-travel debugging
- Team development with strict patterns

## Performance Considerations

1. **Avoid unnecessary re-renders** with \`useMemo\` and \`useCallback\`
2. **Split contexts** to prevent over-rendering
3. **Use selectors** in Redux to subscribe to specific state slices
4. **Consider state colocation** - keep state as close to where it's used as possible

## Best Practices

1. Start with local state and lift up when needed
2. Use TypeScript for better state type safety
3. Keep state normalized (avoid deeply nested objects)
4. Use immutable update patterns
5. Test your state management logic separately from components

## Conclusion

Choose the right state management approach based on your application's complexity and requirements. Start simple with local state, and gradually adopt more sophisticated solutions as your application grows.

Remember: the best state management solution is the simplest one that meets your needs!`
  }
];