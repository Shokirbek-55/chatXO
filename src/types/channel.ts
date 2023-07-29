// import { IMessage } from 'react-native-gifted-chat';
import { MsgLocation } from "../types/auth";
import { User } from "./user";

export type Hashtag = {
  text: string;
  isActive: boolean;
};

export type MessageType =
  | "text"
  | "audio"
  | "video"
  | "image"
  | "document"
  | "RELEVANCE"
  | "NORMAL";

export type Message = IMessage & {
  hashtags?: string[];
  relevance?: number;
  minRelevance?: number;
  mediaUrl?: string;
  type: MessageType;
  userId?: string | number | undefined;
  channelSlug?: string
  pimps?: Pimp[];
  color?: string;
  username?: string;
  videoThumbnail?: string;
  mediaTitle?: string;
  isReply?: boolean;
  originMessage?: Message | null;
  originMessageId?: string;
  originMessageTimestamp?: Date | string;
  index?: number;
  topic?: string;
  pollType?: "NORMAL" | "RELEVANCE";
  options?: string[] | object[];
  pollId?: number;
  votes?: any[];
  votesCount?: number;
  votersCount?: number;
  messageParameters?: Array<any>;
  isShownHeader?: boolean;
  taggedUserId?: number;
  msgLocation?: MsgLocation;
  displayedRelevance?: number;
};

export type SendMessage = Omit<Message, "index">;

export interface IMessage {
  _id?: string | number;
  text?: string;
  createdAt?: Date | number;
  user?: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: any;
  message?: string;
}
export type RawMessage = {
  id: string;
  type: string;
  userId: number;
  message: string;
  timestamp: Date;
  username: string;
  mediaUrl: string;
  relevance?: number;
  channelSlug: string;
  hashtags: Array<string>;
  minRelevance?: number;
  pimps: Pimp[];
  color?: string;
  videoThumbnail?: string;
  mediaTitle?: string;
  isReply: boolean;
  originMessage?: RawMessage;
  originMessageId: string;
  originMessageTimestamp: Date;
  topic?: string;
  pollType?: "NORMAL" | "RELEVANCE";
  options?: string[];
  pollId?: number;
  votes?: any[];
  votesCount?: number;
  votersCount?: number;
  messageId: string;
  messageParameters?: Array<any>;
  taggedUserId: number;
  isShownHeader?: boolean;
  msgLocation?: MsgLocation;
};

export type InvitationCodes = {
  code?: string | null;
  expiresAt?: string;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Channel = {
  id: number;
  hashId: string;
  name: string;
  slug: string;
  color: string;
  avatar: string;
  adminId: number;
  active: boolean;
  isOwn: boolean;
  isPrivate: boolean;
  synced: boolean;
  createdAt: string;
  pageState: string;
  description: string;
  // messages: Message[];
  lastMessageTimestamp: string;
  canLoadMore: boolean;
  relevance: number;
  userRelevance: number;
  filtered: boolean;
  unreadMessage: number;
  // hashtags: Hashtag[];
  // activeHashtags: Hashtag[];
  isOpen: boolean;
  users: User[];
  inviteCode: string | null;
  groupNumber: string;
  groupPassword: string;
  invitationCodes: InvitationCodes[];
  qrCode: string;
  isBlocked: boolean;
};

export type SetUpdataChanelType = {
  name?: string;
  isPrivate?: boolean;
  color?: string;
}
export type generateInviteCodeType = {
  inviteCode: string,
  qrCode: string,
  hashId:string
}
export const generateInviteCodeInitialState = {
  inviteCode: "",
  qrCode: "",
  hashId:""
}

export const ChannelInitialState = {
  id: 0,
  hashId: "",
  name: "",
  slug: "",
  color: "",
  avatar: "",
  adminId: 0,
  active: false,
  isOwn: false,
  isPrivate: false,
  synced: false,
  createdAt: "",
  pageState: "",
  description: "",
  // messages: Message[],
  lastMessageTimestamp: "",
  canLoadMore: false,
  relevance: 0,
  userRelevance: 0,
  filtered: false,
  unreadMessage: 0,
  // hashtags: Hashtag[],
  // activeHashtags: Hashtag[],
  isOpen: false,
  users: [],
  inviteCode: "" || null,
  groupNumber: "",
  groupPassword: "",
  invitationCodes: [],
  qrCode: "",
  isBlocked: false,
};

export type ChannelsUsersType = {
  active: boolean,
  avatar: string,
  color: string,
  email: string
  id: number
  adminId: number 
  latitude: string
  longitude: string
  relevance: 0
  status: string
  username: string
}
export const ChannelsUsersInitial = {
  active: false,
  avatar: null,
  color: "#",
  email: "",
  id: 0,
  adminId: 0,
  latitude: null,
  longitude: null,
  relevance: 0,
  status: "",
  username: "",
}

export type PimpMessage = {
  userId?: number;
  channelSlug: string;
  messageId: string;
  timestamp?: Date | string;
  relevance?: number;
};

export type Pimp = {
  userId: number;
  relevance: number;
};

export type VoteOption = {
  pollOption: number;
  channelSlug: string;
  pollId: number;
  votesChange?: number;
};

export type SearchRequest = {
  searchMessage: string;
  channelSlug: string;
  pageState?: string;
};

export type TimestampHistoryRequest = {
  channelSlug: string;
  timestamp: any;
  findOlder?: boolean;
};

export type SearchResponse = {
  messages: Array<RawMessage>;
  count: number;
  isEnd: boolean;
};

export type TimestampHistoryResponse = {
  data: {
    channelSlug: string;
    timestamp: string;
  };
  messages: Array<RawMessage>;
  isEnd: boolean;
};

export type CreateChannelType = {
  name: string,
  description: string;
  color: string;
}