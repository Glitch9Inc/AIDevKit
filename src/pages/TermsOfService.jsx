import { motion } from "framer-motion";

export default function TermsOfService() {
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
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <p className="text-slate-400 mb-8">Last updated: November 28, 2025</p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                            <p className="text-slate-300">
                                By purchasing, downloading, or using AI Dev Kit, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not use our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. License and Usage</h2>
                            <p className="text-slate-300 mb-4">
                                AI Dev Kit is licensed under Unity Asset Store Standard License terms. You may:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                                <li>Use AI Dev Kit in any number of Unity projects</li>
                                <li>Modify the code for your specific needs</li>
                                <li>Distribute games/applications built with AI Dev Kit</li>
                                <li>Use it for both personal and commercial projects</li>
                            </ul>
                            <p className="text-slate-300 mt-4">
                                You may not redistribute or resell AI Dev Kit as a standalone asset.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. AI Provider Services</h2>
                            <p className="text-slate-300">
                                AI Dev Kit integrates with third-party AI services (OpenAI, Anthropic, Google, etc.). Your use of these services through AI Dev Kit is subject to their respective terms of service and usage policies. You are responsible for:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-4">
                                <li>Obtaining necessary API keys and accounts</li>
                                <li>Complying with each provider's terms and usage limits</li>
                                <li>Managing costs associated with API usage</li>
                                <li>Ensuring your content complies with provider guidelines</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Custom Plugin Development</h2>
                            <p className="text-slate-300">
                                When requesting custom plugin development:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-4">
                                <li>Pricing and timeline will be discussed individually</li>
                                <li>Payment terms will be agreed upon before work begins</li>
                                <li>Intellectual property rights will be specified in separate agreements</li>
                                <li>Support terms may differ from standard AI Dev Kit support</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">5. Support and Updates</h2>
                            <p className="text-slate-300">
                                We provide support and updates for AI Dev Kit on a best-effort basis. Support includes:
                            </p>
                            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4 mt-4">
                                <li>Bug fixes and compatibility updates</li>
                                <li>Documentation and examples</li>
                                <li>Community support through Discord</li>
                                <li>Email support for technical issues</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                            <p className="text-slate-300">
                                AI Dev Kit is provided "as is" without warranty of any kind. Glitch9 Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">7. Refund Policy</h2>
                            <p className="text-slate-300">
                                Refunds are handled through Unity Asset Store's standard refund policy. For custom development work, refund terms will be specified in individual project agreements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
                            <p className="text-slate-300">
                                We reserve the right to modify these terms at any time. We will notify users of any material changes through the Asset Store, our website, or Discord community.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
                            <p className="text-slate-300">
                                For questions about these Terms of Service, please contact us at:
                            </p>
                            <p className="text-slate-300 mt-2">
                                Email: munchkin@glitch9.dev<br />
                                Discord: Join our community server<br />
                                Unity Asset Store: AI Dev Kit Pro
                            </p>
                        </section>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}