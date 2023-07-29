import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import MessageHeader from "../MessageHeader";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import { relevanceFuniction } from "../../../utils/boxShadov";
import { TMP_URL } from "../../../env";
import Text from "../../Text/Text";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import { styled } from "styled-components";

interface Props {
  message: RawMessage;
  position?: boolean;
  users?: {
    [key: string]: ChannelsUsersType
  }
}

const LinkPriviewComponent = ({ message, position, users }: Props) => {

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


  const renderMessage = () => {
    const regex = /(http:\/\/|https:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)*([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}(\S*)/g;
    const links = message.message.match(regex)

    if (!links || links.length === 0) 
      return <Paragraph>{message.message}</Paragraph>

    function urlify(text:string) {
      const replacedText = text.replace(regex, (match) => {
        const isLink = /^(http:\/\/|https:\/\/)/i.test(match);
        const href = isLink ? match : `http://${match}`; 
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${match}</a>`;
      });
      return replacedText;
    }
    
    const text = urlify(message.message);
    return <>
      <Paragraph dangerouslySetInnerHTML={{ __html: text }} />
    </>
  };

  return (
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
                <div
                  className={styles.textCard}
                  style={{ boxShadow: boxShadov }}
                >
                  <Text
                    style={{
                      fontSize: textSize,
                      fontWeight: textWeight,
                      lineHeight: textLineHeight,
                    }}
                  >
                  {renderMessage()}
                </Text>
                </div>
            </DropDownMenu>
          </div>
        </div>
      </div>
  );
};

export default LinkPriviewComponent;


const Paragraph = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
`

