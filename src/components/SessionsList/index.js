import { Table, Typography } from "antd";
import { useMemo } from "react";
import { sortBy } from "../../app/utils/sorter";

export default function SessionsList({
  sessions,
  onSessionClick,
  loading,
  pagination,
}) {
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

  const sortedSessions = useMemo(() => {
    return sessions.slice().sort(sortBy("start_time", "time"));
  }, [sessions]);

  return (
    <Table
      loading={loading}
      pagination={pagination}
      className="sessions-table"
      rowKey={"id"}
      dataSource={sortedSessions}
      columns={columns}
      onRow={onRow}
    />
  );
}
