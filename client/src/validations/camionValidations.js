import * as Yup from 'yup';

export const camionValidations = Yup.object({
    matricula: Yup.string().matches("[A-Z]{3}[0-9]{4}", "Formato incorrecto, ej: ABC1234" ).required("¡Campo obligatorio!"),
    anio: Yup.number().min(1950, "Año debe ser mayor a 1950").required("¡Campo obligatorio!"),
    marca: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    kilometros: Yup.number().min(0, "Kilometraje debe de ser igual o mayor que 0").required("¡Campo obligatorio!"),
    idEstado: Yup.string().required("¡Campo obligatorio!"),
    idTipoCamion: Yup.string().required("¡Campo obligatorio!")
})