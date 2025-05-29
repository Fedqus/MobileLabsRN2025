import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ChatItem = ({ chat }) => {
  const { colors } = useTheme();
  const {
    name,
    avatarUri,
    lastMessage,
    lastMessageSender,
    timestamp,
    isOnline,
    unreadCount,
  } = chat;

  const messagePreview = lastMessageSender === 'you' ? `You: ${lastMessage}` : lastMessage;

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        {isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.nameText, { color: colors.text }]}>{name}</Text>
        <Text style={[styles.lastMessageText, { color: colors.secondaryText }]} numberOfLines={1}>
          {messagePreview}
        </Text>
      </View>
      <View style={styles.metaContainer}>
        <Text style={[styles.timestampText, { color: colors.secondaryText }]}>{timestamp}</Text>
        {unreadCount > 0 ? (
          <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
          </View>
        ) : (
          <View style={[styles.seenDot, { backgroundColor: colors.secondaryText }]} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
  },
  onlineIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  lastMessageText: {
    fontSize: 14,
  },
  metaContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  timestampText: {
    fontSize: 12,
    marginBottom: 5,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  seenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
});

export default ChatItem;