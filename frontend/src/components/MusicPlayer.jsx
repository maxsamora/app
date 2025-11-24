import React from "react";

const MUSIC_URL =
  "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";

function MusicPlayer({ audioRef }) {
  return (
    <audio
      ref={audioRef}
      src={MUSIC_URL}
      preload="auto"
      loop
      playsInline
    />
  );
}

export default MusicPlayer;
