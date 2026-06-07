import { DatabaseManager } from "../DatabaseManager";
import type { RevisionItem } from "../../Components/Dashboard/Models/RevisionItem";

export class RevisionItemDB extends DatabaseManager {
  private objectStore = "RevisionItems";

  getAnItemToRevise() {
    return new Promise<RevisionItem>((resolve, reject) => {
      this.openConnection().then((db: IDBDatabase) => {
        const transaction = db.transaction(this.objectStore, "readonly");
        const store = transaction.objectStore(this.objectStore);

        const index = store.index("revision_item");
        
        const cursorOpenRequest = index.openCursor(null, "next");

        cursorOpenRequest.onsuccess = () => {
          const result = cursorOpenRequest.result;
          if (result) {
            resolve(result.value);
          } else {
            reject(null);
          }
        };
        
        cursorOpenRequest.onerror = () => {
          reject(cursorOpenRequest.error);
        };
      });
    });
  }
}
