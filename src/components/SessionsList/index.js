import { Col, Grid, Row, Select } from "antd";
import { useMemo, useState } from "react";
import { sortBy } from "../../app/utils/sorter";

const orderOptions = [
  {
    label: "Start Time",
    value: "start_time",
    type: "time",
  },
  {
    label: "Name",
    value: "name",
    type: "string",
  },
  {
    label: "Speaker",
    value: "speaker.last_name",
    type: "string",
  },
];

export default function SessionsList({ sessions, onSessionClick }) {
  const [orderBy, setOrderBy] = useState(orderOptions[0]);

  const onOrderChange = (value) =>
    setOrderBy(orderOptions.find((option) => option.value === value));

  const sortedSessions = useMemo(() => {
    return sessions.slice().sort(sortBy(orderBy.value, orderBy.type));
  }, [sessions, orderBy]);

  return (
    <div className="sessions-list">
      <div className="sorter">
        Order By:
        <Select
          value={orderBy.value}
          style={{ width: 120 }}
          options={orderOptions}
          onChange={onOrderChange}
        />
      </div>
      <div className="sessions">
        {sortedSessions.map((session) => (
          <Row
            className="session"
            key={`session-${session.id}`}
            onClick={() => onSessionClick(session)}
          >
            <Col span={6}>
              {session.start_time} - {session.end_time}
            </Col>
            <Col span={6}>
              {session.speaker.last_name}, {session.speaker.first_name}
            </Col>
            <Col span={12}>{session.name}</Col>
          </Row>
        ))}
      </div>
    </div>
  );
}
