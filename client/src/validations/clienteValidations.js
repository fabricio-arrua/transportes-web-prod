import * as Yup from 'yup';

export const clienteValidations = Yup.object({
    documento: Yup.string().max(15, "15 caracteres máximo").required("¡Campo obligatorio!"),
    nombreCompleto: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    direccion: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    telefono: Yup.string().matches(/^[0-9]+$/, "Solo debe ingresar numeros").min(8, "Ingrese al menos 8 dígitos").max(12, "Límite de dígitos excedido").required("¡Campo obligatorio!")
})