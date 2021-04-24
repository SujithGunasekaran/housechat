import PersonIcon from '@material-ui/icons/Person';
import { useFollowUser } from '../../apollo/actions';

export default function UserCard(props) {

    const { userInfo, loginUserInfo, loading, setUserFollowType, userFollowType } = props;

    // mutations
    const [followUser, { data: followData, loading: followLoading, error: followError }] = useFollowUser();

    const handleFollow = (loggedInUserId, followerId) => {
        followUser({ variables: { userInfo: loggedInUserId, userFollowingInfo: followerId } });
    }

    return (
        <div className="profile_page_sticky_column">
            <div className="profile_card_container">
                <div className="profile_card_user_container">
                    <div className="profile_card_avatar_background">
                        <PersonIcon className="profile_card_avatar" />
                    </div>
                    <div className="profile_user_info_container">
                        <div className="profile_card_user_name">{userInfo && userInfo.userData.username}</div>
                        {/* <div className="profile_card_name">{userInfo && userInfo.userData.name}</div> */}
                        {
                            loginUserInfo && userInfo && loginUserInfo._id === userInfo.userData._id ?
                                <button className="profile_card_edit_btn" onClick={() => setUserFollowType('editProfile')}>Edit Profile</button>
                                :
                                userInfo && userInfo.showFollow && <button className="profile_card_edit_btn" onClick={() => handleFollow(loginUserInfo._id, userInfo.userData._id)}>Follow</button>
                        }
                        <div className="profile_card_following_container">
                            <div className={`profile_card_followers ${userFollowType === 'follower' ? 'profile_active' : ''}`} onClick={() => setUserFollowType('follower')}>
                                <span className={`profile_card_count`}>{userInfo && userInfo.followersCount}</span>
                                followers
                            </div>
                            <div className={`profile_card_followings ${userFollowType === 'following' ? 'profile_active' : ''}`} onClick={() => setUserFollowType('following')}>
                                <span className="profile_card_count">{userInfo && userInfo.followingCount}</span>
                                followings
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { followError && <div></div>}
        </div>
    )
}
