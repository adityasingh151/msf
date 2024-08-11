import React, { useEffect, useRef } from 'react';

const CrisisFacingEducation = () => {
  const crisisRef = useRef(null);

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

    if (crisisRef.current) {
      observer.observe(crisisRef.current);
    }

    return () => {
      if (crisisRef.current) {
        observer.unobserve(crisisRef.current);
      }
    };
  }, []);

  return (
    <section ref={crisisRef} data-animation="animate-fly-in" className="py-20 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Crisis Facing Education</h2>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          Increasingly and in large measure there is enormous dissatisfaction globally amongst the young with the established old school systems of education. In India this dissatisfaction is even more evident. Consider the following facts:
          <ul className="list-disc pl-5">
            <li>Un-employability of Students: Most educational institutions in India do not seem to be connected with the needs of society and of India. Thus they use mostly irrelevant curriculum and dull and lifeless pedagogical practices. Hence students who do graduate from a university tend to be rather unsuited for work. A few years ago, Kiran Karnik, then Director of NASSCOM had observed that in India 3 out of 4 graduates were unemployable.</li>
            <li>Unemployable Students-A True Story from DU: In an experimental activity about five years ago, the University of Delhi invited a leading multinational firm for a campus placement exercise. The firm had a few hundred openings and all they wanted were graduates (B.A./B.Sc.) who could communicate effectively and have basic analytical skills. The University advertised widely and shortlisted 1200 of the best resumes and organized blind interviews in the sense that the college name and family background of the applicants was not disclosed. The firm picked up only 3 students.</li>
            <li>Do Our Students Acquire Knowledge in the Classroom? 1. Read what a student from IIT Mumbai writes in 2015: I have enjoyed everything, literally everything, in IIT Mumbai except academics. The three and a half years are an academic void. This is going to haunt me for the rest of my life. I will leave (IIT Mumbai) in April 2015 with the same or incremental increase in academic knowledge, as when I entered this institute in July 2011, is…very hard to digest. The little I learnt during the course of mugging for exams got erased as soon as the exam was done. 2. The story is endless. Read what a student at St. Stephen’s College Writes: All my fellow exchange students (from Brown University and from Rutgers University in the next apartment block) concurred that the academics (at Stephen’s) were a joke compared to what we were used to back home. In one economic history class the professor would enter the room, take attendance, open his notebook, and begin reading. He would read his notes word for word while we, his students, copied these notes word for word until the bell sounded. Many times I arrived on campus to find class abruptly canceled. In one political science class the only requirements for the entire period between August and December were two papers, each 2500 words. I wrote more intense papers in my U.S. public High School in a month. The only questions I heard asked during my classes were about whether the material being covered that day would be on the exam. Remember, this is not any regular liberal arts college – St. Stephen’s College is regarded as one of, if not the best, college in India. What does he write about a good learning experience? My entire study abroad experience in India, from an academic standpoint, was an enormous disappointment. My voice should be drowned out by the millions around me who are disappointed with how they have been short-changed by the Indian government– their government.</li>
            <li>The Story of the Young Indian Cab Driver in Sydney. About four years ago I met with a young Indian cab driver in Sydney who narrated his tale of woe. He had arrived a year ago in Sydney with great hopes and armed with a B.Com (Hons) degree from one the leading colleges of Delhi University known for its high cutoffs. When he tried to work he found out the hard way that he knew nothing that was useful or practical in the realm of commerce and accounting. He lost his job and was at that point in time enrolled in an evening course to learn real world accounting and was driving taxis to pay for his tuition. He literally begged me to do something about the state of education in India.</li>
          </ul>
        </p>
        <p className="text-lg leading-relaxed mb-4 font-serif">
          The Situation is Compounded By:
          <ul className="list-disc pl-5">
            <li>Staggering Numbers of Students Who Graduate from High School Annually. Each year, collectively, the UP Education Board, the Bihar Education Board and the CBSE graduate a total of about 60 lakh (6 million) students from Class XII. The annual figure for high school graduates in India runs into crores. Very few of these youth enter portals of higher education. Most drift aimlessly in society idling away time or engaging in counter-productive activities. Equally worrying, there is no data on the numbers that drop out of school. Altogether the situation seems to be very disturbing.</li>
            <li>Our Embrace of Mediocrity in The Education Sector. Shekhar Gupta-former Chief Editor Indian Express writes: “India's bane is our easy embrace of mediocrity - from academia and science to business and military power. We define academic excellence as topping a key exam. What excellence these fellow Indians (at an IIT) had to achieve they did by beating the rest in JEE. That should de-risk their lives. That’s why so many of them, in spite of the finest education in India, spend the rest of their lives smugly with titles like V.P. (soaps and shampoos) or G.M. (juices and ketchup) with FMCG majors. Smugly, until a Patanjali rises. Not since the pre-Independence generation, have we had a world-class scientist with cutting edge research, a real technologist with a globally known patent or invention. India claims to be a great IT power with almost no proprietary software, brands, except in outsourcing. It is the fastest growing telecom market but its lakhs of degree-holding engineers, including tens of thousands of wonderful IIT-ians haven’t invented/designed/patented/produced an original mobile phone model, something young Chinese and Koreans are doing all the time.”</li>
            <li>The Fact that India does not have a Knowledge Economy. India loses out in major ways in the realm of economic progress as it fails to have a knowledge-based economy. For instance, India’s oil and gas exploration programme is heavily dependent on foreign technical and scientific expertise which causes enormous drain on our foreign exchange reserves. The same is true of our electronics import bill or for that matter on encryption and other proprietary software. Google runs on an idea that comes from the corridors of Stanford University while none of our so-called IT giants have any much by way of intellectual power. Thus, Google has yearly profits that are more than several of our IT companies put together.</li>
          </ul>
        </p>
      </div>
    </section>
  );
};

export default CrisisFacingEducation;
