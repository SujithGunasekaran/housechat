import ForumCategoriesComponent from '../../../Components/ForumCaterogiesComponent';
import BaseLayout from '../../../layouts/BaseLayout'

function ForumCategories() {
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
                    <ForumCategoriesComponent />
                </div>
            </div>
        </BaseLayout>
    )
}

export default ForumCategories;