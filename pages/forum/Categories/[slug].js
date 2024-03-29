import { useEffect, useRef, useState } from 'react';
import { useGetTopicsByCategory, useGetUser, useCreateTopic } from '../../../apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import ReplyBox from '../../../Components/ReplyBox';
import TableSkeleton from '../../../Components/SkeletonLoading/TableSkeleton';

const useInitialData = () => {

    const router = useRouter();
    const { slug } = router.query;

    // Queries
    const { data: topicData, error: topicError, loading: topicLoading } = useGetTopicsByCategory(slug);
    const { data: userData } = useGetUser();

    // Query response
    const forumTopics = topicData && topicData.topicsByCategory || [];
    const user = userData && userData.user || null;

    // mutations
    const [createTopic, { loading: createTopicLoading }] = useCreateTopic();

    return { forumTopics, topicError, user, slug, topicLoading, router, createTopic, createTopicLoading }
}

function CategoryTopics() {

    const [showReplyPanel, setShowReplyPanel] = useState(false);
    const [replyError, setReplyError] = useState('');

    const disposeId = useRef(null);

    const { forumTopics, topicError, user, slug, topicLoading, router, createTopic, createTopicLoading } = useInitialData();

    const handleReplyFormSubmit = (e, formData, resetFormField) => {
        e.preventDefault();
        formData.forumCategory = slug;
        createTopic({ variables: formData })
            .then(() => {
                resetFormField();
                setShowReplyPanel(false);
            })
            .catch((err) => {
                const pareseError = JSON.parse(JSON.stringify(err));
                if (pareseError.message.includes('Please Enter')) setReplyError(pareseError.message);
                if (!formData.title || formData.content) setReplyError('Please Enter Content or Title');
                if (pareseError.message.includes('Something')) setReplyError(pareseError.message);
            })
    }

    const goToTopicPage = (slug) => {
        router.push('/forum/Post/[postSlug]', `/forum/Post/${slug}`);
    }

    useEffect(() => {
        if (replyError) {
            disposeId.current = setTimeout(() => {
                setReplyError('');
            }, 3000)
        }

        return (() => {
            clearTimeout(disposeId.current);
        })

    }, [replyError])

    return (
        <div>
            <div className="forum_categories_main_container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="forum_categories_heading">Select a Topic</div>
                            {
                                user &&
                                <button className="forum_categories_create_btn" onClick={() => setShowReplyPanel(true)}>Create Topic</button>
                            }
                        </div>
                    </div>
                    <div className="forum_categories_table_container">
                        <table className="table table-striped">
                            <thead className="forum_categories_table_heading">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Topic</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Author</th>
                                </tr>
                            </thead>
                            <tbody className="forum_categories_table_body">
                                {
                                    topicLoading &&
                                    <TableSkeleton
                                        rowCount={3}
                                        cellCount={4}
                                    />
                                }
                                {
                                    forumTopics &&
                                        !topicError ? forumTopics.map((topicInfo, index) => (
                                            <tr key={topicInfo._id} onClick={() => goToTopicPage(topicInfo.slug)}>
                                                <td>{index + 1}</td>
                                                <td>{topicInfo.title}</td>
                                                <td>{topicInfo.forumCategory.title}</td>
                                                <td>{topicInfo.user.username}</td>
                                            </tr>
                                        )) : <div></div>
                                }
                            </tbody>
                        </table>
                        {
                            !topicLoading && forumTopics.length === 0 &&
                            <div className="forum_categories_empty_message">No topic has been created...</div>
                        }
                    </div>
                </div>
            </div>
            <div className={`reply_box_container ${showReplyPanel ? 'show' : ''}`}>
                <ReplyBox
                    loading={createTopicLoading}
                    btnDisplayContent='Create Topic'
                    hasTitle={true}
                    replyError={replyError}
                    handleReplyFormSubmit={handleReplyFormSubmit}
                    onClose={() => setShowReplyPanel(false)}
                />
            </div>
            {showReplyPanel && <div className="header_page_mobile_overlay" onClick={() => setShowReplyPanel(false)}></div>}
        </div>
    )
}

export default withApollo(CategoryTopics, { getDataFromTree });
