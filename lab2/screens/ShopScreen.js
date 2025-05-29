import { View, Text, StyleSheet } from 'react-native';

const ShopScreen = () => (
  <View style={styles.placeholderContainer}>
    <Text>ShopScreen</Text>
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

export default ShopScreen;