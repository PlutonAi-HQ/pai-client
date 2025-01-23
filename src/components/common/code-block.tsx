import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeBlock({ children, className, ...rest }: any) {
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <SyntaxHighlighter
      style={nord}
      PreTag="div"
      customStyle={{
        borderRadius: "12px",
        backgroundColor: "#000000cc",
        color: "white",
        textShadow: "none",
        textDecoration: "none",
        margin: "4px 0",
      }}
      language={match[1]}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code
      {...rest}
      className={className}>
      {children}
    </code>
  );
}
