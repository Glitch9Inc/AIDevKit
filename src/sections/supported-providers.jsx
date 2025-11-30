import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

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
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl w-full px-6 mt-16"
                initial={{ y: 150, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 70 }}
            >
                {allProviders.map((provider, index) => (
                    <motion.div
                        key={provider}
                        className="flex items-center justify-center p-4 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800/50 hover:border-pink-500 transition duration-300"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        <span className="text-center font-medium text-slate-300">
                            {provider}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
