import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import {
    ArrowDowunIcon,
    ArrowUpIcon,
    CloserNoCirculIcon,
    SearchIcon,
} from "./icons";
import { TMP_URL } from "../env";
import { InputComponent } from "../components/InputSearch/inputComponent";
import ChatStore from "../store/chatStore/chatStore";
import useRootStore from "../hooks/useRootStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

interface propsType {
    onTextSearch: (e) => void;
    name?: string;
    img_url?: string;
    color?: string;
    pageState?: string;
    onPress?: () => void;
    inputValue?: string;
}

const ChatHeader = ({
    name,
    img_url,
    color,
    onPress,
    onTextSearch,
    inputValue,
}: propsType) => {
    const { visible, toglevisible } = useRootStore().visibleStore;
    const { setSearch, searchMessageState, searchMessage, slug } =
        useRootStore().messageStore;
    const searchHandle = (e: string) => {
        setSearch(e);
        searchMessage(e, slug);
    };
    console.log("searchMessageState", toJS(searchMessageState));

    return (
        <BassComponent>
            <header>
                <div onClick={onPress}>
                    <nav>
                        {img_url ? (
                            <img src={TMP_URL + "/" + img_url} alt={img_url} />
                        ) : color ? (
                            <BackgroundGradent
                                style={{ background: `${color}` }}
                            />
                        ) : (
                            <BackgroundGradent
                                style={{ background: `${color}` }}
                            />
                        )}
                    </nav>
                    <h3>{name}</h3>
                </div>
            </header>
            <div>
                {visible.setSearch && (
                    <>
                        <InputComponent
                            type="text"
                            onChangeText={(e) => searchHandle(e)}
                            backColor="transparent"
                            width="300px"
                            value={inputValue}
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
                <span onClick={() => toglevisible("setSearch")}>
                    {visible.setSearch ? (
                        <CloserNoCirculIcon size={24} color="#303030" />
                    ) : (
                        <SearchIcon size={24} color="#303030" />
                    )}
                </span>
            </div>
        </BassComponent>
    );
};

export default observer(ChatHeader);

const BassComponent = styled.div`
    position: relative;
    width: 100%;
    top: 0;
    height: 7.5vh;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(25px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    z-index: 10;
    box-shadow: 0px 8px 48px 0px rgba(32, 35, 39, 0.02),
        0px 4px 8px 0px rgba(32, 35, 39, 0.04),
        0px 0px 1px 0px rgba(32, 35, 39, 0.16);

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
const BackgroundGradent = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#ddd, #666);
`;
