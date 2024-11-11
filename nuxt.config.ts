// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig:{
    public:{
      googleAPI: process.env.NUXT_GOOGLE_API_KEY
    }
  },
  modules: ['@nuxt/ui', '@nuxtjs/harlem']

})