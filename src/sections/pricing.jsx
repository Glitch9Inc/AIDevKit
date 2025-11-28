import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for trying out AI Dev Kit",
            features: [
                "OpenAI GPT-3.5 Integration",
                "5,000 API calls/month",
                "Basic documentation",
                "Community support",
                "Single project license"
            ],
            buttonText: "Get Started",
            buttonStyle: "border-2 border-slate-400 hover:bg-white/10"
        },
        {
            name: "Pro",
            price: "$49",
            description: "For professional developers",
            features: [
                "All Free features",
                "OpenAI GPT-4 & Claude 3.5",
                "Unlimited API calls",
                "Priority support",
                "Up to 5 projects",
                "Advanced editor tools",
                "Custom model fine-tuning"
            ],
            buttonText: "Go Pro",
            buttonStyle: "bg-indigo-600 hover:bg-indigo-700 text-white",
            popular: true
        },
        {
            name: "Enterprise",
            price: "$199",
            description: "For teams and organizations",
            features: [
                "All Pro features",
                "All AI models (GPT-4, Claude, Gemini)",
                "Unlimited projects",
                "Dedicated support",
                "Custom integrations",
                "On-premise deployment",
                "Team collaboration tools",
                "SLA guarantee"
            ],
            buttonText: "Contact Sales",
            buttonStyle: "border-2 border-slate-400 hover:bg-white/10"
        }
    ];

    return (
        <section id="pricing" className="flex flex-col items-center py-20">
            <SectionTitle
                title="Simple, Transparent Pricing"
                description="Choose the perfect plan for your AI development needs. All plans include lifetime updates."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-7xl w-full px-4">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        className={`relative flex flex-col p-8 rounded-2xl border ${plan.popular
                            ? 'border-indigo-500 bg-gradient-to-br from-indigo-900/20 to-purple-900/20'
                            : 'border-slate-700 bg-slate-900/50'
                            }`}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 320, damping: 70 }}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                                Most Popular
                            </div>
                        )}

                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="mt-4 mb-2">
                            <span className="text-5xl font-bold">{plan.price}</span>
                            <span className="text-slate-400 ml-2">/month</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-8">{plan.description}</p>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <Check className="size-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-300">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-3 rounded-lg font-semibold transition active:scale-95 ${plan.buttonStyle}`}>
                            {plan.buttonText}
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
