
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let server;
beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

afterAll(async () => {
    await prisma.satisfactionSurvey.delete({
        where: { id: idSatisfactionSurvey }
    });
})

let idSatisfactionSurvey: string
describe('Create satisfaction survey', () => {

    it('should create satisfaction survey', async () => {
        const satisfactionSurveyMock = {
            responsible_person: "João Guilherme",
            email_responsible_person: "joao@email.com.br",
            purpose: "Navegalibilidade do site",
            target_audience: "Geeks",
            questions: [
                "de 0 a 10 como você classifica a facilidade de utilizar de nosso site",
                "de 0 a 10 como você classifica a intuição de nosso layout"
            ]
        };
        const response = await request(app)
            .post('/create_satisfaction_survey')
            .send(satisfactionSurveyMock)
            .expect(201)

        expect(response.body.email_responsible_person).toEqual(satisfactionSurveyMock.email_responsible_person)
        idSatisfactionSurvey = response.body.id
    });

    it('should return field error in post', async () => {
        const satisfactionSurveyMock = {
            responsible_person: "João Guilherme",
            email_responsible_person: "joao@email.com.br",
            purpose: "Navegalibilidade do site",
            questions: [
                "de 0 a 10 como você classifica a facilidade de utilizar de nosso site",
                "de 0 a 10 como você classifica a intuição de nosso layout"
            ]
        };
        const response = await request(app)
            .post('/create_satisfaction_survey')
            .send(satisfactionSurveyMock)
            .expect(401)

        expect(response.body.message).toBe("É necessário informar o público alvo!")
    });

    it('should update a field in satisfaction survey', async () => {
        const satisfactionSurveyMock = {
            purpose: "Atendimento ao Cliente"
        };
        const response = await request(app)
            .put(`/update_satisfaction_survey/${idSatisfactionSurvey}`)
            .send(satisfactionSurveyMock)
            .expect(201)

        expect(response.body.purpose).toBe(satisfactionSurveyMock.purpose)
    });

    it.skip('should create answers', async () => {
        const answersMock = {
            client: "Lucas Henrique",
            email_client: "lucas@email.com.br",
            assessment: 8,
            satisfaction_survey_answers: [
                "7",
                "9",
            ]
        };

        const response = await request(app)
            .post(`/satisfaction_survey/${idSatisfactionSurvey}/answers`)
            .send(answersMock)
            .expect(201)

        expect(response.body.email_client).toBe(answersMock.email_client)
    });

    it('should get satisfactions surveys', async () => {
        await request(app)
            .get(`/satisfaction_survey/?order_by_assessment=asc`)
            .expect(200)
    });

    it('should not accept more answers than there are questions', async () => {
        const answersMock = {
            client: "Lucas Henrique",
            email_client: "lucas@email.com.br",
            assessment: 8,
            satisfaction_survey_answers: [
                "7",
                "9",
                "8"
            ]
        };

        const response = await request(app)
            .post(`/satisfaction_survey/${idSatisfactionSurvey}/answers`)
            .send(answersMock)
            .expect(400)

        expect(response.body.message).toBe('Número de respostas não equivale ao número de perguntas')
    });

})