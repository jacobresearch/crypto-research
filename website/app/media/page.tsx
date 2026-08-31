import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media — Jacob Joseph",
};

export default function MediaPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1
        className="text-4xl mb-2"
        style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
      >
        Media
      </h1>
      <p className="text-sm text-[#888] mb-16">
        Press mentions, videos, and podcasts.
      </p>

      {/* PRESS */}
      <section className="mb-16">
        <h2
          className="text-xl mb-8"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Press
        </h2>
        <div className="space-y-8">
          <article className="group">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#2D4A6B] mb-1">
                  Bloomberg
                </p>
                <h3 className="text-base font-medium group-hover:text-[#2D4A6B] transition-colors mb-1">
                  Add your Bloomberg mention here
                </h3>
                <p className="text-sm text-[#888]">
                  Replace with article title and link.
                </p>
              </div>
              <span className="text-xs text-[#AAA] whitespace-nowrap pt-1">
                2025
              </span>
            </div>
          </article>

          <article className="group">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#2D4A6B] mb-1">
                  Financial Times
                </p>
                <h3 className="text-base font-medium group-hover:text-[#2D4A6B] transition-colors mb-1">
                  Add your FT mention here
                </h3>
                <p className="text-sm text-[#888]">
                  Replace with article title and link.
                </p>
              </div>
              <span className="text-xs text-[#AAA] whitespace-nowrap pt-1">
                2025
              </span>
            </div>
          </article>
        </div>
      </section>

      <hr className="border-[#E0DDD8] mb-16" />

      {/* VIDEOS */}
      <section className="mb-16">
        <h2
          className="text-xl mb-8"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Videos
        </h2>
        {/*
          To embed a YouTube video, replace the empty state below with:
          <div className="aspect-video">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Video title"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        */}
        <div className="border border-dashed border-[#E0DDD8] px-8 py-12 text-center">
          <p className="text-sm text-[#AAA]">No videos yet</p>
        </div>
      </section>

      <hr className="border-[#E0DDD8] mb-16" />

      {/* PODCASTS */}
      <section>
        <h2
          className="text-xl mb-8"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Podcasts
        </h2>
        {/*
          To embed a Spotify episode, replace the empty state below with:
          <iframe
            src="https://open.spotify.com/embed/episode/EPISODE_ID"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        */}
        <div className="border border-dashed border-[#E0DDD8] px-8 py-12 text-center">
          <p className="text-sm text-[#AAA]">No podcast appearances yet</p>
        </div>
      </section>
    </div>
  );
}
