import Lottie from 'lottie-react';
import { CSSProperties } from 'react';
import styled from 'styled-components';
import loadingChatxo from '../assets/chatxo.json';

interface Props {
    isLoad?: boolean;
    style?: CSSProperties;
}

const FullScreen = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Loading: React.FC<Props> = ({ isLoad, style }) => {
    return (
        <FullScreen style={{ ...style, display: isLoad ? 'flex' : 'none' }}>
            <Lottie animationData={loadingChatxo} loop={isLoad} style={{ width: '200px' }} />
        </FullScreen>
    );
};

export default Loading;
