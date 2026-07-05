import z, { string } from 'zod';

const NextRevisionSchema = z.object({
  easy: z.string(),
  good: z.string(),
  hard: z.string(),
  again: z.string()
});

const RevisionItemSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string().nullish(),
  platformUrl: z.string().nullish(),
  keyIntuition: z.string().nullish(),
  solutionCode: z.string().nullish(),
  nextRevision: NextRevisionSchema.nullish(),
  due: z.string(),
  lastReview: z.string().nullish()
});

const CreateRevisionItemSchema = z.object({
  title: z.string(),
  content: z.string().nullable(),
  platformUrl: z.string().nullable(),
  keyIntuition: z.string().nullable(),
  solutionCode: z.string().nullable()
});

const RatingSchema = ["easy", "good", "hard", "again"] as const;

export interface ReviewRequest {
  itemID: string
  rating: typeof RatingSchema[number];
}

export { RevisionItemSchema, type NextRevisionSchema, type CreateRevisionItemSchema };
export type RevisionItemType = z.infer<typeof RevisionItemSchema>;
export type NextRevisionType = z.infer<typeof NextRevisionSchema>;
export type CreateRevisionItemType = z.infer<typeof CreateRevisionItemSchema>;