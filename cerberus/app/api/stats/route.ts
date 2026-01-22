import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Vercel Analytics API endpoint
const VERCEL_API_URL = "https://api.vercel.com";

export async function GET() {
  // Check if user is logged in via cookie
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (!auth || auth.value !== "1") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    return NextResponse.json({
      summary: {
        visitors: 0,
        pageViews: 0,
      },
      topPages: [],
      topReferrers: [],
      countries: [],
      browsers: [],
      os: [],
      message: "Configura VERCEL_API_TOKEN e VERCEL_PROJECT_ID nelle variabili d'ambiente.",
      isDemoData: true,
    });
  }

  try {
    // Calculate date range (last 30 days) - use timestamps for API
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const from = thirtyDaysAgo.getTime();
    const to = now.getTime();
    const fromDate = thirtyDaysAgo.toISOString().split("T")[0];
    const toDate = now.toISOString().split("T")[0];

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const teamQuery = teamId ? `&teamId=${teamId}` : "";

    // Try the Web Analytics endpoints (requires Web Analytics enabled)
    const endpoints = [
      { name: "path", url: `${VERCEL_API_URL}/v1/web-analytics/${projectId}/timeseries/pageviews?from=${from}&to=${to}${teamQuery}` },
      { name: "visitors", url: `${VERCEL_API_URL}/v1/web-analytics/${projectId}/timeseries/visitors?from=${from}&to=${to}${teamQuery}` },
    ];

    // Fetch pageviews and visitors timeseries
    const results: Record<string, { ok: boolean; data?: unknown; error?: string }> = {};
    
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep.url, { headers });
        if (res.ok) {
          results[ep.name] = { ok: true, data: await res.json() };
        } else {
          const text = await res.text();
          results[ep.name] = { ok: false, error: `${res.status}: ${text.substring(0, 200)}` };
        }
      } catch (err) {
        results[ep.name] = { ok: false, error: String(err) };
      }
    }

    // Also try to get breakdown by path
    let topPages: { path: string; views: number }[] = [];
    try {
      const pathRes = await fetch(
        `${VERCEL_API_URL}/v1/web-analytics/${projectId}/top/path?from=${from}&to=${to}&limit=10${teamQuery}`,
        { headers }
      );
      if (pathRes.ok) {
        const pathData = await pathRes.json();
        if (pathData.data && Array.isArray(pathData.data)) {
          topPages = pathData.data.map((item: { key: string; value: number }) => ({
            path: item.key || "/",
            views: item.value || 0,
          }));
        }
      }
    } catch {}

    // Get top referrers
    let topReferrers: { referrer: string; views: number }[] = [];
    try {
      const refRes = await fetch(
        `${VERCEL_API_URL}/v1/web-analytics/${projectId}/top/referrer?from=${from}&to=${to}&limit=10${teamQuery}`,
        { headers }
      );
      if (refRes.ok) {
        const refData = await refRes.json();
        if (refData.data && Array.isArray(refData.data)) {
          topReferrers = refData.data.map((item: { key: string; value: number }) => ({
            referrer: item.key || "(diretto)",
            views: item.value || 0,
          }));
        }
      }
    } catch {}

    // Get countries
    let countries: { country: string; views: number }[] = [];
    try {
      const countryRes = await fetch(
        `${VERCEL_API_URL}/v1/web-analytics/${projectId}/top/country?from=${from}&to=${to}&limit=10${teamQuery}`,
        { headers }
      );
      if (countryRes.ok) {
        const countryData = await countryRes.json();
        if (countryData.data && Array.isArray(countryData.data)) {
          countries = countryData.data.map((item: { key: string; value: number }) => ({
            country: item.key || "Unknown",
            views: item.value || 0,
          }));
        }
      }
    } catch {}

    // Get browsers
    let browsers: { browser: string; views: number }[] = [];
    try {
      const browserRes = await fetch(
        `${VERCEL_API_URL}/v1/web-analytics/${projectId}/top/browser?from=${from}&to=${to}&limit=5${teamQuery}`,
        { headers }
      );
      if (browserRes.ok) {
        const browserData = await browserRes.json();
        if (browserData.data && Array.isArray(browserData.data)) {
          browsers = browserData.data.map((item: { key: string; value: number }) => ({
            browser: item.key || "Unknown",
            views: item.value || 0,
          }));
        }
      }
    } catch {}

    // Get OS
    let os: { os: string; views: number }[] = [];
    try {
      const osRes = await fetch(
        `${VERCEL_API_URL}/v1/web-analytics/${projectId}/top/os?from=${from}&to=${to}&limit=5${teamQuery}`,
        { headers }
      );
      if (osRes.ok) {
        const osData = await osRes.json();
        if (osData.data && Array.isArray(osData.data)) {
          os = osData.data.map((item: { key: string; value: number }) => ({
            os: item.key || "Unknown",
            views: item.value || 0,
          }));
        }
      }
    } catch {}

    // Calculate totals from timeseries
    let totalPageViews = 0;
    let totalVisitors = 0;

    if (results.path?.ok && results.path.data) {
      const pvData = results.path.data as { data?: { value: number }[] };
      if (pvData.data && Array.isArray(pvData.data)) {
        totalPageViews = pvData.data.reduce((sum, item) => sum + (item.value || 0), 0);
      }
    }

    if (results.visitors?.ok && results.visitors.data) {
      const vData = results.visitors.data as { data?: { value: number }[] };
      if (vData.data && Array.isArray(vData.data)) {
        totalVisitors = vData.data.reduce((sum, item) => sum + (item.value || 0), 0);
      }
    }

    // If we got no data from timeseries, sum from topPages
    if (totalPageViews === 0 && topPages.length > 0) {
      totalPageViews = topPages.reduce((sum, p) => sum + p.views, 0);
    }

    return NextResponse.json({
      summary: {
        visitors: totalVisitors,
        pageViews: totalPageViews,
      },
      topPages,
      topReferrers,
      countries,
      browsers,
      os,
      period: { from: fromDate, to: toDate },
      isDemoData: false,
      debug: process.env.NODE_ENV === "development" ? results : undefined,
    });
  } catch (error) {
    console.error("Errore nel recupero delle statistiche Vercel:", error);
    return NextResponse.json(
      { 
        error: "Errore nel recupero delle statistiche",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
