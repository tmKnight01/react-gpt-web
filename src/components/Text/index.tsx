
import { LoadingOutlined } from "@ant-design/icons";
import cx from "classnames";
import "./index.scss";
interface TextProps {
  content: string;
  inversion?: boolean;
  isLoading: boolean;
}

const cls = "text";

function Text({ content, inversion, isLoading }: TextProps) {
  return (
    <div className={cx({ text: true, reply: inversion })}>
      {isLoading ? <LoadingOutlined /> : content}
    </div>
  );
}

export default Text;
