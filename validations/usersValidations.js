const path = require('path');
const { body } = require('express-validator');

const usersValidations = {
    userRegisterValidations: [
        body('name')
            .notEmpty().withMessage("Debes completar el campo Nombre.").bail()
            .isLength({min: 3}).withMessage("El campo nombre debe contener al menos tres caracteres"),
        body('lastName')
            .notEmpty().withMessage("Debes completar el campo apellido").bail()
            .isLength({min: 3}).withMessage("El campo apellido debe contener al menos tres caracteres."),
        body('email')
            .notEmpty().withMessage("Debes completar el campo Email").bail()
            .isEmail().withMessage("Debes completar un email válido"),
        body('password')
            .notEmpty().withMessage("Debes completar el campo Contraseña").bail()
            .isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage("El campo contraseña debe contener al menos ocho caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo."),
        body('img')
            .custom(
                ({req}) => {
                    const acceptedFileExtensions = [".jpg", ".png", ".jpeg"];
                    return acceptedFileExtensions.includes(path.extname(req.file.filename));
                }
            ).withMessage("El archivo no posee un formato adecuado. Las extensiones aceptadas son .jpg, .png y .jpeg")
    ]
}

module.exports = usersValidations;