import { SatisfactionSurveyType } from './../types/satisfactionSurvey.type';
import SatisfactionSurveyRepository from "../repository/satisfactionSurvey.repository";
import SatisfactionSurveyDomain from '../domain/satisfactionSurvey.domain';
import { Answers, SatisfactionSurvey } from '@prisma/client';
import { AnswersType } from '../types/answers.type';

export default class SatisfactionSurveyService {
    constructor(readonly satisfactionSurveyRepository: SatisfactionSurveyRepository) { }

    async create(satisfactionSurveyDto: SatisfactionSurveyType): Promise<SatisfactionSurvey> {
        try {
            const createdSatisfactionSurveyReturn = await SatisfactionSurveyDomain.create(satisfactionSurveyDto)
            const savedSatisfactionSurvey = await this.satisfactionSurveyRepository.saveSatisfactionSurvey(createdSatisfactionSurveyReturn)
            return savedSatisfactionSurvey;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error('Ocorrou um erro inesperado!')
            }
        }
    };

    async update(satisfactionSurveyDto: SatisfactionSurveyType, id: string): Promise<SatisfactionSurvey> {
        const findedSatisfactionSurveyReturn = await this.satisfactionSurveyRepository.getSatisfactionSurveyById(id)
        try {
            if (!findedSatisfactionSurveyReturn) throw new Error('Pesquisa não encontrada!');
            const updatedSatisfactionSurvey = await SatisfactionSurveyDomain.update(satisfactionSurveyDto)
            const savedSatisfactionSurvey = await this.satisfactionSurveyRepository.updateSatisfactionSurvey(updatedSatisfactionSurvey, id)
            return savedSatisfactionSurvey;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error('Ocorrou um erro inesperado!')
            }
        }
    };

    async findSatisfactionSurvey(orderBy: string): Promise<SatisfactionSurvey[]> {
        try {
            const findedSatisfactionSurvey = await this.satisfactionSurveyRepository.getSatisfactionSurvey(orderBy)
            const filteredSatisfactionSurvey = await SatisfactionSurveyDomain.filterSatisfactionSurvey(findedSatisfactionSurvey)
            return filteredSatisfactionSurvey;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error('Ocorrou um erro inesperado!')
            }
        }
    }

    async createAnswers(answersDto: AnswersType, id: string): Promise<Answers> {
        const findedSatisfactionSurvey = await this.satisfactionSurveyRepository.getSatisfactionSurveyById(id)
        try {
            if (!findedSatisfactionSurvey) throw new Error('Pesquisa não encontrada!');
            if (findedSatisfactionSurvey.status === "CANCELLED" || findedSatisfactionSurvey.status === "FINISHED") {
                throw new Error('Pesquisa finalizada ou cancelada!')
            };
            const { createdAnswers, satisfactionSurvey } = await SatisfactionSurveyDomain.createAnswers(answersDto, findedSatisfactionSurvey)
            await this.update(satisfactionSurvey, satisfactionSurvey.id)
            const savedAnswers = await this.satisfactionSurveyRepository.saveAnswers(createdAnswers)
            return savedAnswers;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error('Ocorrou um erro inesperado!')
            }
        }
    };
}