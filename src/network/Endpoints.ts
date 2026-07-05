const AuthenticationEndpoint = {
  oauthGoogle: "/auth/google",
} as const;

const ProfileEndpoint = {
  profile: "profile",
} as const;

const RevisionEndpoint = {
  revisionItems: "revision-items",
  dueRevisionItems: "revision-items/due",
} as const;

const DashboardEndpoint = {
  dashboard: "dashboard",
} as const;

export { DashboardEndpoint, AuthenticationEndpoint, ProfileEndpoint, RevisionEndpoint };
