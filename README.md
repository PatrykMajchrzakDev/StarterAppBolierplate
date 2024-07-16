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
- **Authentication**: JWT (JSON Web Tokens), OAuth
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
   npx prisma generate
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Configuration**:

   - Create `.env` in the root `backend` directory.
   - Update the environment variables with your PostgreSQL database credentials and JWT secret.
   - Paste your firebase service account file (firebaseServiceAccount.json) to backend/config (.gitignore ignores it)

   ```env
   - NODE_ENV = development || production -> this has to be changed based on      current server status
   - BASE_URL = "e.g. http://localhost:3000"
   - FRONTEND_BASE_URL: "e.g. http://localhost:5173"
   - DATABASE_URL = "your_postgre_url"
   - JWT_SECRET = 'your_jwt_secret'
   - PORT = "e.g. 3000"
   - SALT = Any number 8+ for example 10 (better to not be too high)

   - ( Email variables are used for sending emails to users for things like verifying user registration. Check below explanation how to set it up)
   - EMAIL_USER= "your-email@gmail.com"
   - EMAIL_PASS= "your-email-password"
   - GOOGLE_OAUTH_CLIENT_ID = client id from google oauth credentials
   - GOOGLE_OAUTH_CLIENT_SECRET = client secret from google oauth credentials
   - SESSION SECRET = Random string (used for session initialization to serialize and deserialize user via passport)
   ```

   **NODEMAILER ZOHO EMAIL APP SETUP**
   Create Zoho email account then go to Settings -> Go to Security -> App Passwords -> Generate New Password and then change .env variables. Make sure to setup services/sendEmail.ts.

   Use smtp.zoho.eu if in EU and .com if in US.

   ```
   const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
   ```

2. **Frontend Configuration**:

   - Create `.env` in the root `frontend` directory.
   - Update the environment variables with your backend API URL.

   ```env

   - VITE_DEV=development
   - VITE_API_URL=http://localhost:3000
   ```

3. **App specific names**:

   - Use search in your IDE and search for "TBC" to find stuff that has to be changed like names, logos and so on...

4. **Google OAuth Configuration**:
   - Create project
   - Go to "OAuth consent screen" and fill necessary input fields and in "App Domain" -> "Application home page" write down your domain (by default - http://localhost:5173)
   - Next go to "Credentials" -> "Create credentials" -> OAuth Client ID
   - Select Web App -> in "JS origins" your frontend URI (http://localhost:5173) -> in "redirect URI" your backend redirect (http://localhost:3000/auth/google/callback)
   - After this setup "Client ID" and "Client Secret" are generated and have to be put in backend/.env

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

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

## Acknowledgements

- [Prisma](https://www.prisma.io/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
