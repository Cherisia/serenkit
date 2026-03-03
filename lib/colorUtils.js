/**
 * Core color conversion and manipulation utilities
 */

// ─── Format Conversions ───────────────────────────────────────────────────────

export function hexToRgb(hex) {
  if (!hex) return null
  const clean = hex.replace('#', '').trim()
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16)
    const g = parseInt(clean[1] + clean[1], 16)
    const b = parseInt(clean[2] + clean[2], 16)
    return { r, g, b }
  }
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(clean)
  if (!result) return null
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

export function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
    .join('')
}

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0, s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100

  if (s === 0) {
    const val = Math.round(l * 255)
    return { r: val, g: val, b: val }
  }

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  }
}

export function rgbToHsb(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const v = max
  const d = max - min
  const s = max === 0 ? 0 : d / max
  let h = 0

  if (max !== min) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(v * 100),
  }
}

export function hsbToRgb(h, s, v) {
  h /= 360; s /= 100; v /= 100
  let r, g, b
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    case 5: r = v; g = p; b = q; break
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

export function rgbToCmyk(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const k = 1 - Math.max(r, g, b)
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 }
  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  }
}

export function cmykToRgb(c, m, y, k) {
  c /= 100; m /= 100; y /= 100; k /= 100
  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k)),
  }
}

// ─── Color Info ───────────────────────────────────────────────────────────────

/**
 * Get all formats from a hex string
 */
export function getAllFormats(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  const { r, g, b } = rgb
  const hsl = rgbToHsl(r, g, b)
  const hsb = rgbToHsb(r, g, b)
  const cmyk = rgbToCmyk(r, g, b)

  return {
    hex: hex.toLowerCase(),
    hexUpper: hex.toUpperCase(),
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, 1)`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`,
    hsb: `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`,
    cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    r, g, b,
    hslH: hsl.h, hslS: hsl.s, hslL: hsl.l,
    hsbH: hsb.h, hsbS: hsb.s, hsbV: hsb.b,
    cmykC: cmyk.c, cmykM: cmyk.m, cmykY: cmyk.y, cmykK: cmyk.k,
  }
}

// ─── Accessibility ────────────────────────────────────────────────────────────

export function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(v => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

export function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1)
  const rgb2 = hexToRgb(hex2)
  if (!rgb1 || !rgb2) return 1
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function getWcagLevel(ratio, isLargeText = false) {
  if (isLargeText) {
    if (ratio >= 4.5) return 'AAA'
    if (ratio >= 3) return 'AA'
    return 'Fail'
  }
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA Large'
  return 'Fail'
}

// ─── Color Parsing ────────────────────────────────────────────────────────────

export function parseColor(input) {
  if (!input) return null
  input = input.trim()

  // #RGB or #RRGGBB
  if (/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(input)) {
    return hexToRgb(input.startsWith('#') ? input : '#' + input)
  }

  // rgb(r, g, b)
  const rgbM = input.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (rgbM) return { r: +rgbM[1], g: +rgbM[2], b: +rgbM[3] }

  // hsl(h, s%, l%)
  const hslM = input.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/i)
  if (hslM) return hslToRgb(+hslM[1], +hslM[2], +hslM[3])

  return null
}

export function isValidHex(hex) {
  return /^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(hex.trim())
}

export function normalizeHex(hex) {
  const clean = hex.replace('#', '').trim()
  if (clean.length === 3) {
    return '#' + clean.split('').map(c => c + c).join('')
  }
  return '#' + clean.toLowerCase()
}

// ─── Palette Generation ───────────────────────────────────────────────────────

