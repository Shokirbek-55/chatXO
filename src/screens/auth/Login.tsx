import React from 'react'
import useRootStore from '../../hooks/useRootStore'
import { observer } from 'mobx-react-lite'

function Login() {

  const { togleToken } = useRootStore().loginStore

  return (
    <div>
      <h1>Login</h1>
      <button onClick={togleToken}>True Token</button>
    </div>
  )
}

export default observer(Login)