import { Button } from "antd";
import { useState } from "react";

export default function ShowMoreText({ text, maxLength = 100 }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpaded = () => setExpanded(!expanded);
  const renderBtn = (
    <Button type="link" onClick={toggleExpaded}>
      Show {expanded ? "less" : "more"}
    </Button>
  );

  if (text.length < maxLength) {
    return text;
  }

  if (expanded) {
    return (
      <>
        {text}
        {renderBtn}
      </>
    );
  }

  return (
    <>
      {text.substr(0, maxLength)}...
      {renderBtn}
    </>
  );
}
