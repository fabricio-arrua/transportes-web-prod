import * as Yup from 'yup';

export const choferValidations = Yup.object({
    usuario: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    contrasenia: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    nombre: Yup.string().max(100, "100 caracteres máximo").required("¡Campo obligatorio!"),
    licencia: Yup.string().max(50, "50 caracteres máximo").required("¡Campo obligatorio!"),
    telefono: Yup.string().matches(/^[0-9]+$/, "Solo debe ingresar numeros").min(8, "Ingrese al menos 8 dígitos").max(12, "Límite de dígitos excedido").required("¡Campo obligatorio!")
})