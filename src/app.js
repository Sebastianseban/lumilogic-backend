import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import { errorHandler, notFound } from "./middleware/errorHandler.middleware.js";
import adminRoutes from "./routes/admin.routes.js"


const app = express()


app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


router.use("api/v1/admin", adminRoutes);

app.get("/health", (req, res) => {
  res.send("lumilogic Backend Running 🚀");
});


app.use(notFound);
app.use(errorHandler);

export {app}