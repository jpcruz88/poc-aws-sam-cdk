export interface IItemRepository {
  saveItem(item: Record<string, any>): Promise<void>;
}
