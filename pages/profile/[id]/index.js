import { useState } from 'react';
import { useGetUserInfo } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import Following from '../../../Components/Profile/Following';
import Followers from '../../../Components/Profile/Follower';
import EditProfile from '../../../Components/Profile/EditProfile';
import UserCard from '../../../Components/Profile/UserCard';

function Profile(props) {

    const [userFollowType, setUserFollowType] = useState('follower');

    // routes
    const { query } = props;

    // query
    const { data, loading, error } = useGetUserInfo(query.id);

    const userInfo = data && data.getUserInfo;

    return (
        <div className="profile_main_container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <UserCard
                            userFollowType={userFollowType}
                            setUserFollowType={setUserFollowType}
                            loading={loading}
                            error={error}
                            userInfo={userInfo}
                        />
                    </div>
                    <div className="col-md-6">
                        {
                            userFollowType === 'editProfile' &&
                            <EditProfile />
                        }
                        {
                            userFollowType === 'following' &&
                            <Following
                                userId={query.id}
                            />
                        }
                        {
                            userFollowType === 'follower' &&
                            <Followers
                                userId={query.id}
                            />
                        }
                    </div>
                </div>
            </div>
            {error && <div className="profile_error">Something went Wrong..</div>}
        </div>
    )

}

Profile.getInitialProps = ({ query }) => {
    return { query };
}

export default withApollo(Profile);

