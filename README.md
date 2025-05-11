# Ortask Client Side

A React-based frontend application for displaying, managing, and organizing tasks. This application is built with React and Vite, allowing users to create, view, delete, and update their tasks accordingly such as their current status on their tasks.

## Features

- User authentication (login/logout)
- User creation (register)
- View their task summary
- View their current total tasks
- View list of user tasks
- View the total tasks created within the day using charts
- Create new user tasks
- Update user tasks staus
- Delete user tasks (for authorized users)
- Sort tasks by its created date
- Responsive notification system

## Technologies

### Frontend Core

- **React 19** - Modern UI library with hooks and components
- **Vite** - Next-generation frontend build tool
- **React Router 7** - For client-side routing
- **React Toastify** - Responsive notification
- **Full Calendar** - For calendar component

### State Management & Data Fetching

- **Redux Toolkit** - Centralized state management
- **Redux Persist** - Persist state management
- **React Redux** - Redux bindings for React
- **Tanstack Query or React Query** - Fetching, caching, synchronizing and updating server state
- **Tanstack Form** - Flexible form management
- **Axios** - HTTP client for API requests
- **Zod** - User input validation

### Testing & Quality

- **Vitest** - Testing framework (The tests are still in progress)
- **React Testing Library** - Component testing utilities
- **ESLint** - Code quality and style checking
- **Prettier** - Code formatting

### UI & Styling

- **Tainwind Css** - Overall Styling
- **ShadCN** - UI components
- **Lucide React** - Icon components

## Getting Started

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

## Project Structure

```
otasks/
├── src/
│   ├── components/          # UI Components
│   ├── hooks/               # Custom Hooks
│   ├── lib/                 # ShadCN utilities
│   ├── routes/              # Client routes
│   ├── services/            # API
│   ├── store/               # State Management
│   ├── utils/               # Custom utilities
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server (default port: 5173)
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run tsc` - Run typescript

## Preview

### Login
<img src="images/Login.png" alt="Login Screenshot" width="500" />


## 📄 Licenses

This project is open source and available under the [MIT License](LICENSE).

<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
``` -->
