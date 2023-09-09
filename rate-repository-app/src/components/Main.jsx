import Constants from 'expo-constants';
import { Text, StyleSheet, View, Platform } from 'react-native';
import AppBar from './Appbar';
import RepositoryList from './RepositoryList';
import { Route,Routes,Navigate } from 'react-router-native';
import SignIn from './SignIn';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor:'#ECECF3',
    fontFamily: Platform.select({
      android:'Roboto',
      ios:'Arial',
      default:'System'
    })
  },
});

const Main = () => {
  return (
    
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/signin' element={<SignIn/>} exact/>
      </Routes>
    </View>
    
  );
};

export default Main;