import React, { useState } from 'react';
import '../styles/FAQ.css'; // Import your CSS file for styling

const FAQItem = ({ question, answer, isOpen, toggleFAQ }) => {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="question" onClick={toggleFAQ}>
        {question}
      </div>
      {isOpen && <div className="answer">{answer}</div>}
    </div>
  );
};

const FAQs = () => {
  const faqsData = [
    {
      question: 'How to apply for the program?',
      answer: 'The rule book attached above clearly states all the steps to apply for the program. The rewards/penalties are also clearly mentioned in it, please go through the rule book very carefully.',
    },
    {
      question: 'What is the selection procedure?',
      answer: 'Selection process will be at the discretion of the alumnus. We will send the resume to the alumnus and they can screen you on the basis of your resume or if required, they can also call you up for a telephonic interview. In which case, information will be conveyed beforehand.',
    },
    {
      question: 'Where would be the internship posting at?',
      answer: 'For work-place projects, the ILP internship postings will totally depend upon the alumni. In case of posting outside Mumbai, accommodation and travel expenses may be provided by the alumni.',
    },
    {
      question: 'What would be the duration of internship?',
      answer: 'The workplace internships will last for around 1 to 2 months duration while the work-from-home internships may last up to 12 weeks with mutual consent of both student and alumnus.',
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  

  return (
    <div className="faq-container">
      <div className="faq-header">FAQ's</div>
      <div className="faqs">
        {faqsData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={activeIndex === index}
            toggleFAQ={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQs;
