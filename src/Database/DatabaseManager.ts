export class DatabaseManager {
  private dbName = "RevisorDB";

  constructor() {
    this.openConnection();
  }

  openConnection() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const openRequest = indexedDB.open(this.dbName, 1);

      openRequest.onupgradeneeded = () => {
        const db = openRequest.result;

        if (!db.objectStoreNames.contains("RevisionItems")) {
          const store = db.createObjectStore("RevisionItems", { keyPath: "id" });
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
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        const request = store.add(data);

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
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);

        const request = store.getAll();

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
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);

        const request = store.get(key);

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
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        const request = store.delete(key);

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
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        const request = store.put(value);

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
