import React, { useEffect, useRef } from 'react';

const NeedForDigitalPlatform = () => {
  const needRef = useRef(null);

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

    if (needRef.current) {
      observer.observe(needRef.current);
    }

    return () => {
      if (needRef.current) {
        observer.unobserve(needRef.current);
      }
    };
  }, []);

  return (
    <section ref={needRef} data-animation="animate-slide-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">The Need for an ‘Out of the Box’ Digital and Technology Based Learning Platform</h2>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          From all that has been said above it has become increasingly clear that in most parts of the world the traditional systems of knowledge and learning are not delivering what is needed by large segments of society and are also breaking down in several ways or are not as useful as they are supposed to be. The most apparent and worrying aspects of these traditional streams of learning are the following:
          <ul className="list-disc pl-5">
            <li>Today’s universities are-to a large extent-not tuned in to the needs of the student in terms of gainful knowledge and skills.</li>
            <li>Traditional universities are either overpriced or offer very poor learning environments or teach in outdated fashion and with irrelevant or outdated curricula. For example the following comment by an UG student at Indiana University Bloomington is quite typical and instructive: I really struggled with Finite Math and having (Prof) XX did not help. I find it hard to pay attention and found that using YouTube was a better teacher than him.</li>
            <li>There is an enormous mismatch between what traditional universities offer and what society at large needs.</li>
            <li>In India there is an enormously large population increasing each year by millions that is in need of relevant and useful education but the existing institutions in India are inadequate both in terms of the quality and in terms of the needs of the student today. In addition, the numbers are so large in India that the current lot of existing institutions cannot accommodate the large numbers that are graduating from high school each year even if they were to increase their capacity many times.</li>
            <li>A good, innovative and well-designed technology based platform that is tuned to the needs and aspirations of the young can work wonders. This statement is bolstered by two financially successful and long standing institutions that have very poor quality and yet they thrive in India.
              <ul className="list-disc pl-5">
                <li>The poor quality and outdated School of Open Learning of the University of Delhi that offers highly irrelevant courses with little use of technology and with no job prospects for its students has more students (greater than half a million) on its rolls than the regular learning systems of the University of Delhi. Its coffers are overflowing even though it charges almost negligible sums by way of fees.</li>
                <li>The same is true of the Indira Gandhi National Open University whose student numbers are more than the enrolment of all the Central Universities of India put together. The IGNOU largely offers very poor quality programmes with minimal use of technology.</li>
              </ul>
            </li>
          </ul>
        </p>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          The Internet College is designed to address all of the above concerns and needs. It shall achieve this aim by a series of activities and programmes that shall center round the needs and challenges of India and society at large. The young shall be exposed to these challenges and needs in engaging and hands on ways. They shall in turn be motivated by an inborn desire to tackle these challenges and even be inspired on a long term and sustained level.
        </p>
      </div>
    </section>
  );
};

export default NeedForDigitalPlatform;
