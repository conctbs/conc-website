# GTM Consent Mode v2 Setup

This frontend already implements the site-side consent bootstrap and cookie banner. Google tags must now be configured in Google Tag Manager to match it.

Relevant code:

- `src/components/analytics/ConsentModeHead.astro`
- `src/components/analytics/CookieConsentBanner.astro`
- `src/layouts/MainLayout.astro`

## Environment

Set the GTM container ID in `.env`:

```env
PUBLIC_GTM_ID=GTM-XXXXXXX
PUBLIC_GTM_WAIT_FOR_UPDATE=500
```

This repo does not load GA4 directly. Do not paste a standalone `gtag.js` snippet into Astro pages or layouts.

## Consent Behavior Implemented By The Site

Before GTM loads, the site sets these defaults:

- `analytics_storage=denied`
- `ad_storage=denied`
- `ad_user_data=denied`
- `ad_personalization=denied`

The site also sets:

- `ads_data_redaction=true`
- `url_passthrough=true`

Consent updates happen only after user interaction with the cookie banner.

## dataLayer Events Pushed By The Site

### `consent_page_view`

Used for GA4 pageview tracking after consent.

Payload:

```js
{
  event: 'consent_page_view',
  page_title: document.title,
  page_location: window.location.href,
  page_path: window.location.pathname + window.location.search,
  page_referrer: document.referrer || ''
}
```

### `consent_updated`

Used for debugging and optional reporting.

Payload:

```js
{
  event: 'consent_updated',
  consent_analytics: 'granted' | 'denied',
  consent_ads: 'granted' | 'denied'
}
```

### `ads_conversion`

Optional custom event for Google Ads conversions.

Payload shape depends on your use case, for example:

```js
{
  event: 'ads_conversion',
  value: 1,
  currency: 'THB',
  transaction_id: 'lead-123',
  registration_id: 'lead-123',
  program_slug: 'executive-communication-design-for-digital-teams',
  registration_kind: 'program'
}
```

The site helper:

```js
window.__concConsent?.trackAdsConversion({
  value: 1,
  currency: 'THB',
  transaction_id: 'lead-123',
});
```

The registration page already fires this event automatically after a successful public registration submission.

## GTM Container Setup

### 1. GA4 Configuration

Create a GA4 base tag.

- Tag type: `Google tag` or `GA4 Configuration`
- Measurement ID: `G-44Q9S4ZPHC`
- Send a page view event when this configuration loads: `false`
- Trigger: `Initialization - All Pages`

Consent settings:

- Require additional consent for tag to fire: `analytics_storage`

Do not add custom consent default code in GTM. The website sets default consent before GTM loads.

### 2. GA4 Page View Event

Create a GA4 event tag.

- Tag type: `GA4 Event`
- Configuration tag: your GA4 base tag
- Event name: `page_view`
- Trigger: Custom Event `consent_page_view`

Map these event parameters:

- `page_title` -> Data Layer Variable `page_title`
- `page_location` -> Data Layer Variable `page_location`
- `page_path` -> Data Layer Variable `page_path`
- `page_referrer` -> Data Layer Variable `page_referrer`

Consent settings:

- Require additional consent for tag to fire: `analytics_storage`

### 3. Conversion Linker

Create a `Conversion Linker` tag.

- Trigger: `All Pages`

Consent settings:

- Require additional consent for tag to fire: `ad_storage`

### 4. Google Ads Conversion Tag

Create a Google Ads conversion tag for each conversion you need.

- Tag type: `Google Ads Conversion Tracking`
- Conversion ID: your Ads account conversion ID
- Conversion Label: your conversion label
- Trigger: Custom Event `ads_conversion` or another dedicated event name

If you use `ads_conversion`, create Data Layer Variables for:

- `value`
- `currency`
- `transaction_id`
- `registration_id`
- `program_slug`
- `registration_kind`

Map them into the Ads tag fields.

Consent settings:

- Require additional consent for tag to fire:
  - `ad_storage`
  - `ad_user_data`
  - `ad_personalization`

### 5. Optional Debug Tag

You can create a Custom HTML debug tag that fires on `consent_updated` in Preview mode only, but do not publish debug tags to production.

## GTM Variables To Create

Create these Data Layer Variables:

- `page_title`
- `page_location`
- `page_path`
- `page_referrer`
- `consent_analytics`
- `consent_ads`
- `value`
- `currency`
- `transaction_id`

## Trigger Summary

- `Initialization - All Pages`
  - For GA4 base tag
- `All Pages`
  - For Conversion Linker
- Custom Event `consent_page_view`
  - For GA4 `page_view`
- Custom Event `ads_conversion`
  - For Ads conversion tags

## Tag Assistant Testing

### Default Denied

1. Open GTM Preview / Tag Assistant.
2. Load the site in a fresh browser session or incognito window.
3. Open the Consent tab.
4. Confirm these are `denied` on initial load:
   - `analytics_storage`
   - `ad_storage`
   - `ad_user_data`
   - `ad_personalization`

### No Cookies Before Consent

Before accepting cookies, verify the browser does not receive:

- `_ga`
- `_ga_*`
- `_gcl_au`
- other Google Ads cookies tied to consented storage

### Accept All

1. Click `Accept all`.
2. Confirm Tag Assistant shows consent updated to `granted`.
3. Confirm `consent_page_view` appears in the event stream.
4. Confirm your GA4 `page_view` tag fires only after consent.

### Reject All

1. Clear site storage.
2. Reload the page.
3. Click `Reject all`.
4. Confirm consent remains denied.
5. Confirm GA4 and Ads cookies are still absent.

### Customize

1. Clear site storage.
2. Reload.
3. Click `Customize`.
4. Enable analytics only.
5. Save preferences.
6. Confirm:
   - `analytics_storage=granted`
   - `ad_storage=denied`
   - `ad_user_data=denied`
   - `ad_personalization=denied`

## Production Notes

- Keep GTM as the only place where GA4 and Ads tags are created.
- Never paste GA4 `gtag.js` directly into the frontend when GTM is already present.
- Re-test consent after every GTM publish.
- If you later add Meta Pixel, LinkedIn Insight, or Hotjar, gate them with the same consent model.
- If legal needs category-level records, consent logs, geo rules, or IAB TCF strings, replace the custom banner with a full CMP instead of extending this script indefinitely.
