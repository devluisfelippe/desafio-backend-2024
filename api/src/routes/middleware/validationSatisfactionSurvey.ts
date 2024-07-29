import { postSatisfactionSurveyDto, putSatisfactionSurveyDto } from "../../controllers/dto/satisfactionSurvey.dto";

const validationSatisfactionSurveyPost = async (req, res, next) => {
    try {
        for (const fieldsValid in req.body) {
            if (!postSatisfactionSurveyDto.fields[fieldsValid]) {
                throw new Error(`Campo ${fieldsValid} não deve ser enviado na criação da pesquisa de satisfação!`)
            };
        };
        await postSatisfactionSurveyDto.validate(req.body);
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({ message: error.message })
        } else {
            res.status(404).send('Ocorreu algum erro inesperado!')
        }
    }
}

const validationSatisfactionSurveyPut = async (req, res, next) => {
    try {
        for (const fieldsValid in req.body) {
            if (!putSatisfactionSurveyDto.fields[fieldsValid]) {
                throw new Error(`Campo ${fieldsValid} não deve ser enviado na atualização da pesquisa de satisfação!`)
            };
        };
        await putSatisfactionSurveyDto.validate(req.body);
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({ message: error.message })
        } else {
            res.status(404).send('Ocorreu algum erro inesperado!')
        }
    }
}

export { validationSatisfactionSurveyPost, validationSatisfactionSurveyPut }