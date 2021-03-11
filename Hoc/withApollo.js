import withApollo from 'next-with-apollo';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

export default withApollo(
    ({ initialState, headers }) => {
        return new ApolloClient({
            // uri: 'http://localhost:3000/graphql',
            ssrMode: true,
            link: createHttpLink({
                uri: 'http://localhost:3000/graphql',
                credentials: 'same-origin',
                headers: {
                    ...headers
                },
            }),
            cache: new InMemoryCache().restore(initialState || {}),
        });
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);

