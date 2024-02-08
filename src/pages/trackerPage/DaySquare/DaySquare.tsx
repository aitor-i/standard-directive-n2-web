import { useEffect, useState } from "react";

type SquareProps = {
  color: string;
  isCompleted: boolean
  day: number
};

export const DaySquare = ({ color, isCompleted, day }: SquareProps) => {
  const [isDateVisible, setIsDateVisible] = useState(false)

  const onBoxClickHandler = () => {
    setIsDateVisible(true)
  }

  if (isDateVisible) {
    setTimeout(() => {
      setIsDateVisible(false)
    }, 2000);
  }



  return (
    <div className="relative h-min p-0 m-0  w-min">
      <div
        onClick={onBoxClickHandler}
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: isCompleted ? color : '#E5E5E5',
          display: 'inline-block',
          margin: '2px',
          borderRadius: '5px',
          cursor: 'pointer',

        }}
      ></div>
      {isDateVisible && <p className="absolute" >{day}</p>}
    </div>
  );
};
