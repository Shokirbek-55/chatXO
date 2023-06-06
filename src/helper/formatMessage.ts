import { RawMessage, Message } from "../types/channel";
// import formatPimps from '@utils/formatPimps';

const formatMessage = (message: RawMessage): Message => {
  return {
    _id: message.id,
    type: message.type as any, // not sure what types we are having
    text: message.message,
    hashtags: message.hashtags,
    mediaUrl: message.mediaUrl,
    relevance: message.relevance,
    createdAt: message.timestamp,
    user: {
      // @ts-ignore
      _id: message.userId,
    },
    username: message.username,
    // pimps: formatPimps(message.pimps),
    minRelevance:
      message.minRelevance === -1 ? undefined : message.minRelevance,
    color: message.color,
    videoThumbnail: message.videoThumbnail,
    mediaTitle: message.mediaTitle,
    isReply: message.isReply,
    originMessage: message.originMessage
      ? formatMessage(message.originMessage)
      : null,
    originMessageId: message.originMessageId,
    originMessageTimestamp: message.originMessageTimestamp,
    pollId: message.pollId,
    votes: message?.votes,
    messageParameters: message?.messageParameters,
    taggedUserId: message.taggedUserId,
    isShownHeader: message?.isShownHeader,
  };
};

export default formatMessage;
