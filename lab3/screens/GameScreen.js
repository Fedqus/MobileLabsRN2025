import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';
import { GESTURE_TYPES } from '../constants/gameData';
import { TapGestureHandler, LongPressGestureHandler, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const gestureButtons = [
  { label: 'Tap', type: GESTURE_TYPES.TAP },
  { label: 'Hold', type: GESTURE_TYPES.HOLD },
  { label: 'Drag', type: GESTURE_TYPES.DRAG },
  { label: 'Pinch', type: GESTURE_TYPES.PINCH },
  { label: 'Swipe R', type: GESTURE_TYPES.SWIPE_RIGHT },
  { label: 'Swipe L', type: GESTURE_TYPES.SWIPE_LEFT },
];

const GameScreen = ({ navigation }) => {
  const { score, lastGesture, currentTask, handleGesture, gestureTypeToName } = useGame();

  const onSingleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleGesture(GESTURE_TYPES.TAP);
    }
  };

  const onDoubleTap = event => {
     if (event.nativeEvent.state === State.ACTIVE) {
      handleGesture(GESTURE_TYPES.DOUBLE_TAP);
    }
  };

  const onLongPress = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleGesture(GESTURE_TYPES.HOLD);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.lastGestureText}>
          Last Gesture: {lastGesture.name} (+{lastGesture.points})
        </Text>
      </View>

      <TapGestureHandler onHandlerStateChange={onSingleTap} numberOfTaps={1}>
          <LongPressGestureHandler onHandlerStateChange={onLongPress} minDurationMs={currentTask?.gesture === GESTURE_TYPES.HOLD ? (currentTask.duration || 1000) : 80000 /* дуже довго, щоб не спрацьовував випадково */}>
            <Animated.View style={styles.gestureCircle}>
              <Text style={styles.gestureCircleText}>
                {currentTask && !currentTask.completed
                  ? gestureTypeToName(currentTask.gesture) || currentTask.description
                  : 'All Tasks Done!'}
              </Text>
            </Animated.View>
          </LongPressGestureHandler>
      </TapGestureHandler>


      <View style={styles.buttonsGrid}>
        {gestureButtons.map(btn => (
          <TouchableOpacity
            key={btn.label}
            style={[
              styles.gestureButton,
              currentTask && currentTask.gesture === btn.type && !currentTask.completed
                ? styles.activeGestureButton
                : {},
              btn.type === GESTURE_TYPES.SWIPE_L && currentTask && currentTask.gesture === btn.type && !currentTask.completed
                ? styles.swipeLActiveButton
                : {}
            ]}
          >
            <Text style={styles.gestureButtonText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.viewTasksButton}
        onPress={() => navigation.navigate('Tasks')}
      >
        <Text style={styles.viewTasksButtonText}>View Tasks</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  lastGestureText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  gestureCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gestureCircleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  gestureButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    margin: 6,
    minWidth: 90,
    alignItems: 'center',
  },
  activeGestureButton: {
    backgroundColor: '#FF9500',
  },
  swipeLActiveButton: {
    backgroundColor: '#34C759',
  },
  gestureButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  viewTasksButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 40,
  },
  viewTasksButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameScreen;