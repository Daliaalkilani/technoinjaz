Context: technoenjaz.com (repo github.com/Daliaalkilani/technoinjaz, Next.js on Cloudflare
Workers via @opennextjs/cloudflare, D1 database "technoenjaz-db").

URGENT — the live site is broken: 66 of 75 sitemap URLs return 404 (every /articles/*,
/projects/* and /team/* page). Cause: the last deploy was done with a plain
`wrangler deploy`, which skips OpenNext's populateCache step, so the prerendered pages
were never uploaded. The repo now contains a fix in wrangler.jsonc (commit dda5a9b)
that runs populateCache automatically, but the site must be redeployed.

Please do the following, in order, and report the result of each step:

1) Redeploy the latest main:
   git pull origin main
   npm ci
   npm run deploy          # = next build + opennextjs-cloudflare build + deploy
   Then verify every sitemap URL returns 200:
   curl -s https://technoenjaz.com/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' \
     | while read u; do echo "$(curl -s -o /dev/null -w '%{http_code}' "$u") $u"; done \
     | sort | uniq -c -w3
   Expected: 75 lines with 200 and none with 404.

2) Cloudflare dashboard, zone technoenjaz.com — allow AI crawlers (needed for GEO):
   - Security → Bots: turn OFF "Block AI bots" / "AI Scrapers and Crawlers".
   - If present, turn OFF "Manage your robots.txt" (Cloudflare-managed AI robots rules)
     and any AI Audit / AI Crawl Control rule that blocks GPTBot, ClaudeBot,
     PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended, CCBot.
   - Verify (expect 200 for all, currently GPTBot/ClaudeBot/CCBot get 403):
     for ua in GPTBot ClaudeBot PerplexityBot OAI-SearchBot CCBot; do
       echo "$ua $(curl -s -o /dev/null -w '%{http_code}' -A "Mozilla/5.0 (compatible; $ua/1.0)" https://technoenjaz.com/articles/digital-twin)"; done
   - Do NOT change Email Routing / Email Sending (outgoing mail works now).

3) Google Search Console (property already verified via DNS TXT):
   - Sitemaps → submit https://technoenjaz.com/sitemap.xml
   - URL Inspection → Request indexing for: /, /projects, /articles, /about,
     /articles/digital-twin, /projects/ai-dental-diagnosis
   - Settings → Users and permissions → add the site owners as Full users.

4) Bing Webmaster Tools: add technoenjaz.com (import from Google Search Console is
   fine), submit the same sitemap. Bing feeds ChatGPT / Copilot search.

Do not edit application code; only deploy, Cloudflare settings and webmaster tools.
Report back: deploy output, the 200/404 counts from step 1, the bot status codes
from step 2, and confirmation of steps 3–4.
