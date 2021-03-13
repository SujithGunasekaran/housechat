
import { useGetUser } from '../apollo/actions';
import Redirect from '../Components/Redirect';

const withAuth = (Component, role, options = { ssr: false }) => {

    function newComponent(props) {

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
                    return serverRedirect(res, '/Login');
                }
                if (role && role.length > 0 && user && !role.includes(user.role)) {
                    return serverRedirect(res, '/Login');
                }
            }

            const pageProps = Component.getInitialProps && await Component.getInitialProps(context);
            return { ...pageProps };
        }
    }

    return newComponent;
}



export default withAuth;