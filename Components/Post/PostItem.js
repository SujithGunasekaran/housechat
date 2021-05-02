import { useEffect, useState } from 'react';
import { fromNow } from '../../utils/Function';
import PersonIcon from '@material-ui/icons/Person';
import Link from 'next/link';
import RichText from '../RichText';

function PostItem({ post, onReplyOpen, canCreate, setCommentValue, handleRichText }) {

    const [showRichText, setShowRichText] = useState(false);
    const [showParentRichText, setShowParentRichText] = useState(false);
    const [parentContent, setParentContent] = useState(null);
    const [content, setContent] = useState(null);

    const checkContent = (content, showStateName, contentStateName) => {
        try {
            if (content) {
                let replacedData = content.replace(/'/g, '"');
                let parsedData = JSON.parse(replacedData);
                if (parsedData) {
                    showStateName(true);
                    contentStateName(replacedData);
                }
            }
        }
        catch (err) {
            showStateName(false);
        }
    }

    useEffect(() => {
        checkContent(post.content, setShowRichText, setContent);
        if (post.parent) {
            checkContent(post.parent.content, setShowParentRichText, setParentContent);
        }
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
                                                            <div className="topic_post_parent_username"><i>@{post.parent.user.username}</i></div>
                                                        </Link>
                                                        <div className="topic_post_parent_time">{post.createdAt && fromNow(post.parent.createdAt)}</div>
                                                    </div>
                                                    <div className="topic_post_parent_user_content_display">
                                                        {
                                                            showParentRichText ?
                                                                <div className="topic_post_user_answer">
                                                                    <div className="mui_post_root mui_post_toolbar mui_post_container mui_btn mui_button_hide mui_post_text mui_initial_text mui_code mui_block_quote">
                                                                        <RichText
                                                                            setCommentValue={setCommentValue}
                                                                            handleRichText={handleRichText}
                                                                            defaultData={parentContent}
                                                                        />
                                                                    </div>
                                                                </div> :
                                                                <div className="topic_post_parent_user_answer">
                                                                    {post.parent.content}
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    showRichText ?
                                        <div className="topic_post_user_answer">
                                            <div className="mui_post_root mui_post_toolbar mui_post_container mui_btn mui_button_hide mui_post_text mui_initial_text mui_code mui_block_quote">
                                                <RichText
                                                    setCommentValue={setCommentValue}
                                                    handleRichText={handleRichText}
                                                    defaultData={content}
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
