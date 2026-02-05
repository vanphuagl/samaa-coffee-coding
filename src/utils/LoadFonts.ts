/**
 * Load external stylesheets asynchronously to avoid render blocking
 */
export const loadFonts = () => {
  // google Fonts
  const googleFonts = document.createElement('link')
  googleFonts.rel = 'stylesheet'
  googleFonts.href =
    'https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500&family=Noto+Sans+JP:wght@400;500&family=Overpass+Mono:wght@500&display=swap'
  googleFonts.media = 'print'
  googleFonts.onload = () => {
    googleFonts.media = 'all'
  }

  // adobe TypeKit
  const adobeFonts = document.createElement('link')
  adobeFonts.rel = 'stylesheet'
  adobeFonts.href = 'https://use.typekit.net/lzo7mzq.css'
  adobeFonts.media = 'print'
  adobeFonts.onload = () => {
    adobeFonts.media = 'all'
  }

  // append to head
  document.head.appendChild(googleFonts)
  document.head.appendChild(adobeFonts)
}

/**
 * Preconnect to font CDNs for faster loading
 */
export const preconnectFonts = () => {
  const preconnects = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://use.typekit.net',
    'https://p.typekit.net'
  ]

  preconnects.forEach((url) => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = url
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}
