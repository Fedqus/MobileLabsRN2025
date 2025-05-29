import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

const PostItem = ({ post }) => {
  const { colors } = useTheme();

  const {
    authorName,
    authorAvatarUri,
    postTag,
    timestamp,
    imageUri,
    contentText,
    likes,
    comments,
  } = post;

  return (
    <View style={[styles.container, { backgroundColor: colors.card, shadowColor: colors.text }]}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: authorAvatarUri }} style={styles.avatar} />
        <View style={styles.authorInfoContainer}>
          <Text style={[styles.authorNameText, { color: colors.text }]}>{authorName}</Text>
          <View style={styles.tagAndTimestampContainer}>
            {postTag && (
              <View style={[styles.tagBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.tagText}>{postTag}</Text>
              </View>
            )}
            <Text style={[styles.timestampText, { color: colors.secondaryText }]}>{timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.secondaryText} />
        </TouchableOpacity>
      </View>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imageContent} resizeMode="cover" />
      )}
      {contentText && (
        <Text style={[styles.contentText, { color: colors.text }]} numberOfLines={5}>
          {contentText}
        </Text>
      )}

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.engagementButton}>
          <Ionicons name="thumbs-up-outline" size={20} color={colors.secondaryText} />
          <Text style={[styles.engagementText, { color: colors.secondaryText }]}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.engagementButton}>
          <Ionicons name="chatbubble-outline" size={20} color={colors.secondaryText} />
          <Text style={[styles.engagementText, { color: colors.secondaryText }]}>{comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  authorInfoContainer: {
    flex: 1,
  },
  authorNameText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tagAndTimestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginRight: 8,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  timestampText: {
    fontSize: 12,
  },
  optionsButton: {
    padding: 5,
  },
  imageContent: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 5,
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  engagementText: {
    marginLeft: 5,
    fontSize: 14,
  },
});

export default PostItem;