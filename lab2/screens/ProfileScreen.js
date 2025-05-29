import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.background }]}>
      <Text style={[styles.profileText, { color: colors.text }]}>Налаштування профілю</Text>

      <View style={[styles.themeSwitcherContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.themeSwitchLabel, { color: colors.text }]}>
          Темна тема
        </Text>
        <Switch
          trackColor={{ false: colors.switchTrackFalse, true: colors.primary }}
          thumbColor={theme === 'dark' ? colors.primary : colors.switchThumb}
          ios_backgroundColor={colors.switchTrackFalse}
          onValueChange={toggleTheme}
          value={theme === 'dark'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  profileText: {
    fontSize: 24,
    marginBottom: 30,
  },
  themeSwitcherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
  },
  themeSwitchLabel: {
    fontSize: 18,
  },
});

export default ProfileScreen;