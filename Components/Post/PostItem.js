import { useEffect, useState } from 'react';
import { fromNow } from '../../utils/Function';
import PersonIcon from '@material-ui/icons/Person';
import Link from 'next/link';
import RichText from '../RichText';

function PostItem({ post, onReplyOpen, canCreate, setCommentValue, handleRichText }) {

    const [showRichText, setShowRichText] = useState(false);

    const checkContent = (content) => {
        try {
            if (content) {
                let replacedData = content.replace(/'/g, '"');
                let parsedData = JSON.parse(replacedData);
                if (parsedData) setShowRichText(true);
            }
        }
        catch (err) {
            setShowRichText(false);
        }
    }

    useEffect(() => {
        checkContent(post.content);
    }, [])


    return (
        <div>
            <div className="topic_post_container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="topic_post_user_main_display">
                            <div className="topic_post_user_info_display">
                                <div className="hero_topic_avatar_background">
                                    <PersonIcon className="hero_topic_user_avatar" />
                                </div>
                                <Link href={`/profile/[id]`} as={`/profile/${post.user._id}`}>
                                    <div className="topic_post_username">{post.user.username}</div>
                                </Link>
                                <div className="topic_post_time">{post.createdAt && fromNow(post.createdAt)}</div>
                            </div>
                            <div className="topic_post_user_content_display">
                                {
                                    post.parent &&
                                    <div className="topic_post_parent_container">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="topic_post_user_main_display">
                                                    <div className="topic_post_parent_user_info_display">
                                                        <Link href={`/profile/[id]`} as={`/profile/${post.parent.user._id}`}>
                                                            <div className="topic_post_username">{post.parent.user.username}</div>
                                                        </Link>
                                                        <div className="topic_post_time">{post.createdAt && fromNow(post.parent.createdAt)}</div>
                                                    </div>
                                                    <div className="topic_post_parent_user_content_display">
                                                        <div className="topic_post_parent_user_answer">{post.parent.content}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {/* <div className="topic_post_user_answer">{post.content}</div> */}
                                {
                                    showRichText ?
                                        <div className="topic_post_user_answer">
                                            <div className="mui_post_root mui_post_toolbar mui_post_container mui_btn mui_button_hide mui_post_text mui_initial_text mui_code mui_block_quote">
                                                <RichText
                                                    setCommentValue={setCommentValue}
                                                    handleRichText={handleRichText}
                                                    defaultData={post.content && post.content.replace(/'/g, '"')}
                                                />
                                            </div>
                                        </div> :
                                        <div className="topic_post_user_answer">
                                            {post.content}
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-6">
                    </div>
                    <div className="col-6 col-sm-6 col-md-6">
                        <div className="topic_post_reply_container">
                            {
                                onReplyOpen && canCreate &&
                                <div className="topic_post_reply" onClick={() => onReplyOpen({ ...post })}>Reply</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem;
