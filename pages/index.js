import Hero from '../Components/Hero';
import BaseLayout from '../layouts/BaseLayout';
import { useGetHomePageTopicData } from '../apollo/actions/index';
import withApollo from '../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';


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
        <p>{JSON.stringify(topicData)}</p>
      </BaseLayout>
    </div>
  )
}

export default withApollo(Home, { getDataFromTree });
