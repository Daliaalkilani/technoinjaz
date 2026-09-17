import type * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "./interactive-hover-button.css";

export interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  arrowIcon?: React.ComponentType<{ className?: string }>;
}

export function InteractiveHoverButton({
  children = "View",
  className = "",
  arrowIcon: CustomArrow,
  ...props
}: InteractiveHoverButtonProps) {
  const Arrow = CustomArrow || ArrowUpRight;

  return (
    <button
      className={cn("interactive-hover-btn group", className)}
      {...props}
    >
      <div className="interactive-hover-btn-default">
        <div className="interactive-hover-btn-dot" />
        <span className="interactive-hover-btn-text">
          {children}
        </span>
      </div>
      <div className="interactive-hover-btn-hover">
        <span>{children}</span>
        <Arrow className="interactive-hover-btn-arrow" />
      </div>
    </button>
  );
}

export default InteractiveHoverButton;
