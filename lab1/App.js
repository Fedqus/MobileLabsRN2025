import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Header from './components/Header';
import Footer from './components/Footer';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});