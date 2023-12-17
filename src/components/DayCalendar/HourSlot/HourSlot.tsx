import { EventPosition } from "@/application/calendarDaysGenerator/calendarDaysGenerator";

interface Props {
  timeDisplay: string;
  eventName: string;
  color: string;
  eventPosition?: EventPosition;
}

export default function HourSlot({
  timeDisplay,
  eventName,
  color,
  eventPosition,
}: Props) {
  function calculatePositionStyes(eventPosition?: EventPosition) {
    if (eventPosition === "single") return "rounded";
    if (eventPosition === "first") return "rounded-t-lg";
    if (eventPosition == "end") return "rounded-b-lg";
    return "";
  }

  const eventRoundedStyles = calculatePositionStyes(eventPosition);
  return (
    <div className="flex gap-2 flex-1">
      <p className="text-xs align-text-top m-0 w-10 text-end pt-2 text-stdSteelBlue">
        {timeDisplay}
      </p>
      <div
        className={`block flex-1  border border-b-0 border-stdSlateGra ${color} ${eventRoundedStyles}  `}
      >
        <b className="text-xs pl-2 text-stdSteelBlue">{eventName}</b>
      </div>
    </div>
  );
}
