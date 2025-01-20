import { v4 as uuidv4 } from "uuid";

export class RevisionItem {
  id: string = uuidv4();
  name: String;
  count: number;

  constructor(name: String, count: number = 0) {
    this.name = name;
    this.count = count;
  }
}