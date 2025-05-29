import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
const newsData = [
  { id: '1', title: 'Заголовок', date: 'Дата', text: 'текст новини', image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' },
  { id: '2', title: 'Заголовок', date: 'Дата', text: 'текст новини', image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' },
  { id: '3', title: 'Заголовок', date: 'Дата', text: 'текст новини', image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' },
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.newsTitle}>Новини</Text>
      {newsData.map(item => (
        <View key={item.id} style={styles.newsItemContainer}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
          <View style={styles.newsTextContainer}>
            <Text style={styles.newsItemTitle}>{item.title}</Text>
            <Text style={styles.newsItemDate}>{item.date}</Text>
            <Text style={styles.newsItemText}>{item.text}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  newsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  newsItemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  newsImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  newsItemDate: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 3,
  },
  newsItemText: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;