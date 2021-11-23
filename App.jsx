import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './src/components/connexion/SignIn';
import axios from "axios";
import ApiRoutes from "./src/utils/const/ApiRoutes";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const API_URL = 'http://api-sousmontoit.am.manusien-ecolelamanu.fr/public/';
  const [tokenIsValid, setTokenIsValid] = useState(true);
  axios.defaults.headers.common = { 'Authorization': `Bearer ${AsyncStorage.getItem('@auth:token')}` }

  // Test de la validité du token
  useEffect(() => {
    console.log(AsyncStorage.getItem('@auth:token'))

    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      if (error.response) {
        if (error.response.status === 401) {
          AsyncStorage.removeItem('@auth:token')
          setTokenIsValid(false)
        }
      }
      return Promise.reject(error);
    })
    axios.get(API_URL + ApiRoutes.customer + "/s/2")
  }, [API_URL]);

  return (
    tokenIsValid === true ?
      <View style={styles.container}>
        <Text>Vous êtes connecté ! </Text>
        <StatusBar style="auto" />
      </View>
      :
      <SignIn/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
