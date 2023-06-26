import React, { useCallback } from "react";
import styles from "./addhashtags.module.css";
import { CloseIcon, PlusIcon } from "../../utils/icons";
import Colors from "../../utils/colors";

interface Props {
  isOpen: boolean;
  otherCard: boolean;
  setopenhashtags: any;
}

const AddHashtags = ({ isOpen, otherCard, setopenhashtags }: Props) => {
  const [hashtag, setHashtag] = React.useState<string>("");
  const OtherReplyMessage = otherCard
    ? styles.hashtagcontainer
    : styles.noneContainer;

  const handleOpenHashtags = useCallback(() => {
    setopenhashtags(!isOpen);
  }, [isOpen, setopenhashtags]);

  const haashtagValue = () => {

  };

  const addHashtag = useCallback(() => {
    haashtagValue();
    setHashtag("");
  }, [hashtag]);

  const handleHashtage = ({ e }: any) => {
    setHashtag(e.target.value);
  };

  return (
    <div>
      {isOpen ? (
        <div>
          <div className={OtherReplyMessage}>
            <div className={styles.hashtag}>
              <input
                type="text"
                className={styles.hashtaginput}
                onChange={(e) => handleHashtage({ e })}
                value={hashtag}
              />

              <div className={styles.hashtagIcons}>
                <span onClick={() => addHashtag()}>
                  <PlusIcon size={26} color={Colors.GullGray} padding={15} />
                </span>
                <span onClick={() => handleOpenHashtags()}>
                  <CloseIcon size={26} color={Colors.GullGray} padding={15} />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddHashtags;
