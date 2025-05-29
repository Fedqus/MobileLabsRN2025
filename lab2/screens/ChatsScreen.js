import { View, Text, StyleSheet } from 'react-native';

const ChatsScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text>ChatsScreen</Text>
  </View>
);

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f6',
  },
});

export default ChatsScreen;