import { Slider } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { BiCheckbox, BiCheckCircle, BiCheckSquare } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { TMP_URL } from "../../env";
import useRootStore from "../../hooks/useRootStore";
import RowItemView from "../RowItem";
import styles from "./Relevence.module.css";

const Relevence = () => {
    const { visible, hide } = useRootStore().visibleStore;
    const {
        memberRelevence,
        updateMemberRelevance,
        setRelevanceChange,
        relevanceData,
    } = useRootStore().channelStore;

    const updateRelevance = () => {
        updateMemberRelevance(relevanceData);
        hide("RelevenceModal");
    };

    return (
        <div
            className={styles.container}
            style={{ display: visible.RelevenceModal ? "block" : "none" }}
        >
            <div className={styles.box}>
                <RowItemView
                    color={
                        memberRelevence?.color
                            ? `linear-gradient(25deg, ${memberRelevence?.color} 30%, #ddd 100%)`
                            : "linear-gradient(#ddd, #666)"
                    }
                    imageUrl={
                        memberRelevence?.avatar
                            ? `${TMP_URL}/${memberRelevence?.avatar}`
                            : ""
                    }
                    text={memberRelevence?.username}
                    loading={false}
                />
                <div className={styles.sliderBox}>
                    <Slider
                        className={styles.slider}
                        defaultValue={memberRelevence?.relevance}
                        value={relevanceData?.relevance}
                        onChange={(e) => setRelevanceChange(e)}
                    />
                    <span>{relevanceData?.relevance}</span>
                </div>
                <div className={styles.btnBox}>
                    <ImCancelCircle
                        onClick={() => hide("RelevenceModal")}
                        className={styles.cancel}
                        size={24}
                    />
                    <BiCheckCircle
                        onClick={updateRelevance}
                        className={styles.choose}
                        size={28}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(Relevence);
