import { ImportOutlined, LoadingOutlined } from "@ant-design/icons";
import cx from "classnames";
import MarkdownIt from "markdown-it";
import parse from "html-react-parser";
import hljs from "highlight.js";
import "./index.scss";
import "highlight.js/scss/default.scss";
import "highlight.js/styles/atom-one-light.css";
import { useMemo } from "react";

interface TextProps {
  content: string;
  inversion?: boolean;
  isLoading: boolean;
}

function Text({ content, inversion, isLoading }: TextProps) {
  const mdi = new MarkdownIt({
    linkify: true,
    // html: true,
    highlight(code, language) {
      const validLang = !!(language && hljs.getLanguage(language));
      if (validLang) {
        const lang = language ?? "";
        return highlightBlock(hljs.highlight(lang, code, true).value, lang);
      }
      return highlightBlock(hljs.highlightAuto(code).value, "");
    },
  });

  // <span class="code-block-header__copy">${t('chat.copyCode')}</span>
  function highlightBlock(str: string, lang?: string) {
    return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div> ${str}</code></pre>`;
  }

  const mdText = useMemo(() => {
    return parse(mdi.render(content));
  }, [content]);

  return (
    <div
      className={cx({ text: true, reply: inversion, markdown_body: inversion })}
    >
      {isLoading ? <LoadingOutlined /> : mdText}
    </div>
  );
}

export default Text;
