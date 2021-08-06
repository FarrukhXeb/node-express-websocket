import dotenv from "dotenv";
import path from "path";
import express from "express";

dotenv.config({ path: path.join(__dirname, "../", ".env") });

function main() {
  const app = express();
  app.listen(() => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
}
main();
