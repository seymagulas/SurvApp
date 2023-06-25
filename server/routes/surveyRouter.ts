"use strict";

import { Router } from "express";
import { completeSurvey } from "../controllers/surveyControllers/completeSurveyController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getSurvey } from "../controllers/surveyControllers/getSurveyController";
import { getAllSurveys } from "../controllers/surveyControllers/getAllSurveysController";
import { createSurvey } from "../controllers/surveyControllers/createSurveyController";
import { deleteSurvey } from "../controllers/surveyControllers/deleteSurveyController";
import { editSurvey } from "../controllers/surveyControllers/editSurveyController";
import { publishSurvey } from "../controllers/surveyControllers/publishSurveyController";

export const surveyRouter = Router();

surveyRouter.get("/:id", authMiddleware, getSurvey);
surveyRouter.get("/", authMiddleware, getAllSurveys);
surveyRouter.post("/", authMiddleware, createSurvey);
surveyRouter.put("/:id", authMiddleware, editSurvey);
surveyRouter.delete("/:id", authMiddleware, deleteSurvey);
surveyRouter.put("/:id/publish", authMiddleware, publishSurvey);
surveyRouter.put("/:id/complete", authMiddleware, completeSurvey);
