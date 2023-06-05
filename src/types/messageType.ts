import { VoteOption } from "./channel";
import { User } from "./user";

export const RELEVANCE_TYPE = "RELEVANCE";
export const NORMAL_TYPE = "NORMAL";

export interface MessageType {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
    avatar: string;
  };
}

export type Match = {
  index: number;
  searchWord: string;
};

export type MatchProps = {
  text: string;
  data: User[];
  matches: Matches;
  matchesFriends: User[];
};

export type MatchPropsBlocked = {
  text: string;
  data: User[];
  matches: Matches;
  matchesBlockedUsers: User[];
};

export type Matches = {
  [key: number]: Match;
};

export type PollOptionsType = {
  id: number;
  name: String;
  voted: boolean;
};

export type pollMessage = {
  adminId: number;
  channelSlug: string;
  id: number;
  options: PollOptionsType[];
  topic: string;
  type: string;
  updateAt: string;
  votersCount: number;
  votesCount: number;
};
