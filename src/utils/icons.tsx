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
} from "react-icons/md";
import { ImStop } from "react-icons/im";
import { HiCheckCircle, HiDownload } from "react-icons/hi";
import {
    BsFillPersonPlusFill,
    BsFillShareFill,
    BsZoomIn,
    BsZoomOut,
} from "react-icons/bs";
import {
    FaUserCircle,
    FaMicrophone,
    FaFilter,
    FaUsersCog,
    FaUsersSlash,
    FaReply,
} from "react-icons/fa";
import { IoMdSettings, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FiEdit, FiLogOut } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { RiSendPlaneFill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { TbFileText, TbPhoto, TbHash, TbEyeOff, TbX } from "react-icons/tb";
import {
    AiFillCamera,
    AiOutlineBarChart,
    AiOutlineMenu,
    AiOutlinePlusCircle,
} from "react-icons/ai";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import styles from "./index.module.css";
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
                transition: "ease-in-out 0.15s",
            }}
        >
            <MdGroups />
        </span>
    );
};

export const BsFillPersonPlusFillIcon = ({
    size = 25,
    padding = 10,
    radius = 50,
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    size = 28,
    padding = 10,
    radius = 50,
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                width: "45px",
                height: "45px",
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <FaFilter />
        </span>
    );
};

export const ArrowUpIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <IoIosArrowUp />
        </span>
    );
};

export const LogoutIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    size = 28,
    padding = 10,
    radius = 50,
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <FaMicrophone />
        </span>
    );
};

export const SearchIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
  return (
    <span
      className={hoverActive ? styles.iconsHoverAndActive : ""}
      style={{
        fontSize: `${size}px`,
        display: "flex",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    size = 28,
    padding = 10,
    radius = 50,
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <IoIosArrowDown />
        </span>
    );
};

export const ChartIcon = ({
    size = 28,
    padding = 10,
    radius = 50,
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
    onClick,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
    onClick,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
    onClick,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
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
    background = "transparent",
    color = "black",
    hoverActive = true,
}: MdgroupProp) => {
    return (
        <span
            className={hoverActive ? styles.iconsHoverAndActive : ""}
            style={{
                fontSize: `${size}px`,
                display: "flex",
                padding: `${padding}px`,
                cursor: "pointer",
                borderRadius: `${radius}%`,
                backgroundColor: `${background}`,
                color: `${color}`,
            }}
        >
            <AiOutlinePlusCircle />
        </span>
    );
};
