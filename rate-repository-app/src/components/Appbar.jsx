import { Text, View, StyleSheet, Button, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link, Navigate, useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#0A0C7B',
    alignItems: 'stretch',
    height: 80,
  },
  tab: {
    flexDirection: 'row',
    flexGrow: 0,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  text: {
    flexGrow: 0,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  test:{
    
  }

  // ...
});

const AppBar = () => {
  const authResult = useQuery(GET_ME, { fetchPolicy: 'cache-and-network' })
  const authStorage = useAuthStorage()
  const client = useApolloClient()
  const nav = useNavigate()

  console.log(authResult.loading,authResult.data,authResult.error)

  const data = authResult.data ? authResult.data.me : null

  const handleSignOut = async () => {
    nav('/')
    await authStorage.removeAccessToken()
    await client.resetStore()
    
  }



  return <View style={styles.container}>
    <ScrollView horizontal >
      <View style={styles.tab}>
        <Pressable >
          <Link to={"/"}>
            <Text style={styles.text}>Testing123</Text>
          </Link>
        </Pressable>
      </View>
      {data && !authResult.loading && !authResult.error ?
        
        <View style={styles.tab}>
          <Pressable >
            <Link to={'/createReview'}>
            <Text style={styles.text}>Create a review</Text>
            </Link>
          </Pressable>
        </View>
        :
        <View style={styles.tab}>
        <Pressable>
          <Link to={"/signin"}>
            <Text style={styles.text}>Sign in</Text>
          </Link>
        </Pressable>
        </View>
        }
        {data && !authResult.loading && !authResult.error ?
        
        <View style={styles.tab}>
          <Pressable >
            <Link to={'/myReviews'}>
            <Text style={styles.text}>My reviews</Text>
            </Link>
          </Pressable>
        </View>
        :
        null
        }
      

        {data && !authResult.loading && !authResult.error ?
        
        <View style={styles.tab}>
          <Pressable onPress={handleSignOut}>
            <Text style={styles.text}>Sign Out</Text>
          </Pressable>
        </View>
        :
          <View style={styles.tab}>
          <Pressable>
            <Link to={"/signup"}>
              <Text style={styles.text}>Sign up</Text>
            </Link>
          </Pressable>
          </View>
        }



      
      
    </ScrollView>



  </View>;
};


export default AppBar;