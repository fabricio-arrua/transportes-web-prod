import * as Yup from 'yup';

export const solicitudesValidations = Yup.object({
    idMantenimiento: Yup.string().required("¡Campo obligatorio!"),
    producto: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    cantidad: Yup.number().min(1, "Cantidad debe de ser mayor que 0").required("¡Campo obligatorio!")
})