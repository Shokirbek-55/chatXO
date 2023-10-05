import { FC } from "react";
import styles from "./index.module.css";

import Colors from "../../../../../utils/colors";
import {
    ChartIcon,
    DocumentIcon,
    HashtagIcon,
    HiddenIcon,
    ImageAddIcon,
} from "../../../../../utils/icons";
import ToolbarIcon from "../../../../../components/ToolbarIcon/ToolbarIcon";
import ProgressBarView from "../../../../../components/Chat/progressbar";
import { observer } from "mobx-react-lite";
import useRootStore from "../../../../../hooks/useRootStore";
import { SendMessage } from "../../../../../types/channel";
import FilterSilderComponent from "../../../../../components/FilterSlider/FilterSlider";
import styled from "styled-components";
import { Slider } from "antd";
import Text from "../../../../../components/Text/Text";

interface Props {
    props: boolean;
    setOpenHashtags: any;
    openHashTags: boolean;
}

const FooterToolbarView: FC<Props> = ({
    props,
    setOpenHashtags,
    openHashTags,
}) => {
    const { readFile, progress, setMinRelevance, minRelevance } =
        useRootStore().messageStore;

    const toggleSwitchPollModal = () => {};

    if (!props) {
        return null;
    }

    const handleOpenHashtags = () => {
        setOpenHashtags(!openHashTags);
    };

    const uploadFile = (e: File) => {
        readFile(e, e.type.split("/")[0] as SendMessage["type"]);
    };

    return (
        <div
            className={styles.container}
            style={{ display: props ? "flex" : "none" }}
        >
            <ProgressBarView
                progress={{
                    progress: 10,
                }}
            />
            {props ? (
                <div className={styles.footerToolbar}>
                    <div className={styles.toolbarLeft}>
                        <ToolbarIcon>
                            <HiddenIcon
                                size={17}
                                color={Colors.GullGray}
                                padding={10}
                            />
                        </ToolbarIcon>
                        <ToolbarIcon onClickButton={() => handleOpenHashtags()}>
                            <HashtagIcon
                                size={17}
                                color={Colors.GullGray}
                                padding={10}
                            />
                        </ToolbarIcon>
                    </div>
                    <div className={styles.toolbarRight}>
                        <ToolbarIcon
                            onClickButton={() => toggleSwitchPollModal()}
                        >
                            <ChartIcon
                                size={17}
                                color={Colors.GullGray}
                                padding={10}
                            />
                        </ToolbarIcon>
                        <ToolbarIcon
                            accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .csv, .jpg, .jpeg, .png, .gif, .bmp"
                            onChange={(e) => readFile(e, "document")}
                        >
                            <DocumentIcon
                                size={17}
                                color={Colors.GullGray}
                                padding={10}
                            />
                        </ToolbarIcon>
                        <ToolbarIcon
                            accept="image/*, video/*"
                            onChange={(e) => uploadFile(e)}
                        >
                            <ImageAddIcon
                                size={17}
                                color={Colors.GullGray}
                                padding={10}
                            />
                        </ToolbarIcon>
                    </div>
                    <SilderContainer>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: 300,
                                color: "#97a6bc",
                            }}
                        >
                            Min Relevance{" "}
                            {minRelevance === -1 ? 0 : minRelevance}
                        </Text>
                        <div className="box">
                            <Slider
                                min={0}
                                max={100}
                                onChange={(e) => setMinRelevance(e)}
                                defaultValue={0}
                                handleStyle={{
                                    backgroundColor: "red",
                                }}
                                railStyle={{
                                    backgroundColor: "#97a6bc",
                                }}
                            />
                        </div>
                    </SilderContainer>
                </div>
            ) : null}
        </div>
    );
};
export default observer(FooterToolbarView);

const SilderContainer = styled.div`
    position: absolute;
    left: 50px;
    width: calc(100% - 60px);
    background-color: #fff;
    padding: 0 15px;
    display: flex;
    align-items: center;
    gap: 10px;

    .box {
        width: 70%;
    }
`;
