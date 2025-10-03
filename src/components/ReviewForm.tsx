"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle, Star, Send } from "lucide-react";

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
  theme?: "auto" | "light" | "dark";
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

interface ReviewFormProps {
  defaultName: string;
  onSubmitted?: (slug: string) => void;
}

/**
 * Client-side review submission form with Turnstile CAPTCHA.
 */
export default function ReviewForm({ defaultName, onSubmitted }: ReviewFormProps) {
  const [name, setName] = useState<string>(defaultName);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const siteKey = useMemo(() => process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "", []);
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const resetTurnstileWidget = () => {
    setToken("");
    if (typeof window === "undefined") {
      return;
    }

    const turnstile = window.turnstile;
    const widgetId = widgetIdRef.current;
    if (!turnstile || !widgetId) {
      return;
    }

    try {
      turnstile.reset(widgetId);
    } catch (error) {
      console.error("Turnstile reset failed", error);
    }
  };

  // Load Turnstile script and render widget
  useEffect(() => {
    if (!siteKey) {
      console.warn("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set");
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    function renderWidget() {
      if (typeof window === "undefined") {
        return;
      }

      const container = widgetContainerRef.current;
      if (!container || widgetIdRef.current) {
        return;
      }

      const turnstile = window.turnstile;
      if (!turnstile) {
        return;
      }

      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;

      widgetIdRef.current = turnstile.render(container, {
        sitekey: siteKey,
        callback: (tkn: string) => {
          setToken(tkn);
        },
        "error-callback": () => {
          setToken("");
        },
        "expired-callback": () => {
          setToken("");
        },
        theme: prefersDark ? "dark" : "light",
      });
    }

    if (existingScript) {
      // Script already present; render immediately or when ready
      if (typeof window !== "undefined" && window.turnstile) {
        renderWidget();
      } else {
        existingScript.addEventListener("load", renderWidget);
        return () => existingScript.removeEventListener("load", renderWidget);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderWidget);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", renderWidget);
      if (typeof window !== "undefined") {
        const turnstile = window.turnstile;
        const widgetId = widgetIdRef.current;
        if (turnstile && widgetId) {
          try {
            turnstile.remove(widgetId);
          } catch (error) {
            console.error("Turnstile removal failed", error);
          }
          widgetIdRef.current = null;
        }
      }
    };
  }, [siteKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || name.trim().length < 2) {
      setErrorMessage("Please provide a valid name.");
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      setErrorMessage("Please select a rating between 1 and 5.");
      return;
    }
    if (!token) {
      setErrorMessage("Please complete the CAPTCHA.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), rating, comment: comment.trim(), token }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 429 || data?.error === "rate_limited") {
          setErrorMessage(data?.message || "Rate limited: one review per person per day.");
        } else if (res.status === 400 && data?.error === "captcha_failed") {
          setErrorMessage("CAPTCHA verification failed. Please try again.");
        } else if (res.status === 400 && data?.error === "invalid_input") {
          setErrorMessage("Invalid input. Please check your entries.");
        } else {
          setErrorMessage("Submission failed. Please try again.");
        }
        resetTurnstileWidget();
        return;
      }

      const data = await res.json();
      setSuccessMessage("Review submitted successfully.");
      if (onSubmitted && data?.slug) {
        onSubmitted(data.slug);
      }
      setComment("");
      resetTurnstileWidget();
    } catch (error) {
      console.error("Unexpected error while submitting review", error);
      setErrorMessage("Unexpected error. Please try again.");
      resetTurnstileWidget();
    } finally {
      setSubmitting(false);
    }
  }

  const getRatingLabel = (rating: number) => {
    const labels = {
      1: "Poor",
      2: "Fair", 
      3: "Good",
      4: "Great",
      5: "Amazing"
    };
    return labels[rating as keyof typeof labels];
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="review-name">
            Name
          </label>
          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input text-lg"
            placeholder="e.g., Jane Doe"
            required
          />
        </div>

        {/* Rating Selection */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Rating
          </label>
          
          {/* Star Rating Display */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                >
                  <Star
                    className={`h-8 w-8 transition-all duration-200 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400 scale-110"
                        : "text-gray-300 dark:text-gray-600 hover:text-yellow-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {rating}/5 - {getRatingLabel(rating)}
            </div>
          </div>

          {/* Rating Dropdown (fallback) */}
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="input sr-only"
          >
            <option value={5}>⭐️⭐️⭐️⭐️⭐️ (5 - Amazing)</option>
            <option value={4}>⭐️⭐️⭐️⭐️ (4 - Great)</option>
            <option value={3}>⭐️⭐️⭐️ (3 - Good)</option>
            <option value={2}>⭐️⭐️ (2 - Fair)</option>
            <option value={1}>⭐️ (1 - Poor)</option>
          </select>
        </div>

        {/* Comment Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="review-comment">
            Comment <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="input resize-none text-lg"
              placeholder="Share your experience... Be respectful and honest."
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white dark:bg-gray-900 px-2 py-1 rounded">
              {comment.length}/500
            </div>
          </div>
        </div>

        {/* CAPTCHA */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Verification
          </label>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <div ref={widgetContainerRef} className="cf-turnstile" data-sitekey={siteKey} />
            {!siteKey && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Turnstile site key missing. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY.
              </p>
            )}
          </div>
        </div>

        {/* Error/Success Messages */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3 animate-fade-in">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 flex-1">{errorMessage}</p>
          </div>
        )}
        
        {successMessage && (
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-start gap-3 animate-fade-in">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-600 dark:text-green-400 flex-1">{successMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full py-4 text-lg gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
          disabled={submitting || !token}
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              <span>Submit Review</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

