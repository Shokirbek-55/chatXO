import InfiniteScroll from "react-infinite-scroll-component";
import useRootStore from "../../hooks/useRootStore";
import topLoaderJson from "../../assets/topLoader.json";
import styled from "styled-components";
import Lottie from "lottie-react";
import { observer } from "mobx-react";

const ScrollView = ({ children, ...props }) => { 

    const { getHistoryMessagesPageState, messageCache, slug, prevInnerDivHeight, setPrevInnerDivHeight, goToBottom } = useRootStore().messageStore

    return (
        <div style={{
            height: "100vh", overflow: "auto", display: 'flex',
            flexDirection: 'column-reverse', }}>
        <InfiniteScroll
            dataLength={200}
            next={() => getHistoryMessagesPageState(slug, slug)}
            hasMore={true}
            loader={<ScrollTopLoading animationData={topLoaderJson} />}
            inverse={true}
            refreshFunction={()=> console.log('refresh')}
            style={{
                backgroundColor: 'green',
                border: '1px solid red',
                display: 'flex',
                flexDirection: 'column-reverse'
            }}
        >
            {children}
            </InfiniteScroll>
        </div>
    )

};

export default observer(ScrollView)



const ScrollTopLoading = styled(Lottie)`
    position: absolute;
    top: 6vh;
    left: 0;
    width: 100%;
`