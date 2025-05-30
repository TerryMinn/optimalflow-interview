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
    SEED_EMAIL_S: string;
    SEED_PASSWORD_S: string;
    SEED_NAME_S: string;
  }
}
