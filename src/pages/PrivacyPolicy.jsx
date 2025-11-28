import { motion } from "framer-motion";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* Navigation */}
            <nav className="px-6 md:px-16 lg:px-24 xl:px-32 py-6 border-b border-slate-800">
                <a href="/" className="flex items-center">
                    <img className="h-8 w-auto" src="/assets/logo.png" alt="AI Dev Kit" />
                </a>
            </nav>

            {/* Content */}
            <motion.div
                className="px-6 md:px-16 lg:px-24 xl:px-32 py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <p className="text-slate-400 mb-8">Last updated: November 28, 2025</p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                            <p className="text-slate-300 mb-4">
                                At Glitch9 Inc., we collect information you provide directly to us when you:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                                <li>Purchase or download AI Dev Kit from the Unity Asset Store</li>
                                <li>Contact us for support or custom plugin development</li>
                                <li>Subscribe to our newsletter or updates</li>
                                <li>Join our Discord community</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                            <p className="text-slate-300 mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process transactions and send related information</li>
                                <li>Send technical updates, security alerts, and support messages</li>
                                <li>Respond to your comments, questions, and requests</li>
                                <li>Develop new products and features</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                            <p className="text-slate-300">
                                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy. We may share your information with:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-4">
                                <li>Service providers who assist us in operating our business</li>
                                <li>Unity Technologies for Asset Store transactions</li>
                                <li>Legal authorities when required by law</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                            <p className="text-slate-300">
                                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">5. AI Data Processing</h2>
                            <p className="text-slate-300">
                                AI Dev Kit processes data through various AI providers (OpenAI, Anthropic, etc.). When you use AI features, your data may be transmitted to these services according to their respective privacy policies. We recommend reviewing each provider's terms before use.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                            <p className="text-slate-300">
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <p className="text-slate-300 mt-2">
                                Email: munchkin@glitch9.dev<br />
                                Discord: Join our community server
                            </p>
                        </section>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}