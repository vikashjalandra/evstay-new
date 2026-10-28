# EVStay website integration

The website is a public directory. Charger and hotel management stays in the existing EVStay admin application. The former `/a/admin000` area, local charger editing, upload, lead-management and NextAuth endpoints are removed.

Set `EVSTAY_API_URL` to the EVStay backend origin (defaults to `https://api.evstay.in`). The server proxies the existing public `/api/customer/v1/locations` and `/locations/:publicId` endpoints, following list pagination. No admin token is sent to the browser. Only published hotels with enabled chargers appear.

Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` at build time to a browser key with Maps JavaScript API enabled and website referrer restrictions. For Docker, pass it as a build argument. Without it, the searchable directory still works and displays a map configuration message.

Deploy the accompanying `backend/src/services/places.service.js` change. It extends the existing Places integration with `googleRating`, `googleReviewCount`, and `googleReviews`; EVStay's `rating`, `reviewCount`, and verified charging reviews keep their existing meaning. The backend's existing `GOOGLE_PLACES_API_KEY` must have Places API (New) enabled, with billing and suitable server restrictions. No Places key is exposed on the website. Google content is requested live and photos and reviews display author attribution. Google reviews are the provider's relevant sample, not every review.

The map uses the official Google Maps JavaScript API. Search covers published EVStay hotel names, cities and addresses, with AC/DC and live availability filters. Detail cards show connector power, tariff, freshness-aware status, hotel photos, contact details, directions, opening hours, and separately labelled Google and EVStay reviews. Missing content is shown as unavailable; no sample hotel data or fabricated ratings are used.

Connector status refreshes every 15 seconds through `/api/charger-status`, using the lightweight public `/api/customer-status/v1/chargers` endpoint. Photos and Places details load when opening a location rather than on every status refresh. Failed refreshes mark previously known connectors stale. Starting or paying for charging remains in the existing EVStay customer app.

Contact and partnership forms remain independent of the removed website admin.
