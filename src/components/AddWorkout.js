import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

export default function AddWorkout({ apiUrl, onWorkoutAdded }) {
  const [show, setShow] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please log in to add a workout.');
      return;
    }

    const newWorkout = {
      name: workoutName,
      duration,
    };

    fetch(`${apiUrl}/workouts/addWorkout`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newWorkout),
    })
    .then((res) => res.json()) // Get the JSON data from the response
    .then((data) => {
        console.log('Response Data:', data); // Log the response for debugging

        // Check if the response is successful
        if (data) { // or check for other conditions based on your response
        alert('success');
        onWorkoutAdded(); // Refresh the workout list

        setWorkoutName('');
        setDuration(0);
        handleClose(); // Close the modal
        } else {
        alert(data.error || 'Failed to add workout');
        }
    })
    .catch((error) => {
        console.error('Error adding workout:', error);
        alert('An error occurred. Please try again.');
    });

  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Workout
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                placeholder="Enter workout name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (e.g., 30)</Form.Label>
              <Form.Control
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
