import React, { FC, useEffect, useState } from "react";
//@ts-ignore
import { useLinkPreview } from "get-link-preview";
import styles from "./index.module.css";
import MessageHeader from "../MessageHeader";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import { relevanceFuniction } from "../../../utils/boxShadov";
import { TMP_URL } from "../../../env";
import Text from "../../Text/Text";
import SmallAvatar from "../../SmallAvatar/smallAvatar";

interface Props {
  message: RawMessage;
  position?: boolean;
  users?: {
    [key: string]: ChannelsUsersType
  }
  messageText: string;
}

const LinkPriview = ({ message, position, users, messageText }: Props) => {
  const [dataLinkUrl, setDateLinkUrl] = useState<linkPreviewType>();
  const messageUrl = message.message.split(" ")[0];
  const { getLinkPreviewData, loading, error, data } =
    useLinkPreview(messageUrl);
  const POSITION_CONTENT = position
    ? { justifyContent: "flex-start" }
    : { justifyContent: "flex-end" };

  const currentUser: User | null =
    users?.[message.userId] || null;

  const MESSAGE_STYLE = relevanceFuniction(message);
  const boxShadov = MESSAGE_STYLE?.boxShadow;
  const textSize = MESSAGE_STYLE?.fontSize;
  const textWeight = MESSAGE_STYLE?.fontWeight;
  const textLineHeight = MESSAGE_STYLE?.lineHeight;
  interface linkPreviewType {
    success: boolean;
    ogUrl: "string";
    title: "string";
    description: "string";
    image: "string";
    sitename: "string";
    domain: "string";
    favicon: "string";
  }
  const getUrlLink = async () => {
    try {
      if (data.success) {
        setDateLinkUrl(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUrlLink();
  }, [data]);

  return (
    <>
      <div className={styles.parentContainer} style={POSITION_CONTENT}>
        <div className={styles.childContainer}>
          {position && (
            <MessageHeader
              name={message.username}
              relevance={message?.relevance}
              color={currentUser?.color}
            />
          )}
          <div className={styles.messageCard}>
            {position && (
              <div className={styles.avatarCard}>
                {currentUser && (
                  <SmallAvatar
                    color={currentUser?.color}
                    imageUrl={
                      currentUser.avatar
                        ? `${TMP_URL}/${currentUser.avatar}`
                        : ""
                    }
                  />
                )}
              </div>
            )}
            <DropDownMenu massage={message} users={users}>
              {!!dataLinkUrl ? (
                <div
                  className={styles.textCard}
                  style={{ boxShadow: boxShadov }}
                >
                  <a href={message.message}>{messageUrl}</a>

                  <div className={styles.linkPreviewInfo}>
                    <div className={styles.linkPreviewText}>
                      <span className={styles.linkTitle}>
                        {dataLinkUrl.title}
                      </span>
                      <span className={styles.linkDescription}>
                        {dataLinkUrl.description}
                      </span>
                    </div>
                    <div className={styles.linkImg}>
                      <img
                        src={dataLinkUrl.image}
                        alt=""
                        width={100}
                        height={100}
                        style={{ borderRadius: "10px" }}
                      />
                    </div>
                  </div>
                  <p>{messageText}</p>
                </div>
              ) : (
                <div
                  className={styles.textCard}
                  style={{ boxShadow: boxShadov }}
                >
                  <Text
                    text={message.message}
                    style={{
                      fontSize: textSize,
                      fontWeight: textWeight,
                      lineHeight: textLineHeight,
                    }}
                  />
                </div>
              )}
            </DropDownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkPriview;
