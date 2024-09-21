"use client";

import { useState } from "react";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const handleDownload = async () => {
    if (!videoUrl) {
      setStatus("Please enter a video URL");
      return;
    }

    setStatus("Processing...");

    try {
      const saveFromUrl = `https://en1.savefrom.net/2ol/?url=${encodeURIComponent(
        videoUrl
      )}`;

      // Redirect to SaveFrom download page
      window.location.href = saveFromUrl;

      setStatus("");
      setDownloadLink(
        `<a href="${saveFromUrl}" target="_blank" class="text-blue-500 underline">Click here if you are not redirected</a>`
      );
    } catch (error) {
      setStatus("Failed to process the video URL. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Online Video Downloader
      </h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter video URL"
        className="p-2 border rounded w-full max-w-md mb-4 text-black"
      />
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Download Video
      </button>
      <p className="mt-4 text-red-500">{status}</p>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: downloadLink }}
      />
    </div>
  );
}
