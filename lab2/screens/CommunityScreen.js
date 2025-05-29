import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import PostItem from '../components/PostItem';

const communityPostsData = [
  {
    id: '1',
    authorName: 'Mimi',
    authorAvatarUri: 'https://media.4-paws.org/d/2/5/f/d25ff020556e4b5eae747c55576f3b50886c0b90/cut%20cat%20serhio%2002-1813x1811-720x719.jpg',
    postTag: 'CS:GO',
    timestamp: 'yesterday • 2:20 pm',
    imageUri: 'https://egamersworld.com/cdn-cgi/image/width=690,quality=75,format=webp/uploads/blog/1559041333688.webp',
    contentText: 'GlobalOffensive is the home for the Counter-Strike community and a hub for the discussion and sharing of content',
    likes: 433,
    comments: 123,
  },
  {
    id: '2',
    authorName: 'User123',
    authorAvatarUri: 'https://ideyka.com.ua/files/resized/products/4814.1800x1800.jpg',
    postTag: 'АРТ',
    timestamp: 'May 28 • 10:15 am',
    imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6mYh7t_1YUe__KS652ugozbzbuZ6tEp5XwQ&s',
    contentText: 'Оцініть мій новий арт! Намагався зробити щось у стилі кіберпанк.',
    likes: 75,
    comments: 12,
  },
];

const filters = ['Всі', 'Скриншоти', 'Графіка', 'Майстерня'];

const CommunityScreen = () => {
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState('Всі');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedPosts, setDisplayedPosts] = useState(communityPostsData);

  useEffect(() => {
    let filteredData = communityPostsData;
    if (searchQuery) {
      filteredData = filteredData.filter(post =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.contentText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.authorName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setDisplayedPosts(filteredData);
  }, [searchQuery, activeFilter]);


  const renderPostItem = ({ item }) => <PostItem post={item} />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={displayedPosts}
        renderItem={renderPostItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
              Спільнота - ділись контентом з іншими користувачами
            </Text>
            <TextInput
              style={[
                styles.searchBar,
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Пошук..."
              placeholderTextColor={colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <ScrollView horizontal={true} contentContainerStyle={styles.filterContainer}>
              {filters.map(filter => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: activeFilter === filter ? colors.primary : colors.card,
                      borderColor: activeFilter === filter ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    { color: activeFilter === filter ? (colors.card === lightThemeColors.card ? lightThemeColors.card : colors.text) : colors.secondaryText }
                  ]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

import { lightThemeColors } from '../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchBar: {
    height: 45,
    marginHorizontal: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 1,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CommunityScreen;