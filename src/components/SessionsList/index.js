import { Col, Grid, Row, Select, Table, Typography } from "antd";
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

  const columns = [
    {
      title: "Time",
      key: "time",
      render: (session) => `${session.start_time} - ${session.end_time}`,
      sorter: sortBy("start_time", "time"),
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      sorter: sortBy("name", "string"),
    },
    {
      title: "Speaker(s)",
      key: "speakers",
      render: (session) => (
        <div>
          {session.speakers?.map((speaker) => (
            <Typography.Paragraph
              key={`session-${session.id}-speaker-${speaker.id}`}
            >
              {speaker.last_name}, {speaker.first_name}
            </Typography.Paragraph>
          ))}
        </div>
      ),
      sorter: (a, b) =>
        (a.speakers[0]?.last_name || "")
          .toLowerCase()
          .localeCompare((b.speakers[0]?.last_name || "").toLowerCase()),
    },
  ];

  const onRow = (session) => ({
    onClick: () => onSessionClick(session),
  });

  const onOrderChange = (value) =>
    setOrderBy(orderOptions.find((option) => option.value === value));

  const sortedSessions = useMemo(() => {
    return sessions.slice().sort(sortBy(orderBy.value, orderBy.type));
  }, [sessions, orderBy]);
  console.log({ sortedSessions });

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
        <Table
          rowKey={"id"}
          dataSource={sortedSessions}
          columns={columns}
          onRow={onRow}
        />
      </div>
    </div>
  );
}
