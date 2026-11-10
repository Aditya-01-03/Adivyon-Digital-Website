'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  caption?: string;
}

const VIDEO_TITLES: Record<string, string> = {
  v8zjMd6gDb4: 'What do we do at Krishe Carbon',
  wGHinpGE8z8: 'Waste to Value Journey — Krishe Farmer Testimonial',
  '8farR2hU9ho': 'Farmers Initial Take On Biochar — Krishe Farmer Testimonial',
};

export function YouTubeEmbed({ videoId, title, caption }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const displayTitle = VIDEO_TITLES[videoId] || title;
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="w-full max-w-4xl mx-auto my-6 sm:my-8">
      {displayTitle && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h4 className="text-base sm:text-lg font-bold font-heading text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E6F43] shrink-0 inline-block" />
            <span>{displayTitle}</span>
          </h4>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#1E6F43] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Watch on YouTube</span>
            <span>&rarr;</span>
          </a>
        </div>
      )}

      {/* Video Container: 16:9 responsive aspect ratio with click-to-play poster guarantee */}
      <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-gray-900">
        {!isPlaying ? (
          /* Poster state: guarantees the user sees the real video thumbnail even before click */
          <div
            onClick={() => setIsPlaying(true)}
            className="group relative w-full h-full cursor-pointer flex items-center justify-center"
            role="button"
            tabIndex={0}
            aria-label={`Play video: ${displayTitle}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsPlaying(true);
            }}
          >
            <Image
              src={thumbnailUrl}
              alt={displayTitle}
              fill
              className="object-cover filter brightness-[0.85] transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 896px"
              unoptimized
            />
            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

            {/* Prominent Play Button */}
            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <span className="absolute bottom-4 left-4 right-4 text-xs sm:text-sm font-semibold text-white/95 drop-shadow-md">
              Click to play video
            </span>
          </div>
        ) : (
          /* Active Embed State using standard YouTube URL with strict-origin referrerpolicy */
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={displayTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full border-0"
          />
        )}
      </div>

      {caption && (
        <p className="text-xs sm:text-sm text-gray-500 italic mt-2.5 text-center">
          {caption}
        </p>
      )}
    </div>
  );
}

export default YouTubeEmbed;
