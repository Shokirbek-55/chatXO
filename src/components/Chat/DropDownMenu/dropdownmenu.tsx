import { Dropdown, Menu, Space, message } from "antd";
import { t } from "i18next";
import { useCallback, useEffect, useState } from "react";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";
import useRootStore from "../../../hooks/useRootStore";
import { observer } from "mobx-react-lite";
import { User } from "../../../types/user";
import { styled } from "styled-components";

interface Props {
    massage: RawMessage;
    users?: {
        [key: string]: ChannelsUsersType;
    };
    children: React.ReactNode;
}

const DropDownMenu = ({ massage, users, children }: Props) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const { user } = useRootStore().authStore;
    const { slug, messageCache, deleteMessage, replyMessage } =
        useRootStore().messageStore;

    const currentUser: User | null = users?.[massage.userId] || null;

    useEffect(() => {
        setIsAdmin(messageCache[slug].channelData.adminId == user?.id);
    }, [user, slug, messageCache]);

    const onLongPressText = useCallback(() => {
        let options: string[] = [];
        if (isAdmin) {
            options = [t("reply"), t("copy"), t("delete"), t("cancel")];
        } else {
            options = [
                t("reply"),
                t("report"),
                t("copy"),
                t("delete"),
                t("cancel"),
            ];
        }
        return options;
    }, [currentUser?.id, user?.id]);

    const renderMenu = (menuList: any) => <MenuList items={menuList} />;

    const contextOptions = {
        [t("delete")]: () => {
            console.log("delete message ", massage);
            if (isAdmin || massage.userId == user?.id) {
                deleteMessage(
                    massage.id,
                    massage.channelSlug,
                    new Date(massage.timestamp)
                );
            } else {
                message.error("you are not admin");
            }
        },
        [t("copy")]: () => {
            try {
                navigator.clipboard.writeText(massage.message);
                console.log("Copied!");
            } catch (err) {
                console.log("Failed to copy!");
            }
        },
        [t("reply")]: () => {
            console.log("message ", massage);
            replyMessage(massage);
        },
    };

    const menuLists = (renderMenu(onLongPressText()).props.items || []).map(
        (label: string, key: number) => ({
            label,
            key,
            onClick: contextOptions[label],
        })
    );

    return (
        <Dropdown
            menu={renderMenu(menuLists) as never}
            trigger={["contextMenu"]}
            overlayStyle={{
                width: "130px",
                height: "200px",
                borderRadius: "10%",
                alignItems: "center",
                padding: "15px",
            }}
        >
            <Space>{children}</Space>
        </Dropdown>
    );
};

export default observer(DropDownMenu);

const MenuList = styled(Menu)`
    li {
        outline: none;
        .ant-dropdown-menu-title-content {
            font-family: "Montserrat5";
        }
    }
`;
