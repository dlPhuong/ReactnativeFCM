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
import accList from './dataPhaKe';

const Login = ({ navigation }) => {

  const [account, setaccount] = React.useState("");
  const [pass, setPass] = React.useState("");

  useEffect(() => {
    // messaging()
    // .subscribeToTopic('weather')
    // .then(() => console.log('Subscribed to topic!'));
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      await notifee.displayNotification({
        id: '123',
        title: remoteMessage.data.title,
        body: remoteMessage.data.message,
        android: {
          channelId,
        },
      });
      
     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  ///

  async function onDisplayNotification() {
    accList.forEach(element => {
        if (element.tk == account && element.mk == pass) {
          messaging()
            .subscribeToTopic(account)
            .then(() => {
              navigation.navigate('MainPage',{account});
              console.log('Subscribed to topic!' + account)
            });
        }
      });
    // navigation.navigate('MainPage')
    // const channelId = await notifee.createChannel({
    //   id: 'default',
    //   name: 'Default Channel',
    // });
    // // Sometime later...
    // await notifee.displayNotification({
    //   id: '123',
    //   title: 'Updated Notification Title',
    //   body: 'Updated main body content of the notification',
    //   android: {
    //     channelId,
    //   },
    // });
  }

////////////////////
  return (
    <SafeAreaView style={styles.sectionContainer}>
            <TextInput
        style={styles.input}
        onChangeText={setaccount}
        value={account}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPass}
        value={pass}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
       <Button title="Đăng nhập" onPress={() => onDisplayNotification()} />
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


export default Login;
