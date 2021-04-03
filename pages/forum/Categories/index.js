import ForumCategoriesComponent from '../../../Components/ForumCaterogiesComponent';
import BaseLayout from '../../../layouts/BaseLayout';
import { useGetForumCategories } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

function ForumCategories() {

    const { data } = useGetForumCategories();

    return (
        // <BaseLayout>
        <div>
            <div className="forum_categories_main_container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="forum_categories_heading">Forum Categories</div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        {
                            data && data.forumCategories &&
                            data.forumCategories.map((forumCategoryInfo) => (
                                <div className="col-md-4" key={forumCategoryInfo._id}>
                                    <ForumCategoriesComponent
                                        forumCategoryInfo={forumCategoryInfo}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        // </BaseLayout>
    )
}

export default withApollo(ForumCategories, { getDataFromTree });