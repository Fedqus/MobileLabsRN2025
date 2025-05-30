import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';
import { GESTURE_TYPES } from '../constants/gameData';
import {
    TapGestureHandler,
    LongPressGestureHandler,
    PanGestureHandler,
    PinchGestureHandler,
    State,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const gestureButtons = [
    { label: 'Tap', type: GESTURE_TYPES.TAP },
    { label: 'D-Tap', type: GESTURE_TYPES.DOUBLE_TAP },
    { label: 'Hold', type: GESTURE_TYPES.HOLD },
    { label: 'Drag', type: GESTURE_TYPES.DRAG },
    { label: 'Pinch', type: GESTURE_TYPES.PINCH },
    { label: 'Swipe R', type: GESTURE_TYPES.SWIPE_RIGHT },
    { label: 'Swipe L', type: GESTURE_TYPES.SWIPE_LEFT },
];

const GameScreen = ({ navigation }) => {
    const { score, lastGesture, currentTask, handleGesture, gestureTypeToName, tasks } = useGame();

    const doubleTapRef = React.createRef();
    const singleTapRef = React.createRef();

    const onSingleTapStateChange = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            console.log('Single Tap Detected');
            handleGesture(GESTURE_TYPES.TAP);
        }
    };

    const onDoubleTapStateChange = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            console.log('Double Tap Detected');
            handleGesture(GESTURE_TYPES.DOUBLE_TAP);
        }
    };

    const onLongPressStateChange = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            console.log('Long Press (Hold) Detected');
            handleGesture(GESTURE_TYPES.HOLD);
        }
    };

    const onPinchStateChange = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            if (currentTask && currentTask.gesture === GESTURE_TYPES.PINCH) {
                console.log('Pinch Active/Ended - Scale:', event.nativeEvent.scale);
                handleGesture(GESTURE_TYPES.PINCH, { scale: event.nativeEvent.scale });
            }
        }
    };

    const onPanStateChange = event => {
        if (event.nativeEvent.state === State.END) {
            const { velocityX, translationX, translationY } = event.nativeEvent;
            console.log('Pan Ended - vX:', velocityX, 'tX:', translationX, 'tY:', translationY);

            const SWIPE_VELOCITY_THRESHOLD = 500;
            const SWIPE_MIN_TRANSLATION_X = 40;
            const MAX_TRANSLATION_Y_FOR_HORIZONTAL_SWIPE = 70;

            if (Math.abs(translationY) < MAX_TRANSLATION_Y_FOR_HORIZONTAL_SWIPE) {
                if (velocityX > SWIPE_VELOCITY_THRESHOLD && translationX > SWIPE_MIN_TRANSLATION_X) {
                    console.log('Swipe Right Detected');
                    handleGesture(GESTURE_TYPES.SWIPE_RIGHT);
                    return;
                }
                if (velocityX < -SWIPE_VELOCITY_THRESHOLD && translationX < -SWIPE_MIN_TRANSLATION_X) {
                    console.log('Swipe Left Detected');
                    handleGesture(GESTURE_TYPES.SWIPE_LEFT);
                    return;
                }
            }

            const DRAG_MIN_TRANSLATION = 10;
            if (currentTask && currentTask.gesture === GESTURE_TYPES.DRAG &&
                (Math.abs(translationX) > DRAG_MIN_TRANSLATION || Math.abs(translationY) > DRAG_MIN_TRANSLATION)) {
                console.log('Drag Detected');
                handleGesture(GESTURE_TYPES.DRAG, { translationX, translationY });
            }
        }
    };


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Score: {score}</Text>
                <Text style={styles.lastGestureText}>
                    Last Gesture: {lastGesture.name} (+{lastGesture.points})
                </Text>
            </View>

            <PanGestureHandler onHandlerStateChange={onPanStateChange} minDist={10}>
                <Animated.View>
                    <PinchGestureHandler onHandlerStateChange={onPinchStateChange}>
                        <Animated.View>
                            <TapGestureHandler
                                ref={doubleTapRef}
                                onHandlerStateChange={onDoubleTapStateChange}
                                numberOfTaps={2}
                            >
                                <Animated.View>
                                    <TapGestureHandler
                                        ref={singleTapRef}
                                        onHandlerStateChange={onSingleTapStateChange}
                                        numberOfTaps={1}
                                        waitFor={doubleTapRef}
                                    >
                                        <Animated.View>
                                            <LongPressGestureHandler
                                                onHandlerStateChange={onLongPressStateChange}
                                                minDurationMs={currentTask?.gesture === GESTURE_TYPES.HOLD ? (currentTask.duration || 1000) : 80000}
                                            >
                                                <Animated.View style={styles.gestureCircle} collapsable={false}>
                                                    <Text style={styles.gestureCircleText}>
                                                        {currentTask && !currentTask.completed
                                                            ? gestureTypeToName(currentTask.gesture) || currentTask.description
                                                            : (tasks.every(t => t.completed) ? 'All Tasks Done!' : 'Select Task!')}
                                                    </Text>
                                                </Animated.View>
                                            </LongPressGestureHandler>
                                        </Animated.View>
                                    </TapGestureHandler>
                                </Animated.View>
                            </TapGestureHandler>
                        </Animated.View>
                    </PinchGestureHandler>
                </Animated.View>
            </PanGestureHandler>

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
        marginVertical: 20,
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
        marginHorizontal: 10,
        marginBottom: 20,
    },
    gestureButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        margin: 5,
        minWidth: 80,
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
        fontSize: 13,
        fontWeight: '500',
    },
    viewTasksButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 15,
        paddingHorizontal: 15,
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