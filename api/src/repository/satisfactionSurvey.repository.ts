import { SatisfactionSurvey, PrismaClient, Answers, Prisma } from "@prisma/client";
const prismaClient = new PrismaClient();

export default interface SatisfactionSurveyRepository {
    saveSatisfactionSurvey(satisfactionSurvey: SatisfactionSurvey): Promise<SatisfactionSurvey>;
    updateSatisfactionSurvey(data, id: string): Promise<SatisfactionSurvey>;
    getSatisfactionSurvey(orderBy: string): Promise<SatisfactionSurvey[]>;
    getSatisfactionSurveyById(id: string): Promise<SatisfactionSurvey | null>;
    saveAnswers(data: Answers): Promise<Answers>;
};

export class SatisfactionSuveryDatabase implements SatisfactionSurveyRepository {
    async saveSatisfactionSurvey(satisfactionSurvey: SatisfactionSurvey): Promise<SatisfactionSurvey> {
        await prismaClient.$connect();
        const savedSatisfactionSurvey = await prismaClient.satisfactionSurvey.create({ data: satisfactionSurvey });
        await prismaClient.$disconnect();
        return savedSatisfactionSurvey;
    }

    async updateSatisfactionSurvey(data, id: string): Promise<SatisfactionSurvey> {
        await prismaClient.$connect();
        const updatedSatisfactionSurvey = await prismaClient.satisfactionSurvey.update({
            data: data, where: { id }
        })
        await prismaClient.$disconnect();
        return updatedSatisfactionSurvey;
    }

    async getSatisfactionSurveyById(id: string): Promise<SatisfactionSurvey | null> {
        await prismaClient.$connect();
        const findedSatisfactionSurvey = await prismaClient.satisfactionSurvey.findUnique({ where: { id } })
        await prismaClient.$disconnect();
        return findedSatisfactionSurvey;
    }

    async getSatisfactionSurvey(orderBy: Prisma.SortOrder): Promise<SatisfactionSurvey[]> {
        await prismaClient.$connect();
        const findedSatisfactionSurvey = await prismaClient.satisfactionSurvey.findMany({
            orderBy: {
                assessment: orderBy
            },
            include: {
                answers: {
                    select: {
                        client: true,
                        email_client: true,
                        satisfaction_survey_answers: true,
                        assessment: true,
                    }
                }
            }
        })
        await prismaClient.$disconnect();
        return findedSatisfactionSurvey;
    }

    async saveAnswers(data): Promise<Answers> {
        await prismaClient.$connect();
        const savedAnswers = await prismaClient.answers.create({ data: data });
        await prismaClient.$disconnect();
        return savedAnswers;
    }
}
