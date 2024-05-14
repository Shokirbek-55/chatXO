import {
    MdGroups,
    MdGroupAdd,
    MdContentCopy,
    MdOutlineVpnKey,
    MdOutlineDelete,
    MdAdminPanelSettings,
    MdOutlineSaveAlt,
    MdOutlineClose,
    MdReportGmailerrorred,
    MdOutlineSlowMotionVideo,
} from 'react-icons/md';
import { ImStop } from 'react-icons/im';
import { HiCheckCircle, HiDownload } from 'react-icons/hi';
import { BsFillPersonPlusFill, BsFillShareFill, BsZoomIn, BsZoomOut } from 'react-icons/bs';
import { FaUserCircle, FaMicrophone, FaFilter, FaUsersCog, FaUsersSlash, FaReply } from 'react-icons/fa';
import { IoMdSettings, IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { FiEdit, FiLogOut } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { RiSendPlaneFill } from 'react-icons/ri';
import { GrUpdate } from 'react-icons/gr';
import { TbFileText, TbPhoto, TbHash, TbEyeOff, TbX } from 'react-icons/tb';
import { AiFillCamera, AiOutlineBarChart, AiOutlineMenu, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { IoIosMore } from 'react-icons/io';
import styles from './index.module.css';
interface MdgroupProp {
    size?: number;
    padding?: number;
    radius?: number;
    background?: string;
    color?: string;
    hoverActive?: boolean;
    onClick?: () => void;
}
export const MdGroupsIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
                transition: 'ease-in-out 0.15s',
            }}
        >
            <MdGroups />
        </span>
    );
};

export const MoreDotIcon = ({
    size = 25,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <IoIosMore />
        </span>
    );
};

export const BsFillPersonPlusFillIcon = ({
    size = 25,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <BsFillPersonPlusFill />
        </span>
    );
};
export const CheckIcon = ({
    size = 28,
    padding = 5,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <HiCheckCircle />
        </span>
    );
};

export const MdGroupAddIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdGroupAdd />
        </span>
    );
};

export const AccountIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <FaUserCircle />
        </span>
    );
};
export const ArrowLeftIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdOutlineKeyboardArrowLeft />
        </span>
    );
};
export const ArrowRightIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdOutlineKeyboardArrowRight />
        </span>
    );
};

export const SettingIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <IoMdSettings />
        </span>
    );
};

export const FillterIcon = ({
    size = 18,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <svg
                width={`${size}`}
                height={`${size}`}
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.899727 0.246979H0.900099V0.247573L0.899727 0.246979ZM3.0371 3.6597L1.54396 1.27562H17.3555L15.8623 3.6597H3.0371ZM3.68145 4.68852L5.08787 6.93413H13.8116L15.218 4.68852H3.68145ZM7.0456 10.06L5.73222 7.96295H13.1672L11.8538 10.06H7.0456ZM7.68995 11.0888L9.44973 13.8986L11.2095 11.0888H7.68995Z"
                    fill="#7FA88B"
                />
            </svg>
        </span>
    );
};

export const ArrowUpIcon = ({
    size = 18,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <svg width={`${size}`} height={`${size}`} viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 6.5L6.5 1L1 6.5"
                    stroke="#7FA88B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
};

export const LogoutIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <FiLogOut />
        </span>
    );
};

export const MicrophoneIcon = ({
    size = 22,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <svg
                width={`${size}`}
                height={`${size}`}
                viewBox="0 0 15 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7.5 0C8.35248 0 9.17005 0.365976 9.77284 1.01742C10.3756 1.66886 10.7143 2.55241 10.7143 3.47368V10.4211C10.7143 11.3423 10.3756 12.2259 9.77284 12.8773C9.17005 13.5288 8.35248 13.8947 7.5 13.8947C6.64752 13.8947 5.82995 13.5288 5.22716 12.8773C4.62436 12.2259 4.28571 11.3423 4.28571 10.4211V3.47368C4.28571 2.55241 4.62436 1.66886 5.22716 1.01742C5.82995 0.365976 6.64752 0 7.5 0ZM15 10.4211C15 14.5084 12.2036 17.8779 8.57143 18.4453V22H6.42857V18.4453C2.79643 17.8779 0 14.5084 0 10.4211H2.14286C2.14286 11.9565 2.70727 13.4291 3.71193 14.5148C4.71659 15.6006 6.0792 16.2105 7.5 16.2105C8.9208 16.2105 10.2834 15.6006 11.2881 14.5148C12.2927 13.4291 12.8571 11.9565 12.8571 10.4211H15Z"
                    fill="#7FA88B"
                />
            </svg>
        </span>
    );
};

export const SearchIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <GoSearch />
        </span>
    );
};
export const ShareIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <BsFillShareFill />
        </span>
    );
};

export const CoppyIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdContentCopy />
        </span>
    );
};

export const EditIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <FiEdit />
        </span>
    );
};

export const UsersInfo = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <FaUsersCog />
        </span>
    );
};

export const UsersBlock = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <FaUsersSlash />
        </span>
    );
};

export const HiddenIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <TbEyeOff />
        </span>
    );
};

export const HashtagIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <TbHash />
        </span>
    );
};

export const DocumentIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <TbFileText />
        </span>
    );
};

export const CameraIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <AiFillCamera />
        </span>
    );
};

export const ImageAddIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <TbPhoto />
        </span>
    );
};

export const PasswordIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdOutlineVpnKey />
        </span>
    );
};

export const DeleteIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdOutlineDelete />
        </span>
    );
};

export const UpdateIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <GrUpdate />
        </span>
    );
};

export const AdminAddIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdAdminPanelSettings />
        </span>
    );
};

export const CloseIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <TbX />
        </span>
    );
};

export const ReplyIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <FaReply />
        </span>
    );
};

export const SendIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <RiSendPlaneFill />
        </span>
    );
};

export const ArrowDowunIcon = ({
    size = 18,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
                transform: 'rotate(180deg)',
            }}
        >
            <svg width={`${size}`} height={`${size}`} viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 6.5L6.5 1L1 6.5"
                    stroke="#7FA88B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
};

export const ChartIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <AiOutlineBarChart />
        </span>
    );
};

export const SaveIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdOutlineSaveAlt />
        </span>
    );
};

export const CloserNoCirculIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdOutlineClose />
        </span>
    );
};

export const ZoomInIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
    onClick,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
            onClick={onClick}
        >
            <BsZoomIn />
        </span>
    );
};

export const ZoomOutIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
    onClick,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
            onClick={onClick}
        >
            <BsZoomOut />
        </span>
    );
};

export const ReportIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdReportGmailerrorred />
        </span>
    );
};

export const VideoPlayIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <MdOutlineSlowMotionVideo />
        </span>
    );
};

export const StopIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <ImStop />
        </span>
    );
};

export const MenuIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
    onClick,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
            onClick={onClick}
        >
            <AiOutlineMenu />
        </span>
    );
};

export const DownloadIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <HiDownload />
        </span>
    );
};

export const PlusIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = 'transparent',
    color = 'black',
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ''}
            style={{
                fontSize: `${size}px`,
                display: 'flex',
                padding: `${padding}px`,
                cursor: 'pointer',
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <AiOutlinePlusCircle />
        </span>
    );
};
