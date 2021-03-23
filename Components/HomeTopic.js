import { fromNow, sortingText } from '../utils/Function';
import PersonIcon from '@material-ui/icons/Person';


export default function HomeTopic({ topicInfo }) {
    return (
        <div className="hero_topic_card">
            <div className="hero_topic_user_display">
                <div className="hero_topic_avatar_background">
                    <PersonIcon className="hero_topic_user_avatar" />
                </div>
                <div className="hero_topic_user_info_display">
                    <div className="hero_topic_username">{topicInfo.user.username}</div>
                    <div className="hero_topic_date">{fromNow(topicInfo.createdAt)}</div>

                </div>
            </div>
            <hr className="hero_card_hr" />
            <div className="hero_topic_head_section">
                <div className="hero_topic_title">{topicInfo.title}</div>
            </div>
            <div className="hero_topic_content">{sortingText(topicInfo.content)}</div>
        </div>
    )
}
