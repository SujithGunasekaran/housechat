import ForumCategoriesComponent from '../../../Components/ForumCaterogiesComponent';

function ForumCategories() {
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
                <ForumCategoriesComponent />
            </div>
        </div>
    )
}

export default ForumCategories;