export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export enum EToken {
  ACCESS_TOKEN,
  REFRESH_TOKEN
}

export type TokenPayload = {
  id: number;
};
