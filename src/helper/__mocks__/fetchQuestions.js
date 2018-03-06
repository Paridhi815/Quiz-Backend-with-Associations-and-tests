const fetchQuestions = () => {
  const data = {
    allQuestions: [
      {
        question: 'What is the capital of India',
        questionId: 12,
        option1: 'New Delhi',
        option2: 'MP',
        option3: 'UP',
        option4: 'Bangalore',
      },
      {
        question: 'What is the capital of Afghanistan',
        questionId: 23,
        option1: 'Kabul',
        option2: 'Tirana',
        option3: 'Algiers',
        option4: 'Andorra la Vella',
      },
      {
        question: 'What is the capital of Marshall Islands',
        questionId: 45,
        option1: 'Kabul',
        option2: 'Antananarivo',
        option3: 'Majuro',
        option4: 'Andorra la Vella',
      },
      {
        question: 'What is the capital of Micronesia',
        questionId: 56,
        option1: 'Palikir',
        option2: 'Antananarivo',
        option3: 'Majuro',
        option4: 'Andorra la Vella',
      },
      {
        question: 'What is the capital of Monaco',
        questionId: 67,
        option1: 'Palikir',
        option2: 'Monaco',
        option3: 'Majuro',
        option4: 'Andorra la Vella',
      },
    ],
  };
  return Promise.resolve(data);
};

module.exports = {
  fetchQuestions,
};

