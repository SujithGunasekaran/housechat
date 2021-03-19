import { fromNow } from '../../utils/Function';
import PersonIcon from '@material-ui/icons/Person';


function PostItem({ post, onReplyOpen, canCreate }) {
    return (
        <div>
            <div className="topic_post_container">
                <div className="row">
                    {/* <div className="col-1 col-sm-1 col-md-1">
                        <PersonIcon className="topic_post_user_profile" />
                    </div> */}
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="topic_post_user_main_display">
                            <PersonIcon className="topic_post_user_profile" />
                            <div className="topic_post_user_info_display">
                                <div className="topic_post_username">{post.user.username}</div>
                                {
                                    post.parent &&
                                    <div className="topic_post_parent_container">
                                        <div className="row">
                                            {/* <div className="col-1 col-sm-1 col-md-1">
                                                <PersonIcon className="topic_post_user_profile" />
                                            </div> */}
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="topic_post_user_main_display">
                                                    <PersonIcon className="topic_post_user_profile" />
                                                    <div className="topic_post_user_info_display">
                                                        <div className="topic_post_username">{post.parent.user.username}</div>
                                                        <div className="topic_post_user_answer">{post.parent.content}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="topic_post_user_answer">{post.content}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-6">
                        {
                            post.createdAt &&
                            <div className="topic_post_time">{fromNow(post.createdAt)}</div>
                        }
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