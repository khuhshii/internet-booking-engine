import './CircleCheck.scss';

const CircleCheck = () => {
  return (
    <div className="circle-check">
      <svg className="circle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" />
        <path className="check" d="M31.5 46.8L45.3 60.5L71.7 34.1" />
      </svg>
    </div>
  );
};

export default CircleCheck;
