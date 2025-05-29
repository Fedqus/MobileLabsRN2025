import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>
        Савчук Владислав Вікторович, група ІПЗ-21-5
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#d0d0d0',
  },
  footerText: {
    fontSize: 12,
    color: '#555',
  },
});

export default Footer;