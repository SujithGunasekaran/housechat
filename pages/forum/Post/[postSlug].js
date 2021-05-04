import { useState, useRef, useEffect } from 'react';
import BaseLayout from '../../../layouts/BaseLayout';
import { useRouter } from 'next/router';
import { useGetTopicBySlug, useGetPostByTopic, useGetUser } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import PostList from '../../../Components/Post/PostList';
import ReplyBox from '../../../Components/ReplyBox';
import { useCreatePost } from '../../../apollo/actions';
import CircularLoading from '../../../Components/CircularLoading';

const useInitialData = (postSlug) => {

    // Queries
    const { data: topic, error: topicError, loading: topicLoading } = useGetTopicBySlug(postSlug);
    const { data: post, error: postError, loading: postLoading, fetchMore } = useGetPostByTopic(postSlug, { skipLength: 0, pageSize: 5 });
    const { data: user } = useGetUser();

    const topicData = (topic && topic.topicBySlug) || {};
    const postData = (post && post.postByTopic) || {};
    const userData = (user && user.user) || null;

    // Mutations

    const [createPost, { loading: createPostLoading }] = useCreatePost();

    return { topicData, postData, createPostLoading, topicError, postError, userData, topicLoading, postLoading, createPost, fetchMore };
}


function PostPage() {

    // Router
    const router = useRouter();
    const { postSlug } = router.query;

    // Refs
    const pageEnd = useRef();
    const disposeId = useRef(null);

    const { topicData, postData, userData, createPostLoading, topicError, postError, topicLoading, postLoading, createPost, fetchMore } = useInitialData(postSlug);

    const [showReplyPanel, setShowReplyPanel] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const [pagination, setPagination] = useState({ pageNumber: 0, pageSize: 5 });
    const [dataLoading, setDataLoading] = useState(false);
    const [replyError, setReplyError] = useState(null);
    const [commentValue, setCommentValue] = useState({});

    useEffect(() => {
        let updatePagination = JSON.parse(JSON.stringify(pagination));
        updatePagination.pageNumber = postData.posts && postData.posts.length;
        setPagination(updatePagination);
    }, [postData.posts])

    useEffect(() => {
        if (replyError) {
            disposeId.current = setTimeout(() => {
                setReplyError(null);
            }, 3000)
        }
        return (() => {
            clearTimeout(disposeId.current);
        })
    }, [replyError])


    const scrollToBottom = () => {
        pageEnd.current.scrollIntoView({ behavior: 'smooth' });
    }

    const cleanUp = () => {
        setCommentValue({});
        setShowReplyPanel(false);
        setReplyTo(null);
        scrollToBottom();
    }

    const loadMoreData = async (pagination) => {
        setDataLoading(true);
        try {
            await fetchMore({
                variables: { slug: postSlug, pageSize: pagination.pageSize, skipLength: postData.posts.length },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return previousResult;
                    return {
                        postByTopic: {
                            ...fetchMoreResult.postByTopic,
                            posts: [
                                ...previousResult.postByTopic.posts,
                                ...fetchMoreResult.postByTopic.posts,
                            ],
                        },
                    }
                }
            })
            setDataLoading(false);
        }
        catch (err) {
            console.log(err);
            setDataLoading(false);
        }
    }

    const handleReplyFormSubmit = async (e, formField, resetFormField) => {
        e.preventDefault();
        try {
            if (replyTo) {
                formField.parent = replyTo._id;
            }
            formField.topic = topicData._id;
            await createPost({ variables: formField });

            // updateQuery will have two parameter one is prevData, updatedData
            // Eg. in prevData 10 array list we are creting new post now updatedData will have 11 array list 

            pagination.pageNumber >= postData.count && await fetchMore({
                variables: { slug: postSlug, pageSize: pagination.pageSize, skipLength: postData.posts.length },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    return {
                        postByTopic: {
                            ...fetchMoreResult.postByTopic,
                            posts: [
                                ...previousResult.postByTopic.posts,
                                ...fetchMoreResult.postByTopic.posts
                            ]
                        }
                    }
                }
            })
            if (resetFormField) {
                resetFormField();
            }
            cleanUp();
        }
        catch (err) {
            const parseError = JSON.parse(JSON.stringify(err));
            if (Object.keys(parseError).length > 0 && parseError?.message.includes('Please Enter')) setReplyError(parseError.message);
            if (!formField.content) setReplyError('Please Enter Content');
            if (Object.keys(parseError).length > 0 && parseError?.message.includes('Something')) setReplyError(parseError.message);
        }
    }

    const handleRichText = (keyName, stateName) => (data) => {
        stateName(prevStateCommentValue => {
            let commentValue = JSON.parse(JSON.stringify(prevStateCommentValue));
            commentValue[keyName] = data.replace(/"/g, "'");
            return commentValue;
        })
    }

    const handleReplyPanel = () => {
        setShowReplyPanel(false);
        setReplyTo(null);
    }

    const handleReplyPanelOpen = (replyUserInfo = null) => {
        setShowReplyPanel(true);
        setReplyTo(replyUserInfo);
    }

    return (
        <>
            <div className="topic_post_main_container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="topic_post_heading">{topicData.title}</div>
                        </div>
                    </div>
                    <PostList
                        topicLoading={topicLoading}
                        postLoading={postLoading}
                        topicError={topicError}
                        postError={postError}
                        canCreate={userData ? true : false}
                        topicData={topicData}
                        postCount={postData.count}
                        postData={postData.posts ? postData.posts : []}
                        setCommentValue={setCommentValue}
                        handleRichText={handleRichText}
                        onReplyOpen={(replyToInfo) => handleReplyPanelOpen(replyToInfo)}
                    />
                </div>
            </div>
            <div className="topic_post_bottom_container">
                <div className="container-fluid">
                    <div className="row">
                        {
                            postData.count > pagination.pageNumber &&
                            <div className="col-md-10 mx-auto">
                                {
                                    dataLoading ? <CircularLoading />
                                        : <button className="topic_post_show_more_btn" onClick={() => loadMoreData(pagination)}>Show more</button>
                                }
                            </div>
                        }

                    </div>

                    <div className="row">
                        <div className="col-md-10 mx-auto">
                            {
                                userData && userData.username && postData.count <= pagination.pageNumber &&
                                <div>
                                    {
                                        Object.keys(commentValue).length === 0 || (commentValue && !commentValue.content) ?
                                            <div className="topic_error">*Please click save option on right before posting your comments..</div> : null
                                    }
                                    <button className={`topic_post_bottom_btn ${Object.keys(commentValue).length === 0 || (commentValue && !commentValue.content) ? 'hide' : ''}`}
                                        onClick={(e) => { Object.keys(commentValue).length !== 0 && commentValue.content ? handleReplyFormSubmit(e, commentValue) : null }}
                                    >
                                        Add Comments
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div ref={pageEnd}></div>
            <div className={`reply_box_container ${showReplyPanel ? 'show' : ''}`}>
                <ReplyBox
                    btnDisplayContent="Comment"
                    loading={createPostLoading}
                    hasTitle={false}
                    replyError={replyError}
                    replyTo={(replyTo && replyTo.user.username) || topicData.title}
                    handleReplyFormSubmit={handleReplyFormSubmit}
                    onClose={() => handleReplyPanel()}
                />
            </div>
            {showReplyPanel && <div className="header_page_mobile_overlay" onClick={() => handleReplyPanel()}></div>}
        </>
    )
}

export default withApollo(PostPage, { getDataFromTree });
