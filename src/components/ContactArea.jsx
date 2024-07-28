import React from 'react';

function ContactArea() {
  return (
    <section id="contact" className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white">
      <div className="w-full max-w-4xl bg-white p-10 shadow-lg rounded-xl">
        <div className="text-center">
          <h5 className="text-indigo-600 uppercase font-semibold">Contact</h5>
          <h4 className="text-3xl font-bold text-gray-800">Get In Touch</h4>
          <p className="text-gray-600 mt-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
        </div>

        <form id="contact-form" action="assets/php/contact.php" method="POST" className="space-y-6 mt-6">
          <div className="flex flex-wrap justify-between gap-4">
            <input type="text" name="name" id="name" placeholder="Name" 
              className="w-full md:w-1/2 px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm transition ease-in-out duration-150" />
            <input type="email" name="email" id="email" placeholder="Email"
              className="w-full md:w-1/2 px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm transition ease-in-out duration-150" />
          </div>
          <textarea name="message" id="message" placeholder="Message" rows="5"
            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm transition ease-in-out duration-150 resize-none"></textarea>
          <div className="text-center">
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition ease-in-out duration-150">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactArea;
