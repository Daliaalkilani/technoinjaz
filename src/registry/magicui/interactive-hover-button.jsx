import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "./interactive-hover-button.css";

export function InteractiveHoverButton({
  children = "عرض الملف",
  className = "",
  arrowIcon: CustomArrow,
  ...props
}) {
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
