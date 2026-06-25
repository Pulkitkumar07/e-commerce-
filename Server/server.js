import app from "./app.js";
import connectDB from "./src/db/db.js";


connectDB();

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is required in Server/.env");
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
