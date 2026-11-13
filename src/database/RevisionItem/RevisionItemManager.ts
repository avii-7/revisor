import { type RevisionItemType } from "../../components/dashboard/models/RevisionItem.ts";
import { RevisionItemDB } from "./RevisionItemDB.ts";

export class RevisionItemsManager {

  private genericDB = new RevisionItemDB();

  private objectStore = "RevisionItems";

  async insert(item: RevisionItemType) {
    return await this.genericDB.insert<RevisionItemType>(this.objectStore, item);
  }

  async getAll() {
    console.log("Getting All the Items");
    return await this.genericDB.getAll<RevisionItemType>(this.objectStore);
  }

  async get(id: string) {
    console.log("Getting item by Id: ", id);
    return await this.genericDB.get(this.objectStore, id);
  }

  async update(item: RevisionItemType) {
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
