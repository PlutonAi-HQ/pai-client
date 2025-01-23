import { SVGAttributes } from "lucide-react";
import { FC } from "react";

export type Icon = FC<SVGAttributes>;

export type NotifyPriority = "normal" | "high" | "low" | "silent" | "urgent";
