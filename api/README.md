# Read the Game narration API

`POST /api/narrate` accepts only synthetic match events and derived metrics, sends them to a text model, and returns a fan/analyst narrative, why it matters, a recap of received events, and evidence event IDs. Microsoft Foundry is the configured provider by default; Cloudflare Workers AI remains an optional provider. `GET /api/narrate` reports whether the chosen provider is configured without returning credentials.

## Recommended: Microsoft Foundry with the Azure trial credit

Create a Microsoft Foundry resource and a **serverless, token-billed** model deployment. Use the model deployment name shown in Foundry; do not select provisioned throughput or managed compute, which can charge for reserved capacity or running hardware. Check the deployment's price, region availability, quota, and the Azure portal estimate before creating it. Azure's free-account credit is temporary and applies only while eligible credit remains; Azure disables services at trial end unless the subscription is changed to pay-as-you-go. Do not make that change if you want to avoid out-of-pocket charges.

The project already has a `gpt-5-mini` deployment. To connect it, you will need three settings: `FOUNDRY_ENDPOINT` (copy the **Punto de conexión del proyecto** from the deployment's Foundry details), `FOUNDRY_API_KEY` (the secret API key from that same panel), and `FOUNDRY_DEPLOYMENT=gpt-5-mini`. Keep `AI_PROVIDER=foundry`. The API app adds `/openai/v1/responses` to the project endpoint and calls that deployment. Store the key only in server-side settings; never put it in browser code, GitHub files, screenshots, or chat. Do not send the key to Codex.

## Optional: Cloudflare Workers AI free quota

If Foundry model access is unavailable, create a Cloudflare account on the Free plan, enable Workers AI, and create an API token with **Account / Workers AI / Read** permission. Keep the account on the Free plan: Cloudflare documents a free allocation of 10,000 Neurons per day; requests stop at the free limit unless the account is upgraded to a paid Workers plan. The model configured here is `@cf/meta/llama-3.1-8b-instruct-fp8-fast`.

For local testing, copy `local.settings.sample.json` to `local.settings.json` and fill in `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. Keep `AI_PROVIDER` as `cloudflare`. The token must stay on the server; never commit the real settings file or put the token in browser code or chat.

## Configure Azure Static Web Apps

The latest Azure Static Web App deployment includes `api/` (`api_location: "api"`). The status endpoint at `https://<your-site>/api/narrate` currently returns `configured: false`. In the Static Web App resource's **Configuration / Environment variables**, add `AI_PROVIDER=foundry`, `FOUNDRY_ENDPOINT` (the Foundry project endpoint), `FOUNDRY_API_KEY` (secret), and `FOUNDRY_DEPLOYMENT=gpt-5-mini`. Azure stores these for the backend, not in the public page. Then confirm the endpoint returns `configured: true`, activate AI in the page, and verify a real narration. No secret needs to be shared with Codex.

The API includes a best-effort per-instance request throttle, not an identity system. The Cloudflare Free plan's daily allocation is the primary no-overage boundary: do not upgrade the account to a paid Workers plan if you want requests to stop at the free allowance. Check current account usage and terms before connecting. The app sends fictional synthetic match events only.

## Optional Microsoft Foundry provider

The API supports Microsoft Foundry as the recommended provider. Use token-based serverless inference and verify the model-specific estimate before calling it. Do not create an hourly capacity deployment for this prototype.

## Run locally

Use Azure Static Web Apps CLI with Azure Functions Core Tools and the local settings file. Opening `index.html` directly does not run the API; without `/api/narrate`, the frontend reports AI unavailable and continues with the deterministic local narration.
