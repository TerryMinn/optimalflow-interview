import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { TransferRouter, UserRouter } from "./routes";
import { HttpError } from "./util/error-handler";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

// For JSON parser
app.use(express.json());
// For form data parser
app.use(express.urlencoded({ extended: true }));
// CORS
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // for cookies
    credentials: true,
  })
);
// Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'none'"],
        styleSrc: ["'none'"],
        imgSrc: ["'none'"],
        fontSrc: ["'none'"],
        objectSrc: ["'none'"],
        formAction: ["'none'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    xssFilter: true,
    noSniff: true,
    frameguard: { action: "deny" },
    hsts: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true,
    },
  })
);
// Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  })
);

// Routes
app.use("/api/v1", UserRouter);
app.use("/api/v1", TransferRouter);

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
