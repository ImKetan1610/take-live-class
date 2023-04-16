import React, { useEffect } from "react";
import { getEventDetails, requestToJoinEvent } from "../actions/eventActions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const eventDetails = useSelector((state) => state.eventDetails);
  const { event } = eventDetails;

  useEffect(() => {
    dispatch(getEventDetails(id));
  }, [dispatch, id]);

  const handleJoinRequest = () => {
    dispatch(requestToJoinEvent(event._id));
  };

  return (
    <div className="container mt-4">
      {event && (
        <div className="card">
          <div className="card-header">
            <h3>{event.title}</h3>
          </div>
          <div className="card-body">
            <p>{event.description}</p>
            <p>
              Players: {event.players.length}/{event.playerLimit}
            </p>
            <p>Time: {new Date(event.time).toLocaleString()}</p>
            {auth.isAuthenticated && (
              <button
                className="btn btn-primary"
                disabled={
                  event.players.includes(auth.user._id) ||
                  event.players.length === event.playerLimit
                }
                onClick={handleJoinRequest}
              >
                {event.players.includes(auth.user._id)
                  ? "Already Joined"
                  : event.players.length === event.playerLimit
                  ? "Event Full"
                  : "Join Event"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
