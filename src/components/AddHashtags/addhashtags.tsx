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
    <>
      {isOpen ? (
        <div className={styles.hashtag}>
          <input
            type="text"
            className={styles.hashtaginput}
            onChange={(e) => handleHashtage({ e })}
            value={hashtag}
            placeholder="Add hashtags"
          />

          <div className={styles.hashtagIcons}>
            <span onClick={() => addHashtag()}>
              <PlusIcon size={32} color={Colors.White} padding={15} />
            </span>
            <span onClick={() => handleOpenHashtags()}>
              <CloseIcon size={32} color={Colors.White} padding={15} />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddHashtags;
