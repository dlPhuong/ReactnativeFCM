/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  TextInput ,
  Alert,
  useColorScheme,
  View,
} from 'react-native';

import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const MainPage = ({ route,navigation }) => {
  console.log(route.params);
  const { account } = route.params;

  async function onDisplayNotification() {
    messaging()
    .unsubscribeFromTopic(account)
    .then(() => {
      navigation.navigate('Login');
      console.log('Unsubscribed fom the topic!'+account)
    });
  }

////////////////////
  return (
    <SafeAreaView style={styles.sectionContainer}>
       <Button title="đăng xuất nè" onPress={() => onDisplayNotification()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    justifyContent:'center',
    flex:1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
  },
});


export default MainPage;
