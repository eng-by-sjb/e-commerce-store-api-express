import "dotenv/config";
import express from "express";
import "express-async-errors";
import { connectDB } from "./db/connectDB.js";
import errorHandler from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { routerHandler } from "./routes/products-router-handler.js";
// import {} from "url"

const app = express();
const PORT = Number(process.env.PORT) || 7333;

//homepage route
app.get("/", (req, res, next) => {
  res.send(
    `<h1>
  Products API
  </h1>
  <a href="/api/v1/products">
  products
  </a>
  `
  );
});

//routes
app.use("/api/v1/products", express.json(), routerHandler);

//not found route
app.use(notFoundHandler);

//error handler
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`\nDB connected......\n\n\n`);
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}.....`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
