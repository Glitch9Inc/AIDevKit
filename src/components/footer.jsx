import { motion } from "framer-motion";

export default function Footer() {
    return (
        <motion.footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-400 mt-40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-14">
                <div>
                    <a href="https://assetstore.unity.com/packages/tools/generative-ai/ai-dev-kit-pro-281225" target="_blank" rel="noopener noreferrer">
                        <img className="h-9 w-auto" src="/assets/logo.png" width={138} height={36} alt="logo" />
                    </a>
                    <p className="text-sm/7 mt-6">AI Dev Kit provides a unified, fluent API for all major AI services in Unity. Build AI-powered features without the chaos of managing multiple providers, SDKs, and rate limits.</p>
                </div>
                <div className="flex flex-col lg:items-center lg:justify-center">
                    <div className="flex flex-col text-sm space-y-2.5">
                        <h2 className="font-semibold mb-5 text-white">Company</h2>
                        <a className="hover:text-slate-500 transition" href="#">About us</a>
                        <a className="hover:text-slate-500 transition" href="#">Careers<span className="text-xs text-white bg-indigo-600 rounded-md ml-2 px-2 py-1">We’re hiring!</span></a>
                        <a className="hover:text-slate-500 transition" href="#">Contact us</a>
                        <a className="hover:text-slate-500 transition" href="#">Privacy policy</a>
                    </div>
                </div>
            </div>
            <p className="py-4 text-center border-t mt-6 border-slate-700">
                Copyright 2025 © Glitch9 Inc. All Right Reserved.
            </p>
        </motion.footer>
    );
};