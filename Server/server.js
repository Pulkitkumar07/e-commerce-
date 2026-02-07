import app from "./app.js";
import connectDB from "./src/db/db.js";


connectDB();

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});