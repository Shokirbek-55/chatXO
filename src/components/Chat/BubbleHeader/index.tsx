import { FC, memo, useCallback } from "react";

interface Props {
    title?: string;
    color?: string;
    padding: number;
    textSize?: string;
    onPress?: () => void;
}

const BubbleHeader: FC<Props> = ({
    title,
    color,
    padding,
    textSize,
    onPress,
}) => {

    const randomClipPath = useCallback(() => {
        let clipPath = "polygon(";
        for (let i = 1; i <= 12; i++) {
            switch (i) {
                case 1:
                    clipPath += `${Math.floor(Math.random() * 5) + 5}% ${
                        Math.floor(Math.random() * 2) + 5
                    }%,`;
                    break;
                case 2:
                    clipPath += `${Math.floor(Math.random() * 25) + 10}% ${
                        Math.floor(Math.random() * 5) + 5
                    }%,`;
                    break;
                case 3:
                    clipPath += `${Math.floor(Math.random() * 30) + 35}% ${
                        Math.floor(Math.random() * 5) + 1
                    }%,`;
                    break;
                case 4:
                    clipPath += `${Math.floor(Math.random() * 25) + 65}% ${
                        Math.floor(Math.random() * 5) + 5
                    }%,`;
                    break;
                case 5:
                    clipPath += `${Math.floor(Math.random() * 5) + 90}% ${
                        Math.floor(Math.random() * 5) + 1
                    }%,`;
                    break;
                case 6:
                    clipPath += `${Math.floor(Math.random() * 5) + 95}% ${
                        Math.floor(Math.random() * 20) + 40
                    }%,`;
                    break;
                case 7:
                    clipPath += `${Math.floor(Math.random() * 5) + 90}% ${
                        Math.floor(Math.random() * 5) + 95
                    }%,`;
                    break;
                case 8:
                    clipPath += `${Math.floor(Math.random() * 25) + 65}% ${
                        Math.floor(Math.random() * 5) + 90
                    }%,`;
                    break;
                case 9:
                    clipPath += `${Math.floor(Math.random() * 20) + 40}% ${
                        Math.floor(Math.random() * 5) + 95
                    }%,`;
                    break;
                case 10:
                    clipPath += `${Math.floor(Math.random() * 15) + 20}% ${
                        Math.floor(Math.random() * 5) + 90
                    }%,`;
                    break;
                case 11:
                    clipPath += `${Math.floor(Math.random() * 5) + 5}% ${
                        Math.floor(Math.random() * 5) + 95
                    }%,`;
                    break;
                case 12:
                    clipPath += `${Math.floor(Math.random() * 5) + 1}% ${
                        Math.floor(Math.random() * 40) + 35
                    }%`;
                    break;
                default:
                    break;
            }
        }
        clipPath += ")";
        return clipPath;
    }, [textSize]);

    return (
        <div
            className="bubble-header"
            style={{
                width: "fitContent",
                maxHeight: "30px",
                padding: "5px 15px",
                clipPath: randomClipPath(),
                backgroundColor: color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
            }}
        >
            <div
                className="bubble-header__title"
                style={{
                    padding: padding,
                    fontSize: textSize,
                    color: "#000",
                    fontFamily: "Montserrat",
                    fontWeight:600
                }}
            >
                {title}
            </div>
        </div>
    );
};

export default memo(BubbleHeader);
