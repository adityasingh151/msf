import React from 'react';

const PrivacyPolicy = () => {
    const sections = [
        {
          title: 'This Privacy Policy applies to https://mathscifound.org',
          content: [
            "https://mathscifound.org recognizes the importance of maintaining customer privacy. We value your privacy and appreciate your trust in us. This Policy describes how we treat user information we collect on https://mathscifound.org and other offline sources. This Privacy Policy applies to current and former visitors to our website and to our online customers. By visiting and/or using our website, you agree to this Privacy Policy.",
            "https://mathscifound.org is a property of Mathematical Sciences Foundation, an Indian Non-Profit Organization having its registered office at 45, Ground Floor, World Trade Centre, Babar Road, Connaught Place, New Delhi 110001."
          ]
        },
        {
          title: 'Information we collect',
          content: [
            "Contact information: We might collect your name, email, mobile number, phone number, street, city, state, pincode, country, and IP address.",
            "Information you post: We collect information you post in a public space on our website or on a third-party social media site belonging to https://mathscifound.org.",
            "Demographic information: We may collect demographic information about you, events you like, events you intend to participate in, tickets you buy, or any other information provided by you during the use of our website. We might collect this as part of a survey also.",
            "Other information: If you use our website, we may collect information about your IP address and the browser you're using. We might look at what site you came from, duration of time spent on our website, pages accessed or what site you visit when you leave us. We might also collect the type of mobile device you are using, or the version of the operating system your computer or device is running."
          ]
        },
        {
          title: 'Information Collection',
          content: [
            "We may collect information directly from you: We may collect information directly from you when you register for an event or buy tickets. We also collect information if you post a comment on our websites or ask us a question through phone or email.",
            "We may collect information from you passively: We may use tracking tools like Google Analytics, Google Webmaster, browser cookies, and web beacons for collecting information about your usage of our website.",
            "We get information about you from third parties: For example, if you use an integrated social media feature on our websites. The third-party social media site will give us certain information about you. This could include your name and email address."
          ]
        },
        {
          title: 'Use of your personal information',
          content: [
            "We use information to contact you: We might use the information you provide to contact you for confirmation of a purchase on our website or for other promotional purposes.",
            "We use information to respond to your requests or questions: We might use your information to confirm your registration for an event or contest.",
            "We use information to improve our products and services: We might use your information to customize your experience with us. This could include displaying content based upon your preferences.",
            "We use information for marketing purposes: We might send you information about special promotions or offers. Or, for example, if you enroll in a seminar or workshop or a competition with us we'll enroll you in our newsletter unless you choose to opt-out."
          ]
        },
        {
          title: 'Sharing of information with third-parties',
          content: [
            "We will share information with third parties who perform services on our behalf: We share information with vendors who help us manage our online registration process or payment processors or transactional message processors. Some vendors may be located outside of India.",
            "We will share information with the event organizers: We share your information with event organizers and other parties responsible for fulfilling the purchase obligation. The event organizers and other parties may use the information we give them as described in their privacy policies.",
            "We may share information with our business partners: This includes a third party who provides or sponsors an event, or who operates a venue where we hold events. Our partners use the information we give them as described in their privacy policies.",
            "We may share information if we think we have to in order to comply with the law or to protect ourselves: We will share information to respond to a court order or subpoena. We may also share it if a government agency or investigatory body requests. Or, we might also share information when we are investigating potential fraud."
          ]
        },
        {
          title: 'Email Opt-Out',
          content: [
            "You can opt out of receiving our marketing emails: To stop receiving our promotional emails, please email unsubscribe@mathscifound.org. It may take about ten days to process your request. Even if you opt out of getting marketing messages, we will still be sending you transactional messages through email and SMS about your purchases."
          ]
        },
        {
          title: 'Third party sites',
          content: [
            "If you click on one of the links to third party websites: You may be taken to websites we do not control. This policy does not apply to the privacy practices of those websites. Read the privacy policy of other websites carefully. We are not responsible for these third party sites."
          ]
        },
        {
          title: 'Grievance Officer',
          content: [
            "In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:",
            "Iraj Kumar",
            "Email: iraj@mathscifound.org",
            "If you have any questions about this Policy or other privacy concerns, you can also email us at webmaster@mathscifound.org"
          ]
        },
        {
          title: 'Updates to this policy',
          content: [
            "This Privacy Policy was last updated on 21.02.2019. From time to time, we may change our privacy practices. We will notify you of any material changes to this policy as required by law. We will also post an updated copy on our website. Please check our site periodically for updates."
          ]
        },
        {
          title: 'Jurisdiction',
          content: [
            "If you choose to visit the website, your visit and any dispute over privacy is subject to this Policy and the website's terms of use. In addition to the foregoing, any disputes arising under this Policy shall be governed by the laws of India."
          ]
        }
      ];

  return (
    <section className="pt-16 pb-16 relative w-full bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-indigo-600 uppercase font-semibold tracking-wider">Privacy Policy</h5>
          <h2 className="text-4xl font-bold text-gray-900 font-sans">Your Privacy Matters to Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl hover:bg-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 font-serif">{section.title}</h3>
              <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2 font-light">
                {section.content.map((paragraph, idx) => (
                  <li key={idx} className="leading-relaxed">{paragraph}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;