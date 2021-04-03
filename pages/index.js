import Hero from '../Components/Hero';
// import BaseLayout from '../layouts/BaseLayout';
import { useGetHomePageTopicData } from '../apollo/actions/index';
import withApollo from '../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import HomeTopic from '../Components/HomeTopic';
import Link from 'next/link';
import PersonIcon from '@material-ui/icons/Person';


const initialData = () => {
  const { data, error } = useGetHomePageTopicData(5);
  const topicData = data && data.highlight || [];
  return { topicData, error };
}

function Home() {

  const { topicData, error } = initialData();

  return (
    <div>
      {/* <BaseLayout> */}
      <Hero />
      <div className="hero_topic_container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="hero_topic_head_title">Explore Topics...</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="topic_post_container">
                <div className="row">
                  {/* <div className="col-1 col-sm-1 col-md-1">
                          <PersonIcon className="topic_post_user_profile" />
                      </div> */}
                  <div className="col-12 col-sm-12 col-md-12">
                    <div className="topic_post_user_main_display">
                      {/* <div className="hero_topic_avatar_background">
                          <PersonIcon className="hero_topic_user_avatar" />
                        </div> */}
                      <div className="topic_post_user_info_display">
                        <div className="hero_topic_avatar_background">
                          <PersonIcon className="hero_topic_user_avatar" />
                        </div>
                        <div className="topic_post_username">Sujith Gunasekaran</div>
                        <div className="topic_post_time">3 days ago</div>
                      </div>
                      <div className="topic_post_user_content_display">
                        {/* <div className="topic_post_user_info_display">
                            <div className="topic_post_username">Sujith Gunasekaran</div>
                            <div className="topic_post_time">3 days ago</div>
                          </div> */}

                        {/* {
                                      post.parent && */}
                        <div className="topic_post_parent_container">
                          <div className="row">
                            {/* <div className="col-1 col-sm-1 col-md-1">
                                <PersonIcon className="topic_post_user_profile" />
                              </div> */}
                            <div className="col-12 col-sm-12 col-md-12">
                              <div className="topic_post_user_main_display">
                                {/* <div className="hero_topic_avatar_background">
                                    <PersonIcon className="hero_topic_user_avatar" />
                                  </div> */}
                                <div className="topic_post_parent_user_info_display">
                                  <div className="topic_post_username">Sujith Gunasekaran</div>
                                  <div className="topic_post_time">3 days ago</div>
                                </div>
                                <div className="topic_post_parent_user_content_display">
                                  {/* <div className="topic_post_user_info_display">
                                      <div className="topic_post_username">Sujith Gunasekaran</div>
                                      <div className="topic_post_time">3 days ago</div>
                                    </div> */}
                                  <div className="topic_post_parent_user_answer">Content Goes here</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* } */}
                        <div className="topic_post_user_answer">Content goes here....</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 col-sm-6 col-md-6">
                    {/* {
                              post.createdAt && */}
                    {/* <div className="topic_post_time">3 days ago</div> */}
                    {/* } */}
                  </div>
                  <div className="col-6 col-sm-6 col-md-6">
                    <div className="topic_post_reply_container">
                      {/* {
                                  onReplyOpen && canCreate && */}
                      <div className="topic_post_reply">Reply</div>
                      {/* } */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            topicData && topicData.topics &&
              !error ? topicData.topics.map((topicInfo) => (
                <div className="row" key={topicInfo._id}>
                  <div className="col-md-8 mx-auto">
                    <Link href={'/forum/Post/[postSlug]'} as={`/forum/Post/${topicInfo.slug}`}>
                      <a>
                        <HomeTopic
                          topicInfo={topicInfo}
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              )) : <div></div>
          }
        </div>
      </div>
      {/* </BaseLayout> */}
    </div>
  )
}

export default withApollo(Home, { getDataFromTree });
