import { useSelector } from 'react-redux'
import { RootState} from '../store/index'
import Menu from '../components/Menu';
import Dashboard from '../components/Dashboard';

function Home() {

    const userData = useSelector((state: RootState) => state.authenticator)

    return (
        <>
            <Menu/>
            <Dashboard/>
        </>
    )
}

export default Home;