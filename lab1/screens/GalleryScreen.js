import { View, Text, StyleSheet, FlatList } from 'react-native';
import GalleryItem from '../components/GalleryItem'
const galleryData = [
    { id: '1', uri: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' },
    { id: '2', uri: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' },
    { id: '3', uri: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' },
    { id: '4', uri: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg' },
];

const numColumns = 2;
const screenPadding = 12;
const itemSpacing = 12;

const GalleryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Галерея</Text>
            <FlatList
                data={galleryData}
                renderItem={GalleryItem}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                style={styles.list}
                contentContainerStyle={styles.listContentContainer}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
        marginLeft: screenPadding,
        color: '#333',
    },
    list: {
        flex: 1,
    },
    listContentContainer: {
        paddingHorizontal: screenPadding,
        paddingBottom: screenPadding,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: itemSpacing,
    },
});

export default GalleryScreen;