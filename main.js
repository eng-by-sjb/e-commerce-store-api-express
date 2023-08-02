import "dotenv/config";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import errorHandler from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { routerHandler } from "./routes/products-router-handler.js";
// import {} from "url"

const app = express();
const PORT = process.env.PORT || 7333;

//routes
app.use("/", express.json(), routerHandler);

//not found route
app.use(notFoundHandler);

//error handler
app.use(errorHandler);

const start = (async () => {
  try {
    await connectDB(process.env.URI);
    console.log(`\nDB connected......\n\n\n`);
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}.....`);
    });
  } catch (error) {
    console.log(error);
  }
})();
