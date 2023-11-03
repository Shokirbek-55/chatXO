import { FC } from "react";

import MessageHeader from "../MessageHeader";

import styles from "./index.module.css";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import { relevanceFuniction } from "../../../utils/boxShadov";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import { TMP_URL } from "../../../env";
import Text from "../../Text/Text";
import _ from "lodash";

interface Props {
    message: RawMessage;
    users?: {
        [key: string]: ChannelsUsersType;
    };
    position: boolean;
}

const MessageCard: FC<Props> = ({ message, position, users }) => {
    const POSITION_CONTENT = position
        ? { justifyContent: "flex-start" }
        : { justifyContent: "flex-end" };

    const currentUser: ChannelsUsersType | undefined = users?.[message.userId];

    const MESSAGE_STYLE = relevanceFuniction(message);
    const boxShadov = MESSAGE_STYLE?.boxShadow;
    const textSize = MESSAGE_STYLE?.fontSize;
    const textWeight = MESSAGE_STYLE?.fontWeight;
    const textLineHeight = MESSAGE_STYLE?.lineHeight;

    const handleRelevenceModal = () => {};

    return (
        <>
            <div className={styles.parentContainer} style={POSITION_CONTENT}>
                <div className={styles.childContainer}>
                    {position && (
                        <span onClick={() => handleRelevenceModal()}>
                            <MessageHeader
                                name={message.username}
                                relevance={message?.relevance}
                                color={currentUser?.color}
                                message={message}
                            />
                        </span>
                    )}
                    <div className={styles.messageCard}>
                        {position && (
                            <div className={styles.avatarCard}>
                                {currentUser && (
                                    <SmallAvatar
                                        color={currentUser?.color}
                                        imageUrl={
                                            currentUser?.avatar
                                                ? `${TMP_URL}/${currentUser?.avatar}`
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
                                    children={message.message}
                                    style={{
                                        fontSize: textSize,
                                        fontWeight: textWeight,
                                        lineHeight: textLineHeight,
                                    }}
                                />
                            </div>
                        </DropDownMenu>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessageCard;
