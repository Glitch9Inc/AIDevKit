import { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const getInitialLanguage = () => {
        // Check localStorage first
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) return savedLanguage;

        // Detect browser language
        const browserLang = navigator.language.toLowerCase();

        // Map browser language to supported languages
        if (browserLang.startsWith('ko')) return 'ko';
        if (browserLang.startsWith('ja')) return 'ja';
        if (browserLang.startsWith('zh')) return 'zh';
        if (browserLang.startsWith('es')) return 'es';

        return 'en'; // default
    };

    const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage());

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[currentLanguage];

        for (const k of keys) {
            value = value?.[k];
        }

        return value !== undefined ? value : '';
    };

    const changeLanguage = (langCode) => {
        setCurrentLanguage(langCode);
        localStorage.setItem('language', langCode);
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};