import PostItem from './PostItem';
import RichText from '../RichText';

function PostList(props) {

    const { topicData, postData, postCount, onReplyOpen, canCreate, topicError, postError, setCommentValue, handleRichText } = props;

    return (
        <>
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
