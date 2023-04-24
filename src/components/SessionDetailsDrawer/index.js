import { Collapse, Drawer, Spin, Typography } from "antd";
import Avatar from "antd/es/avatar/avatar";
import Loader from "../Loader";
import ShowMoreText from "../ShowMoreText";
import "./style.css";

export function SessionDetailsDrawer({ open, onClose, session, loading }) {
  return (
    <Drawer
      title={loading ? "" : session?.name || ""}
      placement="right"
      onClose={onClose}
      open={open}
      className="session-details-drawer"
    >
      {loading ? <Loader /> : null}

      {!loading && session ? (
        <>
          <Typography.Paragraph className="session-start-time">
            {session?.start_time} - {session?.end_time}
          </Typography.Paragraph>
          {session.description ? (
            <>
              <Typography.Text className="strong"> Summary </Typography.Text>{" "}
              <Typography.Paragraph>{session.description}</Typography.Paragraph>
            </>
          ) : null}
          <Typography.Paragraph>
            <Typography.Text className="strong"> Capacity: </Typography.Text>{" "}
            {session.capacity || "-"}
          </Typography.Paragraph>
          <div>
            <Typography.Paragraph className="strong">
              Presented By
            </Typography.Paragraph>
            <Collapse ghost>
              {session.speakers.map((speaker, index) => (
                <Collapse.Panel
                  header={`${speaker.first_name} ${speaker.last_name}`}
                  key={`${index + 1}`}
                >
                  {/* <p>{text}</p> */}
                  <div className="center">
                    {speaker.profile_picture ? (
                      <Avatar size={64} src={speaker.profile_picture} />
                    ) : null}
                    {speaker.job ? (
                      <Typography.Paragraph>{speaker.job}</Typography.Paragraph>
                    ) : null}
                    {speaker.company ? (
                      <Typography.Paragraph>
                        {speaker.company}
                      </Typography.Paragraph>
                    ) : null}
                  </div>
                  {speaker.bio ? (
                    <>
                      <Typography.Text className="strong">Bio</Typography.Text>
                      <Typography.Paragraph>
                        {" "}
                        <ShowMoreText text={speaker.bio} maxLength={150} />{" "}
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
