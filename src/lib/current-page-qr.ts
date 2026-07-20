import QRCode from 'qrcode';

export type CurrentPageQrOptions = {
  url?: string;
  width?: number;
  margin?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  darkColor?: string;
  lightColor?: string;
};

export async function renderCurrentPageQrCode(
  canvas: HTMLCanvasElement,
  options: CurrentPageQrOptions = {}
): Promise<void> {
  const {
    url = window.location.href,
    width = 256,
    margin = 2,
    errorCorrectionLevel = 'M',
    darkColor = '#1c1917',
    lightColor = '#ffffff',
  } = options;

  await QRCode.toCanvas(canvas, url, {
    errorCorrectionLevel,
    margin,
    width,
    color: {
      dark: darkColor,
      light: lightColor,
    },
  });
}
