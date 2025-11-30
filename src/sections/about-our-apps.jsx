import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function AboutOurApps() {
    const { t } = useLanguage();

    const sectionData = [
        {
            title: t('about.crossPlatform.title'),
            description: t('about.crossPlatform.description'),
            emoji: "🌐",
            className: "py-10 md:py-0 md:px-10"
        },
        {
            title: t('about.sourceIncluded.title'),
            description: t('about.sourceIncluded.description'),
            emoji: "💻",
            className: "py-10 md:py-0 md:px-10"
        },
        {
            title: t('about.commercialUse.title'),
            description: t('about.commercialUse.description'),
            emoji: "💼",
            className: "py-10 md:py-0 md:px-10"
        },
        {
            title: t('about.noLockIn.title'),
            description: t('about.noLockIn.description'),
            emoji: "💎",
            className: "py-10 md:py-0 md:px-10"
        },
        {
            title: t('about.productionReady.title'),
            description: t('about.productionReady.description'),
            emoji: "💬",
            className: "py-10 md:py-0 md:px-10"
        },
        {
            title: t('about.unityFirst.title'),
            description: t('about.unityFirst.description'),
            emoji: "♾️",
            className: "py-10 md:py-0 md:px-10"
        },
    ];
    return (
        <section className="flex flex-col items-center" id="about">
            <SectionTitle
                title={t('about.title')}
                description={t('about.description')}
            />
            <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 px-8 md:px-0 mt-18">
                {sectionData.map((data, index) => (
                    <motion.div key={data.title} className={data.className}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <div className="text-4xl mb-4">{data.emoji}</div>
                        <div className="space-y-2">
                            <h3 className="text-base font-medium text-slate-200">{data.title}</h3>
                            <p className="text-sm text-slate-400">{data.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}