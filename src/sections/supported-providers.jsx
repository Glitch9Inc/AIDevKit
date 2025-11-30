import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const providerIcons = {
    "OpenAI": "/icons/api-open-ai.png",
    "Google Gemini": "/icons/api-google-gemini.png",
    "Anthropic Claude": "/icons/api-anthropic.png",
    "Microsoft Azure": "/icons/api-azure.png",
    "Azure OpenAI": "/icons/api-azure.png",
    "GroqCloud": "/icons/api-groq-cloud.png",
    "Perplexity": "/icons/api-perplexity.png",
    "xAI Grok": "/icons/api-xai.png",
    "Ollama": "/icons/api-ollama.png",
    "ElevenLabs": "/icons/api-eleven-labs.png",
    "OpenRouter": "/icons/api-open-router.png",
    "DeepSeek": "/icons/api-deepseek.png",
    "PixelLab": "/icons/api-pixel-lab.png"
};

export default function SupportedProviders() {
    const { t } = useLanguage();

    const providers = {
        studio: t('providers.studio'),
        pro: t('providers.pro'),
        researchLab: t('providers.researchLab'),
        addon: t('providers.addon')
    };

    // Combine and deduplicate all providers
    const allProviders = Array.from(new Set([
        ...(typeof providers.studio === 'string' ? [] : providers.studio || []),
        ...(typeof providers.pro === 'string' ? [] : providers.pro || []),
        ...(typeof providers.researchLab === 'string' ? [] : providers.researchLab || []),
        ...(typeof providers.addon === 'string' ? [] : providers.addon || [])
    ]));

    return (
        <section className="flex flex-col items-center py-20">
            <SectionTitle
                title={t('providers.title')}
                description={t('providers.description')}
            />

            <motion.div
                className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl w-full px-6 mt-16"
                initial={{ y: 150, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70 }}
            >
                {allProviders.map((provider, index) => {
                    const iconPath = providerIcons[provider];
                    return (
                        <motion.div
                            key={provider}
                            className="flex items-center gap-2 group cursor-default"
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, type: "spring", stiffness: 320, damping: 70 }}
                        >
                            {iconPath && (
                                <img
                                    src={iconPath}
                                    alt={provider}
                                    className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
                                />
                            )}
                            <span className="text-slate-300 group-hover:text-white font-medium transition-colors">
                                {provider}
                            </span>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
