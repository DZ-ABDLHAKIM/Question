import React, { useState } from "react";
import questionData from "./questions.json"; // Adjust the path as needed
import "./App.scss";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
}

const QuestionComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string | null>
  >({});

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questionData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + questionData.length) % questionData.length
    );
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionData[currentIndex].id]: value,
    }));
  };

  const question = questionData[currentIndex] as Question;
  const selectedOption = selectedAnswers[question.id] || null;

  return (
    <>
      <section key={question.id}>
        <h1>Question {question.id}</h1>
        <p>{question.question}</p>
        <div className="auction">
          {question.options.map((option, index) => (
            <label key={index} htmlFor={`option-${question.id}-${index}`}>
              <input
                type="radio"
                id={`option-${question.id}-${index}`}
                name={`question-${question.id}`}
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <p>{option}</p>
            </label>
          ))}
        </div>
      </section>
      <div className="button_next_previous">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          style={{
            backgroundColor: selectedOption ? "#04aa6d" : " ",
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default QuestionComponent;
