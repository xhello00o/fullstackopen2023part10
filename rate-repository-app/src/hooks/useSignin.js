import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  
    const [mutate, result] = useMutation(SIGN_IN, {errorPolicy:'all'});
  
    const signIn = async ({ username, password }) => {

       await mutate({variables:{credentials:{
            username: username,
            password: password

      }}})

    };
    console.log(result.data)
    if (result.data && !result.loading && !result.error) {
      const token = result.data.authenticate.accessToken
      authStorage.setAccessToken( token)
      apolloClient.resetStore()
      console.log(`refetched results`)
    }

    

    

  
    return [signIn,result];
  };

export default useSignIn