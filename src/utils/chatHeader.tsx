import {
  CloserNoCirculIcon,
  SearchIcon,
} from "./icons";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BassComponent = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 7.5vh;
  /* border: 1px solid red; */
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(25px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  z-index: 15;
  header {
    position: relative;
    width: 65%;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    nav {
      position: relative;
      margin-left: 15px;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      overflow: hidden;
      img {
        position: absolute;
        width: 45px;
        height: 45px;
        object-fit: cover;
      }
    }
  }
  div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    gap: 15px;
  }
`;
const BackgroundGradent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(#ddd, #666);
`;

interface propsType {
  onTextSearch: () => void;
  name?: string;
  img_url?: string;
  color?: string;
  pageState?: string;
  onPress?: () => void
}

export const ChatHeader = ({
  name,
  img_url,
  color,
  onPress
}: propsType) => {

  const [isSearch, setIsSearch] = useState(Boolean)
  const navigation = useNavigate()
  return (
    <>
      <BassComponent onClick={onPress}>
        <header>
          <div>
            <nav>
              {img_url ? (
                <img src={img_url} alt={img_url} />
              ) : color ? (
                <BackgroundGradent style={{ background: `${color}` }} />
              ) : (
                <BackgroundGradent style={{ background: `${color}` }} />
              )}
            </nav>
            <h3>{name}</h3>
          </div>
        </header>
        <div>
          <span onClick={() => setIsSearch((prev) => !prev)}>
            {isSearch ? (
              <CloserNoCirculIcon size={24} />
            ) : (
              <SearchIcon size={24} />
            )}
          </span>
        </div>
      </BassComponent>
    </>
  );
};
