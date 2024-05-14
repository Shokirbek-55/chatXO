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
  name: string;
  voted: boolean;
};

export const PollOptionsInitial = {
  id: 1,
  name: "",
  voted: false,
};

export type pollMessage = {
  channelSlug: string;
  id: number;
  options: PollOptionsType[];
  messageId: string;
  topic: string;
  type: string;
  updateAt?: string;
  votersCount: number;
  votesCount: number;
  pollType: string;
  voted?: string;
};

export const pollMessageInitial: pollMessage = {
  channelSlug: "",
  id: 0,
  options: [PollOptionsInitial],
  topic: "",
  messageId: "",
  type: NORMAL_TYPE,
  pollType: NORMAL_TYPE,
  updateAt: "",
  votersCount: 0,
  votesCount: 0,
  voted: "",
};
