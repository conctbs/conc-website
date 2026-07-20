# Reusing The Current Page QR Code

The QR rendering logic lives in `src/lib/current-page-qr.ts`. The Astro UI in
`src/components/CurrentPageQrCode.astro` imports that function and supplies the
canvas and error state.

## Projects With npm And A Bundler

Install the library:

```bash
npm install qrcode
npm install --save-dev @types/qrcode
```

Copy `src/lib/current-page-qr.ts` into the other project, then call it after the
page has loaded:

```html
<aside class="page-qr">
  <p>Scan this page</p>
  <canvas id="current-page-qr"></canvas>
</aside>
```

```ts
import { renderCurrentPageQrCode } from './current-page-qr';

const canvas = document.querySelector<HTMLCanvasElement>('#current-page-qr');

if (canvas) {
  renderCurrentPageQrCode(canvas).catch((error) => {
    console.error('Unable to render QR code.', error);
  });
}
```

By default, the function reads `window.location.href`. It also accepts options:

```ts
await renderCurrentPageQrCode(canvas, {
  url: window.location.href,
  width: 320,
  margin: 3,
  errorCorrectionLevel: 'Q',
  darkColor: '#111827',
  lightColor: '#ffffff',
});
```

## Plain HTML Without A Build Step

Use QRCode.js from a CDN:

```html
<style>
  .page-qr {
    position: fixed;
    right: 16px;
    bottom: 16px;
    width: 160px;
    padding: 12px;
    border: 1px solid #e7e5e4;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 12px 32px rgb(0 0 0 / 18%);
    color: #1c1917;
    text-align: center;
  }

  .page-qr p {
    margin: 0 0 8px;
    font: 600 14px/1.4 system-ui, sans-serif;
  }

  .page-qr img,
  .page-qr canvas {
    display: block;
    margin: auto;
  }
</style>

<aside class="page-qr" aria-label="QR code for this page">
  <p>Scan this page</p>
  <div id="current-page-qr"></div>
</aside>

<script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
<script>
  new QRCode(document.getElementById('current-page-qr'), {
    text: window.location.href,
    width: 128,
    height: 128,
    correctLevel: QRCode.CorrectLevel.M,
  });
</script>
```

For a single-page application, rerun the rendering function after the router
finishes navigation so the QR code contains the new `window.location.href`.
