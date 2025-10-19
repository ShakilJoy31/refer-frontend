import { Tab } from "@/types/privacyPolicy";

export const tabs: Tab[] = [
    {
        id: "privacy",
        title: "Policy & Privacy",
        content: (
            <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy Agreement</h2>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    At <strong className="text-green-600">Orgado</strong>, we value your privacy and are committed to protecting your personal
                    information. This comprehensive Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you
                    interact with our platform, services, and products.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">1. Information We Collect</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    We collect various types of information to provide and improve our services to you:
                </p>

                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Personal Information</h4>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li><strong>Account Information:</strong> Full name, email address, phone number, date of birth, and account credentials</li>
                    <li><strong>Contact Details:</strong> Shipping address, billing address, and contact preferences</li>
                    <li><strong>Payment Information:</strong> Credit card details, bank account information, and payment history</li>
                    <li><strong>Order History:</strong> Purchase records, product preferences, and transaction details</li>
                    <li><strong>Communication Data:</strong> Customer service interactions, feedback, and survey responses</li>
                </ul>

                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Automatically Collected Information</h4>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li><strong>Device Information:</strong> IP address, browser type, device type, operating system, and mobile network information</li>
                    <li><strong>Usage Data:</strong> Pages visited, time spent on pages, clickstream data, and navigation patterns</li>
                    <li><strong>Location Data:</strong> General geographic location based on IP address or precise location with your consent</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> Session cookies, persistent cookies, web beacons, and similar technologies</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">2. How We Use Your Information</h3>
                <ol className="list-decimal list-inside text-base text-gray-700 dark:text-gray-300 space-y-3 mb-6">
                    <li><strong>Service Delivery:</strong> Process orders, manage accounts, and provide customer support</li>
                    <li><strong>Personalization:</strong> Customize product recommendations, content, and shopping experience</li>
                    <li><strong>Communication:</strong> Send order confirmations, shipping updates, and promotional offers</li>
                    <li><strong>Analytics:</strong> Improve website functionality, optimize user experience, and conduct market research</li>
                    <li><strong>Security:</strong> Detect and prevent fraud, unauthorized activities, and security breaches</li>
                    <li><strong>Legal Compliance:</strong> Fulfill legal obligations, enforce terms of service, and protect our rights</li>
                </ol>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">3. Data Sharing and Disclosure</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    We may share your information with:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li><strong>Service Providers:</strong> Payment processors, shipping carriers, marketing agencies, and IT service providers</li>
                    <li><strong>Business Partners:</strong> Trusted partners who offer complementary products or services</li>
                    <li><strong>Legal Authorities:</strong> When required by law, court order, or governmental regulations</li>
                    <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or sale of company assets</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">4. Data Retention and Security</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. We implement robust security measures including:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>SSL encryption for data transmission</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Employee training on data protection practices</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">5. Your Rights and Choices</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    You have the right to:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Access and review your personal information</li>
                    <li>Correct inaccurate or incomplete data</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to processing of your data for direct marketing</li>
                    <li>Data portability in a structured, machine-readable format</li>
                    <li>Withdraw consent at any time where processing is based on consent</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">6. International Data Transfers</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We ensure appropriate safeguards are in place for such transfers.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">7. Children&apos;s Privacy</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">8. Cookies and Tracking Technologies</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings and other tools.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">9. Policy Updates</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new effective date.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">10. Contact Information</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    For questions, concerns, or to exercise your rights regarding your personal information, please contact our Data Protection Officer at:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                    <p className="text-base text-gray-700 dark:text-gray-300">
                        <strong>Email:</strong> <a href="mailto:Orgadoadmin@gmail.com" className="text-green-600 font-semibold hover:underline">Orgadoadmin@gmail.com</a><br/>
                        <strong>Phone:</strong> +1 (555) 123-4567<br/>
                        <strong>Address:</strong> 123 Privacy Lane, Data Protection City, DP 12345<br/>
                        <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours
                    </p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Last Updated: January 15, 2024
                </p>
            </>
        ),
    },
    {
        id: "terms",
        title: "Terms & Conditions",
        content: (
            <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Terms & Conditions Agreement</h2>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    Welcome to Orgado. These Terms and Conditions govern your use of our website, services, and products. By accessing or using our platform, you agree to be bound by these terms and our Privacy Policy.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">1. Acceptance of Terms</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    By accessing, browsing, or using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">2. Account Registration and Security</h3>
                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">2.1 Account Creation</h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    To access certain features, you must register for an account. You agree to:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Be responsible for all activities that occur under your account</li>
                </ul>

                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">2.2 Account Termination</h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    We reserve the right to suspend or terminate your account at our sole discretion if we believe you have violated these Terms or engaged in fraudulent or illegal activities.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">3. Products and Services</h3>
                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">3.1 Product Descriptions</h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    We strive to accurately display product colors, features, specifications, and prices. However, we cannot guarantee that your computer monitor&apos;s display will be accurate.
                </p>

                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">3.2 Pricing and Payment</h4>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>All prices are subject to change without notice</li>
                    <li>We reserve the right to modify or discontinue products at any time</li>
                    <li>Payment must be made by approved credit/debit cards or other accepted payment methods</li>
                    <li>You represent and warrant that you have the legal right to use any payment method</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">4. User Conduct and Responsibilities</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Violating any applicable laws or regulations</li>
                    <li>Infringing upon intellectual property rights</li>
                    <li>Harassing, abusing, or harming another person</li>
                    <li>Uploading or transmitting viruses or malicious code</li>
                    <li>Collecting or tracking personal information of others</li>
                    <li>Interfering with or disrupting the service or servers</li>
                    <li>Attempting to bypass any security measures</li>
                    <li>Engaging in fraudulent or deceptive practices</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">5. Intellectual Property Rights</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    All content on this website, including text, graphics, logos, images, and software, is the property of Orgado or its content suppliers and is protected by international copyright and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">6. Third-Party Links and Services</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    Our service may contain links to third-party websites or services that are not owned or controlled by Orgado. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Orgado shall not be responsible or liable for any damage or loss caused by or in connection with the use of any such content, goods, or services.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">7. Limitation of Liability</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    To the fullest extent permitted by applicable law, Orgado shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Your access to or use of or inability to access or use the service</li>
                    <li>Any conduct or content of any third party on the service</li>
                    <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                    <li>Any interruption or cessation of transmission to or from our service</li>
                    <li>Any bugs, viruses, Trojan horses, or the like that may be transmitted to or through our service</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">8. Indemnification</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    You agree to defend, indemnify, and hold harmless Orgado and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys fees) arising out of or relating to your violation of these Terms or your use of the service.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">9. Governing Law and Dispute Resolution</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be resolved through binding arbitration in accordance with the American Arbitration Association&apos;s commercial arbitration rules.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">10. Changes to Terms</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">11. Contact Information</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                    <p className="text-base text-gray-700 dark:text-gray-300">
                        <strong>Email:</strong> <a href="mailto:terms@orgado.com" className="text-green-600 font-semibold hover:underline">terms@orgado.com</a><br/>
                        <strong>Phone:</strong> +1 (555) 123-LEGAL<br/>
                        <strong>Address:</strong> 123 Legal Avenue, Compliance City, CC 12345<br/>
                        <strong>Business Hours:</strong> Monday-Friday, 9:00 AM - 6:00 PM PST
                    </p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Effective Date: January 15, 2024
                </p>
            </>
        ),
    },
    {
        id: "refund",
        title: "Refund Policy",
        content: (
            <>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Refund and Return Policy</h2>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    At Orgado, we strive for complete customer satisfaction. This comprehensive Refund Policy outlines the terms and conditions under which refunds and returns are processed. Please read this policy carefully before making a purchase.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">1. Eligibility for Returns and Refunds</h3>
                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">1.1 General Return Policy</h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    Most physical products can be returned within 30 days of delivery for a full refund or exchange, provided they meet the following conditions:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Product is in its original condition, unused, and unwashed</li>
                    <li>Original packaging is intact with all tags and labels attached</li>
                    <li>Proof of purchase (order number or receipt) is provided</li>
                    <li>Return is initiated within the specified time frame</li>
                </ul>

                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">1.2 Non-Returnable Items</h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    The following items are not eligible for return or refund unless defective or damaged:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Personal care products and cosmetics for hygiene reasons</li>
                    <li>Digital products, software, and downloadable content</li>
                    <li>Gift cards and store credits</li>
                    <li>Personalized or custom-made products</li>
                    <li>Perishable goods and food items</li>
                    <li>Intimate apparel and swimwear</li>
                    <li>Clearance or final sale items marked as &apos;non-returnable&apos;</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">2. Return Process</h3>
                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">2.1 How to Initiate a Return</h4>
                <ol className="list-decimal list-inside text-base text-gray-700 dark:text-gray-300 space-y-3 mb-6">
                    <li><strong>Contact Customer Service:</strong> Email returns@orgado.com or use our online portal within 30 days of delivery</li>
                    <li><strong>Provide Information:</strong> Include your order number, product details, and reason for return</li>
                    <li><strong>Receive Authorization:</strong> We will provide a Return Merchandise Authorization (RMA) number and instructions</li>
                    <li><strong>Package and Ship:</strong> Securely package the item with the RMA number clearly visible</li>
                    <li><strong>Ship the Item:</strong> Use a trackable shipping service and retain the tracking number</li>
                </ol>

                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">2.2 Return Shipping</h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    Return shipping costs are the responsibility of the customer unless the return is due to our error (wrong item shipped, defective product, etc.). We recommend using a trackable shipping service as we cannot be responsible for items lost in transit.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">3. Refund Processing</h3>
                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">3.1 Refund Methods</h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    Refunds are processed to the original payment method within 7-10 business days after we receive and inspect the returned item. The refund will include:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Full purchase price of the returned item(s)</li>
                    <li>Original shipping costs for returns due to our error</li>
                    <li>Taxes applicable to the returned items</li>
                </ul>

                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">3.2 Partial Refunds</h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    Partial refunds may be issued in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Item is not in its original condition</li>
                    <li>Item is damaged, missing parts, or not in original packaging</li>
                    <li>Only some items from a bundle are returned</li>
                    <li>Return is initiated after the 30-day return period</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">4. Exchanges</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    We currently offer exchanges for size or color variations, subject to availability. To request an exchange, follow the standard return process and specify that you would like an exchange. If the requested item is not available, we will issue a refund to your original payment method.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">5. Defective or Damaged Items</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    If you receive a defective or damaged item, please contact us within 48 hours of delivery. We will arrange for a replacement or refund at no additional cost to you. Please provide photographs of the damage or defect to expedite the process.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">6. International Returns</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    For international orders, customers are responsible for all customs duties, taxes, and return shipping costs. Refunds will be issued for the product cost only, excluding original shipping charges. Please allow additional time for international returns to be processed.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">7. Store Credit Option</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    Instead of a refund to your original payment method, you may opt for store credit. Store credit:
                </p>
                <ul className="list-disc list-inside text-base text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                    <li>Is issued immediately upon approval of return</li>
                    <li>Does not expire</li>
                    <li>Can be used for future purchases on our website</li>
                    <li>May include a bonus credit as a thank you for choosing this option</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">8. Warranty Claims</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    Some products come with manufacturer warranties. Please refer to the product documentation for specific warranty terms and contact information. We will assist with warranty claims to the best of our ability.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">9. Special Circumstances</h3>
                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">9.1 Holiday Season</h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                    Purchases made between November 1st and December 24th may be returned until January 31st of the following year.
                </p>

                <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">9.2 Final Sale Items</h4>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    Items marked as &apos;Final Sale&apos; are not eligible for return or refund unless defective.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">10. Contact Information</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                    <p className="text-base text-gray-700 dark:text-gray-300">
                        <strong>Returns Department:</strong> <a href="mailto:returns@orgado.com" className="text-green-600 font-semibold hover:underline">returns@orgado.com</a><br/>
                        <strong>Phone:</strong> +1 (555) 123-RETURN<br/>
                        <strong>Returns Address:</strong> 123 Returns Center, Fulfillment City, FC 12345<br/>
                        <strong>Processing Time:</strong> 5-7 business days after receipt of returned item<br/>
                        <strong>Customer Service Hours:</strong> Monday-Saturday, 8:00 AM - 8:00 PM PST
                    </p>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">11. Policy Updates</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                    We reserve the right to modify this refund policy at any time. Changes will be posted on this page with an updated effective date. For returns initiated before policy changes, the policy in effect at the time of purchase will apply.
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Last Updated: January 15, 2024
                </p>
            </>
        ),
    },
];