import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { InputComponent } from "../components/InputSearch/inputComponent";
import { TMP_URL } from "../env";
import useRootStore from "../hooks/useRootStore";
import {
    ArrowDowunIcon,
    ArrowUpIcon,
    CloserNoCirculIcon,
    SearchIcon,
} from "./icons";
import SmallAvatar from "../components/SmallAvatar/smallAvatar";


const ChatHeader = () => {
    const { visible, toglevisible } = useRootStore().visibleStore;
    const { openRightSideBar } = useRootStore().routerStore;
    const { setSearch, searchMessage, slug, messageCache, clearSearch, searchMessageState } =
        useRootStore().messageStore;

    const searchHandle = (e: string) => {
        setSearch(e);
        searchMessage(e, slug);
    };

    const ToggleSearchInput = () => {
        clearSearch();
        toglevisible("setSearch");
    };

    const OpenManageChannel = () => {
        openRightSideBar();
    };
    const img_url = messageCache[slug]?.channelData.avatar;
    const color = messageCache[slug]?.channelData.color;
    const name = messageCache[slug]?.channelData.name;

    return (
        <BassComponent>
            <div className="container">
                <header>
                    <div onClick={OpenManageChannel}>
                        <SmallAvatar
                            imageUrl={
                                img_url
                                    ? `${TMP_URL}/${img_url}`
                                    : ""
                            }
                            color={
                                color
                                    ? color
                                    : ""
                            }
                        />
                        <h3>{name}</h3>
                    </div>
                </header>
                <div>
                    {visible.setSearch && (
                        <>
                            <InputComponent
                                onChangeText={(e) => searchHandle(e)}
                                backColor="transparent"
                                width="300px"
                                value={searchMessageState}
                            />
                            <span>
                                <ArrowDowunIcon size={24} padding={1} />
                            </span>
                            <span>
                                <ArrowUpIcon size={24} padding={1} />
                            </span>
                            {/* {searchCoincidencesCount > 0 && (
                            <span>
                                {selectedSearchCoincidence + 1 < 0
                                    ? 0
                                    : selectedSearchCoincidence + 1}
                                /
                                {searchCoincidencesCount === -1
                                    ? 0
                                    : searchCoincidencesCount}
                            </span>
                        )} */}
                        </>
                    )}
                    <span onClick={ToggleSearchInput}>
                        {visible.setSearch ? (
                            <CloserNoCirculIcon size={24} color="#303030" />
                        ) : (
                            <SearchIcon size={24} color="#303030" />
                        )}
                    </span>
                </div>
            </div>
        </BassComponent>
    );
};

export default observer(ChatHeader);

const BassComponent = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 7.5vh;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(25px);
    z-index: 15;
    box-shadow: 0px 8px 48px 0px rgba(32, 35, 39, 0.02),
        0px 4px 8px 0px rgba(32, 35, 39, 0.04),
        0px 0px 1px 0px rgba(32, 35, 39, 0.16);

    .container {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
    }

    header {
        position: relative;
        width: 70%;
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
        gap: 10px;
    }
`;