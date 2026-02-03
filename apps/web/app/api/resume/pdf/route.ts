import { NextRequest } from "next/server";
import { chromium } from "playwright";

export const runtime = "nodejs"; // IMPORTANT (Playwright requires Node runtime)
export const dynamic = "force-dynamic";

function getBaseUrl(req: NextRequest) {
  // Works behind proxies too:
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  return `${proto}://${host}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const version = searchParams.get("version") ?? "base";

  const baseUrl = getBaseUrl(req);
  const url = `${baseUrl}/resume/preview?version=${encodeURIComponent(version)}&print=1`;

  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Ensure fully loaded
    await page.goto(url, { waitUntil: "networkidle" });

    // optional: set a fixed viewport for consistency
    await page.setViewportSize({ width: 1280, height: 720 });

    const pdfBuffer = await page.pdf({
      format: "Letter", // or "A4"
      printBackground: true,
      margin: {
        top: "0.2in",
        right: "0.2in",
        bottom: "0.2in",
        left: "0.2in",
      },
    });

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="resume-${version}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } finally {
    await browser.close();
  }
}
