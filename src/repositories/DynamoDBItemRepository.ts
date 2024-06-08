import { IItemRepository } from "../interfaces/IItemRepository";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export class DynamoDBItemRepository implements IItemRepository {
  private client: DynamoDBClient;
  private tableName: string;

  constructor(tableName: string, region: string = "us-east-1") {
    this.client = new DynamoDBClient({ region });
    this.tableName = tableName;
  }

  public async saveItem(item: Record<string, any>): Promise<void> {
    try {
      const command = new PutItemCommand({
        TableName: this.tableName,
        Item: item,
      });
      await this.client.send(command);
    } catch (error) {
      throw new Error(
        "Error saving item: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  }
}
