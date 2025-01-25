import { RevisionItem } from "./RevisionItem";
import { RevisionItemDB } from "./RevisionItemDB";

export class RevisionItemsManager {

  private genericDB = new RevisionItemDB();

  private objectStore = "RevisionItems";
  
  async insert(item: RevisionItem) {
    return await this.genericDB.insert<RevisionItem>(this.objectStore, item);
  }

  async getAll() {
    console.log("Getting All the Items");
    return await this.genericDB.getAll<RevisionItem>(this.objectStore);
  }

  async get(id: string) {
    console.log("Getting item by Id: ", id);
    return await this.genericDB.get(this.objectStore, id);
  }

  async update(item: RevisionItem) {
    const result = await this.genericDB.update(this.objectStore, item);
    return result;
  }
  
  async delete(id: string) {
    return await this.genericDB.delete(this.objectStore, id);
  }

  async getAnItemToRevise() {
    return await this.genericDB.getAnItemToRevise();
  }
}