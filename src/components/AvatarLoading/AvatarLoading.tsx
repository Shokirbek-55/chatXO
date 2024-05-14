import Lottie from "lottie-react";
import styled from "styled-components";
import avatarLoading from "../../assets/loading.json";

export const AvatarLoading = () => {
  return (
    <Box>
      <Lottie
        animationData={avatarLoading}
        loop={true}
        style={{ width: "50px" }}
      />
    </Box>
  );
};

const Box = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  filter: 5px;
`;
