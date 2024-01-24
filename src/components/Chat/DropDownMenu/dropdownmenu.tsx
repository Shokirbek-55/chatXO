import { Dropdown, Menu, MenuProps, Space, message } from "antd";
import { t, use } from "i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
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

    const { user } = useRootStore().authStore;
    const { slug, messageCache, deleteMessage, replyMessage } =
        useRootStore().messageStore;

    const isAdmin = useMemo(() => messageCache[slug].channelData.adminId == user?.id, [user, slug, messageCache]);

    // if isAdmin is true, show all options, else show only reply, report, copy, delete else show only reply, report, copy, delete
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: t("reply"),
            onClick: () => {
                replyMessage(massage);
            },
        },
        {
            key: "2",
            label: t("report"),
            onClick: () => { },
        },
        {
            key: "3",
            label: t("copy"),
            onClick: () => {
                try {
                    navigator.clipboard.writeText(massage.message);
                    console.log("Copied!");
                } catch (err) {
                    console.log("Failed to copy!");
                }
            },
        },
        {
            key: "4",
            label: t("delete"),
            onClick: () => {
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
        },
        {
            key: "5",
            label: t("cancel"),
            onClick: () => { },
        }
    ]

    const currentUser: User | null = users?.[massage.userId] || null;

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
        <DropdownRN
            overlay={renderMenu(menuLists)}
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
        </DropdownRN>
    );
};

export default observer(DropDownMenu);

const MenuList = styled(Menu)`
    li {
        outline: none;
        .ant-dropdown-menu-title-content {
            font-family: "Montserrat";
            font-weight: 600;
        }
    }
`;

const DropdownRN = styled(Dropdown)`
    display: block;
`
