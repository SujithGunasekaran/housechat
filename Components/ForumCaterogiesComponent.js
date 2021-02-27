export default function ForumCategoriesComponent() {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div className="forum_categories_card_container">
                            <div className="forum_categories_card_heading">General Discussion</div>
                            <div className="forum_categories_card_info">Ask Questions</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="forum_categories_card_container">
                            <div className="forum_categories_card_heading">Technical Discussion</div>
                            <div className="forum_categories_card_info">Ask Questions</div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="forum_categories_card_container">
                            <div className="forum_categories_card_heading">Other Discussion</div>
                            <div className="forum_categories_card_info">Ask Questions</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}