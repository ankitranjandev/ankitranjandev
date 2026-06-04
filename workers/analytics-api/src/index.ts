/**
 * Analytics API Worker
 * Fetches Cloudflare Analytics data and returns it as JSON
 */

interface Env {
  CF_API_TOKEN: string;
  CF_ZONE_ID: string;
  ALLOWED_ORIGIN: string;
}

interface AnalyticsResponse {
  visitors: number;
  pageViews: number;
  period: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Check origin for CORS
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = [
      'https://ankitranjan.dev',
      'https://ankitranjan-dev.web.app',
      'http://localhost:4321', // Astro dev server
    ];
    const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow GET
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const stats = await fetchAnalytics(env);
      return new Response(JSON.stringify(stats), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } catch (error) {
      console.error('Analytics fetch error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch analytics' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
  },
};

async function fetchAnalytics(env: Env): Promise<AnalyticsResponse> {
  // Get data for the last 30 days
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const query = `
    query {
      viewer {
        zones(filter: { zoneTag: "${env.CF_ZONE_ID}" }) {
          httpRequests1dGroups(
            limit: 30
            filter: {
              date_geq: "${startDate.toISOString().split('T')[0]}"
              date_leq: "${endDate.toISOString().split('T')[0]}"
            }
          ) {
            sum {
              requests
              pageViews
            }
            uniq {
              uniques
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.CF_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Cloudflare API error: ${response.status}`);
  }

  const data = await response.json() as any;

  // Aggregate the data
  const groups = data?.data?.viewer?.zones?.[0]?.httpRequests1dGroups || [];

  let totalVisitors = 0;
  let totalPageViews = 0;

  for (const group of groups) {
    totalVisitors += group.uniq?.uniques || 0;
    totalPageViews += group.sum?.pageViews || group.sum?.requests || 0;
  }

  return {
    visitors: totalVisitors,
    pageViews: totalPageViews,
    period: '30d',
  };
}
