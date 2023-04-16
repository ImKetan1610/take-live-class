import axios from "axios";

export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";
export const GET_EVENTS_FAIL = "GET_EVENTS_FAIL";
export const GET_EVENT_DETAILS_SUCCESS = "GET_EVENT_DETAILS_SUCCESS"
export const GET_EVENT_DETAILS_FAIL ="GET_EVENT_DETAILS_FAIL"
export const REQUEST_TO_JOIN_EVENT_SUCCESS = "REQUEST_TO_JOIN_EVENT_SUCCESS"
export const REQUEST_TO_JOIN_EVENT_FAIL = "REQUEST_TO_JOIN_EVENT_FAIL"
export const FETCH_ACCEPTED_EVENTS_REQUEST = 'FETCH_ACCEPTED_EVENTS_REQUEST';
export const FETCH_ACCEPTED_EVENTS_SUCCESS = 'FETCH_ACCEPTED_EVENTS_SUCCESS';
export const FETCH_ACCEPTED_EVENTS_FAILURE = 'FETCH_ACCEPTED_EVENTS_FAILURE';
export const FETCH_REQUESTED_EVENTS_SUCCESS="FETCH_REQUESTED_EVENTS_SUCCESS"
export const FETCH_REQUESTED_EVENTS_FAIL="FETCH_REQUESTED_EVENTS_FAIL"

// Get events
export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://takeliveclass-server.onrender.com/api/event/all-event"
    );
    dispatch({
      type: GET_EVENTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_EVENTS_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Get event details
export const getEventDetails = (eventId) => async (dispatch) => {
  try {
    const res = await axios.get(`https://takeliveclass-server.onrender.com/api/event/${eventId}`);
    dispatch({
      type: GET_EVENT_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_EVENT_DETAILS_FAIL,
      payload: err.response.data.msg,
    });
  }
};

// Request to join event
export const requestToJoinEvent = (eventId) => async (dispatch) => {
  try {
    const res = await axios.post(`https://takeliveclass-server.onrender.com/api/event/${eventId}/join`);
    dispatch({
      type: REQUEST_TO_JOIN_EVENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REQUEST_TO_JOIN_EVENT_FAIL,
      payload: err.response.data.msg,
    });
  }
};



export const fetchAcceptedEventsRequest = () => {
  return {
    type: FETCH_ACCEPTED_EVENTS_REQUEST,
  };
};

export const fetchAcceptedEventsSuccess = (events) => {
  return {
    type: FETCH_ACCEPTED_EVENTS_SUCCESS,
    payload: events,
  };
};

export const fetchAcceptedEventsFailure = (error) => {
  return {
    type: FETCH_ACCEPTED_EVENTS_FAILURE,
    payload: error,
  };
};

export const fetchAcceptedEvents = () => {
  return (dispatch) => {
    dispatch(fetchAcceptedEventsRequest());
    axios
      .get('https://takeliveclass-server.onrender.com/api/event/accepted')
      .then((response) => {
        const events = response.data;
        dispatch(fetchAcceptedEventsSuccess(events));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAcceptedEventsFailure(errorMsg));
      });
  };
};



// Fetch requested events for the logged-in user
export const fetchRequestedEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('https://takeliveclass-server.onrender.com/api/events/requested');
    dispatch({
      type: FETCH_REQUESTED_EVENTS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FETCH_REQUESTED_EVENTS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
