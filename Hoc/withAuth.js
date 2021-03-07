
import { useGetUser } from '../apollo/actions';
import Redirect from '../Components/Redirect';

const withAuth = (Component) => (props) => {

    const { data, loading, error } = useGetUser({ fetchPolicy: 'network-only' })

    if (!loading && (data && !data.user || error) && typeof window !== 'undefined') {
        return (
            <Redirect path="/Login" />
        )
    }

    if (data && data.user) {
        return <Component {...props} />
    }

    return (
        <div className="form_main_container">Authentcation in process....</div>
    )
}

export default withAuth;