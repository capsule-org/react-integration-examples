import React from "react";

type HomeProps = {
  title: string;
  subtitle: string;
};

export const Home: React.FC<HomeProps> = ({ title, subtitle }) => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};
