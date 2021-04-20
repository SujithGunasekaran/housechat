import CircularLoading from '../CircularLoading';
import { useGetUserFollowing } from '../../apollo/actions';


export default function Following(props) {

    const { userId } = props;

    // query
    const { data, loading, error } = useGetUserFollowing(userId);

    const userFollowing = data?.getUserFollowing?.userFollowingData ?? [];

    console.log("userFollowing", userFollowing);

    return (
        <div>
            { loading && <CircularLoading />}
            Following Component
        </div>
    )
}

