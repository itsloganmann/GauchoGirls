/**
 * Verify Cloudflare Turnstile token on the server
 * @param token - The Turnstile token from the client
 * @param remoteIp - Optional IP address of the client
 * @returns Promise<boolean> - Whether the token is valid
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY not configured");
    return false;
  }

  try {
    const formData = new URLSearchParams({
      secret,
      response: token,
      ...(remoteIp ? { remoteip: remoteIp } : {}),
    });

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );

    const data = await response.json();
    return Boolean(data.success);
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}
