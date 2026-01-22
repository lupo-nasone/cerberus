import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Vercel Analytics API endpoint
const VERCEL_API_URL = "https://api.vercel.com";

interface VercelWebAnalytics {
  visitors?: number;
  pageViews?: number;
  bounceRate?: number;
  avgDuration?: number;
}

interface PageViewData {
  key: string;
  total: number;
  devices: number;
}

interface ReferrerData {
  key: string;
  total: number;
  devices: number;
}

interface CountryData {
  key: string;
  total: number;
  devices: number;
}

interface BrowserData {
  key: string;
  total: number;
  devices: number;
}

interface OSData {
  key: string;
  total: number;
  devices: number;
}

export async function GET() {
  // Check if user is logged in via cookie
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (!auth || auth.value !== "ok") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) {
    // Return mock data for development/demo
    return NextResponse.json({
      summary: {
        visitors: 0,
        pageViews: 0,
        bounceRate: 0,
        avgDuration: 0,
      },
      topPages: [],
      topReferrers: [],
      countries: [],
      browsers: [],
      os: [],
      message: "Configura VERCEL_API_TOKEN e VERCEL_PROJECT_ID nelle variabili d'ambiente per vedere le statistiche reali.",
      isDemoData: true,
    });
  }

  try {
    // Calculate date range (last 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const from = thirtyDaysAgo.toISOString().split("T")[0];
    const to = now.toISOString().split("T")[0];

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const teamQuery = teamId ? `&teamId=${teamId}` : "";

    // Fetch various analytics data in parallel
    const [
      visitorsRes,
      pageViewsRes,
      referrersRes,
      countriesRes,
      browsersRes,
      osRes,
    ] = await Promise.all([
      // Visitors (unique devices)
      fetch(
        `${VERCEL_API_URL}/v1/web/insights/stats/devices?projectId=${projectId}&from=${from}&to=${to}${teamQuery}`,
        { headers }
      ),
      // Page views
      fetch(
        `${VERCEL_API_URL}/v1/web/insights/stats/path?projectId=${projectId}&from=${from}&to=${to}&limit=10${teamQuery}`,
        { headers }
      ),
      // Referrers
      fetch(
        `${VERCEL_API_URL}/v1/web/insights/stats/referrer?projectId=${projectId}&from=${from}&to=${to}&limit=10${teamQuery}`,
        { headers }
      ),
      // Countries
      fetch(
        `${VERCEL_API_URL}/v1/web/insights/stats/country?projectId=${projectId}&from=${from}&to=${to}&limit=10${teamQuery}`,
        { headers }
      ),
      // Browsers
      fetch(
        `${VERCEL_API_URL}/v1/web/insights/stats/browser?projectId=${projectId}&from=${from}&to=${to}&limit=5${teamQuery}`,
        { headers }
      ),
      // Operating Systems
      fetch(
        `${VERCEL_API_URL}/v1/web/insights/stats/os?projectId=${projectId}&from=${from}&to=${to}&limit=5${teamQuery}`,
        { headers }
      ),
    ]);

    // Parse responses
    const visitorsData = visitorsRes.ok ? await visitorsRes.json() : { data: [] };
    const pageViewsData = pageViewsRes.ok ? await pageViewsRes.json() : { data: [] };
    const referrersData = referrersRes.ok ? await referrersRes.json() : { data: [] };
    const countriesData = countriesRes.ok ? await countriesRes.json() : { data: [] };
    const browsersData = browsersRes.ok ? await browsersRes.json() : { data: [] };
    const osData = osRes.ok ? await osRes.json() : { data: [] };

    // Calculate totals
    const totalVisitors = visitorsData.data?.reduce((sum: number, item: { devices?: number }) => sum + (item.devices || 0), 0) || 0;
    const totalPageViews = pageViewsData.data?.reduce((sum: number, item: PageViewData) => sum + (item.total || 0), 0) || 0;

    const summary: VercelWebAnalytics = {
      visitors: totalVisitors,
      pageViews: totalPageViews,
      bounceRate: 0,
      avgDuration: 0,
    };

    return NextResponse.json({
      summary,
      topPages: (pageViewsData.data || []).map((item: PageViewData) => ({
        path: item.key,
        views: item.total,
        visitors: item.devices,
      })),
      topReferrers: (referrersData.data || []).map((item: ReferrerData) => ({
        referrer: item.key || "(diretto)",
        views: item.total,
        visitors: item.devices,
      })),
      countries: (countriesData.data || []).map((item: CountryData) => ({
        country: item.key,
        views: item.total,
        visitors: item.devices,
      })),
      browsers: (browsersData.data || []).map((item: BrowserData) => ({
        browser: item.key,
        views: item.total,
        visitors: item.devices,
      })),
      os: (osData.data || []).map((item: OSData) => ({
        os: item.key,
        views: item.total,
        visitors: item.devices,
      })),
      period: { from, to },
      isDemoData: false,
    });
  } catch (error) {
    console.error("Errore nel recupero delle statistiche Vercel:", error);
    return NextResponse.json(
      { error: "Errore nel recupero delle statistiche" },
      { status: 500 }
    );
  }
}
