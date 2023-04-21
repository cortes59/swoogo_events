import { Typography } from "antd";
import { useState } from "react";
import { SessionDetailsDrawer } from "../../components/SessionDetailsDrawer";
import SessionsList from "../../components/SessionsList";
import "./style.css";

const event = {
  name: "Test Event",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  start_date: "2016-02-10",
  timezone: "Europe/London",
  status: "live",
};

const sessions = [
  {
    id: 1,
    name: "Session 2",
    start_time: "11:30:00",
    end_time: "12:30:00",
    speaker: {
      first_name: "John",
      last_name: "Doe",
    },
  },
  {
    id: 2,
    name: "Session 1",
    start_time: "12:30:00",
    end_time: "01:30:00",
    speaker: {
      first_name: "Jane",
      last_name: "Smith",
    },
  },
  {
    id: 3,
    name: "Session 3",
    start_time: "12:30:00",
    end_time: "01:30:00",
    speaker: {
      first_name: "Jackie",
      last_name: "Smith",
    },
  },
];

export default function Event() {
  const [selectedSession, setSelectedSession] = useState(null);

  const onClearSelectedSession = () => setSelectedSession(null);

  const onSessionClick = (session) => setSelectedSession(session);

  return (
    <div className="event">
      <div className="event-header">
        <Typography.Title level={1}>{event.name}</Typography.Title>
        <Typography.Paragraph>{event.description}</Typography.Paragraph>
        <Typography.Paragraph>
          {event.start_date} - {event.timezone}
        </Typography.Paragraph>
        <Typography.Paragraph>{event.status}</Typography.Paragraph>
      </div>

      <SessionsList sessions={sessions} onSessionClick={onSessionClick} />

      <SessionDetailsDrawer
        session={selectedSession}
        open={!!selectedSession}
        onClose={onClearSelectedSession}
      />
    </div>
  );
}
