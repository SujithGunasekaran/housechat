
import { useGetUser } from '../apollo/actions';
import Redirect from '../Components/Redirect';
import Loader from '../Components/Loader';

const withAuth = (Component, role, options = { ssr: false }) => {

    function newComponent(props) {

        const { data, loading, error } = useGetUser({ fetchPolicy: 'network-only' })

        if (!loading && (data && !data.user || error) && typeof window !== 'undefined') {
            return (
                <Redirect path="/Login" query={{ message: 'NOT_AUTHENTICATED', type: 'Error' }} />
            )
        }

        if (data && data.user) {
            if (role && role.length > 0 && !role.includes(data.user.role)) {
                return <Redirect path="/Login" query={{ message: 'NOT_AUTHORIZED', type: 'Error' }} />
            }
            return <Component {...props} />
        }

        return (
            <div className="spinner_container">
                <Loader />
            </div>
        )
    }

    if (options.ssr) {
        newComponent.getInitialProps = async (context) => {
            const serverRedirect = (res, redirectPagePath) => {
                res.redirect(redirectPagePath);
                res.end();
                return {};
            }
            const { req, res } = context;
            if (req) {
                const { user } = req;
                if (!user) {
                    return serverRedirect(res, '/Login?message=NOT_AUTHENTICATED&type=Error');
                }
                if (role && role.length > 0 && user && !role.includes(user.role)) {
                    return serverRedirect(res, '/Login?message=NOT_AUTHORIZED&Type=Error');
                }
            }

            const pageProps = Component.getInitialProps && await Component.getInitialProps(context);
            return { ...pageProps };
        }
    }

    return newComponent;
}



export default withAuth;