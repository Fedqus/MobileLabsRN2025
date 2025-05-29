import { View, Text, StyleSheet, Switch, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = () => {
  const { theme, toggleTheme, colors } = useTheme();

  const userName = "Савчук Владислав";
  const userGroup = "ІПЗ-21-5";
  const userAvatarUri = 'https://t4.ftcdn.net/jpg/04/20/38/41/360_F_420384111_5fzxWlWxvB7bg5BROxfKdBbgBYB2TwGP.jpg';
  const isUserOnline = true;

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.background }]}>
      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: userAvatarUri }} style={styles.avatarImage} />
          {isUserOnline && <View style={[styles.onlineIndicator, { borderColor: colors.background }]} />}
        </View>
        <Text style={[styles.userNameText, { color: colors.text }]}>{userName}</Text>
        <Text style={[styles.userGroupText, { color: colors.secondaryText }]}>{userGroup}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.menuItemText, { color: colors.text }]}>
            Change Theme ({theme === 'light' ? 'Light' : 'Dark'})
          </Text>
          <Ionicons name="chevron-forward-outline" size={22} color={colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => alert('Logout action!')}
        >
          <Text style={[styles.menuItemText, { color: colors.text }]}>Logout</Text>
          <Ionicons name="chevron-forward-outline" size={22} color={colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  onlineIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderWidth: 3,
  },
  userNameText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userGroupText: {
    fontSize: 16,
  },
  menuContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItemText: {
    fontSize: 17,
  },
});

export default ProfileScreen;