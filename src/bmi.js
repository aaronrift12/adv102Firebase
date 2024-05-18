import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './bmi.css'; // Import the CSS file
import { database } from './firebaseConfig'; // Import the Firebase database

function CalculatorPage() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiMessage, setBmiMessage] = useState('');

  const calculateBmi = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      setBmiMessage(getBmiMessage(bmiValue));

      // Save the BMI data to Firebase Realtime Database
      const bmiData = {
        weight: weight,
        height: height,
        bmi: bmiValue,
        message: getBmiMessage(bmiValue),
        timestamp: new Date().toISOString(),
      };
      database.ref('bmiCalculations').push(bmiData)
        .then(() => {
          console.log('BMI data saved successfully.');
        })
        .catch((error) => {
          console.error('Error saving BMI data: ', error);
        });
    }
  };

  const getBmiMessage = (bmi) => {
    if (bmi < 18.5) {
      return 'Your BMI is considered underweight.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return 'Your BMI is considered normal.';
    } else if (bmi >= 25 && bmi <= 29.9) {
      return 'Your BMI is considered overweight.';
    } else if (bmi >= 30) {
      return 'Your BMI is considered obese.';
    } else {
      return '';
    }
  };

  return (
    <div>
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

      <div className="bmi-calculator-container">
        <div className="bmi-calculator">
          <h2>BMI Calculator</h2>
          <div>
            <label>
              Weight (kg):
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Height (cm):
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </label>
          </div>
          <button onClick={calculateBmi}>Calculate BMI</button>
          {bmi && (
            <div>
              <h3>Your BMI is: {bmi}</h3>
              <p>{bmiMessage}</p>
            </div>
          )}
        </div>

        <div className="bmi-info">
          <h3>UNDERSTANDING YOUR BODY MASS INDEX</h3>
          <p>Now that you know your body mass index you are one step closer to mastering your overall health. Find out how to understand your BMI:</p>
          <ul>
            <li><strong>If your BMI is below 18.5:</strong> Your BMI is considered underweight. Keep in mind that an underweight BMI calculation may pose certain health risks. Please consult your healthcare provider for more information about BMI calculations.</li>
            <li><strong>If your BMI is between 18.5 – 24.9:</strong> Your BMI is considered normal. This healthy weight helps reduce your risk of serious health conditions and means you’re close to your fitness goals.</li>
            <li><strong>If your BMI is between 25 – 29.9:</strong> You’re in the overweight range. You are at increased risk for a variety of illnesses at your present weight. You should lose weight by changing your diet and exercising more.</li>
            <li><strong>If your BMI is above 30:</strong> Your BMI is considered obese. Being obese may increase your risk of cardiovascular disease. Consider making lifestyle changes through healthy eating and fitness to improve your health.</li>
            <li>Individuals who fall into the BMI range of 25 to 34.9, and have a waist size of over 40 inches for men and 35 inches for women, are considered to be at especially high risk for health problems.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CalculatorPage;
