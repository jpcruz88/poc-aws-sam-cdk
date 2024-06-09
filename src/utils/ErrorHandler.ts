export class ErrorHandler {
  public static handleError(error: unknown): {
    statusCode: number;
    body: string;
  } {
    console.error("Error:", error);

    let message: string;
    let statusCode: number = 500;

    if (error instanceof Error) {
      message = error.message;

      if (
        error.message.includes("Falta el encabezado de autorización") ||
        error.message.includes("El cuerpo de la solicitud está ausente") ||
        error.message.includes("Error al analizar el cuerpo")
      ) {
        statusCode = 400;
        message =
          "Falta el encabezado de autorización o el cuerpo de la solicitud es inválido.";
      } else if (error.message.includes("Error al guardar el ítem")) {
        statusCode = 500;
        message = "Error al guardar el ítem.";
      } else if (error.message.includes("Error al crear el usuario")) {
        statusCode = 502;
        message = "Error al crear el usuario.";
      }
    } else {
      message = "Error desconocido";
    }

    return {
      statusCode,
      body: JSON.stringify({
        message: "Error interno del servidor",
        error: message,
      }),
    };
  }
}
