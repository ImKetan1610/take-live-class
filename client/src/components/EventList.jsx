import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../actions/eventActions';

const EventList = () => {
    const dispatch = useDispatch();
    const events = useSelector((state)=>state.event.events);

    useEffect(()=>{
        dispatch(getEvents())
    },[dispatch])

  return (
    <div>
      <h1>Event List</h1>
      {events.map((event)=>(
        <div key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Players: {event.players.length}/{event.playerLimit}</p>
            <button disabled={event.players.length>=event.playerLimit}>Join</button>}
        </div>
      ))}
    </div>
  )
}

export default EventList
