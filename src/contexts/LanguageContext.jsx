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
    const [currentLanguage, setCurrentLanguage] = useState('en');

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[currentLanguage];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    const changeLanguage = (langCode) => {
        setCurrentLanguage(langCode);
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};