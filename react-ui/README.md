# React UI

A React application with login functionality, built with React v18 and Node v20.

## Features

- Login page with email and password validation
- Authentication service that connects to the backend API
- Protected routes for authenticated users
- Home page that displays after successful login
- Token-based authentication using cookies

## Prerequisites

- Node.js v20 or higher
- npm or yarn

## Installation

1. Navigate to the react-ui directory:
```bash
cd react-ui
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
react-ui/
├── src/
│   ├── components/
│   │   ├── Login.jsx       # Login component
│   │   ├── Login.css       # Login styles
│   │   ├── Home.jsx        # Home page component
│   │   └── Home.css        # Home page styles
│   ├── context/
│   │   └── AuthContext.jsx # Authentication context
│   ├── services/
│   │   └── authService.js  # Authentication service
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.js
└── index.html
```

## API Configuration

The application is configured to connect to the backend API at `http://localhost:5050/auth/login`. You can modify this in `src/services/authService.js`.

## Technologies Used

- React 18.2.0
- React Router DOM 6.20.0
- Vite 5.0.8
- Axios 1.6.2
- js-cookie 3.0.5

