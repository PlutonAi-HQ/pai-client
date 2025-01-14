import { H1 } from "../ui/typography";

export default function Logo() {
  return (
    <H1 className="font-logo text-h3 uppercase">
      <span className="text-white">pluton</span>
      <span className="bg-gradient-to-r from-cyan-100 via-cyan-300 via-30% to-cyan-400 bg-clip-text text-transparent">
        ai
      </span>
    </H1>
  );
}
