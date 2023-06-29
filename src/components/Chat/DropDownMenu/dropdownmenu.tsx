import { useCallback, useEffect, useState } from "react";
import { Dropdown, Menu, message, Space } from "antd";
import { t } from "i18next";
import { ChannelsUsersType, RawMessage } from "../../../types/channel";

interface Props {
  massage: RawMessage;
  users?: {
    [key: string]: ChannelsUsersType
  }
  children: any;
}

const DropDownMenu = ({ massage, users, children }: Props) => {
  const [isAdmin, setIsAdmin] = useState(false);


  const onLongPressText = () => {}

  const renderMenu = (menuList: any) => <Menu items={menuList} />;

  const contextOptions = {
    [t("delete")]: () => {
      console.log("delete message ", massage);
      if (isAdmin) {

      } else if (massage.userId == users?.[0].id) {
       
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
    },
  };
  const menuLists = (
    renderMenu(onLongPressText())?.props?.items ?? []
  ).map((label: string, key: number) => ({
    label,
    key,
    onClick: contextOptions[label],
  }));
  return (
    <div>
      <Dropdown
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
      </Dropdown>
    </div>
  );
};

export default DropDownMenu;
