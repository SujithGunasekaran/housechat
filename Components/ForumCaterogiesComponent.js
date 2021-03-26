import Link from 'next/link';

export default function ForumCategoriesComponent({ forumCategoryInfo }) {
    return (
        <div className="forum_categories_card_container">
            <div className="forum_categories_card_heading">{forumCategoryInfo.title}</div>
            <div className="forum_categories_card_info">{forumCategoryInfo.subTitle}</div>
            <Link href='/forum/Categories/[slug]' as={`/forum/Categories/${forumCategoryInfo.slug}`}>
                <a>
                    <div className="forum_categories_card_view_info">View</div>
                </a>
            </Link>
        </div>

    )
}