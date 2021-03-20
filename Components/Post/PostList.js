import PostItem from './PostItem';

function PostList({ topicData, postData, onReplyOpen, canCreate }) {
    return (
        <>
            {
                topicData && topicData._id &&
                <div className="row" key={topicData._id}>
                    <div className="col-md-10">
                        <PostItem
                            post={topicData}
                        />
                    </div>
                </div>
            }
            {
                postData &&
                postData.map((postInfo) => (
                    <div className="row" key={postInfo._id}>
                        <div className="col-md-10">
                            <PostItem
                                canCreate={canCreate}
                                post={postInfo}
                                onReplyOpen={onReplyOpen}
                            />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default PostList;