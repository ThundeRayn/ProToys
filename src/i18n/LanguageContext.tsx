import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Lang = 'en' | 'cn'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
})

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    // An explicit choice the visitor made on a previous visit always wins.
    const saved = localStorage.getItem('protoys-lang') as Lang
    if (saved === 'cn' || saved === 'en') return saved

    // Otherwise fall back to the geo-based default set by Edge Middleware.
    const geo = getCookie('protoys-lang')
    return geo === 'cn' || geo === 'en' ? geo : 'cn'
  })

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('protoys-lang', newLang)
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'cn' ? 'zh-CN' : 'en'
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  return useContext(LanguageContext)
}
