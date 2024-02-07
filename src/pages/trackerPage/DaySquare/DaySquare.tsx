type SquareProps = {
  color: string;
};

export const DaySquare: React.FC<SquareProps> = ({ color }) => {
  return (
    <div
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: color,
        display: 'inline-block',
        margin: '2px',
      }}
    ></div>
  );
};
