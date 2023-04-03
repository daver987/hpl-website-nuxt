import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const gtmOptions = {
    id: 'GTM-WMVTZHG', // Your GTM single container ID, array of container ids ['GTM-', 'GTM-'] or array of objects [{id: 'GTM-', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-', 'GTM-']
    queryParams: {
      // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
      gtm_auth: '',
      gtm_preview: '',
      gtm_cookies_win: '',
    },
    defer: true, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case
    // visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
    compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
    // nonce: '2726c7f26c', // Will add `nonce` to the script tag
    enabled: false, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: false, // Whether display console logs debugs (optional)
    loadScript: false, // Whether to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
    vueRouter: router, // Pass the router instance to automatically sync with router (optional)
    // ignoredViews: ['homepage'], // Don't trigger events for specified router names (optional)
    trackOnNextTick: false, // Whether call trackView in Vue.nextTick
  }
  nuxtApp.vueApp.use(createGtm(gtmOptions))
})
