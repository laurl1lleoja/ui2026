import * as React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

export function Card({ className = "", ...props }: DivProps) {
  return <div className={className} {...props} />;
}

export function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={className} {...props} />;
}

export function CardTitle({ className = "", ...props }: HeadingProps) {
  return <h3 className={className} {...props} />;
}

export function CardDescription({ className = "", ...props }: ParagraphProps) {
  return <p className={className} {...props} />;
}

export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={className} {...props} />;
}
