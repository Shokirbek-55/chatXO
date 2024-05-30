import { FC } from 'react';
interface Props {
    own: number;
    text?: string;
}

const MessageBox: FC<Props> = ({ own, text }) => {
    const chackUserId = (id: number) => {
        if (id === 0) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '10px 0 ',
                        fontFamily: 'sans-serif',
                        fontWeight: '400',
                    }}
                >
                    {text}
                </div>
            );
        }
        return <div></div>;
    };
    return <>{chackUserId(own)}</>;
};

export default MessageBox;
