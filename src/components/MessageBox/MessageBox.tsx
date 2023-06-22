import React from 'react'
interface Props {
    title?: any;
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
            margin: "40px 0",
            opacity: 0.5,
            fontSize: size ? size : "16px",
            fontFamily: "Montserrat5"
        }}>
            {title}
        </div>
    )
}
export default MessageBox;