import React from 'react'
import styles from "./EmptyScreen.module.css"

const EmptyScreen = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>Select a chat to start messaging !</div>
            {/* <span className={styles.project_version}>{project_version}</span> */}
        </div>
    )
}

export default EmptyScreen
