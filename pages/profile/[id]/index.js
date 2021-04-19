import { useState } from 'react';
import { useGetUserInfo } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import PersonIcon from '@material-ui/icons/Person';
import Following from '../../../Components/Profile/Following';
import Followers from '../../../Components/Profile/Follower';
import EditProfile from '../../../Components/Profile/EditProfile';

function Profile(props) {

    const [userFollowType, setUserFollowType] = useState('follower');

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
                    <div className="col-md-4">
                        <div className="profile_page_sticky_column">
                            <div className="profile_card_container">
                                <div className="profile_card_user_container">
                                    <div className="profile_card_avatar_background">
                                        <PersonIcon className="profile_card_avatar" />
                                    </div>
                                    <div className="profile_user_info_container">
                                        <div className="profile_card_user_name">Sujith</div>
                                        <button className="profile_card_edit_btn" onClick={() => setUserFollowType('editProfile')}>Edit Profile</button>
                                        <div className="profile_card_following_container">
                                            <div className={`profile_card_followers ${userFollowType === 'follower' ? 'profile_active' : ''}`} onClick={() => setUserFollowType('follower')}>
                                                <span className="profile_card_count">0</span>
                                                followers
                                            </div>
                                            <div className={`profile_card_followings ${userFollowType === 'following' ? 'profile_active' : ''}`} onClick={() => setUserFollowType('following')}>
                                                <span className="profile_card_count">0</span>
                                                followings
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        {
                            userFollowType === 'editProfile' &&
                            <EditProfile />
                        }
                        {
                            userFollowType === 'following' &&
                            <Following />
                        }
                        {
                            userFollowType === 'follower' &&
                            <Followers />
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

export default withApollo(Profile, { getDataFromTree });

