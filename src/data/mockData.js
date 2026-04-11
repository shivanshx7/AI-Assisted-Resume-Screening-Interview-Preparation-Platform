export const mockStudents = [
  {
    id: 'S101',
    name: 'Rahul Sharma',
    participation: 35,
    quizScore: 42,
    sentiment: 'Negative',
    engagementScore: 38,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [60, 50, 45, 38],
    sentimentHistory: ['Neutral', 'Neutral', 'Negative', 'Negative'],
    feedback: [
      { date: '2023-10-12', text: 'Struggling with advanced topics.' },
      { date: '2023-10-19', text: 'Missed two assignments this week.' }
    ]
  },
  {
    id: 'S102',
    name: 'Priya Patel',
    participation: 92,
    quizScore: 88,
    sentiment: 'Positive',
    engagementScore: 90,
    category: 'High',
    atRisk: false,
    weeklyHistory: [85, 88, 91, 90],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-15', text: 'Excellent participation in group work.' }
    ]
  },
  {
    id: 'S103',
    name: 'Aditya Singh',
    participation: 65,
    quizScore: 70,
    sentiment: 'Neutral',
    engagementScore: 68,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [70, 72, 65, 68],
    sentimentHistory: ['Positive', 'Neutral', 'Neutral', 'Neutral'],
    feedback: [
      { date: '2023-10-10', text: 'Needs to speak up more in class.' }
    ]
  },
  {
    id: 'S104',
    name: 'Ananya Verma',
    participation: 80,
    quizScore: 85,
    sentiment: 'Positive',
    engagementScore: 82,
    category: 'High',
    atRisk: false,
    weeklyHistory: [78, 80, 85, 82],
    sentimentHistory: ['Neutral', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-18', text: 'Great improvement in quizzes.' }
    ]
  },
  {
    id: 'S105',
    name: 'Rohan Gupta',
    participation: 40,
    quizScore: 48,
    sentiment: 'Negative',
    engagementScore: 44,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [55, 48, 45, 44],
    sentimentHistory: ['Neutral', 'Negative', 'Negative', 'Negative'],
    feedback: [
      { date: '2023-10-20', text: 'Consistently distracted during lectures.' }
    ]
  },
  {
    id: 'S106',
    name: 'Meera Reddy',
    participation: 95,
    quizScore: 95,
    sentiment: 'Positive',
    engagementScore: 95,
    category: 'High',
    atRisk: false,
    weeklyHistory: [92, 94, 96, 95],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-21', text: 'Top performer this week.' }
    ]
  },
  {
    id: 'S107',
    name: 'Vikram Chawla',
    participation: 60,
    quizScore: 65,
    sentiment: 'Neutral',
    engagementScore: 62,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [65, 60, 68, 62],
    sentimentHistory: ['Neutral', 'Negative', 'Neutral', 'Neutral'],
    feedback: [
      { date: '2023-10-14', text: 'Consistent, but could engage more deeply.' }
    ]
  },
  {
    id: 'S108',
    name: 'Sneha Joshi',
    participation: 30,
    quizScore: 35,
    sentiment: 'Negative',
    engagementScore: 32,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [40, 38, 35, 32],
    sentimentHistory: ['Negative', 'Negative', 'Negative', 'Negative'],
    feedback: [
      { date: '2023-10-22', text: 'Frequent absences impacting performance.' }
    ]
  },
  {
    id: 'S109',
    name: 'Karan Malhotra',
    participation: 88,
    quizScore: 90,
    sentiment: 'Positive',
    engagementScore: 89,
    category: 'High',
    atRisk: false,
    weeklyHistory: [85, 87, 88, 89],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-17', text: 'Very communicative and helpful to peers.' }
    ]
  },
  {
    id: 'S110',
    name: 'Neha Kapoor',
    participation: 75,
    quizScore: 78,
    sentiment: 'Neutral',
    engagementScore: 76,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [70, 75, 78, 76],
    sentimentHistory: ['Neutral', 'Neutral', 'Positive', 'Neutral'],
    feedback: [
      { date: '2023-10-16', text: 'Good grasp of concepts, needs more practice.' }
    ]
  },
  {
    id: 'S111',
    name: 'Arjun Das',
    participation: 45,
    quizScore: 50,
    sentiment: 'Neutral',
    engagementScore: 47,
    category: 'Low',
    atRisk: false,
    weeklyHistory: [50, 48, 45, 47],
    sentimentHistory: ['Neutral', 'Neutral', 'Neutral', 'Neutral'],
    feedback: [
      { date: '2023-10-18', text: 'Starting to fall behind in reading materials.' }
    ]
  },
  {
    id: 'S112',
    name: 'Tanya Mehra',
    participation: 85,
    quizScore: 82,
    sentiment: 'Positive',
    engagementScore: 83,
    category: 'High',
    atRisk: false,
    weeklyHistory: [80, 82, 85, 83],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-19', text: 'Actively participating in all discussions.' }
    ]
  }
];

export const classAverageTrends = [
  { week: 'Week 1', average: 72 },
  { week: 'Week 2', average: 75 },
  { week: 'Week 3', average: 71 },
  { week: 'Week 4', average: 73 }
];

export const sentimentDistribution = [
  { name: 'Positive', value: 35 },
  { name: 'Neutral', value: 45 },
  { name: 'Negative', value: 20 }
];

export const categoryDistribution = [
  { name: 'High', value: 45 },
  { name: 'Medium', value: 30 },
  { name: 'Low', value: 25 }
];
