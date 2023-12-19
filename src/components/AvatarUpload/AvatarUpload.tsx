import { CSSProperties, FC, useState } from "react";
import styles from "./AvatarUpload.module.css";
import Assets from "../../utils/requireAssets";
import Colors from "../../utils/colors";
import Icon from "../Icon";
import { observer } from "mobx-react-lite";
import useRootStore from "../../hooks/useRootStore";
import { AvatarLoading } from "../AvatarLoading/AvatarLoading";
import { CiCamera } from "react-icons/ci";

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
    value,
    onPreview,
    loading,
}) => {
    style = color ? { ...style, background: color } : { ...style };
    const { visible, show } = useRootStore().visibleStore;
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
                            <CiCamera size={36} color={Colors.Green} />
                            <input
                                type="file"
                                multiple
                                value={value}
                                color={color}
                                onChange={onChange}
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
