import express from "express";

import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/coins",
  "/news",
  "/my-coins/edit",
  "/my-coins/edit/following",
  "/my-coins/edit/all",
  "/coins/:coinCode"
];
const authedClientRoutes = ["/profile", "/login"];

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

router.get(authedClientRoutes, (req, res) => {
  if (req.user) {
    res.sendFile(getClientIndexPath());
  } else {
    res.redirect("/user-sessions/new");
  }
});

export default router;
