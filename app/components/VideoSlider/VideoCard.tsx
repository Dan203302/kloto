import Image from 'next/image';
import { useState } from 'react';

type VideoCardProps = {
  videoId: string;
  previewImage: string;
  options: {
    autoplay: boolean;
    mute: boolean;
    loop: boolean;
  };
};

export default function VideoCard({ videoId, previewImage, options }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-[350px] h-[257px] sm:w-[540px] sm:h-[398px] lg:w-[540px] lg:h-[398px] rounded-2xl overflow-hidden">
      {!isPlaying ? (
        <>
          <Image
            src={`https://klotoprint.ru${previewImage}`}
            alt="Video preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" /> {/* Затемнение */}
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors text-[#5552E8]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20.0612 10.3661C21.3129 11.0933 21.3129 12.9067 20.0612 13.6339L7.82411 20.7431C6.56982 21.4718 5 20.5636 5 19.1092L5 4.89078C5 3.43643 6.56981 2.52821 7.82411 3.25689L20.0612 10.3661Z" fill="currentColor"/>
            </svg>
          </button>
        </>
      ) : (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&version=3&playerapiid=ytplayer&start=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&autoplay=1&mute=${options.mute ? 1 : 0}&loop=1&controls=1&playlist=${videoId}`}
          allow="autoplay"
        />
      )}
    </div>
  );
} 