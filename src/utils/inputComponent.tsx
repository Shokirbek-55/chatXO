import styles from './index.module.css';

interface propType {
    placeholder?: string;
    type?: string;
    width?: string;
    height?: string;
    padding?: string;
    border?: string;
    borderBottom?: string;
    color?: string;
    size?: number;
    backColor?: string;
    outline?: string;
    fontFamily?: string;
    fontWeight?: number;
    onChangeText: (e: any) => void;
}

export const InputComponent = ({
    placeholder = 'Enter text...',
    type = 'text',
    width = '100%',
    height = '40px',
    padding = '5px 10px',
    border = 'none',
    borderBottom = '1px solid #ccc',
    color = '#555',
    size = 16,
    backColor = '#fff',
    outline = 'none',
    fontFamily,
    fontWeight,
    onChangeText,
}: propType) => {
    return (
        <>
            <input
                placeholder={placeholder}
                type={type}
                className={styles.inputComonent}
                onChange={(e: any) => onChangeText(e.target.value as never)}
                style={{
                    width: `${width}`,
                    height: `${height}`,
                    padding: `${padding}`,
                    border: `${border}`,
                    borderBottom: `${borderBottom}`,
                    color: `${color}`,
                    fontSize: `${size}px`,
                    backgroundColor: `${backColor}`,
                    fontFamily: `${fontFamily ? fontFamily : 'Montserrat'}`,
                    fontWeight: fontWeight ? fontWeight : 600,
                    outline: `${outline}`,
                }}
            />
        </>
    );
};
