export type ChannelRelevance = {
  fromUserId: number;
  toUserId: number;
  channelSlug: string;
  relevance: number;
};

export type UserRelevance = Omit<ChannelRelevance, "channelSlug">;

export type RlTypeKeys = "country" | "city" | "district" | "place";

export type RlType = Partial<Record<RlTypeKeys, boolean>>;
