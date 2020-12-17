import Joi from 'joi-browser';

const Validate = (data, schema, option = { abortEarly: false }) => {
    const { error } = Joi.validate(data, schema, option);
    return error ? error.details
        .map(e => ({ [e.path[0]]: e.message }))
        .reduce((obj, e) => { if (obj && !(Object.keys(e)[0] in obj)) return { ...obj, ...e }; else return obj; })
        : null;
}
export default Validate;

export const ValidateProperty = (data, schema, option = { abortEarly: true }) => {
    const { error } = Joi.validate(data, schema, option);

    return error ? error.details[0].message : null;
}