import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Pricing() {
    const { t, currentLanguage } = useLanguage();

    const plans = [
        {
            name: t('pricing.studio.name'),
            price: t('pricing.studio.price'),
            description: t('pricing.studio.description'),
            features: currentLanguage === 'en' ? [
                "Editor Tools & Generators",
                "AI Chat Assistant with voice",
                "Text, Shader, Image, Audio generators",
                "AI Model & Voice Library",
                "Project-aware suggestions",
                "Community support"
            ] : t('pricing.studio.features'),
            providers: t('providers.studio'),
            image: "/assets/package-studio.png",
            buttonText: t('pricing.studio.button'),
            buttonStyle: "border-2 border-slate-400 hover:bg-white/10",
            link: "https://assetstore.unity.com/packages/tools/generative-ai/ai-dev-kit-studio-327138"
        },
        {
            name: t('pricing.pro.name'),
            price: t('pricing.pro.price'),
            description: t('pricing.pro.description'),
            features: currentLanguage === 'en' ? [
                "Everything in Studio",
                "Advanced AI Agent Integration",
                "Local server support with Ollama",
                "Custom Inspector components",
                "Memory & Function Calling",
                "Priority support"
            ] : t('pricing.pro.features'),
            providers: [...t('providers.studio'), ...t('providers.pro')],
            image: "/assets/package-pro.png",
            buttonText: t('pricing.pro.button'),
            buttonStyle: "bg-indigo-600 hover:bg-indigo-700 text-white",
            popular: true,
            popularText: t('pricing.pro.popular'),
            link: "https://assetstore.unity.com/packages/tools/generative-ai/ai-dev-kit-pro-281225"
        },
        {
            name: t('pricing.researchLab.name'),
            price: t('pricing.researchLab.price'),
            description: t('pricing.researchLab.description'),
            features: currentLanguage === 'en' ? [
                "Everything in Pro",
                "All AI Providers (10+)",
                "Enterprise-grade workflows",
                "Early access to experimental features",
                "Realtime updates via Discord",
                "Direct developer access"
            ] : t('pricing.researchLab.features'),
            providers: [...t('providers.studio'), ...t('providers.pro'), ...t('providers.researchLab'), ...t('providers.addon')],
            image: "/assets/package-research.png",
            buttonText: t('pricing.researchLab.button'),
            buttonStyle: "border-2 border-slate-400 hover:bg-white/10",
            link: "https://assetstore.unity.com/packages/tools/generative-ai/ai-dev-kit-research-lab-327128"
        }
    ];

    return (
        <section id="pricing" className="flex flex-col items-center py-20">
            <SectionTitle
                title={t('pricing.title')}
                description={t('pricing.description')}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-7xl w-full px-4">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        className={`relative flex flex-col p-8 rounded-2xl border ${plan.popular
                            ? 'border-indigo-500 bg-gradient-to-br from-indigo-900/20 to-purple-900/20'
                            : 'border-slate-700 bg-slate-900/50'
                            }`}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                                {plan.popularText}
                            </div>
                        )}

                        <div className="w-full h-48 mb-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                            <img
                                src={plan.image}
                                alt={plan.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="mt-4 mb-2">
                            <span className="text-5xl font-bold">{plan.price}</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-8">{plan.description}</p>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <Check className="size-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-300">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mb-6 pt-6 border-t border-slate-700">
                            <h4 className="text-sm font-semibold text-slate-400 mb-3">Supported Providers</h4>
                            <div className="flex flex-wrap gap-2">
                                {plan.providers.map((provider) => (
                                    <span
                                        key={provider}
                                        className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800/50 text-slate-300 border border-slate-700"
                                    >
                                        {provider}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <a
                            href={plan.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full py-3 rounded-lg font-semibold transition active:scale-95 text-center block ${plan.buttonStyle}`}
                        >
                            {plan.buttonText}
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
