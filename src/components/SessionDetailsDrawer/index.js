import { Collapse, Drawer, Image, Typography } from "antd";
import Avatar from "antd/es/avatar/avatar";

export function SessionDetailsDrawer({ open, onClose, session }) {
  return (
    <Drawer
      title={session?.name || ""}
      placement="right"
      onClose={onClose}
      open={open}
    >
      {session ? (
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
            <Collapse defaultActiveKey={["1"]} ghost>
              <Collapse.Panel
                header={`${session.speaker.first_name} ${session.speaker.last_name}`}
                key="1"
              >
                {/* <p>{text}</p> */}
                {session.speaker.profile_picture ? (
                  <Avatar size={64} src={session.speaker.profile_picture} />
                ) : null}
                {session.speaker.job ? (
                  <Typography.Paragraph>
                    {session.speaker.job}
                  </Typography.Paragraph>
                ) : null}
                {session.speaker.company ? (
                  <Typography.Paragraph>
                    {session.speaker.company}
                  </Typography.Paragraph>
                ) : null}
                {session.speaker.bio ? (
                  <>
                    <Typography.Paragraph>Bio</Typography.Paragraph>
                    <Typography.Paragraph>
                      {session.speaker.bio}
                    </Typography.Paragraph>
                  </>
                ) : null}
              </Collapse.Panel>
            </Collapse>
          </div>
        </>
      ) : null}
    </Drawer>
  );
}
