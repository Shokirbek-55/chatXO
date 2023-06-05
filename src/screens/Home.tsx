import useRootStore from "../hooks/useRootStore"

function Home() {

    const { togleToken } = useRootStore().loginStore

    return (
        <div>
            <h1>Home</h1>
            <button onClick={togleToken}>True Token</button>
        </div>
    )
}

export default Home