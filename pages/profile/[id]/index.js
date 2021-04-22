import { useState } from 'react';
import { useGetUserInfo, useGetUser } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import Following from '../../../Components/Profile/Following';
import Followers from '../../../Components/Profile/Follower';
import EditProfile from '../../../Components/Profile/EditProfile';
import UserCard from '../../../Components/Profile/UserCard';

function Profile(props) {

    const [userFollowType, setUserFollowType] = useState('follower');
    const [showFollowBtn, setShowFollowBtn] = useState(false);

    // routes
    const { query } = props;

    // query
    const { data: userData, loading: userLoading, error: userError } = useGetUserInfo(query.id);
    const { data: loginUserData, loading: loginUserLoading, error: loginUserError } = useGetUser();

    const userInfo = userData?.getUserInfo ?? null;
    const loginUserInfo = loginUserData?.user ?? null;

    // methods or functions

    const handleFollow = (state) => {
        state(true);
    }


    return (
        <div className="profile_main_container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserCard
                            userFollowType={userFollowType}
                            setUserFollowType={setUserFollowType}
                            loading={userLoading}
                            userInfo={userInfo}
                            loginUserInfo={loginUserInfo}
                            showFollowBtn={showFollowBtn}
                        />
                        {userError || loginUserError && <div className="profile_error">Something went Wrong or Please check you internet connection..</div>}
                    </div>
                    <div className="col-md-8">
                        {
                            userFollowType === 'editProfile' &&
                            <EditProfile />
                        }
                        {
                            userFollowType === 'following' &&
                            <Following
                                userId={query.id}
                                loginUserInfo={loginUserInfo}
                            />
                        }
                        {
                            userFollowType === 'follower' &&
                            <Followers
                                userId={query.id}
                                loginUserInfo={loginUserInfo}
                                handleFollow={handleFollow}
                                setShowFollowBtn={setShowFollowBtn}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

Profile.getInitialProps = ({ query }) => {
    return { query };
}

export default withApollo(Profile);

