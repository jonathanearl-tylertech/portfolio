export interface IAuthor {
  id: number;
  name: string;
  media: {
    profileImageUrl: string;
  }
  verified: boolean;
}
