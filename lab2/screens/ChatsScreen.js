import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ChatItem from '../components/ChatItem';

const openChatsData = [
  {
    id: '1',
    name: 'Xtras',
    avatarUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI9RCaHmaI4zOvGBZiwy-K8lIUwIfFJ-_9Hg&s',
    lastMessage: 'Ready for the raid in 5!',
    lastMessageSender: 'other',
    timestamp: 'Сьогодні',
    isOnline: true,
    unreadCount: 1,
  },
  {
    id: '2',
    name: 'Goldberg',
    avatarUri: 'https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740',
    lastMessage: 'Got it, heading to the lobby now.',
    lastMessageSender: 'you',
    timestamp: 'Сьогодні',
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'tinsh',
    avatarUri: 'https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp',
    lastMessage: 'Anyone for a quick match?',
    lastMessageSender: 'other',
    timestamp: 'Вчора',
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: '4',
    name: 'Bekii',
    avatarUri: 'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg',
    lastMessage: 'Logging off for tonight. GLHF!',
    lastMessageSender: 'other',
    timestamp: 'Вчора',
    isOnline: false,
    unreadCount: 0,
  },
];

const myFriendsData = [
  {
    id: 'f1',
    name: 'Friend_Alpha',
    avatarUri: 'https://tinypng.com/images/social/website.jpg',
    lastMessage: 'Online',
    lastMessageSender: 'status',
    timestamp: 'Сьогодні',
    isOnline: true,
    unreadCount: 0,
  },
];

const tabs = ['Усі', 'Друзі'];

const ChatsScreen = () => {
  const { colors, theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Усі');
  const [displayedData, setDisplayedData] = useState(openChatsData);

  useEffect(() => {
    if (activeTab === 'Усі') {
      setDisplayedData(openChatsData);
    } else if (activeTab === 'Друзі') {
      setDisplayedData(myFriendsData);
    }
  }, [activeTab]);

  const renderChatItem = ({ item }) => <ChatItem chat={item} />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.segmentedControlContainer, { backgroundColor: theme === 'light' ? '#E9E9EF' : colors.card }]}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.segmentTab,
              activeTab === tab && [
                styles.activeSegmentTab,
                { backgroundColor: colors.card, shadowColor: colors.text },
              ],
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.segmentTabText,
              { color: activeTab === tab ? colors.primary : colors.secondaryText },
              activeTab === tab && styles.activeSegmentTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={displayedData}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedControlContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 8,
    padding: 3,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  activeSegmentTab: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  segmentTabText: {
    fontSize: 14,
  },
  activeSegmentTabText: {
    fontWeight: 'bold',
  },
});

export default ChatsScreen;