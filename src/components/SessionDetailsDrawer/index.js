import { Collapse, Drawer, Spin, Typography } from "antd";
import Avatar from "antd/es/avatar/avatar";

export function SessionDetailsDrawer({ open, onClose, session, loading }) {
  return (
    <Drawer
      title={session?.name || ""}
      placement="right"
      onClose={onClose}
      open={open}
    >
      {loading ? <Spin size="large" /> : null}

      {!loading && session ? (
        <>
          <Typography.Paragraph>
            {session?.start_time} - {session?.end_time}
          </Typography.Paragraph>
          {session.description ? (
            <Typography.Paragraph>{session.description}</Typography.Paragraph>
          ) : null}
          <Typography.Paragraph>
            Capacity: {session.capacity || "-"}
          </Typography.Paragraph>
          <div>
            <Typography.Paragraph>Presented By</Typography.Paragraph>
            <Collapse  ghost>
              {session.speakers.map((speaker, index) => (
                <Collapse.Panel
                  header={`${speaker.first_name} ${speaker.last_name}`}
                  key={`${index + 1}`}
                >
                  {/* <p>{text}</p> */}
                  {speaker.profile_picture ? (
                    <Avatar size={64} src={speaker.profile_picture} />
                  ) : null}
                  {speaker.job ? (
                    <Typography.Paragraph>
                      {speaker.job}
                    </Typography.Paragraph>
                  ) : null}
                  {speaker.company ? (
                    <Typography.Paragraph>
                      {speaker.company}
                    </Typography.Paragraph>
                  ) : null}
                  {speaker.bio ? (
                    <>
                      <Typography.Paragraph>Bio</Typography.Paragraph>
                      <Typography.Paragraph>
                        {speaker.bio}
                      </Typography.Paragraph>
                    </>
                  ) : null}
                </Collapse.Panel>
              ))}
            </Collapse>
          </div>
        </>
      ) : null}
    </Drawer>
  );
}
