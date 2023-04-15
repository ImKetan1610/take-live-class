const express = require("express");
const {
  createEvent,
  getAllEvents,
  joinEvent,
  accrejRequest,
  allUserEvents,
} = require("../controller/event.controller");
const router = express.Router();

router.post("/add-event", createEvent);
router.get("/all-event", getAllEvents);
router.post("/:id/request", joinEvent);
router.put("/:id/request/:userId", accrejRequest);
router.get("/all-user-event", allUserEvents);

module.exports = router;
