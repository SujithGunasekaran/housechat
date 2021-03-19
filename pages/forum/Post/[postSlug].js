import { useState } from 'react';
import BaseLayout from '../../../layouts/BaseLayout';
import { useRouter } from 'next/router';
import { useGetTopicBySlug, useGetPostByTopic, useGetUser } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import PostList from '../../../Components/Post/PostList';
import ReplyBox from '../../../Components/ReplyBox';

const useInitialData = () => {

    const router = useRouter();
    const { postSlug } = router.query;

    // Queries
    const { data: topic } = useGetTopicBySlug(postSlug);
    const { data: post } = useGetPostByTopic(postSlug);
    const { data: user } = useGetUser();

    const topicData = (topic && topic.topicBySlug) || {};
    const postData = (post && post.postByTopic) || [];
    const userData = (user && user.user) || null;

    // form submit method

    const handleReplyFormSubmit = (e) => {
        e.preventDefault();
        console.log("Successs");
    }

    return { topicData, postData, userData, handleReplyFormSubmit };
}


function PostPage() {

    const [showReplyPanel, setShowReplyPanel] = useState(false);
    const [replyTo, setReplyTo] = useState(null);

    const { topicData, postData, userData, handleReplyFormSubmit } = useInitialData();

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
                        <PostList
                            canCreate={userData ? true : false}
                            topicData={topicData}
                            postData={postData}
                            onReplyOpen={(replyToInfo) => {
                                setShowReplyPanel(true),
                                    setReplyTo(replyToInfo)
                            }}
                        />
                    </div>
                </div>
                {
                    userData && userData.username &&
                    <div className="topic_post_bottom_container">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="topic_post_bottom_btn"
                                        onClick={() => {
                                            setReplyTo(null),
                                                setShowReplyPanel(true)
                                        }}
                                    >
                                        Create New Topic
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className={`reply_box_container ${showReplyPanel ? 'show' : ''}`}>
                    <ReplyBox
                        hasTitle={false}
                        replyTo={(replyTo && replyTo.user.username) || topicData.title}
                        handleReplyFormSubmit={handleReplyFormSubmit}
                        onClose={() => setShowReplyPanel(false)}
                    />
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(PostPage, { getDataFromTree });