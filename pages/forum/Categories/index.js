import ForumCategoriesComponent from '../../../Components/ForumCaterogiesComponent';
import BaseLayout from '../../../layouts/BaseLayout';
import { useGetForumCategories } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import Link from 'next/link';

function ForumCategories() {

    const { data } = useGetForumCategories();

    return (
        <BaseLayout>
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
                                        <Link href='/forum/Categories/[slug]' as={`/forum/Categories/${forumCategoryInfo.slug}`}>
                                            <a>
                                                <ForumCategoriesComponent
                                                    forumCategoryInfo={forumCategoryInfo}
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(ForumCategories, { getDataFromTree });