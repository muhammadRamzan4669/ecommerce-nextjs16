import localFont from 'next/font/local'

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})
// Integral CF - Bold display font (for headings)
const integralCF = localFont({
  src: [
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-regularoblique.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-mediumoblique.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-demibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-demiboldoblique.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-boldoblique.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-extrabold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-extraboldoblique.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-heavy.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Fontspring-DEMO-integralcf-heavyoblique.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-integral',
  display: 'swap',
})
export { satoshi, integralCF }
