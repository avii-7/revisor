import z from "zod";

const ProfileResponseSchema = z.object({
  userId: z.uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  profilePicture: z.string(),
});

const RevisionStatSchema = z.object({
  id: z.string(),
  title: z.string(),
  value: z.string(),
});

const RevisionItemPreviewSchema = z.object({
  id: z.uuid(),
  title: z.string()
});

const RevisionInfoSchema = z.object({
  state: z.enum(["ready", "completed", "empty"]),
  title: z.string(),
  subtitle: z.string().nullable().default(null),
  ctaText: z.string().nullable().default(null),
  dueItemCount: z.number(),
  nextItem: RevisionItemPreviewSchema.nullish(),
  nextRevisionAt: z.string().nullish(),
});

const DashboardResponse = z.object({
  profile: ProfileResponseSchema,
  revisionInfo: RevisionInfoSchema,
  revisionStats: z.array(RevisionStatSchema)
});

export {
  DashboardResponse,
  ProfileResponseSchema,
  RevisionInfoSchema,
  RevisionStatSchema
};

export type DashboardResponseType = z.infer<typeof DashboardResponse>;
