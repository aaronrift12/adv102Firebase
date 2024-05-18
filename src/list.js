import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { database } from './firebaseConfig'; // Import the database
import './list.css';

function ListPage({ cart, setCart }) {
  const [editingId, setEditingId] = useState(null);
  const [newRoutineTime, setNewRoutineTime] = useState(0);
  const [selectedOption, setSelectedOption] = useState('Sets');

  const handleDeleteExercise = (exerciseId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== exerciseId));
    console.log(`Exercise ${exerciseId} removed from routine`);

    // Remove exercise from Firebase
    database.ref('exercises/' + exerciseId).remove()
      .catch(error => {
        console.error('Error removing exercise from Firebase:', error);
      });
  };

  const handleEditRoutineId = async (exerciseId, routineIndex) => {
    try {
      // Update local state
      const updatedCart = cart.map(exercise => {
        if (exercise.id === exerciseId) {
          const updatedRoutine = exercise.routine.map((routine, index) => {
            if (index === routineIndex) {
              const [exerciseName, routineTime] = routine.split(': ');
              return `${exerciseName}: ${newRoutineTime} ${selectedOption}`; // Removed parentheses here
            } else {
              return routine;
            }
          });
          return { ...exercise, routine: updatedRoutine };
        }
        return exercise;
      });
      setCart(updatedCart);

      // Batch updates for Firebase
      const updates = {};
      updates['exercises/' + exerciseId] = { routine: updatedCart.find(exercise => exercise.id === exerciseId).routine };
      await database.ref().update(updates);

      console.log(`Routine time updated for exercise ${exerciseId}`);
      setEditingId(null);
      setNewRoutineTime(0);
      setSelectedOption('Sets');
    } catch (error) {
      console.error('Error updating exercise routine:', error);
    }
  };

  const handleIncrement = () => {
    setNewRoutineTime(prevTime => prevTime + 1);
  };

  const handleDecrement = () => {
    setNewRoutineTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="list-container">
      <header className="main-header">
        <h1>Elevate</h1>
        <nav className="mini-navbar">
          <ul>
            <li><Link to="/homepage">Home</Link></li> 
            <li><Link to="/bmi">BMI Calculator</Link></li>
            <li><Link to="/exercise">Exercises</Link></li> 
            <li><Link to="/list">List</Link></li> 
            <li><Link to="/login">Logout</Link></li>
          </ul>
        </nav>
      </header>
      <div className="list-content">
        <h2>Your Exercises</h2>
        <div className="chosen-exercises-box">
          <ul>
            {cart.map(exercise => (
              <li key={exercise.id}>
                <div>
                  <h3>{exercise.title}</h3>
                  <p>{exercise.description}</p>
                </div>
                <div className="routine">
                  {exercise.routine && (
                    <>
                      <strong>Routine:</strong>
                      <ul>
                        {exercise.routine.map((routine, index) => {
                          const [exerciseName, routineTime] = routine.split(': ');
                          return (
                            <li key={index}>
                              {editingId === `${exercise.id}-${index}` ? (
                                <>
                                  <button onClick={handleDecrement}>-</button>
                                  <span>{newRoutineTime}</span>
                                  <button onClick={handleIncrement}>+</button>
                                  <select value={selectedOption} onChange={handleSelectChange}>
                                    <option value="Sets">Sets</option>
                                    <option value="Reps">Reps</option>
                                    <option value="Seconds">Seconds</option>
                                    <option value="Minutes">Minutes</option>
                                  </select>
                                  <button className='save-button' onClick={() => handleEditRoutineId(exercise.id, index)}>Save</button>
                                  <button className='cancel-button' onClick={() => { setEditingId(null); setNewRoutineTime(0); setSelectedOption('Sets'); }}>Cancel</button>
                                </>
                              ) : (
                                <>
                                  {`${exerciseName}: ${routineTime}`}
                                  <button className='edit-button' onClick={() => { setEditingId(`${exercise.id}-${index}`); setNewRoutineTime(parseInt(routineTime)); }}>Edit</button>
                                </>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </div>
                <div>
                  <button className='delete-button' onClick={() => handleDeleteExercise(exercise.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
