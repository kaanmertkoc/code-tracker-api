import express from "express";
import {
  getCommits,
  getCommitDetail,
  getYearlyCommitsByWeek,
  getWeeklyCommits,
  getWeeklyCommitCount,
} from "../controllers/commitController.js";

const router = express.Router();

router.route("/").get(getCommits);
router.route("/stats").post(getCommitDetail);
router.route("/dayly").post(getYearlyCommitsByWeek);
router.route("/weekly").post(getWeeklyCommits);
router.route("/yearly").get(getWeeklyCommitCount);

export default router;
