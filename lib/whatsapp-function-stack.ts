import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as iam from "aws-cdk-lib/aws-iam";
import * as path from "path";
import { FunctionUrlAuthType, HttpMethod } from "aws-cdk-lib/aws-lambda";

export class WhatsappFunctionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "WhatsAppTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      tableName: "t_whatsapp",
      billingMode: dynamodb.BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Solo para desarrollo
    });

    const role = new iam.Role(this, "whatsappFunctionRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      inlinePolicies: {
        whatsappFunctionPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
              ],
              resources: ["arn:aws:logs:*:*:*"],
            }),
            new iam.PolicyStatement({
              actions: [
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:UpdateItem",
                "dynamodb:DeleteItem",
                "dynamodb:Scan",
                "dynamodb:Query",
                "dynamodb:DescribeTable",
              ],
              resources: [table.tableArn],
            }),
          ],
        }),
      },
    });

    const lambdaFunction = new lambda.Function(this, "WhatsAppFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "src/index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../dist")),
      memorySize: 128,
      timeout: cdk.Duration.seconds(3),
      environment: {
        TABLE_NAME: table.tableName,
      },
      role: role,
      ephemeralStorageSize: cdk.Size.mebibytes(512),
    });

    const functionUrl = new lambda.FunctionUrl(this, "WhatsAppFunctionUrl", {
      function: lambdaFunction,
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowCredentials: false,
        allowedHeaders: ["*"],
        allowedMethods: [
          HttpMethod.GET,
          HttpMethod.POST,
          HttpMethod.PUT,
          HttpMethod.DELETE,
        ],
        allowedOrigins: ["*"],
        exposedHeaders: ["Content-Length"],
        maxAge: cdk.Duration.seconds(0),
      },
    });

    new cdk.CfnOutput(this, "whatsappFunctionArn", {
      description: "ARN de la función Lambda whatsapp",
      value: lambdaFunction.functionArn,
    });

    new cdk.CfnOutput(this, "whatsappFunctionRoleArn", {
      description: "Role IAM creado para la función whatsapp",
      value: role.roleArn,
    });

    new cdk.CfnOutput(this, "whatsappFunctionUrl", {
      description: "URL para la función Lambda whatsapp",
      value: functionUrl.url,
    });

    new cdk.CfnOutput(this, "whatsappTableName", {
      description: "Nombre de la tabla DynamoDB",
      value: table.tableName,
    });
  }
}
