import { useState } from 'react';
import BaseLayout from '../../../layouts/BaseLayout';
import { useGetTopicsByCategory, useGetUser, useCreateTopic } from '../../../apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import ReplyBox from '../../../Components/ReplyBox';

const useInitialData = () => {

    const router = useRouter();
    const { slug } = router.query;

    // Queries
    const { data: topicData } = useGetTopicsByCategory(slug);
    const { data: userData } = useGetUser();

    // Query response
    const forumTopics = topicData && topicData.topicsByCategory || [];
    const user = userData && userData.user || null;

    // mutations
    const [createTopic] = useCreateTopic();

    return { forumTopics, user, slug, createTopic }
}

function CategoryTopics() {

    const [showReplyPanel, setShowReplyPanel] = useState(false)
    const { forumTopics, user, slug, createTopic } = useInitialData();

    const handleReplyFormSubmit = (e, formData, resetFormField) => {
        e.preventDefault();
        formData.forumCategory = slug;
        createTopic({ variables: formData })
            .then(() => {
                resetFormField();
                setShowReplyPanel(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <BaseLayout>
            <div>
                <div className="forum_categories_main_container">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="forum_categories_heading">Select a Topic</div>
                                {
                                    user &&
                                    <button className="forum_categories_create_btn" onClick={() => setShowReplyPanel(true)}>Create Portfolio</button>
                                }
                            </div>
                        </div>
                        <div className="forum_categories_table_container">
                            <table className="table table-striped">
                                <thead className="forum_categories_table_heading">
                                    <tr>
                                        <th scope="col">Topic</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Author</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        forumTopics &&
                                        forumTopics.map((topicInfo) => (
                                            <tr key={topicInfo._id}>
                                                <td>{topicInfo.title}</td>
                                                <td>{topicInfo.forumCategory.title}</td>
                                                <td>{topicInfo.user.username}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={`reply_box_container ${showReplyPanel ? 'show' : ''}`}>
                    <ReplyBox
                        handleReplyFormSubmit={handleReplyFormSubmit}
                        onClose={() => setShowReplyPanel(false)}
                    />
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(CategoryTopics, { getDataFromTree });
