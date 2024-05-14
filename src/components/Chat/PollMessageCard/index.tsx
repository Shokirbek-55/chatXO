import { Switch } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import useRootStore from "../../../hooks/useRootStore";
import { NORMAL_TYPE, RELEVANCE_TYPE } from "../../../types/messageType";
import { ButtonComponent } from "../../../utils/button";
import { CloseIcon, CloserNoCirculIcon, MenuIcon } from "../../../utils/icons";
import Input from "../../Input";
import Text from "../../Text/Text";
import styles from "./index.module.css";

const PollMessageCard = () => {
  const { visible, hide } = useRootStore().visibleStore;
  const {
    setPollMessageState,
    pollMessageState,
    pollMessageOptionState,
    addPollOption,
    removePollOption,
    setChangePollOption,
    clearPollMessageState,
    onSendPoll,
  } = useRootStore().messageStore;
  const [isCheck, setIsCheck] = useState(false);

  const onChange = (checked: boolean) => {
    setIsCheck(checked);
    setPollMessageState("type", checked ? RELEVANCE_TYPE : NORMAL_TYPE);
  };

  const createPollMessage = () => {
    onSendPoll(pollMessageState.type as never);
    hide("pollMesssageCard");
    hide("openFooterMediaBar");
    clearPollMessageState();
  };

  const cancelPollMessage = () => {
    hide("pollMesssageCard");
    clearPollMessageState();
  };

  return (
    <div
      className={styles.container}
      style={{ display: visible.pollMesssageCard ? "block" : "none" }}
    >
      <div
        className={styles.closeCard}
        onClick={() => hide("pollMesssageCard")}
      >
        <CloserNoCirculIcon size={24} color="#fff" />
      </div>
      <div className={styles.content}>
        <div className={styles.titleBox}>
          <Text children="New poll" />
          <Text
            children={isCheck ? "By relevance" : "By Normal"}
            fontSize="14px"
          />
        </div>
        <div>
          <Text children="Poll question" fontSize="15px" />
          <Input
            borderred
            placeholder="Enter poll question"
            value={pollMessageState?.topic}
            setUserName={(e) => setPollMessageState("topic", e)}
          />
          <Text margin="10px 0 0 0" children="Answer options" fontSize="15px" />
          <div className={styles.answerBox}>
            {pollMessageOptionState.map((e, index) => {
              return (
                <div className={styles.answer} key={index}>
                  <MenuIcon padding={5} size={20} />
                  <Input
                    borderred
                    placeholder="Enter answer"
                    value={e as never}
                    setUserName={(e) => setChangePollOption(e, index)}
                  />
                  <span onClick={() => removePollOption(e, index)}>
                    <CloseIcon padding={5} size={20} />
                  </span>
                </div>
              );
            })}
          </div>
          <Text
            margin="15px 0 5px 0"
            fontSize="15px"
            children={`you can add
                            ${10 - pollMessageOptionState?.length} 
                            more option`}
          />
          <ButtonComponent
            text="+ Add an option"
            clickMe={() => addPollOption()}
          />
          <Text
            margin="15px 0 5px 0"
            fontSize="15px"
            children={"Show result by relevance"}
          />
          <Switch onChange={onChange} />
          <div className={styles.backOrCreate}>
            <ButtonComponent
              backColor="red"
              text="cancel"
              clickMe={cancelPollMessage}
            />
            <ButtonComponent text="create" clickMe={createPollMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(PollMessageCard);
