declare namespace NodeJS {
  interface ProcessEnv {
    // Node environment
    NODE_ENV: "development" | "production" | "test";

    // Application
    PORT: string;

    SALT_ROUNDS: string;

    JWT_SECRET: string;

    ORIGIN: string;

    SEED_EMAIL: string;
    SEED_PASSWORD: string;
    SEED_NAME: string;
  }
}
