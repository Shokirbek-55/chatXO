import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import {
  BsFillPersonPlusFillIcon,
  MdGroupAddIcon,
  MdGroupsIcon,
} from "../../utils/icons";
import Colors from "../../utils/colors";
import useRootStore from "../../hooks/useRootStore";
import { styled } from "styled-components";
import { observer } from "mobx-react-lite";

const Footer: FC = () => {
  const { currentRoute, setCurrentRoute } = useRootStore().routerStore;
  const { getFriends } = useRootStore().friendsStore;

  const handleFriends = () => {
    setCurrentRoute("friends");
    getFriends();
  };

  return (
    <div className={styles.container}>
      <Button
        style={{
          backgroundColor:
            currentRoute.id === 1 ? Colors.Yellow : "transparent",
        }}
        color={currentRoute.id === 1 ? Colors.Black : "#666"}
        onClick={() => setCurrentRoute("channels")}
      >
        <MdGroupsIcon />
      </Button>
      <Button
        style={{
          backgroundColor:
            currentRoute.id === 2 ? Colors.Yellow : "transparent",
        }}
        color={currentRoute.id === 2 ? Colors.Black : "#666"}
        onClick={handleFriends}
      >
        <BsFillPersonPlusFillIcon />
      </Button>
      <Button
        style={{
          backgroundColor:
            currentRoute.id === 3 ? Colors.Yellow : "transparent",
        }}
        color={currentRoute.id === 3 ? Colors.Black : "#666"}
        onClick={() => setCurrentRoute("connectChannel")}
      >
        <MdGroupAddIcon />
      </Button>
    </div>
  );
};

export default observer(Footer);

const Button = styled.button`
  background-color: ${(props) => props.style?.backgroundColor || "transparent"};
  color: ${(props) => props.color};
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  border-radius: 50%;
  cursor: pointer;
`;
