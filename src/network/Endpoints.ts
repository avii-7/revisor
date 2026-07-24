const AuthenticationEndpoint = {
  oauthGoogle: "/auth/google",
  refreshToken: "auth/refresh-token",
  session: "auth/session",
} as const;

const ProfileEndpoint = {
  profile: "profile",
} as const;

const RevisionEndpoint = {
  items: "revision-items/",
  dueItems: "revision-items/due/",
  previewItems: "revision-items/preview/",
} as const;

const DashboardEndpoint = {
  dashboard: "dashboard",
} as const;

const HeaderConstantKey = {
  contentType: "Content-Type",
} as const;

const HeaderConstantValue = {
  applicationJson: "application/json",
} as const;


export {
  DashboardEndpoint,
  AuthenticationEndpoint,
  ProfileEndpoint,
  RevisionEndpoint,
  HeaderConstantKey,
  HeaderConstantValue,
};
