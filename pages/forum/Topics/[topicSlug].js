import BaseLayout from '../../../layouts/BaseLayout';
import { useRouter } from 'next/router';
import { useGetTopicBySlug, useGetPostByTopic } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import PostItem from '../../../Components/Post/PostItem';

const useInitialData = () => {

    const router = useRouter();
    const { topicSlug } = router.query;

    // Queries
    const { data: topic } = useGetTopicBySlug(topicSlug);
    const { data: post } = useGetPostByTopic(topicSlug);

    const topicData = (topic && topic.topicBySlug) || {};
    const postData = (post && post.postByTopic) || [];

    return { topicData, postData };
}

function Post() {

    const { topicData, postData } = useInitialData();

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
                        {
                            topicData && topicData._id &&
                            <div className="row" key={topicData._id}>
                                <div className="col-md-10">
                                    <PostItem
                                        post={topicData}
                                    />
                                </div>
                            </div>
                        }
                        {
                            postData &&
                            postData.map((postInfo) => (
                                <div className="row" key={postInfo._id}>
                                    <div className="col-md-8">
                                        <PostItem
                                            post={postInfo}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(Post, { getDataFromTree });