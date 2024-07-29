import { postAnswersDto } from "../../controllers/dto/answers.dto";

export const validationAnswersPost = async (req, res, next) => {
    try {
        for (const fieldsValid in req.body) {
            if (!postAnswersDto.fields[fieldsValid]) {
                throw new Error(`Campo ${fieldsValid} não deve ser enviado na resposta da pesquisa!`)
            };
        };
        await postAnswersDto.validate(req.body);
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({ message: error.message })
        } else {
            res.status(404).send('Ocorreu algum erro inesperado!')
        }
    }
}