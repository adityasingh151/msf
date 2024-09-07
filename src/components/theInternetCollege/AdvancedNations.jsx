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
    <section
      ref={advancedNationsRef}
      data-animation="animate-slide-in"
      className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100"
    >
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Is The Situation In The Advanced Nations Of The World Much Different?
        </h2>

        <p className="text-lg leading-relaxed mb-6 font-serif text-gray-700">
          There are some similarities with the Indian situation due to the fact that educational institutions are quite loath to embrace change worldwide. However, in several advanced institutions, changes are brought about organically through the activities of faculty members.
        </p>

        <p className="text-lg leading-relaxed mb-6 font-serif text-gray-700">
          Examples include:
        </p>

        <ul className="list-disc pl-5 text-lg leading-relaxed mb-6 font-serif text-gray-700">
          <li><strong>The Imperial College of Science, Technology and Medicine (2016 WU Rank 8)</strong></li>
          <li><strong>The University of Chicago (2016 WU Rank 10)</strong></li>
          <li><strong>The Rensselaer Polytechnic Institute (2016 WU Rank 135)</strong></li>
        </ul>

        <p className="text-lg leading-relaxed mb-6 font-serif text-gray-700">
          Even though ranked highly, these institutions have been transformed by visionary leadership and active faculty participation. Students are now better equipped to handle post-college careers and contribute positively to society.
        </p>

        <p className="text-lg leading-relaxed mb-6 font-serif text-gray-700">
          <strong>However, even in top institutions, serious issues persist:</strong>
        </p>

        <ul className="list-disc pl-5 text-lg leading-relaxed mb-6 font-serif text-gray-700">
          <li>High tuition and other costs for students.</li>
          <li>The relevance of degrees to employment opportunities.</li>
          <li>Undergraduate teaching often assigned to graduate students in many institutions.</li>
        </ul>

        <p className="text-lg leading-relaxed mb-6 font-serif text-gray-700">
          Despite these challenges, innovative approaches are being developed to address them. Here are some key insights from experts contributing to TIME magazine’s Education Ideas platform (April 2015):
        </p>

        <ul className="list-disc pl-5 text-lg leading-relaxed mb-6 font-serif text-gray-700">
          <li>
            <strong>Students will be in the driver’s seat — Andy Miah:</strong> Technology will redefine universities' roles in 21st-century life. With the rise of citizen science experiments and alternative qualifications like Mozilla Open Badges, universities are no longer gatekeepers of knowledge. Future classrooms will empower students to set the agenda and drive their own learning, with technology playing a central role.
          </li>

          <li>
            <strong>MOOCs - The Future? — Erica Orange:</strong> Current MOOCs aren’t working well due to their lack of engagement. The next generation of MOOCs will be immersive, leveraging virtual reality to place students directly in the world they are studying, making learning more effective for Generation Z.
          </li>

          <li>
            <strong>Skills versus University Degrees — Erica Orange:</strong> By mid-century, skills acquired will be more valuable than degrees. As traditional college costs rise, many will choose technological shortcuts to gain employable skills.
          </li>

          <li>
            <strong>Technology Transforming the University — Alexandra Levitt:</strong> Free online courses, crowdsourcing, and big data are transforming universities from gatekeepers of knowledge into public resources.
          </li>

          <li>
            <strong>The Value of Short-Term, High-Demand Courses/Knowledge:</strong> A New York Times article (July 2015) illustrates how learning modern programming languages can lead to significant career shifts, as seen in the story of Paul Minton, who transitioned from being a waiter to earning over $100,000 as a data scientist.
          </li>

          <li>
            <strong>Successful Digital Learning Platforms:</strong> Some thriving examples include Phoenix University, The Peoples University in the USA, Kroton in Portugal, and P2P University (Peer 2 Peer University).
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AdvancedNations;
