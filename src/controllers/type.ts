/**
 * Auth Type
 */
export type AuthPayload = {
  idToken: string;
  user: {
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    name: string;
    photo: string;
    googleToken: string;
  };
};
