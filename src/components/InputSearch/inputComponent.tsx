import styles from './index.module.css';

interface propType {
    placeholder?: any;
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
    onChangeText: (e: any) => void;
    value?: string;
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
    onChangeText,
    value,
}: propType) => {
    return (
        <>
            <input
                placeholder={placeholder}
                value={value}
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
                    outline: `${outline}`,
                }}
            />
        </>
    );
};
