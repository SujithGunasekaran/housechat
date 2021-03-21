import Hero from '../Components/Hero';
import BaseLayout from '../layouts/BaseLayout';
import { useGetHomePageTopicData } from '../apollo/actions/index';
import withApollo from '../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import HomeTopic from '../Components/HomeTopic';
import Link from 'next/link';


const initialData = () => {
  const { data } = useGetHomePageTopicData(3);
  const topicData = data && data.highlight || [];
  return { topicData };
}

function Home() {

  const { topicData } = initialData();

  return (
    <div>
      <BaseLayout>
        <Hero />
        <div className="hero_topic_container">
          <div className="container-fluid">
            {
              topicData && topicData.topics &&
              topicData.topics.map((topicInfo) => (
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
              ))
            }
          </div>
        </div>
      </BaseLayout>
    </div>
  )
}

export default withApollo(Home, { getDataFromTree });
