import z from "zod";
import ProfileResponse from "../../Profile/Models/Profile";

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
  profile: ProfileResponse,
  revisionInfo: RevisionInfoSchema.nullish(),
  revisionStats: z.array(RevisionStatSchema),
});

export { DashboardResponse, RevisionInfoSchema, RevisionStatSchema };