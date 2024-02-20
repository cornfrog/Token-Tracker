import express from "express";
import { ValidationError } from "objection";
import serializeUser from "../../../../services/serializeUser.js"
import serializeCoinList from "../../../../services/serializeCoinList.js";

import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(req.body)
  try {
    const persistedUser = await User.query().insertAndFetch({ username, email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    // console.log("outside if: ", error.data)
    if (error instanceof ValidationError) {
      // console.log("inside if: ", error.data)
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ error: error.message });
  }
});

usersRouter.get("/:id", async (req, res) => {
  const userID = req.params.id
  console.log(userID)
  try {
    const queriedUser = await User.query().findById(userID)
    const userFollowedCoins = await queriedUser.$relatedQuery("coins")
    const userData = serializeUser(queriedUser)
    const followedCoins = serializeCoinList(userFollowedCoins)
    return res.status(200).json({userData: userData, followedCoins: followedCoins})
  } catch (error) {
    console.log(error)
    return res.status(500).json({errors: error})

  }
})

export default usersRouter;
