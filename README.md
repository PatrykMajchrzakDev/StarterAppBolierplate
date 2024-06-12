# StarterAppBoilerplate

StarterAppBoilerplate is a robust and scalable application boilerplate featuring frontend authentication with protected routes, PostgreSQL database, Node.js authentication, route authorization, and Prisma ORM for the backend.

## Features

- **Frontend Authentication**: Secure user authentication with protected routes.
- **Backend Authentication**: Node.js-based authentication system.
- **Database**: PostgreSQL integration for robust data management.
- **ORM**: Prisma ORM for seamless database operations.
- **Authorization**: Route-based authorization to control access to specific resources.

## Technologies Used

- **Frontend**: React, Zustand, Axios, React Router
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Authorization**: Role-based access control

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/PatrykMajchrzakDev/StarterAppBolierplate.git
   ```

2. Navigate to the project directory:

   ```sh
   cd StarterAppBoilerplate
   ```

3. Install the dependencies for both frontend and backend:

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Configuration**:

   - Create `.env` in the root `backend` directory.
   - Update the environment variables with your PostgreSQL database credentials and JWT secret.
   - Paste your firebase service account file to backend/config (.gitignore ignores it)

   ```env

   - DATABASE_URL = "your_postgre_url"
   - JWT_SECRET = 'your_jwt_secret'
   - PORT = 3000
   ```

2. **Frontend Configuration**:

   - Create `.env` in the root `frontend` directory.
   - Update the environment variables with your backend API URL.

   ```env

   - VITE_DEV=development
   - VITE_API_URL=http://localhost:3000
   - SALT = Any number 1 - 10 for example (better to not be high 20+)
   ```

### Database Setup

1. Initialize the Prisma client:

   ```sh
   cd backend
   npx prisma migrate dev --name init
   ```

2. Seed the database (if applicable):

   ```sh
   npm run seed
   ```

### Running the Application

1. Start the backend server:

   ```sh
   cd backend
   npm run dev
   ```

2. Start the frontend server:

   ```sh
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Project Structure

- **frontend/**: Contains the React application.

  - **src/**: Source code for the frontend.
    - **app/**: App setup with Providers and page components for different routes.
    - **assets/**: Project assets.
    - **components/**: Reusable UI components.
    - **config/**: Project configurations like themes and env variables.
    - **layouts/**: Layout components.
    - **lib/**: Application API handlers, routing, funtions.
    - **store/**: Setup for global state management.
    - **styles/**: SCSS styles
    - **types/**: Project TypeScript types
    - **server.ts**: React html root setup

- **backend/**: Contains the Node.js application.
  - **prisma/**: Prisma schema and migration files.
  - **src/**: Source code for the backend.
    - **controllers/**: Controllers for handling requests.
    - **middlewares/**: Middleware functions.
    - **routes/**: API routes.
    - **server.ts**: Server setup and configuration.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, feature requests, or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Prisma](https://www.prisma.io/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
