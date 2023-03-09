function rgbToHsb(rgb) {
  let r = rgb[0]
  let g = rgb[1]
  let b = rgb[2]
  r /= 255
  g /= 255
  b /= 255
  let cMax = Math.max(r, g, b)
  let cMin = Math.min(r, g, b)
  let cDelta = cMax - cMin

  let h

  if (cMax == r) {
    h = 60 * (((g - b) / cDelta) % 6)
  } else if (cMax == g) {
    h = 60 * ((b - r) / cDelta + 2)
  } else {
    h = 60 * ((r - g) / cDelta + 4)
  }
  if (cDelta == 0) h = 0
  if (h < 0) h += 360

  let s
  if (cMax == 0) {
    s = 0
  } else {
    s = (cDelta / cMax) * 100
  }

  // v (value) is the same as the b (brightness) in hsb/hsv
  let v = cMax * 100
  return [Math.round(h), Math.round(s), Math.round(v)]
}

export { rgbToHsb }
