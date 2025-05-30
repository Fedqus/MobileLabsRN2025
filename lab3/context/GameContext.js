import { createContext, useState, useContext, useEffect } from 'react';
import { TASKS as initialTasks, GESTURE_TYPES } from '../constants/gameData';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState(initialTasks.map(task => ({ ...task, currentCount: 0 })));
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [lastGesture, setLastGesture] = useState({ name: 'None', points: 0 });

  const currentTask = tasks[currentTaskIndex];

  const completeTask = (taskId, pointsAwarded) => {
    setScore(prevScore => prevScore + pointsAwarded);
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    let nextIndex = tasks.findIndex((task, index) => index > currentTaskIndex && !task.completed);
    if (nextIndex === -1) {
      nextIndex = tasks.findIndex(task => !task.completed);
    }
    setCurrentTaskIndex(nextIndex !== -1 ? nextIndex : tasks.length);
  };

  const handleGesture = (gestureType, gestureData = {}) => {
    if (!currentTask || currentTask.completed) return;

    let pointsEarned = 0;
    let taskCompletedThisTurn = false;

    if (currentTask.gesture === gestureType) {
      pointsEarned = currentTask.points;
      setLastGesture({ name: gestureTypeToName(gestureType), points: pointsEarned });

      if (currentTask.targetCount) {
        const updatedTasks = tasks.map(task => {
          if (task.id === currentTask.id) {
            const newCount = (task.currentCount || 0) + 1;
            if (newCount >= task.targetCount) {
              taskCompletedThisTurn = true;
            }
            return { ...task, currentCount: newCount };
          }
          return task;
        });
        setTasks(updatedTasks);
        if (taskCompletedThisTurn) {
          completeTask(currentTask.id, pointsEarned);
        }
      } else {
        taskCompletedThisTurn = true;
        completeTask(currentTask.id, pointsEarned);
      }
    } else {
      setLastGesture({ name: `Tried ${gestureTypeToName(gestureType)}, needed ${gestureTypeToName(currentTask.gesture)}`, points: 0 });
    }
  };

  useEffect(() => {
    const scoreTask = tasks.find(task => task.scoreGoal && !task.completed);
    if (scoreTask && score >= scoreTask.scoreGoal) {
      completeTask(scoreTask.id, scoreTask.points);
    }
  }, [score, tasks]);


  const gestureTypeToName = (gesture) => {
    if (!gesture) return "None";
    return gesture.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  const resetGame = () => {
    setScore(0);
    setTasks(initialTasks.map(task => ({ ...task, currentCount: 0, completed: false })));
    setCurrentTaskIndex(0);
    setLastGesture({ name: 'None', points: 0 });
  };


  return (
    <GameContext.Provider
      value={{
        score,
        tasks,
        currentTask,
        lastGesture,
        handleGesture,
        gestureTypeToName,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);