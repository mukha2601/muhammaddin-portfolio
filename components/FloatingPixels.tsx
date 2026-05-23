const pixels = [
  { top: "10%", left: "5%", color: "#ffd93d", delay: "0s" },
  { top: "20%", left: "90%", color: "#8b6914", delay: "0.5s" },
  { top: "60%", left: "3%", color: "#6b4423", delay: "1s" },
  { top: "75%", left: "95%", color: "#ffd93d", delay: "1.5s" },
  { top: "40%", left: "85%", color: "#fff8e7", delay: "0.8s" },
  { top: "85%", left: "15%", color: "#8b6914", delay: "2s" },
  { top: "15%", left: "50%", color: "#6b4423", delay: "0.3s" },
  { top: "90%", left: "70%", color: "#ffd93d", delay: "1.2s" },
];

export default function FloatingPixels() {
  return (
    <div className="floating-pixels" aria-hidden="true">
      {pixels.map((p, i) => (
        <div
          key={i}
          className="float-pixel"
          style={{
            top: p.top,
            left: p.left,
            background: p.color,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
