import z from 'zod';
import { DifficultyValues, type Difficulty } from '../TagsMenu/Difficulty';

interface BaseRevisionItem {
  title: string;
  content: string
  revisionCount: number;
  difficulty: Difficulty;
};

interface RevisionItem extends BaseRevisionItem {
  id: string;
}

interface NewRevisionItem extends BaseRevisionItem { }

const RevisionItemSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  subtitle: z.string(),
  streak: z.number(),
  content: z.string(),
  revisionCount: z.number(),
  difficulty: z.enum(DifficultyValues)
});

export { type RevisionItem, type NewRevisionItem, RevisionItemSchema };
export type RevisionItemType = z.infer<typeof RevisionItemSchema>;