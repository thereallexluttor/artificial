"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { useRef } from "react";
import "./display-cards.css";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  spotlightColor?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-3 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  spotlightColor = "rgba(0, 229, 255, 0.2)",
}: DisplayCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "card-spotlight",
        "relative flex h-[8.5rem] w-[20rem] -skew-y-[8deg] select-none flex-col justify-between p-3 backdrop-blur-sm transition-all duration-700 hover:border-white/20 hover:bg-neutral-900 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-neutral-900 p-1">
          {icon}
        </span>
        <p className={cn("text-base font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="text-sm text-white">{description}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "hover:-translate-y-24",
    },
    {
      className: "hover:-translate-y-24",
    },
    {
      className: "hover:translate-y-24",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="flex flex-col -space-y-28 opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
} 