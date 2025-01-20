import { DatabaseManager } from "./DatabaseManager";
import { RevisionItem } from "./RevisionItem";

export class RevisionItemsManager {
  private db: DatabaseManager;

  private objectStore = "RevisionItems";

  constructor() {
    this.db = new DatabaseManager();
  }

  insert(item: RevisionItem) {
    console.log("Inserting Item", item);
    return this.db.insert<RevisionItem>(this.objectStore, item);
  }

  getAll() {
    console.log("Getting All the Items");
    return this.db.getAll<RevisionItem>(this.objectStore);
  }

  get(id: string) {
    console.log("Getting item by Id: ", id);
    return this.db.get(this.objectStore, id);
  }

  update(item: RevisionItem) {
    console.log("Updating item: ", item);
    const result = this.db.update(this.objectStore, item);
    console.log(result);
    return result;
  }
  
  delete(id: string) {
    console.log("Deleting item: ", id);
    return this.db.delete(this.objectStore, id);
  }
}