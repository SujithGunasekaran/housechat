import withApollo from '../hoc/withApollo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSignout } from '../apollo/actions';

const Logout = ({ apollo }) => {

    const [signOut] = useSignout();
    const router = useRouter();

    useEffect(() => {
        signOut().then(() => {
            apollo.resetStore().then(() => {
                router.push('/Login')
            })
        })
    }, [])

    return (
        <div className="form_main_container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="form_heading">Logout</div>
                        <div className="form_container">
                            <div className="form_info">Signing out.....</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withApollo(Logout)