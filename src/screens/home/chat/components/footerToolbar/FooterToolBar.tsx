import { FC } from "react";
import styles from "./index.module.css";


import Colors from "../../../../../utils/colors";
import { CameraIcon, ChartIcon, DocumentIcon, HashtagIcon, HiddenIcon, ImageAddIcon } from "../../../../../utils/icons";
import ToolbarIcon from "../../../../../components/ToolbarIcon/ToolbarIcon";
import ProgressBarView from "../../../../../components/Chat/progressbar";


interface Props {
  props: boolean;
  setOpenHashtags: any;
  openHashTags: boolean;
}
const FooterToolbarView: FC<Props> = ({
  props,
  setOpenHashtags,
  openHashTags,
}) => {

  const toggleSwitchPollModal = () => {
    
  };

  if (!props) {
    return null
  }

  const handleOpenHashtags = () => {
    setOpenHashtags(!openHashTags);
  };

  return (
    <div className={styles.container} style={{display: props ? 'flex' : 'none'}}>
      <ProgressBarView progress={{
        progress: 10
      }} />
      {props ? (
        <div className={styles.footerToolbar}>
          <div className={styles.toolbarLeft}>
            <ToolbarIcon
            // onClickButton={uploadFile}
            >
              <HiddenIcon size={17} color={Colors.GullGray} padding={10} />
            </ToolbarIcon>

            <ToolbarIcon onClickButton={() => handleOpenHashtags()}>
              <HashtagIcon size={17} color={Colors.GullGray} padding={10} />
            </ToolbarIcon>
          </div>
          <div className={styles.toolbarRight}>
            <ToolbarIcon onClickButton={() => toggleSwitchPollModal()}>
              <ChartIcon size={17} color={Colors.GullGray} padding={10} />
            </ToolbarIcon>
            <ToolbarIcon
              accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .csv, .jpg, .jpeg, .png, .gif, .bmp"
              onChange={(e: any) => {}}
            >
              <DocumentIcon size={17} color={Colors.GullGray} padding={10} />
            </ToolbarIcon>
            <ToolbarIcon
              accept="video/*"
              onChange={(e: any) => {}}
            >
              <CameraIcon size={17} color={Colors.GullGray} padding={10} />
            </ToolbarIcon>
            <ToolbarIcon
              accept="image/*"
              onChange={(e: any) => {}}
            >
              <ImageAddIcon size={17} color={Colors.GullGray} padding={10} />
            </ToolbarIcon>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default FooterToolbarView;
