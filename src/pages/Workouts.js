import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Card, Button, Row, Col } from 'react-bootstrap';
import AddWorkout from '../components/AddWorkout';

export default function Workouts({ apiUrl }) {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);

  const fetchData = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('No token found');
      window.location.href = '/login'; // Redirect to login
      return;
    }
  
    fetch(`${apiUrl}/workouts/getMyWorkouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Unauthorized');
          }
          throw new Error('Failed to fetch workouts');
        }
        return res.json();
      })
      .then((data) => {
        setWorkouts(data.workouts || []);
      })
      .catch((error) => {
        console.error('Error fetching workouts:', error.message);
        alert('Session expired or invalid token. Please log in again.');
        localStorage.clear(); // Clear token
        window.location.href = '/login'; // Redirect to login
      });
  };

  useEffect(() => {
    if (user) fetchData(); // Only fetch if user is available
  }, [user]);

  return (
    <>
      <h1 className="text-center my-4">My Workouts</h1>
      <AddWorkout id="addWorkout" apiUrl={apiUrl} onWorkoutAdded={fetchData} />
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <Col key={workout._id}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{workout.name}</Card.Title>
                  <Card.Text>
                    <strong>Duration:</strong> {workout.duration} mins <br />
                    <strong>Status:</strong> {workout.status}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Card className="text-center">
              <Card.Body>No workouts found.</Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}
