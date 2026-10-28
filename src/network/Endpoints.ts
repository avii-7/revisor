const AuthenticationEndpoint = {
  oauthGoogle: "/auth/google",
  refreshToken: "auth/refresh-token",
  session: "auth/session",
  logout: "auth/logout",
} as const;

const ProfileEndpoint = {
  profile: "profile",
} as const;

const revisionItemsPath = "revision-items/";

const RevisionEndpoint = {
  items: revisionItemsPath,
  item: (itemId: string) => `${revisionItemsPath}${itemId}`,
  review: (itemId: string) => `${revisionItemsPath}${itemId}/review/`,
  dueItems: "revision-items/due/",
  previewItems: "revision-items/preview/",
} as const;

const DashboardEndpoint = {
  dashboard: "dashboard/",
} as const;

const HeaderConstantKey = {
  contentType: "content-type",
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
