import PostItem from './PostItem';

function PostList(props) {

    const { topicData, postData, onReplyOpen, canCreate, topicError, postError } = props;

    return (
        <>
            {
                topicData && topicData._id &&
                <div>
                    <div className="row" key={topicData._id}>
                        <div className="col-md-10 mx-auto">
                            <PostItem
                                post={topicData}
                            />
                        </div>
                    </div>
                    {
                        postData.length > 0 &&
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <div className="topic_post_link_line"></div>
                            </div>
                        </div>
                    }
                </div>
            }
            {
                postData &&
                postData.map((postInfo, index) => (
                    <div key={index}>
                        <div className="row" key={postInfo._id}>
                            <div className="col-md-10 mx-auto">
                                <PostItem
                                    canCreate={canCreate}
                                    post={postInfo}
                                    onReplyOpen={onReplyOpen}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                {index < postData.length - 1 && <div className="topic_post_link_line"></div>}
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                (topicError || postError) ? <div></div> : null
            }
        </>
    )
}

export default PostList;
