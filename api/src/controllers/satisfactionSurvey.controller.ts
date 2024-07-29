
import { SatisfactionSuveryDatabase } from "../repository/satisfactionSurvey.repository";
import SatisfactionSurveyService from "../service/satisfactionSurvey.service";
import { AnswersType } from "../types/answers.type";
import { SatisfactionSurveyType } from "../types/satisfactionSurvey.type";

const satisfactionSurveyRepository = new SatisfactionSuveryDatabase()
const satisficationSurveyService = new SatisfactionSurveyService(satisfactionSurveyRepository)

export default class SatisfactionSurveyController {
    static async postSatisfactionSurvey(req, res) {
        const satisfactionSurveyBody: SatisfactionSurveyType = req.body;
        try {
            const createdSatisfactionSurvey = await satisficationSurveyService.create(satisfactionSurveyBody)
            res.status(201).send(createdSatisfactionSurvey);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(400).send({ message: "Não foi possível criar uma Pesquisa de Satisfação!" })
            }
        }
    }

    static async putSatisfactionSurvey(req, res) {
        const satisfactionSurveyBody: SatisfactionSurveyType = req.body;
        const satisfactionSurveyId = req.params.id
        try {
            const updatedSatisfactionSurvey = await satisficationSurveyService.update(satisfactionSurveyBody, satisfactionSurveyId)
            res.status(201).send(updatedSatisfactionSurvey);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(400).send({ message: "Não foi possível atualizar a Pesquisa de Satisfação!" })
            }
        }
    }

    static async getSatisfactionSurvey(req, res) {
        const orderBy = req.query.order_by_assessment;
        try {
            const findedSatisfactionSurvey = await satisficationSurveyService.findSatisfactionSurvey(orderBy)
            res.status(200).send(findedSatisfactionSurvey);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
                res.status(400).send({ message: error.message })
            } else {
                res.status(400).send({ message: "Não foi possível criar uma Pesquisa de Satisfação!" })
            }
        }
    }

    static async postAnswers(req, res) {
        const answersBody: AnswersType = req.body;
        const satisfactionSurveyId = req.params.id
        try {
            const createdAnswers = await satisficationSurveyService.createAnswers(answersBody, satisfactionSurveyId)
            res.status(201).send(createdAnswers);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(400).send({ message: "Não foi possível criar as respostas da pequisa de satisfação" })
            }
        }
    }
}