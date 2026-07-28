import { BadgeCheck } from "lucide-react";

/**
 * Reusable social proof card — a black rounded card with avatar, handle, stats, and bio.
 * @param {object} props
 * @param {string} props.avatar — image URL for the profile avatar
 * @param {string} props.handle — social media handle (without @)
 * @param {string} props.platform — "instagram" | "tiktok"
 * @param {string} props.followers — follower count label
 * @param {string} props.posts — post count label
 * @param {string} props.following — following count label
 * @param {string[]} props.bioLines — array of bio text lines
 */
export default function ProfileCard({
  avatar,
  handle,
  platform = "instagram",
  followers,
  posts,
  following,
  bioLines = [],
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-black p-5 text-white shadow-xl md:p-6">
      {/* Top row: avatar + handle + stats */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={handle}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-white/20 md:h-20 md:w-20"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-semibold md:text-lg">{handle}</span>
            <BadgeCheck className="h-4 w-4 fill-blue-500 text-white" />
          </div>
          <div className="flex gap-4 text-sm text-white/70">
            <span><b className="text-white">{posts}</b> posts</span>
            <span><b className="text-white">{followers}</b> followers</span>
            <span><b className="text-white">{following}</b> following</span>
          </div>
        </div>
      </div>
      {/* Bio */}
      {bioLines.length > 0 && (
        <div className="mt-4 space-y-1 text-sm leading-relaxed text-white/80">
          {bioLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}