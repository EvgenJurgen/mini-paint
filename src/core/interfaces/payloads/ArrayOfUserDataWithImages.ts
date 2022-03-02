export interface UserDataWithImages {
  email: string;
  nickname: string;
  urls: string[];
}

export interface ArrayOfUserDataWithImages extends Array<UserDataWithImages> {}
