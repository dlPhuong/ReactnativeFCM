/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee , { EventType } from '@notifee/react-native';
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {

    const channelId = await notifee.createChannel({
        id: 'default1',
        name: 'Default Channel1',
      });

      await notifee.displayNotification({
        id: '123',
        title: remoteMessage.data.title,
        body: remoteMessage.data.message,
        android: {
          channelId,
          pressAction:{id: 'snooze',launchActivity: 'default',}
        },
      });

    console.log('Message handled in the background!', remoteMessage);
  });

  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
      console.log('User pressed an action with the id: ', detail.pressAction.id);
    }
  });

  notifee.onBackgroundEvent(async ({ type, detail, headless }) => {
    console.log('User pressed an action with the id: ', detail.pressAction.id);
    if (type === EventType.ACTION_PRESS) {
        console.log('User pressed an action with the id: ', detail.pressAction.id);
    }
  });

AppRegistry.registerComponent(appName, () => App);
