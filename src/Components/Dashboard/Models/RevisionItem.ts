import z from 'zod';
import { type Difficulty as DifficultyValue } from '../TagsMenu/Difficulty';

interface BaseRevisionItem {
  title: string;
  content: string
  revisionCount: number;
  difficulty: DifficultyValue;
};

interface RevisionItem extends BaseRevisionItem {
  id: string;
}

interface NewRevisionItem extends BaseRevisionItem { }

const RevisionItemSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  revision_count: z.number(),
  difficulty: z.nativeEnum(Difficulty)
});


export { type RevisionItem, type NewRevisionItem, RevisionItemSchema };
