import CodeBlock from "./code-block";
import Markdown, { Options } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export default function MarkdownFormat(props: Options) {
  return (
    <Markdown
      components={{
        code: CodeBlock,
      }}
      remarkPlugins={[remarkGfm, remarkHtml]}
      rehypePlugins={[rehypeRaw]}
      className={"w-full max-w-[90%] overflow-x-auto whitespace-normal"}
      {...props}
    />
  );
}
