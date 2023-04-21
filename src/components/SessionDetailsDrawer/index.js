import { Drawer } from "antd";

export function SessionDetailsDrawer({ open, onClose, session }) {
  return (
    <Drawer
      title={session?.name || ""}
      placement="right"
      onClose={onClose}
      open={open}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
