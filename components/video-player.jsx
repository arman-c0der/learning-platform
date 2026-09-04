"use client";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    let videoId = "";

    if (parsed.hostname.includes("youtu.be")) {
      // https://youtu.be/VIDEO_ID
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        // https://www.youtube.com/watch?v=VIDEO_ID
        videoId = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        // already an embed url
        return url;
      } else if (parsed.pathname.startsWith("/shorts/")) {
        // https://www.youtube.com/shorts/VIDEO_ID
        videoId = parsed.pathname.split("/")[2];
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch {
    return url;
  }
};

export const VideoPlayer = ({ url }) => {
  const embedUrl = getYouTubeEmbedUrl(url);

  return (
    <div className="relative aspect-video">
      <iframe
        className="w-full h-full"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};