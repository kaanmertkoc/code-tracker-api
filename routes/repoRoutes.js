import express from "express";
import {
  getRepos,
  getStarredRpoes,
  listLanguages,
} from '../controllers/repoController.js';

const router = express.Router();

router.route("/").post(getRepos);
router.route("/language").post(listLanguages);
router.route('/starred').post(getStarredRpoes);
export default router;
