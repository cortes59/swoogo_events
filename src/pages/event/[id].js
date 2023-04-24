import { Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SessionDetailsDrawer } from "../../components/SessionDetailsDrawer";
import SessionsList from "../../components/SessionsList";
import { fetchEventById } from "../../features/event/eventSlice";
import {
  fetchEventSessions,
  fetchSessionById,
} from "../../features/session/sessionSlice";
import "./style.css";

// const event = {
//   name: "Test Event",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   start_date: "2016-02-10",
//   timezone: "Europe/London",
//   status: "live",
// };

// const sessions = [
//   {
//     id: 1,
//     name: "Session 2",
//     start_time: "11:30:00",
//     end_time: "12:30:00",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     capacity: 20,
//     speaker: {
//       first_name: "John",
//       last_name: "Doe",
//       job_title: "Software Engineer",
//       company: "Test Company LLC",
//       bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       profile_picture:
//         "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
//     },
//   },
//   {
//     id: 2,
//     name: "Session 1",
//     start_time: "12:30:00",
//     end_time: "01:30:00",
//     speaker: {
//       first_name: "Jane",
//       last_name: "Smith",
//     },
//   },
//   {
//     id: 3,
//     name: "Session 3",
//     start_time: "12:30:00",
//     end_time: "01:30:00",
//     speaker: {
//       first_name: "Jackie",
//       last_name: "Smith",
//     },
//   },
// ];

export default function Event() {
  const [isSessionDetailsOpen, setIsSessionDetailsOpen] = useState(null);
  const [sessionsPage, setSessionsPage] = useState(1);
  const { event, loading: eventLoading } = useSelector((state) => state.event);
  const {
    sessions,
    loading: sessionsLoading,
    session,
    sessionByIdLoading,
  } = useSelector((state) => state.session);

  const dispatch = useDispatch();
  const params = useParams();

  const onSessionClick = (session) => {
    setIsSessionDetailsOpen(true);
    dispatch(fetchSessionById(session.id));
  };

  const onCloseSessionDetails = () => setIsSessionDetailsOpen(false);

  useEffect(() => {
    if (params?.id) {
      dispatch(fetchEventById(params.id));
      dispatch(
        fetchEventSessions({
          eventId: params.id,
          page: sessionsPage,
          perPage: 20,
        })
      );
    }
  }, [params?.id, sessionsPage, dispatch]);

  return (
    <div className="event">
      {eventLoading || !event ? (
        <Spin size="large" />
      ) : (
        <div className="event-header">
          <Typography.Title level={1}>{event.name}</Typography.Title>
          <div dangerouslySetInnerHTML={{ __html: event.description }} />
          <Typography.Paragraph>
            {event.start_date} - {event.timezone}
          </Typography.Paragraph>
          <Typography.Paragraph>{event.status}</Typography.Paragraph>
        </div>
      )}

      {sessionsLoading ? (
        <Spin size="large" />
      ) : (
        <SessionsList sessions={sessions} onSessionClick={onSessionClick} />
      )}

      <SessionDetailsDrawer
        session={session}
        loading={sessionByIdLoading}
        open={isSessionDetailsOpen}
        onClose={onCloseSessionDetails}
      />
    </div>
  );
}
