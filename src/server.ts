import "module-alias/register";
import app from "@/app";
import { db } from "./config/db";
const port = process.env.PORT || 3000;

db.init();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// error exceptions
process.on("uncaughtException", (error) => {
  console.log(" something terrible happend: ", error);

  process.exit(1); // exit application
});
process.on("unhandledRejection", (error, promise) => {
  console.log("We forgot to handle a promise rejection here: ", promise);
  console.log(" The error was: ", error);
});
