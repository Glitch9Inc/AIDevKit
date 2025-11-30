import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function OurTestimonials() {
    const { t } = useLanguage();
    const testimonials = [
        { quoteKey: "testimonials.reviews.0", name: "Skermunkel", roleKey: "testimonials.roles.unityDev", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=skermunkel", },
        { quoteKey: "testimonials.reviews.1", name: "RazParker", roleKey: "testimonials.roles.vrDev", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=razparker", },
        { quoteKey: "testimonials.reviews.2", name: "Mark_01", roleKey: "testimonials.roles.gameDev", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mark01", },
        { quoteKey: "testimonials.reviews.3", name: "toony_seo", roleKey: "testimonials.roles.appDev", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=toonyseo", },
        { quoteKey: "testimonials.reviews.4", name: "FaberVi", roleKey: "testimonials.roles.indieDev", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=fabervi", },
        { quoteKey: "testimonials.reviews.5", name: "zdjiangfdu", roleKey: "testimonials.roles.engineer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=zdjiangfdu", },
    ];

    return (
        <section className="flex flex-col items-center py-20" id="testimonials">
            <SectionTitle title={t('testimonials.title')} description={t('testimonials.description')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-18 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <motion.div key={testimonial.name} className="group border border-slate-800 p-6 rounded-xl flex flex-col justify-between h-full"
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <p className="text-slate-100 text-base flex-grow">{t(testimonial.quoteKey)}</p>
                        <div className="flex items-center gap-3 mt-8 group-hover:-translate-y-1 duration-300">
                            <img className="size-10 rounded-full" src={testimonial.image} alt="user image" />
                            <div>
                                <h2 className="text-gray-200 font-medium">
                                    {testimonial.name}
                                </h2>
                                <p className="text-indigo-500">{t(testimonial.roleKey)}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}