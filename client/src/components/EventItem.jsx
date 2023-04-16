import React from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EventItem = ({ event }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const handleClick = () => {
    navigate(`/event/${event._id}`);
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{event.date}</Card.Subtitle>
        <Card.Text>{event.description}</Card.Text>
        <Button varient="primary" onClick={handleClick}>
          View Details
        </Button>
        {user && user._id === event.organizer && (
          <Button varient="success" className="ms-2">
            Edit Event
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default EventItem;
