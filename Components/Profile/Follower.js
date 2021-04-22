import { useEffect } from 'react';
import CircularLoading from '../CircularLoading';
import { useGetUserFollower } from '../../apollo/actions';
import PersonIcon from '@material-ui/icons/Person';


export default function Followers(props) {

    const { userId, loginUserInfo, handleFollow, setShowFollowBtn } = props;

    // query
    const { data, loading, error } = useGetUserFollower(userId);

    const userFollower = data ? data?.getUserFollowers?.userFollowersData ?? [] : null;

    const checkLoginUser = () => {
        if (userFollower && userFollower.length > 0 && loginUserInfo && userId !== loginUserInfo._id) {
            let isLoggedInUserFollower = null;
            isLoggedInUserFollower = userFollower.find(userData => userData.userInfo._id === loginUserInfo._id);
            if (!isLoggedInUserFollower) handleFollow(setShowFollowBtn);
        }
        else if (userFollower && userFollower.length === 0 && loginUserInfo && userId !== loginUserInfo._id) {
            handleFollow(setShowFollowBtn);
        }
    }

    useEffect(() => {
        checkLoginUser();
    }, [userFollower])

    return (
        <div>
            { loading && <CircularLoading />}
            <div className="follow_container">
                {
                    userFollower &&
                    userFollower.length > 0 &&
                    userFollower.map((userData, index) => (
                        <div key={index}>
                            <div className="follow_card_container">
                                <div className="follow_card_avatar_background">
                                    <PersonIcon className="follow_card_avatar" />
                                </div>
                                <div className="follow_card_user_info">
                                    <div className="follow_card_user_name">{userData.userInfo.name}</div>
                                </div>
                            </div>
                            { userFollower.length - 1 > index && <hr className="follow_card_hr"></hr>}
                        </div>
                    ))
                }
                {error && <div></div>}
            </div>
        </div>
    )
}
