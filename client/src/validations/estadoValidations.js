import * as Yup from 'yup';

export const estadoValidations = Yup.object({
    idEstado: Yup.string().matches("[A-Z]{3}","Formato incorrecto, ej: ABC").max(3, "3 caracteres máximo").required("¡Campo obligatorio!"),
    descripcion: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!")
})