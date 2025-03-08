import { v4 as uuidv4 } from "uuid";
import Tag from "../../components/TagsMenu/Tag";

export class RevisionItem {
  id: string = uuidv4();
  name: string;
  dateAdded: Date;
  count: number;
  tag: Tag;

  constructor(name: string, dateAdded: Date, count: number = 0, tag: Tag = Tag.default) {
    this.name = name;
    this.dateAdded = dateAdded;
    this.count = count;
    this.tag = tag;
  }
}