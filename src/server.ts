import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server running on port ${PORT} and MongoDB Connected Successfully`
      )
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
