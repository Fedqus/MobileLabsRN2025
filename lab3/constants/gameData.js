export const GESTURE_TYPES = {
  TAP: 'TAP',
  DOUBLE_TAP: 'DOUBLE_TAP',
  HOLD: 'HOLD',
  DRAG: 'DRAG',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
  PINCH: 'PINCH',
};

export const TASKS = [
  { id: '1', description: 'Make 10 clicks', points: 10, gesture: GESTURE_TYPES.TAP, targetCount: 10, completed: false },
  { id: '2', description: 'Double-tap 5 times', points: 15, gesture: GESTURE_TYPES.DOUBLE_TAP, targetCount: 5, completed: false },
  { id: '3', description: 'Hold object for 3 seconds', points: 20, gesture: GESTURE_TYPES.HOLD, duration: 3000, completed: false },
  { id: '4', description: 'Drag object around', points: 15, gesture: GESTURE_TYPES.DRAG, completed: false },
  { id: '5', description: 'Swipe right', points: 10, gesture: GESTURE_TYPES.SWIPE_RIGHT, completed: false },
  { id: '6', description: 'Swipe left', points: 10, gesture: GESTURE_TYPES.SWIPE_LEFT, completed: false },
  { id: '7', description: 'Resize object', points: 20, gesture: GESTURE_TYPES.PINCH, completed: false },
  { id: '8', description: 'Get 100 points', points: 50, gesture: null, scoreGoal: 100, completed: false },
];