import withApollo from 'next-with-apollo';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import moment from 'moment';

export default withApollo(
    ({ initialState, headers }) => {
        return new ApolloClient({
            request: (operation) => {
                operation.setContext({
                    fetchOptions: {
                        credentials: "include",
                    },
                    headers,
                });
            },
            uri: process.env.BASE_URL,
            cache: new InMemoryCache().restore(initialState || {}),
            resolvers: {
                Portfolio: {
                    daysOfExperience(data, args, context) { // context parameter we can get cache
                        const { startDate, endDate } = data;
                        let now = moment().unix();
                        if (endDate) {
                            now = endDate / 1000;
                        }
                        return moment.unix(now).diff(moment.unix(startDate / 1000), 'days');
                    }
                }
            }
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
