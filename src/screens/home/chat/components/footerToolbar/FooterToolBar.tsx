import { FC, useState } from 'react';
import styles from './index.module.css';
import Colors from '../../../../../utils/colors';
import { ChartIcon, DocumentIcon, HashtagIcon, HiddenIcon, ImageAddIcon } from '../../../../../utils/icons';
import ToolbarIcon from '../../../../../components/ToolbarIcon/ToolbarIcon';
import ProgressBarView from '../../../../../components/Chat/progressbar';
import { observer } from 'mobx-react-lite';
import useRootStore from '../../../../../hooks/useRootStore';
import { SendMessage } from '../../../../../types/channel';
import styled from 'styled-components';
import { ConfigProvider, Slider } from 'antd';
import Text from '../../../../../components/Text/Text';

interface Props {
    props: boolean;
    setOpenHashtags: any;
    openHashTags: boolean;
}

const FooterToolbarView: FC<Props> = ({ props, setOpenHashtags, openHashTags }) => {
    const { readFile, setMinRelevance, minRelevance } = useRootStore().messageStore;
    const { show } = useRootStore().visibleStore;
    const [open, setOpen] = useState(false);

    const handleCancelVisibility = () => {
        setOpen(false);
        setMinRelevance(-1);
    };

    const handleOpenHashtags = () => {
        setOpenHashtags(!openHashTags);
    };

    const uploadFile = (e: File) => {
        readFile(e, e.type.split('/')[0] as SendMessage['type']);
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Slider: {
                        handleSize: 8,
                        handleSizeHover: 8,
                        //   handleActiveColor: '#EA33C7',
                        //   handleColor: '#EA33C7',
                        //   dotActiveBorderColor: '#EA33C7',
                    },
                },
                token: {
                    colorPrimaryBorderHover: '#EA33C7',
                },
            }}
        >
            <div className={styles.container} style={{ display: props ? 'flex' : 'none' }}>
                <ProgressBarView
                    progress={{
                        progress: 10,
                    }}
                />
                {props ? (
                    <div className={styles.footerToolbar}>
                        <div className={styles.toolbarLeft}>
                            <ToolbarIcon onClickButton={() => setOpen(!open)}>
                                <HiddenIcon size={17} color={Colors.GullGray} padding={10} />
                            </ToolbarIcon>
                            <ToolbarIcon onClickButton={() => handleOpenHashtags()}>
                                <HashtagIcon size={17} color={Colors.GullGray} padding={10} />
                            </ToolbarIcon>
                        </div>
                        <div className={styles.toolbarRight}>
                            <ToolbarIcon onClickButton={() => show('pollMesssageCard')}>
                                <ChartIcon size={17} color={Colors.GullGray} padding={10} />
                            </ToolbarIcon>
                            <ToolbarIcon
                                accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .csv, .jpg, .jpeg, .png, .gif, .bmp"
                                onChange={e => readFile(e, 'document')}
                            >
                                <DocumentIcon size={17} color={Colors.GullGray} padding={10} />
                            </ToolbarIcon>
                            <ToolbarIcon accept="image/*, video/*" onChange={e => uploadFile(e)}>
                                <ImageAddIcon size={17} color={Colors.GullGray} padding={10} />
                            </ToolbarIcon>
                        </div>
                        <SilderContainer $open={open}>
                            <div className="textBox">
                                <Text
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: 400,
                                        color: '#97a6bc',
                                    }}
                                >
                                    Min Relevance {minRelevance === -1 ? 0 : minRelevance}
                                </Text>
                            </div>
                            <div className="box">
                                <Slider
                                    min={0}
                                    max={100}
                                    onChange={e => setMinRelevance(e)}
                                    defaultValue={minRelevance}
                                    railStyle={{
                                        backgroundColor: '#97a6bc',
                                    }}
                                    trackStyle={{
                                        backgroundColor: '#EA33C7',
                                    }}
                                />
                            </div>
                            <div className="buttons">
                                <button className="button" onClick={handleCancelVisibility}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 300,
                                            color: '#97a6bc',
                                        }}
                                    >
                                        Cancel
                                    </Text>
                                </button>
                            </div>
                        </SilderContainer>
                    </div>
                ) : null}
            </div>
        </ConfigProvider>
    );
};
export default observer(FooterToolbarView);

const SilderContainer = styled.div<{ $open: boolean }>`
    position: absolute;
    left: 55px;
    width: calc(100% - 60px);
    background-color: #fff;
    padding-right: 10px;
    align-items: center;
    display: ${({ $open }) => ($open ? 'flex' : 'none')};

    .textBox {
        width: 120px;
    }

    .box {
        height: 100%;
        flex: 1;
    }

    .buttons {
        width: 80px;
        height: 100%;

        .button {
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
        }

        .box {
            width: 70%;
        }

        .buttons {
            width: 9%;
            height: 100%;

            .button {
                width: 100%;
                height: 100%;
                background-color: transparent;
                border: none;
                outline: none;
                cursor: pointer;
            }
        }
    }
`;
