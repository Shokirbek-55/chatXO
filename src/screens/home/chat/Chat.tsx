import React from 'react'
import { data } from '../../../store/dataBase'
import { ChatHeader } from '../../../utils/chatHeader'
import styles from "./Chat.module.css"

const Chat = () => {
    return (
        <div className={styles.container} id="chatView">
            <ChatHeader
                img_url={data?.avatar ? data?.avatar : ""}
                color={data?.color ? data?.color : "linear-gradient(#ddd, #666)"}
                name={data?.name}
                onTextSearch={() => { }}
                pageState={data.pageState}
            />
        </div>
    )
}

export default Chat;
