import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TiltedImage from "../components/tilt-image";

export default function HeroSection() {
    return (
        <section className="flex flex-col items-center -mt-18 relative px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="absolute inset-0 -z-10 overflow-hidden w-screen h-full left-1/2 -translate-x-1/2">
                <div className="absolute -top-20 left-10 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-[120px]"></div>
                <div className="absolute top-40 -right-32 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[130px]"></div>
                <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[100px]"></div>
            </div>
            <motion.a
                href="https://discord.gg/hgajxPpJYf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-48 gap-2 border border-slate-600 text-gray-50 rounded-full px-4 py-2 hover:border-slate-500 transition"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <div className="size-2.5 bg-[#5865F2] rounded-full animate-pulse"></div>
                <span>Ask questions on Discord now</span>
            </motion.a>
            <motion.h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-2xl"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
            >
                Multi-Provider AI Development Kit
            </motion.h1>
            <motion.p className="text-center text-base max-w-lg mt-6 text-slate-400"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                Integrate latest AI models to your projects in 5 minutes, with a fluent API, editor tools, and cross-platform runtime support.
            </motion.p>
            <motion.div className="flex flex-col items-center gap-4 mt-8"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
                <div className="flex items-center gap-4 w-full max-w-2xl">
                    <div className="flex-1 h-[3px] bg-gradient-to-r from-transparent to-slate-400/50"></div>
                    <p className="text-slate-400 text-sm whitespace-nowrap">Available on Unity Asset Store</p>
                    <div className="flex-1 h-[3px] bg-gradient-to-l from-transparent to-slate-400/50"></div>
                </div>
                <a href="https://assetstore.unity.com/packages/tools/generative-ai/ai-dev-kit-pro-281225" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-white/10 border-2 border-slate-400 hover:border-slate-300 transition active:scale-95 rounded-xl px-7 h-[3.6rem] text-base scale-90">
                    <img src="/assets/unity_icon.png" alt="Unity" className="w-5 h-5" />
                    Get on Asset Store
                    <ArrowRight className="size-4" />
                </a>
            </motion.div>
            <TiltedImage />
        </section>
    );
}