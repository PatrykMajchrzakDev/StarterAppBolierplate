import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// <!-- ======================== -->
// <!-- ====== Middleware ====== -->
// <!-- ======================== -->

// Automatically convert the body of any request to server as JSON
app.use(express.json());
// Cors to handle cross domain resource sharing
app.use(cors());

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on localhost:${process.env.PORT}`);
});
