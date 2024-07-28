import React from 'react';

const QuoteSection = React.forwardRef(({ quote }, ref) => {
  return (
    <section ref={ref} data-animation="animate-slide-in-top" className="py-4 px-8 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto text-center">
        {quote && <blockquote className="text-4xl italic font-semibold">{quote}</blockquote>}
      </div>
    </section>
  );
});

export default QuoteSection;
