import React from "react";
import cx from "classnames";
import "./index.scss";
interface TextProps {
  content: string;
  inversion?: boolean;
}

const cls = "text";

function Text({ content, inversion }: TextProps) {
  return <div className={cx({ text: true, reply: inversion })}>{content}</div>;
}

export default Text;
