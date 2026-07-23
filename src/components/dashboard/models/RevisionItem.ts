import z from 'zod';

const NextRevisionSchema = z.object({
  easy: z.string(),
  good: z.string(),
  hard: z.string(),
  again: z.string()
});

const RevisionItemSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string().optional(),
  platformUrl: z.string().nullish(),
  keyIntuition: z.string().nullish(),
  solutionCode: z.string().nullish(),
  nextRevision: NextRevisionSchema.nullish(),
  due: z.string(),
  lastReview: z.string().nullish(),
  category: z.string().nullish(),
  level: z.string().nullish(),
  revisionCount: z.coerce.number().optional(),
  createdAt: z.string().nullish(),
  tags: z.array(z.string()).optional(),
});

const RevisionItemsPageSchema = z.object({
  items: z.array(RevisionItemSchema),
  page: z.coerce.number(),
  pageSize: z.coerce.number(),
  totalItems: z.coerce.number(),
  totalPages: z.coerce.number(),
  categories: z.array(z.string()).default([]),
  levels: z.array(z.string()).default([]),
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

export { RevisionItemSchema, RevisionItemsPageSchema, type NextRevisionSchema, type CreateRevisionItemSchema };
export type RevisionItemType = z.infer<typeof RevisionItemSchema>;
export type RevisionItemsPageType = z.infer<typeof RevisionItemsPageSchema>;
export type NextRevisionType = z.infer<typeof NextRevisionSchema>;
export type CreateRevisionItemType = z.infer<typeof CreateRevisionItemSchema>;
