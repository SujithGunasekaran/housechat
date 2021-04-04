import PostItem from './PostItem';

function PostList(props) {

    const { topicData, postData, onReplyOpen, canCreate, currentPage } = props;

    return (
        <>
            {
                topicData && topicData._id && currentPage === 1 &&
                <>
                    <div className="row" key={topicData._id}>
                        <div className="col-md-10">
                            <PostItem
                                post={topicData}
                            />
                        </div>
                    </div>
                    {
                        postData.length > 0 &&
                        <div className="row">
                            <div className="col-md-12">
                                <div className="topic_post_link_line"></div>
                            </div>
                        </div>
                    }
                </>
            }
            {
                postData &&
                postData.map((postInfo, index) => (
                    <div key={index}>
                        <div className="row" key={postInfo._id}>
                            <div className="col-md-10">
                                <PostItem
                                    canCreate={canCreate}
                                    post={postInfo}
                                    onReplyOpen={onReplyOpen}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {index < postData.length - 1 && <div className="topic_post_link_line"></div>}
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default PostList;