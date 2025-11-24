import { forwardRef } from "react";

/**
 * MusicPlayer
 *
 * - Just renders the <audio> element.
 * - The parent (App) controls play/pause via the ref.
 * - This keeps the "user gesture → audio.play()" in the same call stack.
 */

const MusicPlayer = forwardRef(function MusicPlayer({ src }, ref) {
  return (
    <audio
      ref={ref}
      src={src}
      preload="auto"
      loop
      playsInline // important for Safari iOS
    />
  );
});

export default MusicPlayer;
