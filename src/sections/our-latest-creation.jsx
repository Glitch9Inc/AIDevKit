import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/section-title";
import { useLanguage } from "../contexts/LanguageContext";

export default function OurLatestCreation() {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [className, setClassName] = useState("");

    const sectionData = [
        {
            title: t('features.fluentApi.title'),
            description: t('features.fluentApi.description'),
            image: "/assets/fluent-api.png",
            align: "object-center",
        },
        {
            title: t('features.aiAgent.title'),
            description: t('features.aiAgent.description'),
            image: "/assets/ai-agent.png",
            align: "object-center",
        },
        {
            title: t('features.editorTools.title'),
            description: t('features.editorTools.description'),
            image: "/assets/editor-tools.png",
            align: "object-center",
        },
    ];

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % sectionData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isHovered, sectionData.length]);

    return (
        <section className="flex flex-col items-center" id="features">
            <SectionTitle
                title={t('features.title')}
                description={t('features.description')}
            />

            <div className="flex items-center gap-4 h-100 w-full max-w-5xl mt-18 mx-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
                {sectionData.map((data, index) => (
                    <motion.div key={data.title} className={`relative group flex-grow h-[400px] rounded-xl overflow-hidden ${isHovered && className ? "hover:w-full w-56" : index === activeIndex ? "w-full" : "w-56"} ${className} ${!className ? "pointer-events-none" : ""}`}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        onAnimationComplete={() => setClassName("transition-all duration-500")}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <img className={`h-full w-full object-cover ${data.align}`} src={data.image} alt={data.title} />
                        <div className={`absolute inset-0 transition-all duration-500 
                            ${isHovered && className ? "bg-black/40 group-hover:bg-gradient-to-t group-hover:from-black/80 group-hover:via-black/30 group-hover:to-transparent"
                                : index === activeIndex ? "bg-gradient-to-t from-black/80 via-black/30 to-transparent" : "bg-black/60"}`} />
                        <div className={`absolute inset-0 flex flex-col justify-end p-10 text-white transition-all duration-300 ${isHovered && className ? "opacity-0 group-hover:opacity-100" : index === activeIndex ? "opacity-100" : "opacity-0"}`}>
                            <h1 className="text-3xl font-semibold">{data.title}</h1>
                            <p className="text-sm mt-2">{data.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
