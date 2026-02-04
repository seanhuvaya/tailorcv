import { NextRequest } from "next/server";
import { chromium } from "playwright";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBaseUrl(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const version = searchParams.get("version") ?? "base";

  const resumeData = await req.json(); // ✅ edited resume JSON

  const baseUrl = getBaseUrl(req);
  const url = `${baseUrl}/resume/preview?version=${encodeURIComponent(
    version
  )}&print=1`;

  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Inject resume JSON before the page runs
    await page.addInitScript((data) => {
      window.__RESUME_DATA__ = data;
    }, resumeData);

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(url, { waitUntil: "networkidle" });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "0.2in",
        right: "0.2in",
        bottom: "0.2in",
        left: "0.2in",
      },
    });

    // ✅ Convert Node Buffer -> Web BodyInit
    const body = new Uint8Array(pdfBuffer);

    return new Response(body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume-${version}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } finally {
    await browser.close();
  }
}
