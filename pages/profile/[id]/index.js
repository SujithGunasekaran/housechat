import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetUserInfo, useGetUser } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import Following from '../../../Components/Profile/Following';
import Followers from '../../../Components/Profile/Follower';
import EditProfile from '../../../Components/Profile/EditProfile';
import UserCard from '../../../Components/Profile/UserCard';

function Profile() {

    const [userFollowType, setUserFollowType] = useState('follower');

    const router = useRouter();

    // routes
    const { query } = router;

    // query
    const { data: userData, loading: userLoading, error: userError } = useGetUserInfo(query.id);
    const { data: loginUserData, loading: loginUserLoading, error: loginUserError } = useGetUser();

    const userInfo = userData?.getUserInfo ?? null;
    const loginUserInfo = loginUserData?.user ?? null;

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
                        />
                        {userError || loginUserError && <div className="profile_error">Something went Wrong or Please check you internet connection..</div>}
                    </div>
                    <div className="col-md-8">
                        {
                            userFollowType === 'editProfile' &&
                            <div className="row">
                                <div className="col-md-8 mx-auto">
                                    <div className="follow_edit_card">
                                        <div className="follow_edit_heading">Edit Profile</div>
                                        <EditProfile
                                            userId={query.id}
                                            userData={userData}
                                        />
                                    </div>
                                </div>
                            </div>
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
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default withApollo(Profile);

