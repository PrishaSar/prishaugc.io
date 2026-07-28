import { useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * A vertical (9:16) video thumbnail with rounded corners and a center play icon.
 * Gradient overlays at top/bottom mask any baked-in text/badges from the screenshots.
 * @param {object} props
 * @param {string} props.thumbnail — image URL (used as poster when video is provided)
 * @param {string} props.alt — alt text
 * @param {string} [props.video] — optional video URL; renders a playable <video> instead of static image
 */
export default function VideoThumb({ thumbnail, alt, video }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className="group relative aspect-[9/16] overflow-hidden rounded-3xl ring-1 ring-black/10"
      onClick={video ? handlePlay : undefined}
    >
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={thumbnail}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <img
          src={thumbnail}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Center play/pause icon */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-black/50 group-hover:shadow-[0_0_24px_6px_hsl(224_71%_47%/0.5)]">
            <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
          </div>
        </div>
      )}
    </div>
  );
}