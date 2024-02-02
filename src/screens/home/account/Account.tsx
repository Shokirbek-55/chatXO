import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";
import Header from "../../../components/Header/Header";
import MessageBox from "../../../components/MessageBox/MessageBox";
import RowItemView from "../../../components/RowItem";
import Text from "../../../components/Text/Text";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import { ButtonComponent } from "../../../utils/button";
import Colors from "../../../utils/colors";
import styles from "./Account.module.css";

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const Account = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        // getFriendDetails,
        getPreviewData,
        setUserState,
        setMyData,
        updateUserAccount,
        onSelectFile,
    } = useRootStore().usersStore;
    const { show } = useRootStore().visibleStore;
    const { user } = useRootStore().authStore;
    const { myChannels, getChannelByHashId } = useRootStore().channelStore;
    const {
        // toRouter,
        closeModal,
    } = useRootStore().routerStore;
    const { setChannelSlug } = useRootStore().messageStore;

    // const randomUserColor = (Color: string) => {
    //     setUserState("color", Color);
    //     updateUserAccount({ color: Color });
    // };

    const onImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            onSelectFile(e.target.files[0]);
            show("uploadFile");
        }
    };

    // const FriendDetails = (friendId: number) => {
    //     getFriendDetails(friendId);
    //     toRouter("friendDetails");
    // };

    const handleChanel = (e) => {
        setChannelSlug(e.slug);
        getChannelByHashId(e.hashId);
        const target = generatePath(`/:name`, { name: `@${e.hashId}` });
        navigate(target);
    };

    const PreviewAvatar = (data: any) => {
        show("previewModal");
        getPreviewData(data);
    };

    console.log("render");

    return (
        <div className={styles.container}>
            <Header
                text={t("Profile")}
                leftIcon="arrowLeft"
                onLeftIconPress={() => closeModal("left")}
            />
            <div className={styles.container}>
                <div className={styles.avatarBox}>
                    <AvatarUpload
                        upload={true}
                        imageUrl={
                            user.avatar ? `${TMP_URL}/${user.avatar}` : ""
                        }
                        onPreview={() => PreviewAvatar(user)}
                        color={
                            user?.color
                                ? `linear-gradient(25deg, ${user.color} 30%, #ddd 100%)`
                                : "linear-gradient(#ddd, #666)"
                        }
                        onChange={(e) => onImageSelect(e)}
                    />
                </div>
                <div className={styles.groupsBox}>
                    <div className={styles.loader}>
                        <Text
                            margin="0 0 10px 0"
                            children={user.username}
                            fontWeight={700}
                            center
                        />
                        <div className={styles.judgementText}>
                            <TextArea
                                style={{
                                    fontFamily: "Montserrat",
                                    fontWeight: 900,
                                }}
                                placeholder="Write a little about yourself here..."
                                value={setMyData.description}
                                onChange={(e) =>
                                    setUserState("description", e.target.value)
                                }
                            />
                            <Text
                                fontSize="12px"
                                style={{ textAlign: "end" }}
                                children="175 character"
                            />
                        </div>
                        <div className={styles.formBox}>
                            <div className={styles.formItem}>
                                <Text
                                    children="Username"
                                    color={Colors.Black}
                                    fontWeight={600}
                                    fontSize="14px"
                                    style={{ width: "50%" }}
                                />
                                <input
                                    value={setMyData.username}
                                    onChange={(e) =>
                                        setUserState("username", e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles.formItem}>
                                <Text
                                    children="Name"
                                    color={Colors.Black}
                                    fontWeight={600}
                                    fontSize="14px"
                                    style={{ width: "50%" }}
                                />
                                <input
                                    value={setMyData.name}
                                    placeholder="Name"
                                    onChange={(e) =>
                                        setUserState("name", e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles.formItem}>
                                <Text
                                    children="Email"
                                    color={Colors.Black}
                                    fontWeight={600}
                                    fontSize="14px"
                                    style={{ width: "50%" }}
                                />
                                <input
                                    value={setMyData.email}
                                    onChange={(e) =>
                                        setUserState("email", e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles.formItem}>
                                <Text
                                    children="City"
                                    color={Colors.Black}
                                    fontWeight={600}
                                    fontSize="14px"
                                    style={{ width: "50%" }}
                                />
                                <input
                                    value={setMyData.city}
                                    placeholder="City"
                                    onChange={(e) =>
                                        setUserState("city", e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles.formItem}>
                                <Text
                                    children="Age"
                                    color={Colors.Black}
                                    fontWeight={600}
                                    fontSize="14px"
                                    style={{ width: "50%" }}
                                />
                                <input
                                    value={setMyData.birth}
                                    placeholder="Age"
                                    onChange={(e) =>
                                        setUserState("birth", e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles.formItem}>
                                <Text
                                    children="Interests"
                                    color={Colors.Black}
                                    fontWeight={600}
                                    fontSize="14px"
                                    style={{ width: "50%" }}
                                />
                                <input
                                    value={setMyData.occupacy}
                                    placeholder="Interests"
                                    onChange={(e) =>
                                        setUserState("occupacy", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <Text
                            margin="15px 0 10px 7%"
                            children={"My rating in groups"}
                            fontWeight={600}
                            color={Colors.Black}
                        />
                        {!myChannels && (
                            <div className={styles.loadingError}>
                                <MessageBox
                                    title={`${t("No Internet Connection")}`}
                                />
                            </div>
                        )}
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            className={styles.contentBox}
                        >
                            {myChannels?.length !== 0 ? (
                                myChannels?.map((e, index) => {
                                    return (
                                        <motion.div
                                            variants={item}
                                            key={index}
                                            id="map-dev"
                                            className={styles.channelRowBox}
                                        >
                                            <RowItemView
                                                // onGroupPress={(hashId) =>
                                                //     onGroupPress(e.hashId as string)
                                                // }
                                                imageUrl={
                                                    e.avatar
                                                        ? `${TMP_URL}/${e.avatar}`
                                                        : ""
                                                }
                                                color={
                                                    e.color
                                                        ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)`
                                                        : "linear-gradient(#ddd, #666)"
                                                }
                                                text={e.name}
                                                loading={false}
                                                onPressComponent={() =>
                                                    handleChanel(e)
                                                }
                                                userType={`${e.userRelevance}`}
                                                upDownIcon={false}
                                            />
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <MessageBox
                                    title={`${t("no_avalible_groups")}`}
                                />
                            )}
                        </motion.div>
                    </div>
                    <div className={styles.btnBox}>
                        <ButtonComponent
                            text="delete account"
                            backColor="transparent"
                            color="red"
                        />
                        <ButtonComponent
                            text="Save"
                            width="100%"
                            clickMe={() => updateUserAccount(setMyData)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Account);

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    resize: none;
    font-size: 14px;
    font-family: "Montserrat";
    font-weight: 500 !important;
    color: #333;
    outline: none;
    &::placeholder {
        color: #ccc;
    }
    &:focus {
        border: 1px solid #333;
    }
`;
