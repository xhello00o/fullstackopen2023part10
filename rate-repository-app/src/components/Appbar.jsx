import { Text,View, StyleSheet, Button, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor:'#0A0C7B',
    alignItems:'stretch',
    height:80,
  },
  tab:{
    flexDirection:'row',
    flexGrow:0,
    paddingHorizontal:10,
    alignItems:'center'
  },
  text:{
    flexGrow:0,
    color:'white',
    fontWeight:'bold',
    fontSize:20,
  }

  // ...
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal >
    <View style={styles.tab}> 
    <Pressable >
        <Link to={"/"}>
        <Text style={styles.text}>Testing123</Text>
        </Link>
        </Pressable>       
    </View>
    <View style={styles.tab}>
        <Pressable>
            <Link to={"/signin"}>
            <Text style={styles.text}>Sign in</Text>
            </Link>
        </Pressable>
    </View>
    </ScrollView>
        
    
        
    </View>;
};


export default AppBar;