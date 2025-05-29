import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/user.route";
import { HttpError } from "./util/error-handler";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", userRouter);

// fallback route for any other route that is not defined
app.get(/(.*)/, (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error("[Global Error]", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
