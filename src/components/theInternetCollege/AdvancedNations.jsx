import React, { useEffect, useRef } from 'react';

const AdvancedNations = () => {
  const advancedNationsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.animation);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (advancedNationsRef.current) {
      observer.observe(advancedNationsRef.current);
    }

    return () => {
      if (advancedNationsRef.current) {
        observer.unobserve(advancedNationsRef.current);
      }
    };
  }, []);

  return (
    <section ref={advancedNationsRef} data-animation="animate-slide-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Is The Situation In The Advanced Nations Of The World Much Different?</h2>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          There are some similarities with the Indian situation due to the fact that educational institutions are quite loath to embrace change the world over. However, to some extent, changes in several of these institutions are brought about in organic fashion by the very nature of the activities that are undertaken by a critical number of their faculty. The Imperial College of Science, Technology and Medicine (2016 WU Rank 8), The University of Chicago (2016 WU Rank 10), The Rensselaer Polytechnic Institute (2016 WU Rank 135) is a case in point. In spite of being ranked consistently at the very top levels, a critical number of faculty, facilitated and even encouraged by a far sighted leadership, have transformed several aspects of the college environment in innovative and creative ways. This makes their students far better suited than in the past to handle their post college lives and careers and they are better suited to be productive in society. This is likely the case in so many of the top-level institutions in the developed world.
        </p>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          However serious issues are cropping up for various reasons even in many of the top institutions. At the same time the challenges are being tackled in interesting and often even effective ways.
        </p>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          <strong>The USA Scenario:</strong>
          <ul className="list-disc pl-5">
            <li>In the United States, there are concerns and issues related to: The high tuition and other costs for students, The relevance of the degrees being awarded in terms of employment, The uneven nature of the pedagogical practices such as undergraduate teaching being fobbed off to graduate students in a large number of institutions.</li>
          </ul>
        </p>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          However, it is also worth noting that there are also interesting developments taking place in the US. This is best portrayed by excerpts from the contributions of experts to TIME magazine’s Education Ideas platform of April 2015:
          <ul className="list-disc pl-5">
            <li><strong>Students will be in the driver’s seat — Andy Miah:</strong> Technology will force universities to re-define their role within 21st century life, and this has a lot to do with the DIY generation, who figure out what they need to know via Google and Wikipedia. Universities are no longer the gatekeepers of new knowledge, even less so with the rise of citizen science experiments, where non-experts can gather important data, and alternative qualification options, such as Mozilla Open Badges. Students of tomorrow will want flexible, mobile-enabled learning experiences that are as compelling as film or theatre. The classroom now has to empower students to set the agenda and drive their own learning. As we move into an era of sentient computing, universities need also to see technology not just as a vehicle for communicating ideas or enriching learning, but as a co-collaborator. Computers will become entities onto which students will project learning expectations. The machines will teach us, they will also learn, and they will spend more time with students than a lecturer ever can. If we want humans to remain at the heart of that interaction, we then need to really reconsider what we offer that they can’t.</li>
            <li><strong>MOOCS-The Future? Erica Orange:</strong> They (MOOCS) are not working that well because people only take one class at a time and then don’t finish it because it isn’t compelling. The next generation of MOOCs will be sensorilly immersive, leveraging virtual reality to put students in the world they’re studying. Instead of having to memorize facts about the Civil War, for example, a student in a future MOOC will be on the battlefield. New modes of online learning will cater more effectively to Generation Z — or those students born after the mid 1990s. The oldest Gen Z-ers have been forced into an industrial model of school, and we are seeing all these attention problems. Their brains are wired differently and actually function better with input from a variety of sources.</li>
            <li><strong>Skills versus University Degrees. Erica Orange:</strong> As we approach mid-century, proof of education will be more about the skills you’ve acquired rather than the degree you have. The costs of traditional college keep increasing, so many will price out and take a technological shortcut.</li>
            <li><strong>Technology Transforming the University. Alexandra Levitt:</strong> Free online courses, crowdsourcing, and big data are transforming the university from a gatekeeper to a public resource.</li>
            <li><strong>The Value of Short Term High Demand Courses/Knowledge:</strong> From the New York Times July 2015: After Paul Minton graduated from college, he worked as a waiter, but always felt he should do more. So Mr. Minton, a 26-year-old math major, took a three-month course in computer programming and data analysis. As a waiter, he made $20,000 a year. His starting salary last year as a data scientist at a web start-up here was more than $100,000. The money sloshing around in technology is cascading beyond investors and entrepreneurs into the broader digital work force, especially to those who can write modern code, the language of the digital world.</li>
            <li><strong>Some Highly Successful Digital Learning Platforms:</strong> There are very interesting and highly successful digital and technology based learning platforms in different parts of the World. Some of these are Phoenix University and The Peoples University in the USA or the highly successful Portugese language based institution run by the private player Kroton. Another very thriving platform is that of the P2P University (Peer 2 Peer University).</li>
          </ul>
        </p>
      </div>
    </section>
  );
};

export default AdvancedNations;
