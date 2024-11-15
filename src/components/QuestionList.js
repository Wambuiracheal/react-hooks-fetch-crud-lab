import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, removeQuestion }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            removeQuestion={removeQuestion} 
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;