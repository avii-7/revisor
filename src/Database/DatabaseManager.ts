export class DatabaseManager {
  private dbName = "RevisorDB";

  private dbVersion = 1;

  constructor() {
    this.openConnection();
  }

  openConnection() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      let openRequest = indexedDB.open(this.dbName, 1);

      openRequest.onupgradeneeded = () => {
        let db = openRequest.result;

        if (!db.objectStoreNames.contains("RevisionItems")) {
          let store = db.createObjectStore("RevisionItems", { keyPath: "id" });
          store.createIndex("revision_item", ["count", "dateAdded"], { unique: false });          
        }
      };

      openRequest.onerror = () => {
        reject(openRequest.error);
      };

      openRequest.onsuccess = () => {
        resolve(openRequest.result);
      };

      return openRequest;
    });
  }

  insert<T>(storeName: string, data: T) {
    return new Promise<boolean>((resolve, reject) => {
      this.openConnection().then((db: IDBDatabase) => {
        let transaction = db.transaction(storeName, "readwrite");
        let store = transaction.objectStore(storeName);

        let request = store.add(data);

        request.onsuccess = () => {
          resolve(true);
          db.close();
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    });
  }

  getAll<T>(storeName: string) {
    return new Promise<T[]>((resolve, reject) => {
      this.openConnection().then((db: IDBDatabase) => {
        let transaction = db.transaction(storeName, "readonly");
        let store = transaction.objectStore(storeName);

        let request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result);
          db.close();
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    });
  }

  get<T>(storeName: string, key: string) {
    return new Promise<T>((resolve, reject) => {
      this.openConnection().then((db: IDBDatabase) => {
        let transaction = db.transaction(storeName, "readonly");
        let store = transaction.objectStore(storeName);

        let request = store.get(key);

        request.onsuccess = () => {
          resolve(request.result);
          db.close();
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    });
  }

  delete(storeName: string, key: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.openConnection().then((db: IDBDatabase) => {
        let transaction = db.transaction(storeName, "readwrite");
        let store = transaction.objectStore(storeName);

        let request = store.delete(key);

        request.onsuccess = () => {
          resolve(true);
          db.close();
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    });
  }

  update<T>(storeName: string, value: T) {
    return new Promise<boolean>((resolve, reject) => {
      this.openConnection().then((db: IDBDatabase) => {
        let transaction = db.transaction(storeName, "readwrite");
        let store = transaction.objectStore(storeName);

        let request = store.put(value);

        request.onsuccess = () => {
          resolve(true);
          db.close();
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    });
  }
}
