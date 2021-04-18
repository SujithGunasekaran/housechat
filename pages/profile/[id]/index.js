import React from 'react';
import { useGetUserInfo } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

function Profile(props) {

    // routes
    const { query } = props;

    // query
    const { data, loading, error } = useGetUserInfo(query.id);

    console.log("data", data);
    console.log("error", error);

    return (
        <div className="profile_main_container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        Profile Component
                    </div>
                </div>
            </div>
        </div>
    )

}

Profile.getInitialProps = ({ query }) => {
    return { query };
}

export default withApollo(Profile, { getDataFromTree });

