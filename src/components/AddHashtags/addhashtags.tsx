import React, { useCallback } from "react";
import styles from "./addhashtags.module.css";
import { CloseIcon, PlusIcon } from "../../utils/icons";
import Colors from "../../utils/colors";
import useRootStore from "../../hooks/useRootStore";
import { observer } from "mobx-react-lite";

interface Props {
    isOpen: boolean;
    setopenhashtags: any;
}

const AddHashtags = ({ isOpen, setopenhashtags }: Props) => {
    const [hashtag, setHashtag] = React.useState<string>("");
    const { setHashTags } = useRootStore().hashtagStore;

    const handleOpenHashtags = useCallback(() => {
        setopenhashtags(!isOpen);
    }, [isOpen, setopenhashtags]);

    const addHashtag = () => {
        setHashTags(hashtag);
        setHashtag("");
    };

    const onSendEnter = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            addHashtag();
            e.preventDefault();
        }
    };

    const handleHashtage = (e: string) => {
        setHashtag(e);
    };

    return (
        <>
            {isOpen ? (
                <div className={styles.hashtag}>
                    <input
                        type="text"
                        onKeyDown={(e) => onSendEnter(e)}
                        className={styles.hashtaginput}
                        onChange={(e) => handleHashtage(e.target.value)}
                        value={hashtag}
                        placeholder="Create hashtag"
                    />

                    <div className={styles.hashtagIcons}>
                        <span onClick={() => addHashtag()}>
                            <PlusIcon size={24} color={Colors.GullGray} />
                        </span>
                        <span onClick={() => handleOpenHashtags()}>
                            <CloseIcon size={24} color={Colors.GullGray} />
                        </span>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default observer(AddHashtags);
