import { message } from "antd";
import _ from "lodash";
import { makeAutoObservable, runInAction } from "mobx";
import APIs from "../../api/api";
import { RawMessage } from "../../types/channel";
import { Operation } from "../../utils/Operation";
import { AppRootStore } from "../store";

export default class HashtagStore {
  app: AppRootStore;

  constructor(app: AppRootStore) {
    makeAutoObservable(this);
    this.app = app;
  }

  hashTags: string[] = [];
  allChatHashTags: string[] = [];
  isLoading: boolean = false;
  hashId: string = "";

  getChannelAllHashTagsOperation = new Operation<string[]>([]);

  allHashTagsMessages: {
    messages: RawMessage[];
    pageState: string | null;
    end?: boolean;
  } = {
    messages: [],
    pageState: null,
    end: false,
  };

  isOpenHashTagScreen: boolean = false;

  setHashId = (hashId: string) => {
    this.hashId = hashId;
  };

  setIsOpenHashTagScreen = (isOpen: boolean) => {
    this.isOpenHashTagScreen = isOpen;
  };

  getHistoryHashTagsMessages = () => {
    this.app.chatStore.history({
      slug: this.app.messageStore.slug,
      hashtags: this.hashTags,
    });
  };

  enter = () => {
    this.setIsOpenHashTagScreen(true);
    this.getHistoryHashTagsMessages();
  };

  exit = () => {
    this.setIsOpenHashTagScreen(false);
    this.allHashTagsMessages = {
      messages: [],
      pageState: null,
      end: false,
    };
    this.clearHashTags();
  };

  setAllHashTagsMessages = (data: {
    messages: RawMessage[];
    pageState: string;
    end: boolean;
  }) => {
    if (!!this.allHashTagsMessages.messages) {
      if (
        data.pageState !== null &&
        this.allHashTagsMessages.pageState === data.pageState
      ) {
        return;
      } else {
        this.allHashTagsMessages.messages = [
          ...(this.allHashTagsMessages.messages.filter(
            (item) => item.id === data.messages[0].id,
          ).length === 1
            ? []
            : data.messages),
          ...this.allHashTagsMessages.messages,
        ];
        this.allHashTagsMessages.pageState = data.pageState;
        this.allHashTagsMessages.end = data.end;
      }
    } else {
      runInAction(() => {
        this.allHashTagsMessages = data;
      });
    }
  };

  addMessageHashTags = (message: RawMessage) => {
    if (this.allHashTagsMessages.messages.length === 0) {
      this.allHashTagsMessages.messages.push(message);
    } else {
      if (_.last(this.allHashTagsMessages.messages)?.id === message.id) {
        runInAction(() => {
          this.allHashTagsMessages.messages.pop();
          this.allHashTagsMessages.messages.push(message);
        });
      } else {
        this.allHashTagsMessages.messages.push(message);
      }
    }
  };

  getHistoryHashTagsMessagesPageState = (setIsFetching, stop) => {
    if (this.allHashTagsMessages.end === false) {
      this.app.chatStore.history({
        slug: this.app.messageStore.slug,
        pageState: this.allHashTagsMessages.pageState,
      });
      setIsFetching(false);
    } else {
      setIsFetching(false);
      stop.current = true;
    }
  };

  getChannelAllHashTags = async () => {
    runInAction(() => {
      this.isLoading = true;
    });
    await this.getChannelAllHashTagsOperation.run(() =>
      APIs.channels.getChannelAllHashtags(this.hashId),
    );

    if (this.getChannelAllHashTagsOperation.isSuccess) {
      if (this.getChannelAllHashTagsOperation.data.length === 0) {
        message.warning("No hashtags found");
      }
      runInAction(() => {
        this.allChatHashTags = this.getChannelAllHashTagsOperation.data;
      });
    }
    runInAction(() => {
      this.isLoading = false;
    });
  };

  setHashTags = (hashTag: string) => {
    if (this.hashTags.includes(hashTag)) {
      return;
    } else {
      runInAction(() => {
        this.hashTags.push(hashTag);
      });
    }
  };

  removeHashTags = (hashTag: string) => {
    const index = this.hashTags.indexOf(hashTag);
    runInAction(() => {
      this.hashTags.splice(index, 1);
    });
  };

  clearHashTags = () => {
    this.hashTags = [];
  };
}
