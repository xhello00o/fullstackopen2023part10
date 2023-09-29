import Constants from 'expo-constants';
import { Text, StyleSheet, View, Platform } from 'react-native';
import AppBar from './Appbar';
import RepositoryList from './RepositoryList';
import { Route,Routes,Navigate } from 'react-router-native';
import SignIn from './SignIn';
import RepositoryReviews from './RepositoryReviews';
import CreateReview from './CreateReview';
import CreateUser from './CreateUser';
import Filter from './Filter';

import { useState } from 'react';
import MyReviews from './MyReviews';


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
        <Route path='/:id' element={<RepositoryReviews/>} exact/>
        <Route path='/createReview' element={<CreateReview/>} exact />
        <Route path='/signup' element={<CreateUser/> } exact /> 
        <Route path='/myReviews' element={<MyReviews/> } exact /> 
      </Routes>
    </View>
    
  );
};

export default Main;