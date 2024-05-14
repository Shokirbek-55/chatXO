import { useMemo } from 'react';
import Colors from './colors';
import { AdminAddIcon, BsFillPersonPlusFillIcon, DeleteIcon, MdGroupAddIcon, PasswordIcon, UpdateIcon } from './icons';
import styles from './index.module.css';
import { Dots, Spinner, Digital, Bounce, Squares, Levels, Sentry, Windmill } from 'react-activity';

const ButtonLoadingAnimations = {
    dots: Dots,
    sprinner: Spinner,
    digital: Digital,
    bounce: Bounce,
    squares: Squares,
    levels: Levels,
    sentry: Sentry,
    windmill: Windmill,
};

const ButtonIcons = {
    admin: MdGroupAddIcon,
    delete: DeleteIcon,
    new: BsFillPersonPlusFillIcon,
    adminPlus: AdminAddIcon,
    password: PasswordIcon,
    update: UpdateIcon,
};

interface Buttun {
    text?: string;
    textSize?: number;
    padding?: string;
    color?: string;
    backColor?: string;
    radius?: number;
    icon?: keyof typeof ButtonIcons;
    iconColor?: string;
    iconSize?: number;
    clickMe?: () => void;
    width?: string;
    height?: string;
    border?: string;
    margin?: string;
    type?: any;
    isLoading?: boolean;
    loadingType?: keyof typeof ButtonLoadingAnimations;
    disabled?: boolean;
}

export const ButtonComponent = ({
    text,
    textSize = 14,
    padding = '5px 15px',
    color = '#fff',
    backColor = Colors.Green,
    radius = 8,
    icon,
    iconColor = '#fff',
    iconSize = 16,
    clickMe,
    width = '48%',
    height = '35px',
    border = 'none',
    margin,
    type,
    isLoading = false,
    disabled = false,
    loadingType = 'dots',
}: Buttun) => {
    const [Loading, Icon] = useMemo(
        () => [loadingType && ButtonLoadingAnimations[loadingType], icon && ButtonIcons[icon]],
        [icon, loadingType],
    );

    const buttonDisabled = useMemo(() => disabled || isLoading, [disabled, isLoading]);
    return (
        <button
            onClick={clickMe}
            disabled={buttonDisabled}
            className={styles.buttonHoverAndActive}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                fontSize: `${textSize}px`,
                color: `${color}`,
                backgroundColor: `${backColor}`,
                padding: `${padding}`,
                borderRadius: `${radius}px`,
                cursor: 'pointer',
                width: `${width}`,
                height: `${height}`,
                border: border,
                margin: margin,
                ...(buttonDisabled && {
                    cursor: 'no-drop',
                    opacity: 0.5,
                }),
            }}
            type={type}
        >
            {!!Icon && <Icon hoverActive={false} color={iconColor} size={iconSize} padding={8} />}
            {isLoading ? <Loading /> : text}
        </button>
    );
};
