import { useState, useEffect, useLayoutEffect } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, ActivityIndicator, Platform
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const formatBytes = (bytes, decimals = 2) => {
    if (!bytes || bytes === 0) return '0 Байт';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const FileManagerScreen = ({ route, navigation }) => {
    const { basePath } = route.params;
    const [currentPath, setCurrentPath] = useState(basePath);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isFileModalVisible, setFileModalVisible] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [newFileContent, setNewFileContent] = useState('');

    const [isFolderModalVisible, setFolderModalVisible] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const [isInfoModalVisible, setInfoModalVisible] = useState(false);
    const [selectedItemForInfo, setSelectedItemForInfo] = useState(null);

    useLayoutEffect(() => {
        let displayPath = currentPath.replace(FileSystem.documentDirectory, 'Documents/');
        if (displayPath.startsWith('Documents/AppData') && displayPath.length > "Documents/AppData".length + 1) {
            displayPath = "AppData/" + displayPath.substring("Documents/AppData/".length);
        } else if (displayPath === 'Documents/AppData') {
            displayPath = "AppData";
        }

        if (displayPath.length > 25) {
            displayPath = "..." + displayPath.slice(-22);
        }
        navigation.setOptions({ title: displayPath });
    }, [navigation, currentPath]);

    const ensureDirExists = async (dirPath) => {
        const dirInfo = await FileSystem.getInfoAsync(dirPath);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
        }
    };

    useEffect(() => {
        ensureDirExists(basePath).then(() => {
            if (currentPath) {
                loadDirectoryContents(currentPath);
            }
        });
    }, []);

    const loadDirectoryContents = async (path) => {
        try {
            setIsLoading(true);
            await ensureDirExists(path);
            const result = await FileSystem.readDirectoryAsync(path);
            const detailedItems = await Promise.all(
                result.map(async (name) => {
                    const itemPath = `${path}/${name}`;
                    const info = await FileSystem.getInfoAsync(itemPath, { size: true, modificationTime: true });
                    return {
                        name,
                        isDirectory: info.isDirectory,
                        uri: info.uri,
                        size: info.size,
                        modificationTime: info.modificationTime,
                    };
                })
            );
            detailedItems.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });
            setItems(detailedItems);
        } catch (error) {
            console.error('Error loading directory:', error);
            Alert.alert('Помилка', `Не вдалося завантажити вміст папки: ${path.split('/').pop()}`);
            if (path !== basePath && path !== FileSystem.documentDirectory) {
                goUp();
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (currentPath) {
            loadDirectoryContents(currentPath);
        }
    }, [currentPath]);

    const handleItemPress = (item) => {
        if (item.isDirectory) {
            setCurrentPath(item.uri);
        } else {
            navigation.navigate('FileViewer', { fileUri: item.uri, fileName: item.name });
        }
    };

    const goUp = () => {
        if (currentPath === basePath || (currentPath === FileSystem.documentDirectory && basePath !== FileSystem.documentDirectory)) {
            if (currentPath === basePath) return;
            if (currentPath === FileSystem.documentDirectory && basePath === FileSystem.documentDirectory) return;
        }

        const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));

        if (parentPath && parentPath.length >= (basePath.length < FileSystem.documentDirectory.length ? basePath.length : FileSystem.documentDirectory.length) && parentPath.startsWith(FileSystem.documentDirectory.substring(0, FileSystem.documentDirectory.lastIndexOf('/')))) {
            if (parentPath.length < basePath.length && basePath.startsWith(parentPath) && basePath !== parentPath) {
                if (parentPath.length < basePath.length && basePath.startsWith(parentPath)) {
                    if (currentPath === basePath) return;
                    if (basePath.startsWith(parentPath) && parentPath !== basePath) {
                    }
                }
            }
            const minAllowedPathLength = Math.min(FileSystem.documentDirectory.length, basePath.length);
            if (parentPath.length >= minAllowedPathLength - 1) {
                if (currentPath === basePath) return;
                setCurrentPath(parentPath);
            } else {
                setCurrentPath(basePath);
            }

        } else {
            setCurrentPath(basePath);
        }
    };

    const showCreateFileModal = () => { setNewFileName(''); setNewFileContent(''); setFileModalVisible(true); };
    const handleCreateFile = async () => { if (!newFileName.trim()) { Alert.alert('Помилка', 'Назва файлу не може бути порожньою.'); return; } const filePath = `${currentPath}/${newFileName.trim()}`; try { await FileSystem.writeAsStringAsync(filePath, newFileContent, { encoding: FileSystem.EncodingType.UTF8 }); setFileModalVisible(false); loadDirectoryContents(currentPath); Alert.alert('Успіх', `Файл "${newFileName}" створено.`); } catch (error) { console.error('Error creating file:', error); Alert.alert('Помилка', 'Не вдалося створити файл.'); } };
    const showCreateFolderModal = () => { setNewFolderName(''); setFolderModalVisible(true); };
    const handleCreateFolder = async () => { if (!newFolderName.trim()) { Alert.alert('Помилка', 'Назва папки не може бути порожньою.'); return; } const folderPath = `${currentPath}/${newFolderName.trim()}`; try { await FileSystem.makeDirectoryAsync(folderPath); setFolderModalVisible(false); loadDirectoryContents(currentPath); Alert.alert('Успіх', `Папку "${newFolderName}" створено.`); } catch (error) { console.error('Error creating folder:', error); Alert.alert('Помилка', 'Не вдалося створити папку.'); } };

    const handleShowInfo = (item) => {
        setSelectedItemForInfo(item);
        setInfoModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemOuterContainer}>
            <View style={styles.itemInnerContainer}>
                <MaterialCommunityIcons
                    name={item.isDirectory ? 'folder' : 'file-outline'}
                    size={28}
                    color={item.isDirectory ? '#FFCA28' : '#42A5F5'}
                    style={styles.itemIcon}
                />
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="middle">{item.name}</Text>
                    <Text style={styles.itemDetails}>
                        {item.isDirectory ? 'Папка' : `Файл • ${formatBytes(item.size)}`}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => handleShowInfo(item)} style={styles.infoButton}>
                    <Ionicons name="information-circle-outline" size={26} color="#757575" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const InfoRow = ({ label, value, isPath = false }) => (
        <View style={styles.infoRowContainer}>
            <Text style={styles.infoRowLabel}>{label}</Text>
            <Text style={[styles.infoRowValue, isPath && styles.pathText]} numberOfLines={isPath ? 3 : 1} ellipsizeMode="tail">{value}</Text>
        </View>
    );

    if (isLoading && items.length === 0) {
        return (
            <SafeAreaView style={[styles.fullScreenCentered]} edges={['bottom', 'left', 'right']}>
                <ActivityIndicator size="large" color="#007AFF" />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer} edges={['bottom', 'left', 'right']}>
            <View style={styles.navigationHeader}>
                <TouchableOpacity
                    onPress={goUp}
                    style={styles.upButton}
                    disabled={currentPath === basePath || currentPath === FileSystem.documentDirectory && basePath.startsWith(FileSystem.documentDirectory)}
                >
                    <Ionicons
                        name="arrow-up-circle-outline"
                        size={28}
                        color={(currentPath === basePath || (currentPath === FileSystem.documentDirectory && basePath.startsWith(FileSystem.documentDirectory))) ? "#BDBDBD" : "#007AFF"} />
                    <Text
                        style={[
                            styles.upButtonText,
                            (currentPath === basePath || (currentPath === FileSystem.documentDirectory && basePath.startsWith(FileSystem.documentDirectory))) && styles.disabledText
                        ]}
                    > Вгору</Text>
                </TouchableOpacity>
            </View>

            {isLoading && <ActivityIndicator size="small" color="#007AFF" style={{ marginVertical: 5 }} />}

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.uri}
                ListEmptyComponent={<Text style={styles.emptyListText}>Папка порожня</Text>}
                contentContainerStyle={{ paddingBottom: 80 }}
            />

            <View style={styles.bottomActionsContainer}>
                <TouchableOpacity style={[styles.actionButton, styles.newFolderButton]} onPress={showCreateFolderModal}>
                    <Ionicons name="create-outline" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Нова папка</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.newFileButton]} onPress={showCreateFileModal}>
                    <Ionicons name="document-text-outline" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Новий файл</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" transparent={true} visible={isFileModalVisible} onRequestClose={() => setFileModalVisible(false)}>
                <View style={styles.modalOverlay}><View style={styles.modalContent}><Text style={styles.modalTitle}>Створити файл</Text><TextInput style={styles.input} placeholder="Назва файлу (напр. data.txt)" value={newFileName} onChangeText={setNewFileName} autoCapitalize="none" /><TextInput style={[styles.input, styles.multilineInput]} placeholder="Вміст файлу" value={newFileContent} onChangeText={setNewFileContent} multiline={true} numberOfLines={4} /><View style={styles.modalActions}><TouchableOpacity style={[styles.modalButton, styles.createButton]} onPress={handleCreateFile}><Text style={styles.modalButtonText}>Створити</Text></TouchableOpacity><TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setFileModalVisible(false)}><Text style={styles.modalButtonText}>Скасувати</Text></TouchableOpacity></View></View></View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={isFolderModalVisible} onRequestClose={() => setFolderModalVisible(false)}>
                <View style={styles.modalOverlay}><View style={styles.modalContent}><Text style={styles.modalTitle}>Створити папку</Text><TextInput style={styles.input} placeholder="Назва папки" value={newFolderName} onChangeText={setNewFolderName} autoCapitalize="none" /><View style={styles.modalActions}><TouchableOpacity style={[styles.modalButton, styles.createButton]} onPress={handleCreateFolder}><Text style={styles.modalButtonText}>Створити</Text></TouchableOpacity><TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setFolderModalVisible(false)}><Text style={styles.modalButtonText}>Скасувати</Text></TouchableOpacity></View></View></View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isInfoModalVisible}
                onRequestClose={() => setInfoModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Інформація</Text>
                        {selectedItemForInfo && (
                            <>
                                <InfoRow label="Ім'я:" value={selectedItemForInfo.name} />
                                <InfoRow label="Тип:" value={selectedItemForInfo.isDirectory ? 'Папка' : 'Файл'} />
                                <InfoRow
                                    label="Шлях:"
                                    value={selectedItemForInfo.uri.replace(FileSystem.documentDirectory, 'Documents/')}
                                    isPath={true}
                                />
                                {!selectedItemForInfo.isDirectory && (
                                    <InfoRow label="Розмір:" value={formatBytes(selectedItemForInfo.size)} />
                                )}
                                {selectedItemForInfo.modificationTime && (
                                    <InfoRow
                                        label="Змінено:"
                                        value={new Date(selectedItemForInfo.modificationTime * 1000).toLocaleString('uk-UA', {
                                            year: 'numeric', month: 'numeric', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    />
                                )}
                            </>
                        )}
                        <TouchableOpacity
                            style={[styles.modalButton, styles.infoModalCloseButton]}
                            onPress={() => setInfoModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Закрити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: { flex: 1, backgroundColor: '#F5F5F5' },
    fullScreenCentered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' },
    navigationHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    upButton: { flexDirection: 'row', alignItems: 'center', paddingRight: 15 },
    upButtonText: { fontSize: 16, color: '#007AFF', marginLeft: 5 },
    disabledText: { color: '#BDBDBD' },

    itemOuterContainer: {
        backgroundColor: 'white',
    },
    itemInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    itemIcon: { marginRight: 15 },
    itemTextContainer: { flex: 1 },
    itemName: { fontSize: 16, color: '#212121' },
    itemDetails: { fontSize: 12, color: '#757575' },
    infoButton: {
        paddingLeft: 12,
        paddingVertical: 6,
    },
    emptyListText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#757575' },
    bottomActionsContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#F8F8F8', borderTopWidth: 1, borderTopColor: '#E0E0E0' },
    actionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2 },
    actionButtonText: { color: 'white', fontSize: 15, fontWeight: 'bold', marginLeft: 8 },
    newFolderButton: { backgroundColor: '#FF9800' },
    newFileButton: { backgroundColor: '#007AFF' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: 'white', padding: 25, borderRadius: 10, width: '90%', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
    input: { borderWidth: 1, borderColor: '#BDBDBD', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, marginBottom: 15, backgroundColor: '#F5F5F5' },
    multilineInput: { height: 100, textAlignVertical: 'top' },
    modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    modalButton: { flex: 1, paddingVertical: 12, borderRadius: 6, alignItems: 'center', elevation: 1 },
    createButton: { backgroundColor: '#007AFF', marginRight: 5 },
    cancelButton: { backgroundColor: '#E0E0E0', marginLeft: 5 },
    modalButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

    infoModalCloseButton: {
        backgroundColor: '#007AFF',
        marginTop: 20,
    },
    infoRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoRowLabel: {
        fontSize: 15,
        color: '#424242',
        fontWeight: '600',
        marginRight: 10,
        flex: 0.4,
    },
    infoRowValue: {
        fontSize: 15,
        color: '#212121',
        flex: 0.6,
        textAlign: 'right',
    },
    pathText: {
        fontSize: 13,
        textAlign: 'left',
        color: '#0D47A1',
    },
});

export default FileManagerScreen;