export function generatePalette(hex, type) {
  const rgb = hexToRgb(hex)
  if (!rgb) return []
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const rot = (h, deg) => ((h + deg) % 360 + 360) % 360
  const toHex = (h, s, l) => {
    const c = hslToRgb(h, s, l)
    return rgbToHex(c.r, c.g, c.b)
  }
  const { h, s, l } = hsl

  const schemes = {
    complementary: [
      { hex, label: '기준색' },
      { hex: toHex(rot(h, 180), s, l), label: '보색' },
    ],
    analogous: [
      { hex: toHex(rot(h, -30), s, l), label: '-30°' },
      { hex: toHex(rot(h, -15), s, l), label: '-15°' },
      { hex, label: '기준색' },
      { hex: toHex(rot(h, 15), s, l), label: '+15°' },
      { hex: toHex(rot(h, 30), s, l), label: '+30°' },
    ],
    triadic: [
      { hex, label: '기준색' },
      { hex: toHex(rot(h, 120), s, l), label: '+120°' },
      { hex: toHex(rot(h, 240), s, l), label: '+240°' },
    ],
    'split-complementary': [
      { hex, label: '기준색' },
      { hex: toHex(rot(h, 150), s, l), label: '+150°' },
      { hex: toHex(rot(h, 210), s, l), label: '+210°' },
    ],
    tetradic: [
      { hex, label: '기준색' },
      { hex: toHex(rot(h, 90), s, l), label: '+90°' },
      { hex: toHex(rot(h, 180), s, l), label: '+180°' },
      { hex: toHex(rot(h, 270), s, l), label: '+270°' },
    ],
    monochromatic: [
      { hex: toHex(h, s, Math.max(10, l - 30)), label: '-30% L' },
      { hex: toHex(h, s, Math.max(10, l - 15)), label: '-15% L' },
      { hex, label: '기준색' },
      { hex: toHex(h, s, Math.min(90, l + 15)), label: '+15% L' },
      { hex: toHex(h, s, Math.min(90, l + 30)), label: '+30% L' },
    ],
    shades: Array.from({ length: 10 }, (_, i) => ({
      hex: toHex(h, s, 5 + i * 9),
      label: `${5 + i * 9}%`,
    })),
  }

  return schemes[type] || []
}

// ─── Image Color Extraction ───────────────────────────────────────────────────

/**
 * Extract dominant colors from canvas ImageData using quantization
 */
export function extractDominantColors(imageData, count = 8) {
  const { data, width, height } = imageData
  const totalPixels = width * height
  const step = Math.max(1, Math.floor(totalPixels / 8000))
  const bucketSize = 24
  const buckets = new Map()

  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]
    if (a < 128) continue

    const key = `${Math.floor(r / bucketSize)},${Math.floor(g / bucketSize)},${Math.floor(b / bucketSize)}`
    if (!buckets.has(key)) {
      buckets.set(key, { rSum: 0, gSum: 0, bSum: 0, count: 0 })
    }
    const bucket = buckets.get(key)
    bucket.rSum += r
    bucket.gSum += g
    bucket.bSum += b
    bucket.count++
  }

  const sorted = [...buckets.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, count * 3)

  // Deduplicate similar colors
  const result = []
  for (const bucket of sorted) {
    const r = Math.round(bucket.rSum / bucket.count)
    const g = Math.round(bucket.gSum / bucket.count)
    const b = Math.round(bucket.bSum / bucket.count)
    const hex = rgbToHex(r, g, b)

    const tooSimilar = result.some(existing => {
      const er = hexToRgb(existing.hex)
      const dist = Math.sqrt(
        Math.pow(r - er.r, 2) + Math.pow(g - er.g, 2) + Math.pow(b - er.b, 2)
      )
      return dist < 40
    })

    if (!tooSimilar) {
      result.push({ hex, count: bucket.count })
      if (result.length >= count) break
    }
  }

  return result
}

// ─── Text Contrast ────────────────────────────────────────────────────────────

/**
 * Returns '#ffffff' or '#1e1e2e' depending on background luminance
 */
export function getTextColor(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#000000'
  const lum = getLuminance(rgb.r, rgb.g, rgb.b)
  return lum > 0.35 ? '#1e1e2e' : '#ffffff'
}
