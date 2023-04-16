import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequestedEvents } from '../actions/eventActions';

const RequestedEventsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequestedEvents());
  }, [dispatch]);

  const requestedEvents = useSelector(state => state.event.requestedEvents);

  return (
    <div>
      <h2>Requested Events List</h2>
      {requestedEvents.length === 0 ? (
        <p>No requested events found.</p>
      ) : (
        <ul>
          {requestedEvents.map(event => (
            <li key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.date}</p>
              <p>{event.playerLimit} Players Limit</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestedEventsList;
