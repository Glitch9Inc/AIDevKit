import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();
    return (
        <motion.footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-400 mt-40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
                <div className="lg:col-span-3">
                    <a href="https://assetstore.unity.com/packages/tools/generative-ai/ai-dev-kit-pro-281225" target="_blank" rel="noopener noreferrer">
                        <img className="h-9 w-auto" src="/assets/logo.png" width={138} height={36} alt="logo" />
                    </a>
                    <p className="text-sm/7 mt-6">AI Dev Kit provides a unified, fluent API for all major AI services in Unity. Build AI-powered features without the chaos of managing multiple providers, SDKs, and rate limits.</p>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col text-sm space-y-2.5">
                        <h2 className="font-semibold mb-5 text-white">Addons</h2>
                        <a className="hover:text-slate-500 transition" href="https://assetstore.unity.com/packages/slug/283657" target="_blank" rel="noopener noreferrer">AI DevKit Localization</a>
                        <span className="text-slate-600 cursor-not-allowed">AI DevKit PixelArt (Coming Soon)</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col text-sm space-y-2.5">
                        <h2 className="font-semibold mb-5 text-white">Connect</h2>
                        <a className="hover:text-slate-500 transition" href="https://github.com/Glitch9Inc" target="_blank" rel="noopener noreferrer">Github</a>
                        <a className="hover:text-slate-500 transition" href="https://discord.gg/hgajxPpJYf" target="_blank" rel="noopener noreferrer">Discord</a>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col text-sm space-y-2.5">
                        <h2 className="font-semibold mb-5 text-white">Company</h2>
                        <a className="hover:text-slate-500 transition" href="https://glitch9.dev" target="_blank" rel="noopener noreferrer">Glitch9</a>
                        <a className="hover:text-slate-500 transition" href="#custom-plugin">Contact us</a>
                        <Link className="hover:text-slate-500 transition" to="/privacy-policy">Privacy Policy</Link>
                        <Link className="hover:text-slate-500 transition" to="/terms-of-service">Terms of Service</Link>
                    </div>
                </div>
            </div>
            <p className="py-4 text-center border-t mt-6 border-slate-700">
                Copyright 2025 © Glitch9 Inc. All Right Reserved.
            </p>
        </motion.footer>
    );
};