import AgeCounter from "./components/AgeCounter.js";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="header">
          Welcome to Age Me {String.fromCodePoint(0x1f60d)}
        </h1>

        <h2 className="intro">
          I'm Cody, and every click helps me grow older. How many years can you
          add to my life?{String.fromCodePoint(0x1f914)}
        </h2>
        <div>
          <AgeCounter />
        </div>
        <div className="currancy-logo">
          <img
            style={{ width: 100, height: 100 }} // or any inline style you want to use
            src="https://i.postimg.cc/X70jRyWN/coins-1.png"
            alt="Tiny Logo"
          />
          <span>Currency 0 KD </span>
        </div>

        <h2 className="footer">by Janna and Hamad </h2>
      </div>
    </>
  );
}
