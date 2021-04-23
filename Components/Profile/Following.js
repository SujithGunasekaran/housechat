import CircularLoading from '../CircularLoading';
import { useGetUserFollowing, useDeleteFollowingUser } from '../../apollo/actions';
import PersonIcon from '@material-ui/icons/Person';


export default function Following(props) {

    const { userId, loginUserInfo } = props;

    // query
    const { data: getUserData, loading: getUserLoading, error: getUserError } = useGetUserFollowing(userId);

    // mutation
    const [deleteFollowingUser, { data: deleteUserData, loading: deleteUserLoading, error: deleteUserError }] = useDeleteFollowingUser();

    const userFollowing = getUserData?.getUserFollowing?.userFollowingData ?? [];

    const handleUnFollow = (followingUserId) => {
        deleteFollowingUser({ variables: { userInfo: userId, userFollowingInfo: followingUserId } });
    }

    return (
        <div>
            { getUserLoading && <CircularLoading />}
            <div className="follow_container">
                {
                    userFollowing.length > 0 &&
                    userFollowing.map((userData, index) => (
                        <div key={index}>
                            <div className="follow_card_container">
                                <div className="follow_card_avatar_background">
                                    <PersonIcon className="follow_card_avatar" />
                                </div>
                                <div className="follow_card_user_info">
                                    <div className="follow_card_user_name">{userData.userFollowingInfo.name}</div>
                                </div>
                                {
                                    loginUserInfo && loginUserInfo._id === userId &&
                                    <button className="follow_card_unfollow_btn" onClick={() => handleUnFollow(userData.userFollowingInfo._id)}>unfollow</button>
                                }
                            </div>
                            { userFollowing.length - 1 > index && <hr className="follow_card_hr"></hr>}
                        </div>
                    ))
                }
                {getUserError || deleteUserError && <div></div>}
            </div>
        </div>
    )
}

