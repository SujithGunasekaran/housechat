export default function ForumCategoriesComponent({ forumCategoryInfo }) {
    return (
        <div className="forum_categories_card_container">
            <div className="forum_categories_card_heading">{forumCategoryInfo.title}</div>
            <div className="forum_categories_card_info">{forumCategoryInfo.subTitle}</div>
        </div>

    )
}