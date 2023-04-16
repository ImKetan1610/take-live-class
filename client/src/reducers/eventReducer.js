import {
    GET_EVENTS,
    GET_EVENT_DETAILS,
    REQUEST_TO_JOIN_EVENT,
    ACCEPT_EVENT_REQUEST,
    GET_ACCEPTED_EVENTS,
    GET_REQUESTED_EVENTS,
  } from "../actions/eventActions";
  
  const initialState = {
    events: [],
    eventDetails: null,
    acceptedEvents: [],
    requestedEvents: [],
  };
  
  export default function eventReducer(state = initialState, action) {
    switch (action.type) {
      case GET_EVENTS:
        return {
          ...state,
          events: action.payload,
        };
      case GET_EVENT_DETAILS:
        return {
          ...state,
          eventDetails: action.payload,
        };
      case REQUEST_TO_JOIN_EVENT:
        return {
          ...state,
          eventDetails: {
            ...state.eventDetails,
            requests: [...state.eventDetails.requests, action.payload],
          },
        };
      case ACCEPT_EVENT_REQUEST:
        const { userId } = action.payload;
        return {
          ...state,
          eventDetails: {
            ...state.eventDetails,
            requests: state.eventDetails.requests.filter(
              (request) => request.user !== userId
            ),
            players: [...state.eventDetails.players, action.payload],
          },
        };
      case GET_ACCEPTED_EVENTS:
        return {
          ...state,
          acceptedEvents: action.payload,
        };
      case GET_REQUESTED_EVENTS:
        return {
          ...state,
          requestedEvents: action.payload,
        };
      default:
        return state;
    }
  }
  