import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { BsFillPersonPlusFillIcon, MdGroupAddIcon, MdGroupsIcon } from "../../utils/icons";
import Colors from "../../utils/colors";

const Footer: FC<{ activeTab: number }> = ({ activeTab }) => {
  return (
    <div className={styles.container}>
      <Link to="/channels">
        <MdGroupsIcon
          background={activeTab === 1 ? Colors.Yellow : "transparent"}
          color={activeTab === 1 ? Colors.Black : "#666"}
        />
      </Link>
      <Link to="/friends">
        <BsFillPersonPlusFillIcon
          background={activeTab === 2 ? Colors.Yellow : "transparent"}
          color={activeTab === 2 ? Colors.Black : "#666"}
        />
      </Link>
      <Link to="/connect-to-channel">
        <MdGroupAddIcon
          background={activeTab === 3 ? Colors.Yellow : "transparent"}
          color={activeTab === 3 ? Colors.Black : "#666"}
        />
      </Link>
    </div>
  );
};

export default Footer;
