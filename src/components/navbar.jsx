import { useState } from "react";
import { MenuIcon, XIcon, ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("English");

    const languages = [
        { code: "en", label: "English" },
        { code: "ko", label: "한국어" },
        { code: "ja", label: "日本語" },
        { code: "zh", label: "中文" },
        { code: "es", label: "Español" },
    ];

    const navlinks = [
        {
            href: "#features",
            text: "Features",
        },
        {
            href: "#pricing",
            text: "Pricing",
        },
        {
            href: "#custom-plugin",
            text: "Custom Plugin",
        },
        {
            href: "https://glitch9.gitbook.io/ai-dev-kit/",
            text: "Docs",
            external: true,
        },
        {
            href: "https://glitch9inc.github.io/DocFx.AIDevKit/api/Glitch9.AIDevKit.html",
            text: "API Reference",
            external: true,
        },
    ];
    return (
        <>
            <motion.nav className="sticky top-0 z-50 flex items-center justify-between w-full h-18 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link to="#">
                    <img className="h-9 w-auto" src="/assets/logo.png" width={138} height={36} alt="logo" />
                </Link>

                <div className="hidden lg:flex items-center gap-8 transition duration-500">
                    {navlinks.map((link) => (
                        link.external ? (
                            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition">
                                {link.text}
                            </a>
                        ) : (
                            <a key={link.href} href={link.href} className="hover:text-slate-300 transition">
                                {link.text}
                            </a>
                        )
                    ))}
                </div>

                <div className="hidden lg:block relative">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md active:scale-95 flex items-center gap-2 w-32 justify-between"
                    >
                        {selectedLang}
                        <ChevronDown className={`size-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isLangOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-md shadow-lg overflow-hidden">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setSelectedLang(lang.label);
                                        setIsLangOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-slate-700 transition flex items-center justify-between ${selectedLang === lang.label ? 'bg-slate-700/50' : ''
                                        }`}
                                >
                                    {lang.label}
                                    {selectedLang === lang.label && (
                                        <Check className="size-4 text-blue-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={() => setIsMenuOpen(true)} className="lg:hidden active:scale-90 transition">
                    <MenuIcon className="size-6.5" />
                </button>
            </motion.nav>
            <div className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 lg:hidden transition-transform duration-400 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {navlinks.map((link) => (
                    link.external ? (
                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                            {link.text}
                        </a>
                    ) : (
                        <Link key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)}>
                            {link.text}
                        </Link>
                    )
                ))}
                <button onClick={() => setIsMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex">
                    <XIcon />
                </button>
            </div>
        </>
    );
}