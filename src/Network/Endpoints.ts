const AuthenticationEndpoint = {
  oauthGoogle: "/auth/google",
} as const;

const ProfileEndpoint = {
  profile: "profile",
} as const;

const RevisionItemEndpoint = {
  // Get All & Create
  revisionItems: "revise-items",
} as const;

const DashboardEndpoint = {
  dashboard: "dashboard",
} as const;

export { DashboardEndpoint, AuthenticationEndpoint, ProfileEndpoint, RevisionItemEndpoint };
