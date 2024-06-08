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
        error.message.includes("Authorization header missing") ||
        error.message.includes("Request body is missing") ||
        error.message.includes("Error parsing body") ||
        error.message.includes("Error saving item") ||
        error.message.includes("Error creating user")
      ) {
        statusCode = 400;
      }
    } else {
      message = "Unknown error";
    }

    return {
      statusCode,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: message,
      }),
    };
  }
}
