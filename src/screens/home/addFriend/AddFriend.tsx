import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import MessageBox from '../../../components/MessageBox';
import RowItemView from '../../../components/RowItem';
import useRootStore from '../../../hooks/useRootStore';
import { userList } from '../../../store/dataBase';
import { InputComponent } from '../../../utils/inputComponent';
import styles from "./AddFriend.module.css"
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import Loading from '../../../utils/loading';

const AddFriend = () => {

  const { nonFriends, loading, getNonFriends } = useRootStore().usersStore

  const { createFriend } = useRootStore().friendsStore

  useEffect(() => {
    getNonFriends()
  }, [])

  const handleChangeText = () => { }

  const { t } = useTranslation()
  const navigation = useNavigate()

  return (
    <div className={styles.container}>
      <Header
        text={t("addFriend")}
        leftIcon="arrowLeft"
        onLeftIconPress={() => navigation("")}
      />
      <div style={{ width: "90%", margin: "3px auto" }}>
        <InputComponent
          onChangeText={handleChangeText}
          placeholder="Search..."
        />
      </div>
      <Loading isLoad={loading} />
      <div className={styles.main}>
        {nonFriends?.length !== 0 ?
          nonFriends?.map((e, index) => {
            return (
              <div className={styles.rowItemBox} key={index}>
                <RowItemView
                  imageUrl={e.avatar ? e.avatar : ""}
                  color={e.color ? e.color : "linear-gradient(#ddd, #666)"}
                  text={e.username}
                  loading={false}
                  onNamePress={() => createFriend(e.id)}
                />
              </div>
            );
          }) :
          <MessageBox title="No users available" />
        }
      </div>
    </div>
  )
}

export default observer(AddFriend)
