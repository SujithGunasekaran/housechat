import withApollo from '../hoc/withApollo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSignout } from '../apollo/actions';
import BaseLayout from '../layouts/BaseLayout';

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
        // <BaseLayout>
        <div className="form_main_container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <div className="form_container">
                            <div className="form_info">Signing out.....</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </BaseLayout>
    )
}

export default withApollo(Logout)