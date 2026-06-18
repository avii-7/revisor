import z from 'zod';
import { DifficultyValues, type Difficulty } from '../tagsMenu/Difficulty.ts';

interface BaseRevisionItem {
  id: string;
  title: string;
  revisionCount: number;
  difficulty: Difficulty;
};

interface RevisionItem extends BaseRevisionItem { }

interface NewRevisionItem {
  title: string;
  platformUrl?: string;
  difficulty: Difficulty;
  keyIntuition?: string;
  solutionCode?: string;
}

const RevisionItemSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  subtitle: z.string(),
  streak: z.number(),
  content: z.string().nullish(),
  revisionCount: z.number(),
  difficulty: z.enum(DifficultyValues)
});

export { type RevisionItem, type NewRevisionItem, RevisionItemSchema };
export type RevisionItemType = z.infer<typeof RevisionItemSchema>;