import { SatisfactionSurvey } from '@prisma/client';
import { randomUUID } from "crypto";
import { SatisfactionSurveyType } from "../types/satisfactionSurvey.type";
import { AnswersType } from "../types/answers.type";

export default class SatisfactionSurveyDomain {
    static async create(satisfactionSurveyDto: SatisfactionSurveyType) {
        try {
            const createdSatisfactionSurvey = {
                ...satisfactionSurveyDto,
                id: randomUUID(),
                status: "ACTIVE",
                assessment: null,
                updated_at: new Date(),
                created_at: new Date()
            }

            return createdSatisfactionSurvey;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Ocorreu um erro inesperado!")
            }
        }
    }

    static async update(satisfactionSurveyDto: SatisfactionSurveyType) {
        const createdSatisfactionSurvey = { ...satisfactionSurveyDto, updated_at: new Date() }
        return createdSatisfactionSurvey;
    }

    static filterSatisfactionSurvey(satisfactionsSurveys) {
        try {
            const returnSatisfactionsSurveys = satisfactionsSurveys.map(satisfactionSurvey => {
                return {
                    target_audience: satisfactionSurvey.target_audience,
                    responsible_person: satisfactionSurvey.responsible_person,
                    assessment: satisfactionSurvey.assessment,
                    questions: satisfactionSurvey.questions.map((question, index) => {
                        return {
                            question: question,
                            answer: satisfactionSurvey.answers && satisfactionSurvey.answers[0] && satisfactionSurvey.answers[0].satisfaction_survey_answers
                                ? satisfactionSurvey.answers[0].satisfaction_survey_answers[index]
                                : []
                        }
                    })
                }
            });

            return returnSatisfactionsSurveys;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Ocorreu um erro inesperado!")
            }
        }
    }

    static async createAnswers(answersDto: AnswersType, satisfactionSurvey: SatisfactionSurvey) {
        try {
            const createdAnswers = {
                ...answersDto,
                id: randomUUID(),
                satisfaction_survey_id: satisfactionSurvey.id,
                created_at: new Date()
            }

            if (answersDto.satisfaction_survey_answers.length > satisfactionSurvey.questions.length) {
                throw new Error('Número de respostas não equivale ao número de perguntas')
            };

            satisfactionSurvey.assessment = this.updateAssessmentSatisfactionSurvey(answersDto.assessment, satisfactionSurvey.assessment)

            return { createdAnswers, satisfactionSurvey };
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Ocorreu um erro inesperado!")
            }
        }
    }

    private static updateAssessmentSatisfactionSurvey(answerAssessment: number, assessmentSatisfactionSurvey: string | null) {
        if (assessmentSatisfactionSurvey === null) {
            return answerAssessment.toFixed(2)
        }
        const currentAssessmentSatisfactionSurvey = parseFloat(assessmentSatisfactionSurvey)
        if (answerAssessment > currentAssessmentSatisfactionSurvey) {
            const newAssessment = ((answerAssessment - currentAssessmentSatisfactionSurvey) / 2) + currentAssessmentSatisfactionSurvey
            return newAssessment.toFixed(2)
        } else {
            const newAssessment = ((currentAssessmentSatisfactionSurvey - answerAssessment) / 2) + answerAssessment
            return newAssessment.toFixed(2)
        }
    }
}