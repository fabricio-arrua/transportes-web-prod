import * as Yup from 'yup';

export const transporteUpdateValidations = Yup.object({
    fechaInicio: Yup.date().min(new Date(), "Fecha/Hora de inicio debe ser mayor a fecha/hora actual").required("¡Campo obligatorio!").nullable(),
    fechaFin: Yup.date().min(Yup.ref('fechaInicio'), 'Fecha finalización debe de ser mayor a la fecha de inicio'),
    kmRecorridos: Yup.number().min(1,"Kilometros debe de ser mayor a 0").required("¡Campo obligatorio!"),
    origen: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    destino: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    matricula: Yup.string().required("¡Campo obligatorio!"),
    cliente: Yup.string().required("¡Campo obligatorio!")
})