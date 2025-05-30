import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const FilesScreen = ({ navigation }) => {
  const handleOpenFileExplorer = () => {
    const initialPath = FileSystem.documentDirectory + 'AppData';
    navigation.navigate('FileManager', { basePath: initialPath });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="folder-outline" size={100} color="#007AFF" />
        <Text style={styles.title}>Файловий менеджер</Text>
        <Text style={styles.subtitle}>
          Переглядайте та керуйте файлами вашого додатку
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleOpenFileExplorer}>
          <MaterialCommunityIcons name="folder-open-outline" size={24} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Відкрити файловий менеджер</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default FilesScreen;