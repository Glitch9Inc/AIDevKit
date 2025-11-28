import { motion } from "framer-motion";
import SectionTitle from "../components/section-title";
import { useLanguage } from "../contexts/LanguageContext";

const stats = [
    { number: "10+", labelKey: "stats.providers", gradient: "from-blue-400 to-cyan-400" },
    { number: "1", labelKey: "stats.api", gradient: "from-purple-400 to-blue-400" },
    { number: "3", labelKey: "stats.lines", gradient: "from-pink-400 to-orange-400" },
    { number: "1min", labelKey: "stats.integration", gradient: "from-green-400 to-cyan-400" },
    { number: "24/7", labelKey: "stats.support", gradient: "from-indigo-400 to-purple-400" }
];

export default function TrustedCompanies() {
    const { t } = useLanguage();

    return (
        <section className="flex flex-col items-center py-20">
            <SectionTitle
                title={t('stats.title')}
                description={t('stats.description')}
            />
            <motion.div
                className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 max-w-6xl w-full px-6 mt-16"
                initial={{ y: 150, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center text-center"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <h3 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${stat.gradient} text-transparent bg-clip-text mb-3`}>
                            {stat.number}
                        </h3>
                        <p className="text-slate-400 text-sm md:text-base font-medium">
                            {t(stat.labelKey)}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}