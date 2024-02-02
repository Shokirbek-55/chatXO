import { observer } from "mobx-react-lite";
import { ChangeEvent, CSSProperties, FC, useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import Colors from "../../utils/colors";
import { AvatarLoading } from "../AvatarLoading/AvatarLoading";
import styles from "./AvatarUpload.module.css";
import useRootStore from "../../hooks/useRootStore";
import Avatar from "react-avatar-edit";

interface Props {
    style?: CSSProperties;
    color?: string;
    imageUrl?: string;
    upload: boolean;
    onChange?: (e: any) => void;
    value?: string;
    onPreview?: () => void;
    loading?: boolean;
}

const AvatarUpload: FC<Props> = ({
    style,
    color,
    imageUrl,
    onChange,
    upload,
    value = "",
    onPreview,
    loading,
}) => {
    style = color ? { ...style, background: color } : { ...style };

    return (
        <>
            <div
                className={styles.container}
                style={{
                    ...style,
                }}
            >
                <div className={styles.avatarBox}>
                    {loading ? <AvatarLoading /> : null}
                    {imageUrl ? (
                        <img
                            onClick={onPreview}
                            className={styles.avatar}
                            src={imageUrl}
                            alt="Avatar"
                        />
                    ) : null}
                    {upload ? (
                        <label className={styles.uploadIcon}>
                            <MdOutlineCameraAlt
                                size={36}
                                color={Colors.Green}
                            />
                            <input
                                type="file"
                                multiple
                                value={value}
                                color={color}
                                onChange={(e) => onChange && onChange(e)}
                                accept="image/png, image/gif, image/jpeg"
                                className={styles.avatarInput}
                            />
                        </label>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default observer(AvatarUpload);
