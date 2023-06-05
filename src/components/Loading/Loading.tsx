import Lottie from "lottie-react";
import loadingChatxo from '../../assets/chatxo.json'
import styled from "styled-components";


const FullScreen = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const Loading = () => {
    return (
        <FullScreen>
            <Lottie
                animationData={loadingChatxo}
                loop={true}
                style={{ width: "200px" }}
            />
        </FullScreen>
    );
};
