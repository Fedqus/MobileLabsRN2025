import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const TaskItem = ({ task }) => {
  return (
    <View style={styles.container}>
      <View style={[
        styles.statusIndicator,
        task.completed ? styles.completedIndicator : styles.incompleteIndicator,
      ]}>
        {task.completed && (
          <Ionicons name="checkmark-sharp" size={14} color="white" />
        )}
      </View>
      <Text style={[styles.description, task.completed && styles.completedDescription]}>
        {task.description}
        {task.targetCount && ` (${task.currentCount || 0}/${task.targetCount})`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  completedIndicator: {
    backgroundColor: '#34C759',
  },
  incompleteIndicator: {
    backgroundColor: '#E0E0E0',
  },
  description: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  completedDescription: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});

export default TaskItem;