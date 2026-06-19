import { motion } from "framer-motion";
import SectionTitle from "../components/section-title";
import { useLanguage } from "../contexts/LanguageContext";

export default function AddonsSection() {
    const { t } = useLanguage();

    const addons = [
        {
            key: "aiSheets",
            href: "https://assetstore.unity.com/packages/slug/283657",
            image: "/assets/package-sheets.png"
        },
        {
            key: "aiImageStudio",
            image: "/assets/package-image-studio.png"
        },
        {
            key: "aiPixelStudio",
            image: "/assets/package-pixel-studio.png"
        }
    ];

    return (
        <section id="addons" className="flex flex-col items-center py-20">
            <SectionTitle
                title={t('addonsSection.title')}
                description={t('addonsSection.description')}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16 max-w-6xl w-full">
                {addons.map((addon, index) => {
                    const prefix = `addonsSection.${addon.key}`;
                    const providers = t(`${prefix}.providers`);
                    const providerList = Array.isArray(providers) ? providers : [];

                    return (
                        <motion.div
                            key={addon.key}
                            className="flex flex-col rounded-2xl border border-slate-700 bg-slate-900/50 p-7"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, type: "spring", stiffness: 320, damping: 70 }}
                        >
                            <div className="mb-6 h-52 overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900">
                                <img
                                    src={addon.image}
                                    alt={t(`${prefix}.name`)}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <h3 className="text-2xl font-bold text-white">{t(`${prefix}.name`)}</h3>
                                <span className="rounded-full border border-slate-600 px-3 py-1 text-xs font-semibold text-slate-300">
                                    {t(`${prefix}.status`)}
                                </span>
                            </div>

                            <p className="mt-3 text-sm text-slate-400">
                                {t('addonsSection.legacyLabel')} {t(`${prefix}.legacy`)}
                            </p>

                            <p className="mt-6 flex-grow text-sm leading-7 text-slate-300">
                                {t(`${prefix}.description`)}
                            </p>

                            {providerList.length > 0 && (
                                <div className="mt-6 border-t border-slate-700 pt-6">
                                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        {t('addonsSection.providersLabel')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {providerList.map((provider) => (
                                            <span
                                                key={provider}
                                                className="rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-xs font-medium text-slate-300"
                                            >
                                                {provider}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {addon.href && (
                                <a
                                    href={addon.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex w-max rounded-full border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                                >
                                    {t('addonsSection.viewAddon')}
                                </a>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
