import CircularLoading from '../CircularLoading';
import { useGetUserFollower } from '../../apollo/actions';

export default function Followers(props) {

    const { userId } = props;

    // query

    const { data, loading, error } = useGetUserFollower(userId);

    const userFollowerData = data?.getUserFollowers?.userFollowersData ?? [];

    console.log("userFollowerData", userFollowerData);

    return (
        <div>
            { loading && <CircularLoading />}
            Follower component
        </div>
    )
}
