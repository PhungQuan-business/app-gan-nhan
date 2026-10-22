// server.ts
import dotenv from "dotenv";
import app from "./app.js";


dotenv.config();

const port = Number(process.env.BACKEND_PORT);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

function shutdown() {
  server.close(() => {
    process.exit(0);
  });
}

// accept kill signal gracefully from user and container
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
