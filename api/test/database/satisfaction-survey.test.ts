import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Manipulate satisfaction survey in database', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it.skip('should persist a satisfaction survey to the database', async () => {
        const satisfactionSurveyMock = {
            id: "d55fa41d-be9f-44a9-9f32-817d05934d57",
            responsible_person: "João Guilherme",
            email_responsible_person: "joao@email.com.br",
            status: "ACTIVE",
            purpose: "Navegalibilidade do site",
            target_audience: "Geeks",
            questions: [
                "de 0 a 10 como você classifica a facilidade de utilizar de nosso site",
                "de 0 a 10 como você classifica a intuição de nosso layout"
            ]
        };

        const createdSatisfactionSurvey = await prisma.satisfactionSurvey.create({ data: satisfactionSurveyMock }).then(data => { return data; });

        expect(createdSatisfactionSurvey.id).toEqual(satisfactionSurveyMock.id);
        await prisma.satisfactionSurvey.delete({ where: { id: createdSatisfactionSurvey.id } });
    });

    it.skip('should update a satisfaction survey status', async () => {
        const satisfactionSurveyMock = {
            id: "d55fa41d-be9f-44a9-9f32-817d05934d57",
            responsible_person: "João Guilherme",
            email_responsible_person: "joao@email.com.br",
            status: "ACTIVE",
            purpose: "Navegalibilidade do site",
            target_audience: "Geeks",
            questions: [
                "de 0 a 10 como você classifica a facilidade de utilizar de nosso site",
                "de 0 a 10 como você classifica a intuição de nosso layout"
            ]
        };

        const newStatus = "CANCELLED";
        const updatedSatisfactionSurvey = await prisma.satisfactionSurvey.create({ data: satisfactionSurveyMock }).then(async (data) => {
            const update = await prisma.satisfactionSurvey.update({ data: { status: "CANCELLED" }, where: { id: data.id } });
            return update;
        });

        expect(updatedSatisfactionSurvey.status).toBe(newStatus);
        await prisma.satisfactionSurvey.delete({ where: { id: updatedSatisfactionSurvey.id } });
    });
});