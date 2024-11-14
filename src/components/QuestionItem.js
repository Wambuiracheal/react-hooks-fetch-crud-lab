import React from 'react'

function QuestionItem({ question, onDelete, onUpdate }) {
  function handleDelete() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then(() => onDelete(question.id)) 
      .catch((error) => console.error("Error deleting question:", error));
  }

  function handleCorrectAnswerChange(event) {
    const newCorrectIndex = parseInt(event.target.value, 10);

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update question");
        return response.json();
      })
      .then(() => onUpdate(question.id, newCorrectIndex))
      .catch((error) => console.error("Error updating question:", error));
  }

  return (
    <li>
      <h4>{question.prompt}</h4>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <label>
        Correct Answer:
        <select value={question.correctIndex} onChange={handleCorrectAnswerChange}>
          {question.answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem