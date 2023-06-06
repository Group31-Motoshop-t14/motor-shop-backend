import "dotenv/config";
import {PrismaClient} from "@prisma/client";
import app from "./app";

export const prisma = new PrismaClient({
  log: ["query"],
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
