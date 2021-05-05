import PostItem from './PostItem';
import RichText from '../RichText';
import CardSkeleton from '../SkeletonLoading/CardSkeleton';

function PostList(props) {

    const { topicData, postData, postCount, onReplyOpen, topicLoading, postLoading, canCreate, topicError, postError, setCommentValue, handleRichText } = props;

    return (
        <>
            {
                topicLoading &&
                <div className="row">
                    <CardSkeleton
                        isCircleNeeded={true}
                        columnSize={10}
                        cardCount={1}
                        lineCount={2}
                    />
                </div>
            }
            {
                topicData && topicData._id &&
                <div>
                    <div className="row" key={topicData._id}>
                        <div className="col-md-10 mx-auto">
                            <PostItem
                                post={topicData}
                                setCommentValue={setCommentValue}
                                handleRichText={handleRichText}
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
                postLoading &&
                <div className="row">
                    <CardSkeleton
                        columnSize={10}
                        isCircleNeeded={true}
                        cardCount={2}
                        lineCount={2}
                    />
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
                                    setCommentValue={setCommentValue}
                                    handleRichText={handleRichText}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                {index < postData.length - 1 && <div className="topic_post_link_line"></div>}
                                {index === postCount - 1 && <div className="topic_post_link_line"></div>}
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                postData && postCount && postData.length === postCount &&
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div className="mui_root mui_container mui_btn mui_button_hide mui_text mui_initial_text mui_code mui_block_quote">
                            <RichText
                                setCommentValue={setCommentValue}
                                handleRichText={handleRichText}
                            />
                        </div>
                    </div>
                </div>
            }
            {
                (topicError || postError) ? <div></div> : null
            }
        </>
    )
}

export default PostList;
