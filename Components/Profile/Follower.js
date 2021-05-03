import CircularLoading from '../CircularLoading';
import { useGetUserFollower } from '../../apollo/actions';
import PersonIcon from '@material-ui/icons/Person';
import Link from 'next/link';

export default function Followers(props) {

    const { userId } = props;

    // query
    const { data, loading, error } = useGetUserFollower(userId);

    const userFollower = data ? data?.getUserFollowers?.userFollowersData ?? [] : null;

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
                                    <Link href={`/profile/[id]`} as={`/profile/${userData.userInfo._id}`}>
                                        <div className="follow_card_user_name">{userData.userInfo.name}</div>
                                    </Link>
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
