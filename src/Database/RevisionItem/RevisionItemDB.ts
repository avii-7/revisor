import { DatabaseManager } from "../DatabaseManager";
import { RevisionItem } from "./RevisionItem";

export class RevisionItemDB extends DatabaseManager {
  private objectStore = "RevisionItems";

  getAnItemToRevise() {
    return new Promise<RevisionItem>((resolve, reject) => {
      this.openConnection().then((db: IDBDatabase) => {
        let transaction = db.transaction(this.objectStore, "readonly");
        let store = transaction.objectStore(this.objectStore);

        let index = store.index("revision_item");
        
        let cursorOpenRequest = index.openCursor(null, "next");

        cursorOpenRequest.onsuccess = (event) => {
          let result = cursorOpenRequest.result;
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
