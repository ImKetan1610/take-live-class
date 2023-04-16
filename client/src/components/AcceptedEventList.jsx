import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAcceptedEvents } from '../actions/eventActions';

const AcceptedEventsList = () => {
  const dispatch = useDispatch();
  const { acceptedEvents, loading } = useSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchAcceptedEvents());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Accepted Events</h2>
      {acceptedEvents.length === 0 && <p>You have no accepted events.</p>}
      {acceptedEvents.map(event => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>Date: {event.date}</p>
          <p>Time: {event.time}</p>
          <p>Players Limit: {event.playersLimit}</p>
          <p>Description: {event.description}</p>
          <h4>Accepted Players:</h4>
          <ul>
            {event.acceptedPlayers.map(player => (
              <li key={player._id}>{player.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AcceptedEventsList;
