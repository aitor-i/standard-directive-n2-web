interface Props {
  timeDisplay: string;
  eventName: string;
  color: string;
}

export default function HourSlot({ timeDisplay, eventName, color }: Props) {
  return (
    <div className="flex gap-2 flex-1">
      <p className="text-xs align-text-top m-0 w-10 text-end pt-2 text-stdSteelBlue">
        {timeDisplay}
      </p>
      <div
        className={`block flex-1  border border-b-0 border-stdSlateGra ${color} `}
      >
        <b className="text-xs pl-2 text-stdSteelBlue">{eventName}</b>
      </div>
    </div>
  );
}
