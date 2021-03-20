import { useState, useRef } from 'react';
import BaseLayout from '../../../layouts/BaseLayout';
import { useRouter } from 'next/router';
import { useGetTopicBySlug, useGetPostByTopic, useGetUser } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import PostList from '../../../Components/Post/PostList';
import ReplyBox from '../../../Components/ReplyBox';
import { useCreatePost } from '../../../apollo/actions';
import AppPagination from '../../../Components/Pagination';

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

    // Mutations

    const [createPost] = useCreatePost();

    return { topicData, postData, userData, createPost };
}


function PostPage() {

    // Refs
    const pageEnd = useRef();

    const [showReplyPanel, setShowReplyPanel] = useState(false);
    const [replyTo, setReplyTo] = useState(null);

    const { topicData, postData, userData, createPost } = useInitialData();

    const handleReplyFormSubmit = async (e, formField, resetFormField) => {
        e.preventDefault();
        try {
            if (replyTo) {
                formField.parent = replyTo._id;
            }
            formField.topic = topicData._id;
            await createPost({ variables: formField });
            resetFormField();
            setShowReplyPanel(false);
            scrollToBottom();
        }
        catch (err) {
            console.log("Error", err);
        }
    }

    const scrollToBottom = () => {
        pageEnd.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <BaseLayout>
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
            <div className="topic_post_bottom_container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-6">
                                    {
                                        userData && userData.username &&
                                        <button className="topic_post_bottom_btn"
                                            onClick={() => {
                                                setReplyTo(null),
                                                    setShowReplyPanel(true)
                                            }}
                                        >
                                            Create New Topic
                                    </button>
                                    }

                                </div>
                                <div className="col-md-6">
                                    <div className="topic_post_pagination">
                                        <AppPagination />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={pageEnd}></div>
            <div className={`reply_box_container ${showReplyPanel ? 'show' : ''}`}>
                <ReplyBox
                    hasTitle={false}
                    replyTo={(replyTo && replyTo.user.username) || topicData.title}
                    handleReplyFormSubmit={handleReplyFormSubmit}
                    onClose={() => setShowReplyPanel(false)}
                />
            </div>
        </BaseLayout>
    )
}

export default withApollo(PostPage, { getDataFromTree });