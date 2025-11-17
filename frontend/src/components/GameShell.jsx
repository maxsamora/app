import React from "react";

const GameShell = ({ children, background }) => {
  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-black
        flex
        items-start
        justify-center
      "
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* overlay layer to keep text readable on all devices */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* centered content with controlled width */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {children}
      </div>
    </div>
  );
};

export default GameShell;
