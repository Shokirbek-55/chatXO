export type RegisterData = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

export type SocialFacebook = {
  userName: string;
  oAuth2token?: string;
  email: string;
  isRegister?: boolean;
};

export type SocialData = {
  token: string;
  appleId?: string;
  nonce?: string;
  type: string;
};

export type CheckOAuthData = {
  userName: string;
  email?: string;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
};

export type MsgLocation = {
  latitude: string;
  longitude: string;
};
