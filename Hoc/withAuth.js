
import { useGetUser } from '../apollo/actions';
import Redirect from '../Components/Redirect';

const withAuth = (Component, role) => (props) => {

    const { data, loading, error } = useGetUser({ fetchPolicy: 'network-only' })

    if (!loading && (data && !data.user || error) && typeof window !== 'undefined') {
        return (
            <Redirect path="/Login" />
        )
    }

    if (data && data.user) {
        if (role && role.length > 0 && !role.includes(data.user.role)) {
            return <Redirect path="/Login" />
        }
        return <Component {...props} />
    }

    // return (
    //     <div className="form_main_container">Authentcation in process....</div>
    // )

    return null;
}

export default withAuth;