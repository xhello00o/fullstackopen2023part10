# fullstackopen2023part10
React Native with Expo

## Course Content
In this part, we will learn how to build native Android and iOS mobile applications with JavaScript and React using the React Native framework. We will dive into the React Native ecosystem by developing an entire mobile application from scratch. Along the way, we will learn concepts such as how to render native user interface components with React Native, how to create beautiful user interfaces, how to communicate with a server, and how to test a React Native application.

more details can be found [here](https://fullstackopen.com/en/part10/introduction_to_react_native).

## Introduction to React Native
Note, that the @sdk-46 sets the project's Expo SDK version to 46, which supports React Native version 0.69. Using other Expo SDK versions might cause you trouble while following this material. Also, Expo has a few limitations when compared to plain React Native CLI. However, these limitations do not affect the application implemented in the material.

- Set up the [Android emulator with Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/) (any operating system)
- Set up the [iOS simulator with Xcode](https://docs.expo.dev/workflow/ios-simulator/) (macOS operating system)

```javascript
npx create-expo-app rate-repository-app --template expo-template-blank@sdk-46
npx expo install react-native-web@~0.18.7 react-dom@18.2.0 @expo/webpack-config@^0.17.0
npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react eslint-plugin-react-native
```

## React Native Basics

Full list can be found [here](https://reactnative.dev/docs/components-and-apis)
- Text component is the only React Native component that can have textual children. It is similar to for example the <strong> and the <h1> elements.
- View component is the basic user interface building block similar to the <div> element.
- TextInput component is a text field component similar to the <input> element.
- Pressable component is for capturing different press events. It is similar to for example the <button> element.

// Need to add in flexbox

flexDirection property controls the direction in which the flex items are laid out within the container. Possible values for this property are row, row-reverse, column (default value) and column-reverse. Flex direction row will lay out the flex items from left to right, whereas column from top to bottom. *-reverse directions will just reverse the order of the flex items.
justifyContent property controls the alignment of flex items along the main axis (defined by the flexDirection property). Possible values for this property are flex-start (default value), flex-end, center, space-between, space-around and space-evenly.
alignItems property does the same as justifyContent but for the opposite axis. Possible values for this property are flex-start, flex-end, center, baseline and stretch (default value).
```javascript
import { Text } from 'react-native';

const HelloWorld = props => {

  return <Text>Hello world!</Text>;
};
```
```javascript
import { Text, Pressable, Alert } from 'react-native';

const PressableText = props => {
  return (
    <Pressable
      onPress={() => Alert.alert('You pressed the text!')}
    >
      <Text>You can press me</Text>
    </Pressable>
  );
};
```
```javascript
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Rate Repository Application</Text>
    </View>
  );
};

export default Main;
```
```javascript
npm install react-router-native
```
```javascript
import { StatusBar } from 'expo-status-bar';

import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';

const App = () => {
  return (

    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
```
