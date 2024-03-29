import express from "express";

import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import coinRouter from "./api/v1/coinsRouter.js";
import userCoinRouter from "./api/v1/userCoinRouter.js";
import newsRouter from "./api/v1/newsRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/coins", coinRouter)
rootRouter.use("/api/v1/user-coins", userCoinRouter)
rootRouter.use("/api/v1/news/", newsRouter)

// place your server-side routes here

export default rootRouter;
