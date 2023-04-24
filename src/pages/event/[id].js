import { Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { SessionDetailsDrawer } from "../../components/SessionDetailsDrawer";
import SessionsList from "../../components/SessionsList";
import { fetchEventById } from "../../features/event/eventSlice";
import {
  fetchEventSessions,
  fetchSessionById,
} from "../../features/session/sessionSlice";
import "./style.css";



export default function Event() {
  const [isSessionDetailsOpen, setIsSessionDetailsOpen] = useState(null);
  const [sessionsPagination, setSessionsPagination] = useState({
    page: 1,
    perPage: 10,
  });

  const { event, loading: eventLoading } = useSelector((state) => state.event);
  const {
    sessions,
    loading: sessionsLoading,
    session,
    sessionByIdLoading,
    sessionsTotalCount,
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
          page: sessionsPagination.page,
          perPage: sessionsPagination.perPage,
        })
      );
    }
  }, [params?.id, sessionsPagination, dispatch]);

  return (
    <div className="event">
      <div className="event-header">
        {eventLoading || !event ? (
          <Loader h="20vh" />
        ) : (
          <>
            <Typography.Title level={1}>{event.name}</Typography.Title>
            <div
              className="event-description"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
            <div className="event-date">
              <Typography.Paragraph>{event.status}</Typography.Paragraph>
              <Typography.Paragraph>-</Typography.Paragraph>
              <Typography.Paragraph>
                {event.start_date} - {event.timezone}
              </Typography.Paragraph>
            </div>
          </>
        )}
      </div>

      <SessionsList
        loading={sessionsLoading}
        sessions={sessions}
        onSessionClick={onSessionClick}
        pagination={{
          total: sessionsTotalCount,
          current: sessionsPagination.page,
          onChange: (page, perPage) => setSessionsPagination({ page, perPage }),
        }}
      />

      <SessionDetailsDrawer
        session={session}
        loading={sessionByIdLoading}
        open={isSessionDetailsOpen}
        onClose={onCloseSessionDetails}
      />
    </div>
  );
}
