

const fetchAnswers = () => {
  const data = [
    {
      id: 1,
      questionId: 12,
      correctanswer: 'New Delhi',
      createdAt: '2018-03-09T06:30:03.809Z',
      updatedAt: '2018-03-09T06:30:03.809Z',
    },
    {
      id: 2,
      questionId: 23,
      correctanswer: 'Kabul',
      createdAt: '2018-03-09T06:30:03.809Z',
      updatedAt: '2018-03-09T06:30:03.809Z',
    },
    {
      id: 3,
      questionId: 45,
      correctanswer: 'Majuro',
      createdAt: '2018-03-09T06:30:03.809Z',
      updatedAt: '2018-03-09T06:30:03.809Z',
    },
    {
      id: 4,
      questionId: 56,
      correctanswer: 'Palikir',
      createdAt: '2018-03-09T06:30:03.809Z',
      updatedAt: '2018-03-09T06:30:03.809Z',
    },
    {
      id: 5,
      questionId: 67,
      correctanswer: 'Majuro',
      createdAt: '2018-03-09T06:30:03.809Z',
      updatedAt: '2018-03-09T06:30:03.809Z',
    },
  ];


  return Promise.resolve(data);
};

module.exports = {
  fetchAnswers,
};

