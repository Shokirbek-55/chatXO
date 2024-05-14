import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import MessageBox from "../../../components/MessageBox/MessageBox";
import RowItemView from "../../../components/RowItem";
import { TMP_URL } from "../../../env";
import useRootStore from "../../../hooks/useRootStore";
import { InputComponent } from "../../../utils/inputComponent";
import styles from "./AddFriend.module.css";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AddFriend = () => {
  const { t } = useTranslation();
  const { nonFriends, getUsersFilter } = useRootStore().usersStore;

  const { createFriend } = useRootStore().friendsStore;
  const { closeModal } = useRootStore().routerStore;

  const handleChangeText = (text: string) => {
    getUsersFilter(text);
  };

  return (
    <div className={styles.container}>
      <Header
        style={{ zIndex: 1000 }}
        text={t("addFriend")}
        leftIcon="arrowLeft"
        onLeftIconPress={() => closeModal("left")}
      />
      <div style={{ width: "90%", margin: "3px auto" }}>
        <InputComponent
          onChangeText={handleChangeText}
          placeholder="Search..."
        />
      </div>
      <div className={styles.main}>
        {!nonFriends && (
          <div className={styles.loadingError}>
            <MessageBox title={`${t("No Internet Connection")}`} />
          </div>
        )}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className={styles.contentBox}
        >
          {nonFriends?.length !== 0 ? (
            nonFriends?.map((e, index) => {
              return (
                <motion.div
                  variants={item}
                  key={index}
                  id="map-dev"
                  className={styles.channelRowBox}
                >
                  <RowItemView
                    imageUrl={e.avatar ? `${TMP_URL}/${e.avatar}` : ""}
                    color={
                      e.color
                        ? `linear-gradient(25deg, ${e.color} 30%, #ddd 100%)`
                        : "linear-gradient(#ddd, #666)"
                    }
                    text={e.username}
                    loading={false}
                    onPressComponent={() => createFriend(e.id ? e.id : 0)}
                  />
                </motion.div>
              );
            })
          ) : (
            <MessageBox title="No users available" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default observer(AddFriend);
