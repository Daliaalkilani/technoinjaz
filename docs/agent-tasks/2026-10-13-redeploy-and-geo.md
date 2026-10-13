Context: technoenjaz.com (repo github.com/Daliaalkilani/technoinjaz, Next.js on Cloudflare
Workers via @opennextjs/cloudflare, D1 database "technoenjaz-db").

UPDATE 2 — the previous redeploy shipped an OLD build: the live site lacks the latest
commits (email banners at /images/email/*.jpg return 404, no Instagram links on team
pages, no account settings). Cause: `wrangler deploy` uploaded a stale .open-next folder
without rebuilding. Fixed in the repo: wrangler.jsonc now has a build command that runs
the full build + populateCache before every deploy, and `npm run deploy` = `wrangler deploy`.

Please redeploy from a clean, up-to-date checkout:

   git fetch origin && git checkout main && git reset --hard origin/main
   npm ci
   npm run deploy        # wrangler deploy → runs the full build automatically (~4–6 min)

Make sure the deploy log shows "[custom build] Running: npx opennextjs-cloudflare build"
and "Successfully populated static assets cache" before the upload.

Then verify (all must pass) and report the output:

   # 1) every sitemap URL is 200 (expect 75 x 200)
   curl -s https://technoenjaz.com/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' \
     | while read u; do curl -s -o /dev/null -w '%{http_code}\n' "$u"; done | sort | uniq -c
   # 2) latest commits are live
   curl -s -o /dev/null -w 'banner %{http_code} %{content_type}\n' https://technoenjaz.com/images/email/welcome-ar.jpg
   curl -s https://technoenjaz.com/team/dalia-alkilani | grep -c 'instagram.com/dalia.alkilani'   # expect >= 1
   # 3) AI crawlers still allowed (expect 200)
   for ua in GPTBot ClaudeBot PerplexityBot; do echo "$ua $(curl -s -o /dev/null -w '%{http_code}' -A "Mozilla/5.0 (compatible; $ua/1.0)" https://technoenjaz.com/articles/digital-twin)"; done

Already done by you earlier (no need to repeat): AI crawler access in Cloudflare,
Search Console sitemap, Bing Webmaster. Do not edit application code.
