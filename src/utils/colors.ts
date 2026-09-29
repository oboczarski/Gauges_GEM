// Color interpolation helper for multi-stop gradients
export function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  if (!c1 || !c2) return color1;

  const f = Math.max(0, Math.min(1, factor));
  const r = Math.round(c1.r + f * (c2.r - c1.r));
  const g = Math.round(c1.g + f * (c2.g - c1.g));
  const b = Math.round(c1.b + f * (c2.b - c1.b));

  return `rgb(${r}, ${g}, ${b})`;
}

export function interpolate3StopColor(start: string, mid: string, end: string, factor: number): string {
  const f = Math.max(0, Math.min(1, factor));
  if (f <= 0.5) {
    return interpolateColor(start, mid, f * 2);
  } else {
    return interpolateColor(mid, end, (f - 0.5) * 2);
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map((c) => c + c).join('');
  }
  if (cleaned.length !== 6) return null;
  const num = parseInt(cleaned, 16);
  if (isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}
