const asyncHandler = require("express-async-handler");
const Event = require("../models/event.model");
const User = require("../models/user.model");

// creating an event
const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    date,
    location,
    sport,
    playerLimit,
    startTime,
    endTime,
  } = req.body;
  const userId = req.body.organizer;
  const organizer = await User.findById(userId);
  try {
    const event = await Event.create({
      title,
      description,
      date,
      location,
      sport,
      playerLimit,
      startTime,
      endTime,
      organizer,
    });
    return res.status(200).send(event);
  } catch (error) {
    throw new Error(error);
  }
});

// getting all events
const getAllEvents = asyncHandler(async (req, res) => {
  try {
    const { search, filter } = req.query;
    const allEvents = await Event.find({
      $or: [
        { title: { $regex: search || "", $options: "i" } },
        { description: { $regex: search || "", $options: "i" } },
      ],
      playersLimit: { $gte: filter || 0 },
    })
      .populate("organizer", "username")
      .populate("acceptedPlayers", "username")
      .exec();
    return res.status(200).send(allEvents);
  } catch (error) {
    throw new Error(error);
  }
});

// join an event
const joinEvent = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const eventId = req.params.id;
  const event = await Event.findById(eventId)
    .populate("requests", "username")
    .populate("acceptedPlayers", "username")
    .exec();
  if (!event) {
    res.status(404).send("Event not found");
    return;
  }
  if (event.organizer._id.toString() === userId) {
    res.status(403).send("You cannot join your own event");
    return;
  }
  if (event.requests.some((r) => r._id.toString() === userId)) {
    res.status(403).send("You have already requested to join this event");
    return;
  }
  if (event.acceptedPlayers.length >= event.playersLimit) {
    res.status(403).send("This event is already full");
    return;
  }
  event.requests.push(userId);
  await event.save();
  res.send("Request sent successfully!");
});

//accept or reject the request
const accrejRequest = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const eventId = req.params.id;
  const requestUserId = req.params.userId;
  const accepted = req.body.accepted;
  const event = await Event.findById(eventId)
    .populate("requests", "username")
    .populate("acceptedPlayers", "username")
    .exec();
  if (!event) {
    res.status(404).send("Event not found");
    return;
  }
  if (event.organizer._id.toString() !== userId) {
    res.status(403).send("You are not authorized to accept or reject requests");
    return;
  }
  const requestIndex = event.requests.findIndex(
    (r) => r._id.toString() === requestUserId
  );
  if (requestIndex < 0) {
    res.status(404).send("Request not found");
    return;
  }
  const requestUser = event.requests[requestIndex];
  event.requests.splice(requestIndex, 1);
  if (accepted) {
    if (event.acceptedPlayers.length >= event.playersLimit) {
      res.status(403).send("This event is already full");
      return;
    }
    event.acceptedPlayers.push(requestUser);
    requestUser.events.push(eventId);
    await requestUser.save();
  }
  await event.save();
  res.send("Request updated successfully!");
});

// get all events requested/accepted by the user
const allUserEvents = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId)
    .populate("events", "title timings")
    .exec();
  res.send(user.events);
});

// delete an event
const deleteEvent = asyncHandler(async (req, res) => {
  let eventId = req.params._id;
  let singleEvent = await Event.findOne({ eventId });
  if (!singleEvent) {
    return res.status(404).send({ message: "Event not found" });
  }
  try {
    let delEvent = await Event.findByIdAndDelete(eventId);
    return res.status(200).send(delEvent);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEvent,
  getAllEvents,
  joinEvent,
  accrejRequest,
  allUserEvents,
  deleteEvent
};
