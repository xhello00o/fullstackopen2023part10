import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';


console.log("constants", Constants.manifest.extra)
const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: Constants.manifest.extra.apollo_uri,

});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});



const createApolloClient = (authStorage) => {
  const authLink = setContext( async (_, {headers})=>{
    try {
      const accessToken = await authStorage.getAccessToken();

      return {
        headers:{
          ...headers,
          authorization: accessToken? `Bearer ${accessToken}` : ''
        }
      }
    }
    catch (err) {
      console.log(err)

      return {
        headers, 
      }

    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache });
};

export default createApolloClient;