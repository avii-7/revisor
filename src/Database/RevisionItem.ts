import { v4 as uuidv4 } from "uuid";

export class RevisionItem {
  id: string = uuidv4();
  name: String;
  dateAdded: Date;
  count: number;

  constructor(name: String, dateAdded: Date, count: number = 0) {
    this.name = name;
    this.dateAdded = dateAdded;
    this.count = count;
  }
}