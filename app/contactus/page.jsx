import React from 'react';

export default function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Get in touch</h1>
        <form className="space-y-4">
          <div className="email block">
            <label htmlFor="frm-email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="frm-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="block phone">
            <label htmlFor="frm-phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="frm-phone"
              type="text"
              name="phone"
              autoComplete="tel"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="name block">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="frm-first" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  id="frm-first"
                  type="text"
                  name="first"
                  autoComplete="given-name"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="frm-last" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  id="frm-last"
                  type="text"
                  name="last"
                  autoComplete="family-name"
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="message block">
            <label htmlFor="frm-message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="frm-message"
              rows="6"
              name="message"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          <div className="button block">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
