// GameShell.jsx
const GameShell = ({ children, fadeMode = "none", backgroundImage }) => {
  return (
    <div
      className={`cinematic-shell ${
        fadeMode === "out"
          ? "bg-fade-out"
          : fadeMode === "in"
          ? "bg-fade-in"
          : ""
      }`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* CRT line */}
      <div className="scanline" />

      {/* Classic hacker scanlines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #00ff41 0px, #00ff41 1px, transparent 1px, transparent 2px)",
            backgroundSize: "100% 4px",
          }}
        />
      </div>

      {/* Cinematic layers */}
      <div className="cinematic-overlay" />
      <div className="stars-layer" />

      {/* CHILD CONTENT */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default GameShell;
