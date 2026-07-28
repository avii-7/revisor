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

const RevisionStateShema = ["ready", "completed"] as const;

const RevisionItemPreviewSchema = z.object({
  id: z.uuid(),
  title: z.string()
});

const RevisionInfoSchema = z.object({
  state: z.enum(RevisionStateShema),
  dueItemCount: z.number(),
  nextItem: RevisionItemPreviewSchema.nullish(),
  nextRevisionAt: z.string().nullish(),
});

const DashboardResponse = z.object({
  profile: ProfileResponseSchema,
  revisionInfo: RevisionInfoSchema.nullish(),
  revisionStats: z.array(RevisionStatSchema)
});

export {
  DashboardResponse,
  ProfileResponseSchema,
  RevisionInfoSchema,
  RevisionStateShema as RevisionState,
  RevisionStatSchema
};

export type RevisionStateShema = typeof RevisionStateShema[number];
export type DashboardResponseType = z.infer<typeof DashboardResponse>;