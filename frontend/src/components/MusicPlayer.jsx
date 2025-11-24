import { forwardRef } from "react";

// Use the SAME Dropbox URL that works on your other site
const MUSIC_URL =
  "https://www.dropbox.com/scl/fi/qtj81txbcvwx96uopptl5/One-Dance.mp3?dl=1";
// If you want the Friends theme instead, swap the constant above for this:
// const MUSIC_URL =
//   "https://www.dropbox.com/scl/fi/d73otllr72ty69p8cdxa2/I-ll-Be-There-For-You.mp3?dl=1";

/**
 * MusicPlayer
 *
 * Renders a single <audio> element.
 * The parent (App) controls play/pause via the ref.
 */
const MusicPlayer = forwardRef(function MusicPlayer(props, ref) {
  return (
    <audio
      ref={ref}
      src={MUSIC_URL}
      preload="auto"
      loop
      playsInline // important for Safari iOS
    />
  );
});

export default MusicPlayer;
