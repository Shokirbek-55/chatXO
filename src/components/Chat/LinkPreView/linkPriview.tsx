import { styled } from "styled-components";
import { RawMessage } from "../../../types/channel";
import { relevanceFuniction } from "../../../utils/boxShadov";
import Text from "../../Text/Text";
import styles from "./index.module.css";

interface Props {
    message: RawMessage;
    textBackColor?: string;
}

const LinkPriviewComponent = ({ message, textBackColor }: Props) => {
    const MESSAGE_STYLE = relevanceFuniction(message);
    const textSize = MESSAGE_STYLE?.fontSize;
    const textWeight = MESSAGE_STYLE?.fontWeight;
    const textLineHeight = MESSAGE_STYLE?.lineHeight;

    const renderMessage = ({
        fontSize,
        fontWeight,
        lineHeight,
    }: {
        fontSize: string;
        fontWeight: number;
        lineHeight: string;
    }) => {
        const regex =
            /(http:\/\/|https:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)*([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}(\S*)/g;
        const links = message.message.match(regex);

        if (!links || links.length === 0)
            return (
                <Paragraph
                    $fontSize={fontSize}
                    $fontWeight={fontWeight}
                    $lineHeight={lineHeight}
                >
                    {message.message}
                </Paragraph>
            );

        function urlify(text: string) {
            const replacedText = text.replace(regex, (match) => {
                const isLink = /^(http:\/\/|https:\/\/)/i.test(match);
                const href = isLink ? match : `http://${match}`;
                return `<a href="${href}" target="_blank" rel="noopener noreferrer">${match}</a>`;
            });
            return replacedText;
        }

        const text = urlify(message.message);
        return (
            <Paragraph
                dangerouslySetInnerHTML={{ __html: text }}
                $fontSize={fontSize}
                $fontWeight={fontWeight}
                $lineHeight={lineHeight}
            />
        );
    };

    return (
        <div className={styles.textCard}>
            <Text
                style={{
                    backgroundColor: textBackColor,
                }}
            >
                {renderMessage({
                    fontSize: textSize,
                    fontWeight: textWeight,
                    lineHeight: textLineHeight,
                })}
            </Text>
        </div>
    );
};

export default LinkPriviewComponent;

const Paragraph = styled.p<{
    $fontSize?: string;
    $fontWeight?: number;
    $lineHeight?: string;
}>`
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-word;

    font-size: ${({ $fontSize }) => $fontSize};
    font-weight: ${({ $fontWeight }) => $fontWeight};
    line-height: ${({ $lineHeight }) => $lineHeight};
`;
