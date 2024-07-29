import { Router } from "express";
import SatisfactionSurveyController from "../controllers/satisfactionSurvey.controller";
import { validationSatisfactionSurveyPost, validationSatisfactionSurveyPut } from "./middleware/validationSatisfactionSurvey";
import { validationAnswersPost } from "./middleware/validationAnswersPost";

const router = Router();

router
    .post('/create_satisfaction_survey', validationSatisfactionSurveyPost, SatisfactionSurveyController.postSatisfactionSurvey)
    .put('/update_satisfaction_survey/:id', validationSatisfactionSurveyPut, SatisfactionSurveyController.putSatisfactionSurvey)
    .post('/satisfaction_survey/:id/answers', validationAnswersPost, SatisfactionSurveyController.postAnswers)
    .get('/satisfaction_survey', SatisfactionSurveyController.getSatisfactionSurvey)

export default router;