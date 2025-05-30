import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useGame } from '../context/GameContext';
import TaskItem from '../components/TaskItem';

const TasksScreen = () => {
  const { score, tasks } = useGame();

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Current Score: {score}</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    color: '#333',
  },
});

export default TasksScreen;