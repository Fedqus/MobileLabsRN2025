import { View, StyleSheet, Image, Dimensions} from 'react-native';

const numColumns = 2;
const screenPadding = 12;
const itemSpacing = 12;

const availableWidth = Dimensions.get('window').width - (screenPadding * 2) - (itemSpacing * (numColumns - 1));
const itemWidth = availableWidth / numColumns;
const itemHeight = itemWidth * 1.5;

const GalleryItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: itemWidth,
    height: itemHeight,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default GalleryItem;