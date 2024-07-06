// Server modules
import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import passport from "passport";
import session from "express-session";

// Services
import "@/services/cleanUpScheduler";

// Import Passport configuration
import "@/middleware/Auth/passport";

// Routes
import authRoutes from "@/routes/authRoutes";
import usersRoutes from "@/routes/usersRoutes";

const app = express();

// <!-- ======================== -->
// <!-- ====== Middleware ====== -->
// <!-- ======================== -->

// Initialize session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "7264353-nfi2p12839gbk7c",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Automatically convert the body of any request to server as JSON
app.use(express.json());
// Cors to handle cross domain resource sharing
app.use(cors());

// <!-- ======================== -->
// <!-- ======== ROUTING ======= -->
// <!-- ======================== -->

// Auth routes
app.use("/auth", authRoutes);

// User routes
app.use("/users", usersRoutes);

// TEST routes
app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

// Server start with PORT .env
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on localhost:${process.env.PORT}`);
});
