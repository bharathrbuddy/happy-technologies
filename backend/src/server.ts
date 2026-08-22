import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import chatRouter from "./routes/chat";
import quotationRouter from "./routes/quotation";
import contactRouter from "./routes/contact";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Happy Technologies Backend Running 🚀",
  });
});

app.use("/api/chat", chatRouter);
app.use("/api/quotation", quotationRouter);
app.use("/api/contact", contactRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});