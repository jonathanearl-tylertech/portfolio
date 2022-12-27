import { IAuthor } from "./author";
import { IComment } from "./comments";

export interface IProject {
  id: number;
  name: string;
  createdAt: string;
  tags: string[];
  media: string;
  author: IAuthor;
  content: string;
  comments: IComment[];
}
