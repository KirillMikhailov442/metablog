import {getRequestConfig} from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['ru', 'en', 'zh']

export default getRequestConfig(async ({locale}) => {
    if(!locales.includes(locale as any)) notFound()
  
    return {
        messages: (await import(`../locales/${locale}.json`)).default
    }
})