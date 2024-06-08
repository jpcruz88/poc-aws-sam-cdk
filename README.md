# Componentes y sus Relaciones

1. **index.ts**:

   - **Propósito**: Punto de entrada de la función Lambda.
   - **Relación**: Crea instancias de los servicios (AuthService, RequestService, UserService) y el repositorio (DynamoDBItemRepository). Inyecta estas instancias en ItemService y define el handler para gestionar las solicitudes entrantes.

2. **ItemService**:

   - **Propósito**: Contiene la lógica principal de la aplicación.
   - **Relación**: Utiliza AuthService para extraer el token de autorización, RequestService para extraer y parsear el cuerpo de la solicitud, UserService para realizar una solicitud HTTP externa, y DynamoDBItemRepository para guardar datos en DynamoDB.

3. **AuthService**:

   - **Propósito**: Maneja la extracción del token de autorización desde los encabezados de la solicitud.
   - **Relación**: Es utilizado por ItemService para obtener el token de autorización.

4. **RequestService**:

   - **Propósito**: Maneja la extracción y el parseo del cuerpo de la solicitud.
   - **Relación**: Es utilizado por ItemService para obtener y parsear el cuerpo de la solicitud.

5. **UserService**:

   - **Propósito**: Realiza solicitudes HTTP externas.
   - **Relación**: Es utilizado por ItemService para realizar una solicitud HTTP para crear un usuario y devolver la respuesta.

6. **DynamoDBItemRepository**:

   - **Propósito**: Proporciona métodos para interactuar con DynamoDB.
   - **Relación**: Es utilizado por ItemService para guardar items en DynamoDB.

7. **IAuthService, IRequestService, IUserService, IItemRepository**:

   - **Propósito**: Definen contratos (interfaces) que los servicios y el repositorio deben cumplir.
   - **Relación**: Estas interfaces aseguran que los servicios y el repositorio implementen los métodos necesarios y permiten la inyección de dependencias.

8. **config.ts**:

   - **Propósito**: Contiene configuraciones globales como la URL del endpoint y el nombre de la tabla DynamoDB.
   - **Relación**: Es importado por varios servicios y repositorios para obtener configuraciones necesarias.

9. **ErrorHandler**:
   - **Propósito**: Maneja y estandariza la gestión de errores.
   - **Relación**: Es utilizado por ItemService para manejar errores y devolver respuestas consistentes en caso de fallo.

# Flujo de Trabajo

1. **Solicitud Entrante**:

   - La solicitud entrante es gestionada por el handler en index.ts.

2. **Inyección de Dependencias**:

   - index.ts crea instancias de AuthService, RequestService, UserService y DynamoDBItemRepository, y las inyecta en ItemService.

3. **Manejo de Evento**:

   - ItemService procesa el evento llamando a handleEvent.

4. **Extracción de Autorización**:

   - ItemService utiliza AuthService para extraer el token de autorización de los encabezados de la solicitud.

5. **Extracción y Parseo del Cuerpo**:

   - ItemService utiliza RequestService para extraer y parsear el cuerpo de la solicitud.

6. **Guardado Inicial en DynamoDB**:

   - ItemService crea un item inicial y lo guarda en DynamoDB utilizando DynamoDBItemRepository.

7. **Solicitud HTTP Externa**:

   - ItemService utiliza UserService para realizar una solicitud HTTP externa y obtener una respuesta.

8. **Guardado de Respuesta en DynamoDB**:

   - ItemService guarda la respuesta obtenida en DynamoDB utilizando DynamoDBItemRepository.

9. **Respuesta Final**:
   - ItemService devuelve una respuesta con los detalles de los items guardados y los datos obtenidos de la solicitud HTTP externa.

# Despliegue

Existen dos formas de realizar el despliegue: con SAM (Serverless Application Model) y con CDK (Cloud Development Kit).

## SAM (Serverless Application Model)

1. **Validar sintaxis**:
   `sam validate --lint`
   Valida que el archivo de plantilla de SAM no contenga errores de sintaxis.

2. **Generar el Build**:
   `npm run build:sam`
   Ejecuta el script de build específico para SAM usando npm.

3. **Construir el proyecto**:
   `sam build`
   Compila la aplicación y prepara los artefactos necesarios para el despliegue.

4. **Desplegar**:
   `sam deploy`
   Realiza el despliegue de la aplicación.

## CDK (Cloud Development Kit)

1. **Generar el Build**:
   `npm run build:cdk`
   Ejecuta el script de build específico para CDK usando npm.

2. **Preparar el entorno**:
   `cdk bootstrap`
   Prepara la cuenta de AWS para los despliegues de CDK creando los recursos necesarios (como buckets de S3 y roles de IAM).

3. **Desplegar**:
   `cdk deploy`
   Despliega la aplicación en AWS utilizando CDK.
