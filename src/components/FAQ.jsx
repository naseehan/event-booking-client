import React, { useState } from "react";
import "../stylePages/faq/App.css";

function FAQ() {
  const [answer, setAnswer] = useState(true);

  const [secondAnswer, setSecondAnswer] = useState(false);

  const [thirdAnswer, setThirdAnswer] = useState(false);

  const handleAnswer = () => {
    setAnswer(!answer);
    setSecondAnswer(false);
    setThirdAnswer(false);
  };
  const handleSecondAnswer = () => {
    setSecondAnswer(!secondAnswer);
    setAnswer(false);
    setThirdAnswer(false);
  };
  const handleThirdAnswer = () => {
    setThirdAnswer(!thirdAnswer);
    setSecondAnswer(false);
    setAnswer(false);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-heading headings-car">
          <h4>FAQ</h4>
          <h1>Frequently Asked Questions</h1>
          <p>
            Frequently Asked Questions About Event Booking Process on Our
            Website: Answers to Common Concerns and Inquiries.
          </p>
        </div>
        <div className="faq-questions">
          <div className="single-question">
            <div
              className={`question ${answer ? "active-question" : ""}`}
              onClick={handleAnswer}
            >
              <p>1. How can I book tickets for an event?</p>
              <i class="fa-sharp fa-solid fa-angle-down"></i>
            </div>
            <div className={`answer ${answer ? "active-answer" : ""}`}>
              <p>
                Booking tickets for an event is easy! Simply follow these steps:
                Navigate to the Events section on our website. Browse through
                the available events and select the one you're interested in.
                Choose the number of tickets you want to purchase. Click on the
                "Book Now" button and follow the prompts to complete the booking
                process.
              </p>
            </div>
          </div>
          <div className="single-question">
            <div
              onClick={handleSecondAnswer}
              className={`question ${secondAnswer ? "active-question" : ""}`}
            >
              <p>How the payments works? </p>
              <i class="fa-sharp fa-solid fa-angle-down"></i>
            </div>
            <div className={`answer ${secondAnswer ? "active-answer" : ""}`}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                bibendum venenatis neque eget tristique. Sed at porta felis.
                Duis vitae malesuada lacus. Duis lobortis risus gravida leo
                pellentesque bibendum. Donec accumsan justo a ante dapibus, ac
                feugiat sapien efficitur. Quisque ultricies tortor bibendum
                fermentum mollis.
              </p>
            </div>
          </div>
          <div className="single-question">
            <div
              onClick={handleThirdAnswer}
              className={`question ${thirdAnswer ? "active-question" : ""}`}
            >
              <p>How and when do I get paid after selling my tickets? </p>
              <i class="fa-sharp fa-solid fa-angle-down"></i>
            </div>
            <div className={`answer ${thirdAnswer ? "active-answer" : ""}`}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                bibendum venenatis neque eget tristique. Sed at porta felis.
                Duis vitae malesuada lacus. Duis lobortis risus gravida leo
                pellentesque bibendum. Donec accumsan justo a ante dapibus, ac
                feugiat sapien efficitur. Quisque ultricies tortor bibendum
                fermentum mollis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
