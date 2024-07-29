import * as yup from 'yup'

const postSatisfactionSurveyDto = yup.object().shape({
    responsible_person: yup.string().required('É necessário informar o responsável pela pesquisa!'),
    email_responsible_person: yup.string().email('Email inválido').required('É necessário informar o email do responsável!'),
    purpose: yup.string().required('É necessário informar o propósito da pesquisa!'),
    target_audience: yup.string().required('É necessário informar o público alvo!'),
    questions: yup.array().of(yup.string().default('As questões precisam ser no formato string'))
        .required('É precisso informar ao menos uma pergunta para a pesquisa!'),
});

const putSatisfactionSurveyDto = yup.object().shape({
    responsible_person: yup.string().default('O nome do responsável precisa ser no formato string'),
    email_responsible_person: yup.string().email('Email inválido'),
    purpose: yup.string().default('O propósito da pesquisa precisa ser no formato string'),
    target_audience: yup.string().default('O público alvo precisa ser no formato string'),
    status: yup.string().default('O status precisa ser no formato string'),
    questions: yup.array().of(yup.string().default('As questões precisam ser no formato string')),
});

export { postSatisfactionSurveyDto, putSatisfactionSurveyDto }