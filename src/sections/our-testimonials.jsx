import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function OurTestimonials() {
    const { t } = useLanguage();
    const testimonials = [
        { quote: "The very best AI model family consolidation package with Agent support I have seen yet on the Asset Store! Only one that has proper Agent support, makes it super easy to extend and supports pretty much every model and family you can think of.", name: "Skermunkel", role: "Unity Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=skermunkel", },
        { quote: "Simply the most complete OpenAI solution. This suite helped me make a speech-only avatar in Unity, it supports the new Assistant API, Speech to Text and Text to Speech. I wish I could give 10 stars!", name: "RazParker", role: "VR/AR Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=razparker", },
        { quote: "Very good!! AI Dev Kit Pro is significantly more powerful than typical chatbot packages—you'll get a full-featured voice assistant, text-to-speech, image generation, sound effects toolkit, and more. An amazing tool with many updates!", name: "Mark_01", role: "Game Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mark01", },
        { quote: "This is exactly the AI asset I was looking for! I'm building an app with AI conversation features and this has all the functionality I needed. Everything works perfectly for my project.", name: "toony_seo", role: "App Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=toonyseo", },
        { quote: "It's not often you find plugin developers so helpful and above all active in bug resolution and assistance. The developer answered my email in an hour! Support is 10/10.", name: "FaberVi", role: "Indie Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=fabervi", },
        { quote: "Best tool for OpenAI integration. It contains many demos for beginners and the developer is super responsive, helpful and constantly upgrading the package. Very strong recommend!", name: "zdjiangfdu", role: "Software Engineer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=zdjiangfdu", },
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
                        <p className="text-slate-100 text-base flex-grow">{testimonial.quote}</p>
                        <div className="flex items-center gap-3 mt-8 group-hover:-translate-y-1 duration-300">
                            <img className="size-10 rounded-full" src={testimonial.image} alt="user image" />
                            <div>
                                <h2 className="text-gray-200 font-medium">
                                    {testimonial.name}
                                </h2>
                                <p className="text-indigo-500">{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}