import React, { useState, useEffect } from "react";
import NewQuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  }

  function handleDelete(id) {
    setQuestions((prevQuestions) => prevQuestions.filter((quiz) => quiz.id !== id));
  }

  function handleUpdate(id, newCorrectIndex) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((quiz) =>
        quiz.id === id ? { ...quiz, correctIndex: newCorrectIndex } : q
      )
    );
  }

  return (
    <section>
      <h1>Question List</h1>
      <NewQuestionForm onAddQuestion={handleAddQuestion} />
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}


export default QuestionList;
