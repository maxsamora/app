import React from "react";

// Use the SAME Dropbox URL that works on your other site
const MUSIC_URL =
  "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";
// Se quiser o tema de Friends, troque a linha acima por:
// const MUSIC_URL =
//   "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1";

/**
 * MusicPlayer
 *
 * Renderiza um único <audio>.
 * Quem manda é o App, via prop `audioRef`.
 */
function MusicPlayer({ audioRef }) {
  return (
    <audio
      ref={audioRef}
      src={MUSIC_URL}
      preload="auto"
      loop
      playsInline
      controls // deixe LIGADO por enquanto para testar (pode remover depois)
      style={{ position: "fixed", bottom: 8, left: 8, zIndex: 1000 }}
    />
  );
}

export default MusicPlayer;
