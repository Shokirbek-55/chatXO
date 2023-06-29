import { FC, useCallback, useEffect, useMemo, useState } from "react";

import MessageHeader from "../MessageHeader";

import styles from "./index.module.css";
import DropDownMenu from "../DropDownMenu/dropdownmenu";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import { User } from "../../../types/user";
import { RELEVANCE_TYPE, pollMessage } from "../../../types/messageType";
import { relevanceFuniction } from "../../../utils/boxShadov";
import RadioButton from "../../RadioButton/radioButton";
import Text from "../../Text/Text";
import Colors from "../../../utils/colors";
import SmallAvatar from "../../SmallAvatar/smallAvatar";
import { TMP_URL } from "../../../env";

interface Props {
  message: RawMessage;
  users?: {
    [key: string]: ChannelsUsersType;
  }
  position: boolean;
}

const PollMessageCard: FC<Props> = ({ message, position, users }) => {
  const [selectedOption, selectOption] = useState(null);

  const POLL_ID = message.pollId || 0;
  const IS_REPLY = message.isReply;
  const [messsageDetails, setMessageDetails] = useState<pollMessage>();
  const channelSlug = message.channelSlug;
  const messagePollId = message.pollId || 0;

  const MESSAGE_STYLE = relevanceFuniction(message);
  const boxShadov = MESSAGE_STYLE?.boxShadow;
  const textSize = MESSAGE_STYLE?.fontSize;
  const textWeight = MESSAGE_STYLE?.fontWeight;
  const textLineHeight = MESSAGE_STYLE?.lineHeight;


  const canVote = useMemo(() => {
    return !messsageDetails?.options?.find((option) => option.voted);
  }, [messsageDetails]);

  const handleRelevenceModal = () => {
    
  };

  const voteHandler = () => {
   
  };

  const displayTotalVotes = () => {
    if (!canVote) {
      return "";
    }
    return messsageDetails?.votersCount !== 0
      ? `${messsageDetails?.votersCount || 0} votes`
      : "noVotes";
  };

  const votedInPoll = useMemo(() => {
    return !!messsageDetails?.options?.find((option) => option?.voted);
  }, [messsageDetails]);

  const POSITION_CONTENT = position
    ? { justifyContent: "flex-start" }
    : { justifyContent: "flex-end" };

  const currentUser: User | null =
    users?.[message.userId] || null;

  const renderAnswer = (option: any) => {
    const percentages = Math.round(
      //@ts-ignore
      (option?.votes / messsageDetails?.votesCount) * 100 || 0
    );

    return (
      <div
        style={{ marginTop: "3px" }}
        className={styles.rowPercentage}
        key={option.id}
      >
        <RadioButton
          onClick={() =>
            {}
          }
          //@ts-ignore
          selected={selectedOption?.id === option.id || option.voted}
        >
          {option.name}
        </RadioButton>
        {!canVote && (
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "600",
              fontFamily: "initial",
              color: Colors.BaliHai,
            }}
          >
            {percentages}%
          </Text>
        )}
      </div>
    );
  };
  return (
    <>
      <div className={styles.parentContainer} style={POSITION_CONTENT}>
        {(messsageDetails?.options || []).length ? (
          <div className={styles.childContainer}>
            {position && (
              <span onClick={() => handleRelevenceModal()}>
                <MessageHeader
                  name={message.username}
                  relevance={message?.relevance}
                  color={currentUser?.color}
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
                        currentUser.avatar
                          ? `${TMP_URL}/${currentUser.avatar}`
                          : ""
                      }
                    />
                  )}
                </div>
              )}
              {!!POLL_ID && (
                <DropDownMenu massage={message} users={users}>
                  <div
                    className={styles.pollMessageCard}
                    style={{ boxShadow: boxShadov }}
                  >
                    <div className={styles.pollTopic}>
                      {messsageDetails?.topic ? messsageDetails?.topic : ""}
                    </div>
                    <Text>
                      Poll:
                      {messsageDetails?.type === RELEVANCE_TYPE ? (
                        <span>byRelevance</span>
                      ) : (
                        <span>byNormal</span>
                      )}
                    </Text>

                    <div className={styles.optionsCard}>
                      <hr />
                      {(messsageDetails?.options || [])
                        ?.slice()
                        ?.sort((option1, option2) => option1.id - option2.id)
                        ?.map(renderAnswer)}
                      {canVote ? (
                        <button
                          onClick={voteHandler}
                          className={styles.voteButton}
                        >
                          <Text color="blue">vote</Text>
                        </button>
                      ) : (
                        <Text>voted!</Text>
                      )}
                      <Text color="dark">{displayTotalVotes()}</Text>
                    </div>
                  </div>
                </DropDownMenu>
              )}
            </div>
          </div>
        ) : (
          <Text>Loading...</Text>
        )}
      </div>
    </>
  );
};

export default PollMessageCard;
