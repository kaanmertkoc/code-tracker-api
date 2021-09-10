import express from "express";
import { getTotalLines } from "../controllers/totalController.js";

const router = express.Router();

router.route("/").post(getTotalLines);
export default router;
