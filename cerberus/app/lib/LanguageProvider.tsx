"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Lang = 'it' | 'en';

const LocaleContext = createContext<{ lang: Lang; t: (path: string) => any; setLang: (l: Lang) => void } | null>(null);

// simple loader: synchronous require of JSON files
import it from '../../locales/it.json';
import en from '../../locales/en.json';

const LOCALES: Record<Lang, any> = { it, en };

export function LanguageProvider({ children }: { children: React.ReactNode }){
  const [lang, setLang] = useState<Lang>('it');

  useEffect(()=>{
    try{
      const saved = localStorage.getItem('site-lang');
      if(saved === 'en' || saved === 'it') setLang(saved as Lang);
      else {
        const docLang = document.documentElement.getAttribute('data-lang');
        if(docLang === 'en' || docLang === 'it') setLang(docLang as Lang);
      }
    }catch(e){}
  },[]);

  useEffect(()=>{
    try{ localStorage.setItem('site-lang', lang); }catch(e){}
    try{ document.documentElement.setAttribute('data-lang', lang); document.documentElement.lang = lang }catch(e){}
  },[lang]);

  const t = useMemo(()=>{
    const dict = LOCALES[lang] || LOCALES.it;
    return function translate(path: string){
      const parts = path.split('.');
      let cur: any = dict;
      for(const p of parts){
        if(cur == null) return path;
        cur = cur[p];
      }
      // return the raw value (string, array, object) when found, otherwise the path
      return typeof cur === 'undefined' ? path : cur;
    }
  },[lang]);

  return (
    <LocaleContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(){
  const ctx = useContext(LocaleContext);
  if(!ctx) throw new Error('useLocale must be used within LanguageProvider');
  return ctx;
}
