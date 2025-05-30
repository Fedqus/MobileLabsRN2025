import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';

const HomeScreen = () => {
  const [totalSpaceGB, setTotalSpaceGB] = useState(0);
  const [freeSpaceGB, setFreeSpaceGB] = useState(0);
  const [usedSpaceGB, setUsedSpaceGB] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const totalBytes = await FileSystem.getTotalDiskCapacityAsync();
        const freeBytes = await FileSystem.getFreeDiskStorageAsync();

        if (totalBytes === null || freeBytes === null) {
            throw new Error("Не вдалося отримати дані про сховище. API повернув null.");
        }
        
        const usedBytes = totalBytes - freeBytes;

        const bytesToGB = (bytes) => parseFloat((bytes / (1024 * 1024 * 1024)).toFixed(2));

        setTotalSpaceGB(bytesToGB(totalBytes));
        setFreeSpaceGB(bytesToGB(freeBytes));
        setUsedSpaceGB(bytesToGB(usedBytes));
        
        setLastUpdated(new Date().toLocaleString('uk-UA', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }));

      } catch (e) {
        console.error("Failed to fetch storage data:", e);
        setError("Не вдалося завантажити дані сховища. Перевірте дозволи та спробуйте знову.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStorageData();
  }, []);

  const usedPercentage = totalSpaceGB > 0 ? (usedSpaceGB / totalSpaceGB) * 100 : 0;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Завантаження даних про сховище...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.labText}>Лабораторна робота 5</Text>
          <Text style={styles.nameText}>Савчук Владислав Вікторович ІПЗ-21-5</Text>
        </View>

        <View style={styles.storageInfoContainer}>
          <Text style={styles.storageTitle}>Інформація про сховище</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Загальний обсяг:</Text>
            <Text style={styles.infoValue}>{totalSpaceGB} ГБ</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Вільний простір:</Text>
            <Text style={styles.infoValue}>{freeSpaceGB} ГБ</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Зайнятий простір:</Text>
            <Text style={styles.infoValue}>{usedSpaceGB} ГБ</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${usedPercentage}%` }]} />
          </View>
          {lastUpdated && (
            <Text style={styles.lastUpdateText}>
              Останнє оновлення: {lastUpdated}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  labText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  nameText: {
    fontSize: 16,
    color: '#555',
  },
  storageInfoContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  storageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#444',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 10,
  },
  lastUpdateText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default HomeScreen;