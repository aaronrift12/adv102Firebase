import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebaseConfig'; // Import the Firebase
import './exercise-page.css';

function Exercise({ cart, setCart }) {
  const [chosenExercise, setChosenExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingExerciseId, setLoadingExerciseId] = useState(null);

  const exercises = [
    {
      id: 1,
      title: 'Cardiovascular Exercise',
      image: 'exercise1.jpg',
      description: "an activity that gives your heart and lungs a continuous workout",
      routine: ["Jogging", " Cycling", " Swimming"]
    },
    {
      id: 2,
      title: 'Bodybuilding',
      image: 'exercise2.jpg',
      description: "exercises designed to enhance the human body's muscular development and promote general health and fitness.",
      routine: ["Bicep Curl", " Bench Press", " Leg Press"]
    },
    {
      id: 3,
      title: 'CrossFit',
      image: 'exercise3.jpg',
      description: 'strength and conditioning workout that is made up of functional movement performed at a high intensity level.',
      routine: ["Deadlift", " Burpees ", " Overhead Squats"]
    },
    // Add more exercises as needed
  ];

  const handleAddExercise = (exercise) => {
    setLoading(true);
    setLoadingExerciseId(exercise.id);

    setTimeout(() => {
      setCart(prevCart => [...prevCart, exercise]);
      setChosenExercise(exercise);

      setCart(prevCart => prevCart.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.id === item.id
        ))
      ));

      const user = firebase.auth().currentUser;
      if (user) {
        firebase.database().ref('users/' + user.uid + '/exercises').push(exercise)
          .then(() => {
            console.log('Exercise added to Firebase');
          })
          .catch((error) => {
            console.error('Error adding exercise to Firebase:', error);
          })
          .finally(() => {
            setLoading(false);
            setLoadingExerciseId(null);
          });
      }
    }, 2000);
  };
  const handleCloseNotification = () => {
    setChosenExercise(null); // Close the notification
  };

  return (
    <div className="main-container">
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
      <div className="content-container">
        <div className="exercise-title">
          <h2>Exercise List</h2>
        </div>
        <div className="exercise-container">
          {exercises.map(exercise => (
            <div className="exercise" key={exercise.id}>
              <img src={exercise.image} alt={exercise.title} />
              <div className="exercise-details">
                <h3>{exercise.title}</h3>
                <p>{exercise.description}</p>
                <div className="button-container">
                  <button onClick={() => handleAddExercise(exercise)} disabled={loading && loadingExerciseId === exercise.id} className="exercise-button">
                    {loading && loadingExerciseId === exercise.id ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      'Add Exercise'
                    )}
                  </button>
                </div>  
              </div>
            </div>
          ))}
        </div>
        {chosenExercise && !loading && ( // Render the message if an exercise is chosen and not loading
          <div className="notification-container">
            <div className="notification">
              <p>You have chosen "{chosenExercise.title}".</p>
              <button onClick={handleCloseNotification}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Exercise;
  