import PersonIcon from '@material-ui/icons/Person';
import BaseLayout from '../../../layouts/BaseLayout';
import { useRouter } from 'next/router';
import { useGetTopicBySlug } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

const useInitialData = () => {

    const router = useRouter();
    const { topicSlug } = router.query;

    // Queries
    const { data } = useGetTopicBySlug(topicSlug);
    const topicData = data && data.topicBySlug || {};
    return { topicData }
}

function Post() {

    const { topicData } = useInitialData();
    console.log(topicData);
    return (
        <BaseLayout>
            <div>
                <div className="topic_post_main_container">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="topic_post_heading">{topicData.title}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9 mx-auto">
                                <div className="topic_post_container">
                                    <div className="row">
                                        <div className="col-1 col-sm-1 col-md-1">
                                            <PersonIcon className="topic_post_user_profile" />
                                        </div>
                                        <div className="col-11 col-sm-11 col-md-11">
                                            <div className="topic_post_user_info_display">
                                                <div className="topic_post_username">{topicData.user && topicData.user.username}</div>
                                                <div className="topic_post_user_answer">{topicData.content}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="topic_post_time">Posted : 2hr</div>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="topic_post_reply_container">
                                                <div className="topic_post_reply">Reply</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9 mx-auto">
                                <div className="topic_post_container">
                                    <div className="row">
                                        <div className="col-1 col-sm-1 col-md-1">
                                            <PersonIcon className="topic_post_user_profile" />
                                        </div>
                                        <div className="col-11 col-sm-11 col-md-11">
                                            <div className="topic_post_user_info_display">
                                                <div className="topic_post_username">James</div>
                                                <div className="topic_post_user_answer">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="topic_post_time">Posted : 2hr</div>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="topic_post_reply_container">
                                                <div className="topic_post_reply">Reply</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9 mx-auto">
                                <div className="topic_post_container">
                                    <div className="row">
                                        <div className="col-1 col-sm-1 col-md-1">
                                            <PersonIcon className="topic_post_user_profile" />
                                        </div>
                                        <div className="col-11 col-sm-11 col-md-11">
                                            <div className="topic_post_user_info_display">
                                                <div className="topic_post_username">James</div>
                                                <div className="topic_post_user_answer">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="topic_post_time">Posted : 2hr</div>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <div className="topic_post_reply_container">
                                                <div className="topic_post_reply">Reply</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(Post, { getDataFromTree });