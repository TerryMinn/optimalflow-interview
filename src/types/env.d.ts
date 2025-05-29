declare namespace NodeJS {
  interface ProcessEnv {
    // Node environment
    NODE_ENV: "development" | "production" | "test";

    // Application
    PORT: string;

    SALT_ROUNDS: string;

    JWT_SECRET: string;
  }
}
