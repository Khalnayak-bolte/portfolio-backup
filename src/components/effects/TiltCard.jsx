import Tilt from "react-parallax-tilt";

export default function TiltCard({ children }) {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      transitionSpeed={800}
      glareEnable={false}
      scale={1.03}
      gyroscope={true}
      className="will-change-transform"
    >
      {children}
    </Tilt>
  );
}
