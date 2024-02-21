import * as Yup from 'yup';

export const mantenimientoUpdateValidations = Yup.object({
    matricula: Yup.string().required("¡Campo obligatorio!"),
    estadoMantenimento: Yup.string().required("¡Campo obligatorio!"),
    fechaMantenimiento: Yup.date().required("¡Campo obligatorio!"),
    observaciones: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    costo: Yup.number().min(1, "Costo debe de ser mayor que 0").required("¡Campo obligatorio!")
})