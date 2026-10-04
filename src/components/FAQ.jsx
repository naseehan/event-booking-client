import React, { useState } from "react";

const faqData = [
  {
    q: "How do I book tickets for an event?",
    a: "Browse through our Events catalog, choose your preferred event, click 'Book Ticket' or 'Add to Cart', and proceed through our seamless Stripe checkout. You will receive an instant confirmation upon completion.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "We support major credit and debit cards (Visa, Mastercard, American Express) powered by Stripe's secure 256-bit encrypted payment gateway.",
  },
  {
    q: "Can I host and sell tickets for my own event?",
    a: "Yes! Simply sign up or log in, head to your Organizer Dashboard, and click 'Create Event'. You can set ticket pricing, venue details, dates, and track your listings anytime.",
  },
  {
    q: "What happens if an event is postponed or cancelled?",
    a: "In the event of a cancellation or date change, you will be notified via email and automatically eligible for a full refund through the original payment method.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-12 max-w-4xl mx-auto px-4">
      <div className="text-center space-y-2 mb-10">
        <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Help Center</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-500">
          Everything you need to know about booking passes and organizing events.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm hover:text-emerald-600 focus:outline-none transition-colors"
              >
                <span>{item.q}</span>
                <i
                  className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-emerald-600" : "text-slate-400"
                  }`}
                ></i>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;
