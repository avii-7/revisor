import z from 'zod';

const NextRevisionSchema = z.object({
  easy: z.string(),
  good: z.string(),
  hard: z.string(),
  again: z.string()
});

export const TagSchema = z.object({
  id: z.uuid(),
  name: z.string()
})

export const PreviewRevisionItemSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  subtitle: z.string().nullish(),
  lastReview: z.string().nullish(),
  revisionCount: z.number(),
  tags: z.array(TagSchema).nullish(),
});

export const RevisionItemSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string().optional(),
  platformUrl: z.string().nullish(),
  keyIntuition: z.string().nullish(),
  solutionCode: z.string().nullish(),
  nextRevision: NextRevisionSchema.nullish(),
  due: z.string(),
  lastReview: z.string().nullish(),
  revisionCount: z.number(),
  tags: z.array(TagSchema).nullish(),
});

export const PageMetadataSchema = z.object({
  page: z.number(),
  per: z.number(),
  total: z.number(),
  pageCount: z.number(),
});

export const PaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    metadata: PageMetadataSchema,
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

export type RevisionItemType = z.infer<typeof RevisionItemSchema>;
export const PaginatedRevisionItemSchema = PaginatedSchema(PreviewRevisionItemSchema);
export type PaginatedRevisionItemType = z.infer<typeof PaginatedRevisionItemSchema>;
export type PreviewRevisionItemType = z.infer<typeof PreviewRevisionItemSchema>;
export type NextRevisionType = z.infer<typeof NextRevisionSchema>;
export type CreateRevisionItemType = z.infer<typeof CreateRevisionItemSchema>;
