import ForumCategoriesComponent from '../../../Components/ForumCaterogiesComponent';
import { useGetForumCategories } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import CardSkeleton from '../../../Components/SkeletonLoading/CardSkeleton';

function ForumCategories() {

    const { data, loading, error } = useGetForumCategories();

    return (
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
                            loading &&
                            <CardSkeleton
                                columnSize={4}
                                isCircleNeeded={false}
                                cardCount={3}
                                lineCount={2}
                            />
                        }
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
    )
}

export default withApollo(ForumCategories, { getDataFromTree });
