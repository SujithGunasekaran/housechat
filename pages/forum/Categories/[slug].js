import BaseLayout from '../../../layouts/BaseLayout';
import { useGetTopicsByCategory } from '../../../apollo/actions';
import { useRouter } from 'next/router';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';


function CategoryTopics() {

    const router = useRouter();

    const { data } = useGetTopicsByCategory(router.query.slug);

    const forumTopics = data && data.topicsByCategory || [];

    return (
        <BaseLayout>
            <div>
                <div className="forum_categories_main_container">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="forum_categories_heading">Select a Topic</div>
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
            </div>
        </BaseLayout>
    )
}

export default withApollo(CategoryTopics, { getDataFromTree });
