import express from "express";
import { getRepos, listLanguages } from "../controllers/repoController.js";

const router = express.Router();

router.route("/").post(getRepos);
router.route("/language").post(listLanguages);
export default router;
