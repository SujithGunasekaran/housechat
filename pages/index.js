import Hero from '../Components/Hero';
// import BaseLayout from '../layouts/BaseLayout';
import { useGetHomePageTopicData } from '../apollo/actions/index';
import withApollo from '../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import HomeTopic from '../Components/HomeTopic';
import Link from 'next/link';
import CardSkeleton from '../Components/SkeletonLoading/CardSkeleton';

const initialData = () => {
  const { data, error, loading } = useGetHomePageTopicData(5);
  const topicData = data && data.highlight || [];
  return { topicData, error, loading };
}

function Home() {

  const { topicData, error, loading } = initialData();

  return (
    <div>
      {/* <BaseLayout> */}
      <Hero />
      <div className="hero_topic_container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="hero_topic_head_title">Your Feeds...</div>
            </div>
          </div>
          {
            loading &&
            <div className="row">
              <CardSkeleton
                cardCount={3}
                columnSize={8}
                isCircleNeeded={true}
                lineCount={2}
              />
            </div>
          }
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
