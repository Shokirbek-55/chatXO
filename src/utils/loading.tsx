import Lottie from "lottie-react";
import { CSSProperties } from "react";
import styled from "styled-components";
import loadingChatxo from "../assets/chatxo.json";

interface Props {
  isLoad?: boolean;
  style?: CSSProperties;
}

const FullScreen = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* z-index: 2;
  background-color: rgba(1,1,1, 0.2); */
`;
const Loading: React.FC<Props> = ({
  isLoad,
  style
}) => {

  return (
    <FullScreen style={{ ...style, display: isLoad ? 'flex' : 'none' }}>
      <Lottie
        animationData={loadingChatxo}
        loop={isLoad}
        style={{ width: "200px" }}
      />
    </FullScreen>
  );
};

export default Loading;