export interface IEnvironmentVars {
  firebase: {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}
