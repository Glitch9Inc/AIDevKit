import SectionTitle from "../components/section-title";
import { ArrowUpRight, SendIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { useLanguage } from "../contexts/LanguageContext";

export default function GetInTouch() {
    const { t } = useLanguage();

    const providers = [
        { value: "User can choose from your supported providers", label: t('contact.form.userCanChoose') },
        { value: "OpenAI", label: "OpenAI" },
        { value: "Google Gemini", label: "Google Gemini" },
        { value: "Anthropic Claude", label: "Anthropic Claude" },
        { value: "Perplexity", label: "Perplexity" },
        { value: "xAI Grok", label: "xAI Grok" },
        { value: "Microsoft Azure", label: "Microsoft Azure" },
        { value: "GroqCloud", label: "GroqCloud" },
        { value: "OpenRouter", label: "OpenRouter" },
        { value: "DeepSeek", label: "DeepSeek" },
        { value: "Ollama", label: "Ollama" },
        { value: "ElevenLabs", label: "ElevenLabs" },
        { value: "Cohere", label: "Cohere" },
        { value: "Mistral", label: "Mistral" },
        { value: "Amazon Bedrock", label: "Amazon Bedrock" },
        { value: "Something not on this list", label: t('contact.form.notOnList') }
    ];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;

        if (!selectedProvider) {
            alert('⚠️ Please select a preferred provider');
            setIsSubmitting(false);
            return;
        }

        const templateParams = {
            from_name: form.name.value,
            from_email: form.email.value,
            reply_to: form.email.value,
            customer_name: form.name.value,
            customer_email: form.email.value,
            provider: selectedProvider.value,
            message: form.message.value,
            to_email: 'munchkin@glitch9.dev',
            to_name: 'Glitch9 Team'
        };

        try {
            await emailjs.send(
                'service_dq9mkcr',
                'template_c091emu',
                templateParams,
                'Aw8z61Fy19-mAuUUv'
            );
            alert('✅ Request sent successfully! We\'ll get back to you soon.');
            form.reset();
            setSelectedProvider(null);
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Failed to send request. Please email us directly at munchkin@glitch9.dev');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex flex-col items-center" id="custom-plugin">
            <SectionTitle title={t('contact.title')} description={t('contact.description')} />
            <form onSubmit={handleSubmit} className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-3xl mx-auto text-slate-400 mt-16 w-full' >
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    <label className='font-medium text-slate-200'>{t('contact.form.name')}</label>
                    <input name='name' type="text" placeholder={t('contact.form.namePlaceholder')} required className='w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600' />
                </motion.div>

                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    <label className='font-medium text-slate-200'>{t('contact.form.email')}</label>
                    <input name='email' type="email" placeholder={t('contact.form.emailPlaceholder')} required className='w-full mt-2 p-3 outline-none border border-slate-700 rounded-lg focus-within:ring-1 transition focus:ring-indigo-600' />
                </motion.div>

                <motion.div className='sm:col-span-2 relative'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                    ref={dropdownRef}
                >
                    <label className='font-medium text-slate-200'>{t('contact.form.provider')}</label>
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className='w-full mt-2 p-3 border border-slate-700 rounded-lg bg-slate-900 text-slate-300 cursor-pointer hover:border-slate-600 transition flex items-center justify-between'
                    >
                        <span className={selectedProvider ? 'text-slate-200' : 'text-slate-500'}>
                            {selectedProvider ? selectedProvider.label : `✨ ${t('contact.form.selectProvider')}`}
                        </span>
                        <ChevronDown className={`size-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className='absolute z-10 w-full mt-2 border border-slate-600 rounded-xl bg-slate-900 shadow-2xl overflow-hidden'
                            >
                                <div
                                    className='max-h-80 overflow-y-auto'
                                    onWheel={(e) => e.stopPropagation()}
                                >
                                    {providers.map((provider, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setSelectedProvider(provider);
                                                setIsOpen(false);
                                            }}
                                            className='p-3 hover:bg-slate-800 cursor-pointer text-slate-200 transition'
                                        >
                                            <span>{provider.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div className='sm:col-span-2'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    <label className='font-medium text-slate-200'>{t('contact.form.message')}</label>
                    <textarea name='message' rows={8} placeholder={t('contact.form.messagePlaceholder')} required className='resize-none w-full mt-2 p-3 outline-none rounded-lg focus-within:ring-1 transition focus:ring-indigo-600 border border-slate-700' />
                </motion.div>

                <motion.button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-max flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full transition'
                    initial={{ y: 150, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
                >
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                    <ArrowUpRight className="size-4.5" />
                </motion.button>
            </form>
        </section>
    );
}