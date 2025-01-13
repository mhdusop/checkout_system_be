import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config/config.js";
import { authRouter } from "./routes/auth-routes.js";
import { cartRouter } from "./routes/cart-routes.js";
import { itemRouter } from "./routes/item-routes.js";

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

// Router
app.use('/api/v1', authRouter);
app.use('/api/v1', cartRouter);
app.use('/api/v1', itemRouter);

const APP_PORT = config.APP_PORT || 3000;

app.listen(APP_PORT, () => {
   console.log(`Server is running on port ${APP_PORT}`);
});

export default app;