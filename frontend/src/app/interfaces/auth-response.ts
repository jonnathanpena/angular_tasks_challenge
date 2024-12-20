export interface IAuthBadResponse {
  status?: boolean;
  response?: string;
}

export interface IAuthSuccessResponse {
  jwt?: string;
}

export interface IAuthResponse extends IAuthBadResponse, IAuthSuccessResponse {
  status?: boolean;
  response?: string;
  jwt?: string;
}
