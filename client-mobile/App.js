import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/navigators/BottomTab.jsx'
import { ApolloProvider } from '@apollo/client';
import client from './apolloConfig.js';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </ApolloProvider>
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
