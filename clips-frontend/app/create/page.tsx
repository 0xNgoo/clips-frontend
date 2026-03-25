"use client";

import { useState } from "react";
import { Sparkles, Upload, Link as LinkIcon, Loader2 } from "lucide-react";
import SocialAccountCardGrid from "../components/SocialAccountCardGrid";

interface FormData {
  videoUrl: string;
  videoFile: File | null;
  selectedPlatforms: Set<string>;
}

export default function CreatePage() {
  const [formData, setFormData] = useState<FormData>({
    videoUrl: "",
    videoFile: null,
    selectedPlatforms: new Set(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, videoUrl: e.target.value, videoFile: null }));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, videoFile: file, videoUrl: "" }));
    setError(null);
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData((prev) => {
      const newPlatforms = new Set(prev.selectedPlatforms);
      if (newPlatforms.has(platform)) {
        newPlatforms.delete(platform);
      } else {
        newPlatforms.add(platform);
      }
      return { ...prev, selectedPlatforms: newPlatforms };
    });
  };

  const isFormValid = () => {
    const hasVideoSource = formData.videoUrl.trim() !== "" || formData.videoFile !== null;
    const hasPlatforms = formData.selectedPlatforms.size > 0;
    return hasVideoSource && hasPlatforms;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      // Prepare form data for multipart/form-data
      const submitData = new FormData();
      
      if (formData.videoFile) {
        submitData.append("video", formData.videoFile);
      } else {
        submitData.append("videoUrl", formData.videoUrl);
      }
      
      submitData.append("platforms", JSON.stringify(Array.from(formData.selectedPlatforms)));

      const response = await fetch(`${apiUrl}/api/generate-clips`, {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Failed to generate clips" }));
        throw new Error(errorData.message || "Failed to generate clips");
      }

      const result = await response.json();
      
      // Redirect to dashboard or show success
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      <main className="flex-1 pl-64 p-8 lg:p-12">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-semibold text-white">
              Create AI-Powered Clips
            </h1>
            <p className="text-base text-zinc-400">
              Upload your video or provide a URL, select platforms, and let AI create viral clips
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Video Input Section */}
            <section className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-6">
              <h2 className="text-xl font-semibold text-white">Video Source</h2>
              
              {/* URL Input */}
              <div className="space-y-2">
                <label htmlFor="videoUrl" className="block text-sm font-medium text-zinc-300">
                  Video URL
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                  <input
                    id="videoUrl"
                    type="url"
                    value={formData.videoUrl}
                    onChange={handleUrlChange}
                    disabled={formData.videoFile !== null || isSubmitting}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0A0A0A] text-zinc-500">OR</span>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label htmlFor="videoFile" className="block text-sm font-medium text-zinc-300">
                  Upload Video File
                </label>
                <div className="relative">
                  <input
                    id="videoFile"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    disabled={formData.videoUrl.trim() !== "" || isSubmitting}
                    className="hidden"
                  />
                  <label
                    htmlFor="videoFile"
                    className={`flex items-center justify-center gap-2 w-full py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      formData.videoUrl.trim() !== "" || isSubmitting
                        ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
                        : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30"
                    }`}
                  >
                    <Upload className="h-6 w-6 text-zinc-400" />
                    <span className="text-zinc-300">
                      {formData.videoFile ? formData.videoFile.name : "Click to upload or drag and drop"}
                    </span>
                  </label>
                </div>
              </div>
            </section>

            {/* Platform Selection */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Select Platforms</h2>
              <SocialAccountCardGrid 
                onConnect={handlePlatformToggle}
                selectedPlatforms={formData.selectedPlatforms}
              />
              {formData.selectedPlatforms.size > 0 && (
                <p className="text-sm text-zinc-400">
                  Selected: {Array.from(formData.selectedPlatforms).join(", ")}
                </p>
              )}
            </section>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="w-full flex items-center justify-center gap-2 h-14 rounded-full bg-white text-black px-8 font-semibold transition-all hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating Clips...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Clips</span>
                </>
              )}
            </button>

            {!isFormValid() && !isSubmitting && (
              <p className="text-sm text-center text-zinc-500">
                Please provide a video URL or upload a file, and select at least one platform
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
