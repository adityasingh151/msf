import React from 'react';

function ContactArea() {
  return (
    <section id="contact" className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white">
      <div className="w-full max-w-4xl bg-white p-10 shadow-lg rounded-xl">
        <div className="text-center">
          <h5 className="text-indigo-600 uppercase font-semibold">Contact</h5>
          <h4 className="text-3xl font-bold text-gray-800">Get In Touch</h4>
          <p className="text-gray-600 mt-4">For any inquiries or further information, please feel free to reach out to us. We're here to help and look forward to connecting with you. Your questions and feedback are important to us, and we strive to provide prompt and helpful responses.</p>
        </div>

        <div className="mt-6">
          <p className="text-gray-600"><strong>Email:</strong> <a href="mailto:office.msf@gmail.com" className="text-red-500">office.msf@gmail.com</a></p>
          {/* <p className="text-gray-600"><strong>Phone:</strong> +1 234 567 890</p> */}
          <p className="text-gray-600"><strong>Address:</strong> N 91, Basement, Greater Kailash-1, New Delhi 110048</p>
        </div>
      </div>
    </section>
  );
}

export default ContactArea;
