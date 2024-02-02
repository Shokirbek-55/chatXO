import { message, Slider, Switch } from "antd";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { IoMdFunnel } from "react-icons/io";
import { MdGroup } from "react-icons/md";
import { generatePath, useNavigate } from "react-router-dom";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";
import Header from "../../../components/Header/Header";
import MenuItem from "../../../components/MenuItem/MenuItem";
import NewInput from "../../../components/NewInput/NewInput";
import useRootStore from "../../../hooks/useRootStore";
import { ButtonComponent } from "../../../utils/button";
import styles from "./CreateChannel.module.css";

const CreateChannel = () => {
    const { t } = useTranslation();
    const navigation = useNavigate();
    const {
        closeModal,
        openRightSideBar,
        toRouterManageCh,
        setCurrentRoute,
        toRouter,
    } = useRootStore().routerStore;
    const {
        createChannel,
        setCreateChannelState,
        setCreateChannelData,
        onCreateChannelImage,
    } = useRootStore().channelStore;
    const { visible, toglevisible, show } = useRootStore().visibleStore;

    const isPrivateGruop = (checked: boolean) => {
        setCreateChannelState("isPrivate", checked);
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            onCreateChannelImage(e.target.files[0]);
        }
        show("chUploadFile");
    };

    const callbackHandle = (e) => {
        const target = (e) =>
            generatePath(`/:name`, {
                name: `@${e}`,
            });
        setCurrentRoute("channels");
        closeModal("left");
        navigation(target(e));
        openRightSideBar();
        toRouterManageCh("editChannel");
    };
    const CreateChannel = () => {
        if (setCreateChannelData.name?.length > 1) {
            createChannel(setCreateChannelData, (e) => callbackHandle(e));
        } else {
            message.warning("Please enter group name");
        }
    };

    return (
        <div className={styles.container}>
            <Header
                text={t("createGroup")}
                leftIcon={"arrowLeft"}
                onLeftIconPress={() => closeModal("left")}
            />
            <div className={styles.contentBox}>
                <div className={styles.contentTop}>
                    <AvatarUpload
                        color={
                            setCreateChannelData.color
                                ? setCreateChannelData.color
                                : "linear-gradient(#ddd, #666)"
                        }
                        upload={true}
                        imageUrl={
                            setCreateChannelData.avatar
                                ? setCreateChannelData.avatar
                                : ""
                        }
                        onChange={(e) => handleFileChange(e)}
                    />
                    <NewInput
                        onChange={(e) => setCreateChannelState("name", e)}
                        placeholder="Group Name"
                        margin="15px 0 0 0"
                        fontSize="15px"
                        value={setCreateChannelData.name}
                    />
                </div>
                <div className={styles.contentBottom}>
                    <div className={styles.descriptionBox}>
                        <textarea
                            className={styles.description}
                            rows={6}
                            placeholder="Enter description"
                            value={setCreateChannelData.description}
                            onChange={(e) =>
                                setCreateChannelState(
                                    "description",
                                    e.target.value
                                )
                            }
                        />
                    </div>
                    <div className={styles.settings}>
                        <MenuItem
                            icon={<MdGroup size={24} />}
                            title={`Group type: ${setCreateChannelData.isPrivate
                                ? "Private"
                                : "Public"
                                }`}
                            right={<Switch onChange={isPrivateGruop} />}
                        />
                        <MenuItem
                            icon={<IoMdFunnel size={24} />}
                            title="Default relevance"
                            right={
                                setCreateChannelData.defaultRelevance
                                    ? setCreateChannelData.defaultRelevance
                                    : "0"
                            }
                            onClick={() =>
                                toglevisible("relevenceSliderCreate")
                            }
                        />
                        <div
                            className={styles.sliderBox}
                            style={{
                                display: visible.relevenceSliderCreate
                                    ? "block"
                                    : "none",
                            }}
                        >
                            <Slider
                                className={styles.slider}
                                onChange={(e) =>
                                    setCreateChannelState("defaultRelevance", e)
                                }
                            />
                        </div>
                        <MenuItem
                            icon={<MdGroup size={24} />}
                            title="Add participiants"
                            onClick={() => toRouter("collectUsers")}
                        />
                    </div>
                    <ButtonComponent
                        width="100%"
                        margin="10px 0 0 0"
                        text="Create new group"
                        clickMe={CreateChannel}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(CreateChannel);
