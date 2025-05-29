import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

const securityTabs = ['Захист', 'Підтвердження'];
const actionItems = ['Remove Authenticator', 'My Recovery Code', 'Help'];

const SecurityScreen = () => {
  const { colors } = useTheme();
  const [activeSecurityTab, setActiveSecurityTab] = useState('Підтвердження');
  const [authCode] = useState('2GJGK');
  const [timer, setTimer] = useState(27);
  const initialProgress = 27 / 30;
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    if (activeSecurityTab === 'Підтвердження') {
      let currentSeconds = 27;
      const interval = setInterval(() => {
        currentSeconds -= 1;
        if (currentSeconds < 0) {
          currentSeconds = 30;
        }
        setTimer(currentSeconds);
        setProgress(currentSeconds / 30);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeSecurityTab]);


  const ActionItem = ({ title }) => (
    <TouchableOpacity style={[styles.actionItem, { backgroundColor: colors.card }]}>
      <Text style={[styles.actionItemText, { color: colors.text }]}>{title}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color={colors.secondaryText} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.securityTabContainer, { backgroundColor: colors.card }]}>
        {securityTabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.securityTab,
              {
                backgroundColor: activeSecurityTab === tab
                  ? colors.activeSegmentBackground
                  : colors.card,
              },
              activeSecurityTab === tab && styles.activeSecurityTabPill
            ]}
            onPress={() => setActiveSecurityTab(tab)}
          >
            <Text style={[
              styles.securityTabText,
              { color: activeSecurityTab === tab ? colors.primary : colors.secondaryText }
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeSecurityTab === 'Підтвердження' && (
        <View style={styles.authCodeSection}>
          <Text style={[styles.authCodeLabel, { color: colors.secondaryText }]}>
            Вхід як гравець
          </Text>
          <Text style={[styles.authCodeText, { color: colors.primary }]}>
            {authCode}
          </Text>
          <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: colors.primary }]} />
          </View>
          <Text style={[styles.timerText, { color: colors.secondaryText }]}>
            {timer} сек
          </Text>
        </View>
      )}

      <View style={styles.infoTextContainer}>
        <Text style={[styles.infoText, { color: colors.text }]}>
          Ви повинні вводити свій код кожного разу, коли вводите свій пароль для входу в свій Steam акаунт.
        </Text>
        <Text style={[styles.infoText, { color: colors.text, marginTop: 10 }]}>
          <Text style={{ fontWeight: 'bold' }}>Поради: </Text>
          Якщо ви не ділитеся своїм комп'ютером, ви можете вибрати "Запам'ятати пароль" при вході в PC-клієнт, щоб вводити свій пароль та код автентифікатора рідше.
        </Text>
      </View>

      <View style={styles.actionListContainer}>
        {actionItems.map(item => (
          <ActionItem key={item} title={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  securityTabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 8,
    padding: 4,
  },
  securityTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  securityTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeSecurityTabPill: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,

  },
  authCodeSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  authCodeLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  authCodeText: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 15,
  },
  progressBarContainer: {
    width: '70%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  timerText: {
    fontSize: 13,
  },
  infoTextContainer: {
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  actionListContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 15,
  },
  actionItemText: {
    fontSize: 16,
  },
});

export default SecurityScreen;