import * as yup from 'yup'

export const postAnswersDto = yup.object().shape({
    client: yup.string().required('O nome do cliente precisa ser informado!'),
    email_client: yup.string().email('Email inválido').required('O email do cliente precisa ser informado!'),
    assessment: yup.string().required('A avaliação é obrigatória!'),
    satisfaction_survey_answers: yup.array().of(yup.string()).required('As respostas são obrigatórias'),
});