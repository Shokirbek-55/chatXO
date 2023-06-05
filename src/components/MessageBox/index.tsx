import React from 'react'
interface Props {
    title?: string;
    size?: string;
}

const MessageBox: React.FC<Props> = ({
    title,
    size
}) => {
    return (
        <div style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: "50px",
            opacity: 0.5,
            fontSize: size
        }}>
            <h3>{title}</h3>
        </div>
    )
}
export default MessageBox;