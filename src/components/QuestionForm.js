import React, { useState } from "react";

function NewQuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Validate the form
    if (prompt === "" || answers.some((answer) => answer === "")) {
      setError("Please fill out all fields.");
      return;
    }

    if (correctIndex < 0 || correctIndex >= answers.length) {
      setError("Please select a valid correct answer index.");
      return;
    }

    const newQuestion = {
      prompt,
      answers,
      correctIndex,
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddQuestion(data); 
        setError(""); 
        setPrompt("");
        setAnswers(["", "", "", ""]);
        setCorrectIndex(0); 
      })
      .catch((error) => {
        setError("Error creating question. Please try again.");
        console.error("Error creating question:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
      </label>
      <div>
        Answers:
        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = e.target.value;
              setAnswers(newAnswers);
            }}
            required
          />
        ))}
      </div>
      <label>
        Correct Answer Index:
        <input
          type="number"
          value={correctIndex}
          onChange={(e) => setCorrectIndex(Number(e.target.value))}
          min="0"
          max="3"
          required
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;
