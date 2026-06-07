import z from "zod";

const ProfileResponseSchema = z.object({
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

const RevisionInfoSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  ctaText: z.string(),
  topText: z.string(),
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
  RevisionStatSchema,
};
