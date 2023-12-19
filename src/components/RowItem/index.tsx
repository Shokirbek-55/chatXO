import { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "../../utils/icons";
import { Channel } from "../../types/channel";
import { Friend } from "../../types/friend";
import styles from "./index.module.css";
import ButtonView from "../Button";
import AvatarView from "../AvatarUpload/AvatarUpload";
import Text from "../Text/Text";
import SmallAvatar from "../SmallAvatar/smallAvatar";
import Icon from "../Icon";
import Assets from "../../utils/requireAssets";
import Colors from "../../utils/colors";

interface Props {
    item?: Friend;
    groupItem?: Channel;
    text?: any;
    title?: string;
    rightButton?: boolean;
    imageUrl?: string;
    style?: CSSProperties;
    value?: any;
    color?: string;
    loading: boolean;
    uploadAvatar?: boolean;
    onNamePress?: (id: any) => void;
    onGroupPress?: (hashId: string) => void;
    onButtonPress?: () => void;
    onClick?: () => void;
    matches?: any;
    icon?: string;
    className?: any;
    userType?: string | number;
    upDownIcon?: boolean;
}

function chsUser(username: string) {
    if (username.length <= 9) return username;

    return username.slice(0, 10) + "...";
}

const RowItemView: FC<Props> = ({
    item,
    groupItem,
    text,
    rightButton,
    title,
    onNamePress,
    onGroupPress,
    value,
    onButtonPress,
    loading,
    color,
    imageUrl,
    onClick,
    icon,
    className,
    userType,
    upDownIcon,
}) => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            {text ? (
                <div
                    className={styles.card}
                    onClick={() =>
                        onGroupPress && onGroupPress(groupItem?.hashId || "")
                    }
                >
                    <SmallAvatar color={color} imageUrl={imageUrl} />
                    <div
                        className={styles.headerTitle}
                        onClick={() =>
                            onNamePress && onNamePress(item?.id || "")
                        }
                    >
                        <Text
                            fontWeight={500}
                            color={Colors.Black}
                            children={chsUser(text)}
                        />
                    </div>
                </div>
            ) : null}
            <div className={styles.rightbarBox}>
                {rightButton ? (
                    <ButtonView
                        rounded
                        className={className}
                        title={title}
                        color="danger"
                        onClickbutton={onButtonPress}
                        onRefreshbutton={onClick}
                    />
                ) : null}
                {icon === "search" ? <SearchIcon size={21} /> : null}
                {userType ? (
                    <div className={styles.relevanceBox}>
                        <Text
                            style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                            color={Colors.Black}
                            children={userType}
                        />
                        {upDownIcon ? (
                            <Icon
                                src={Assets.up_downIcon}
                                width="12px"
                                height="12px"
                                color={"yellowgreen"}
                            />
                        ) : null}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default RowItemView;
