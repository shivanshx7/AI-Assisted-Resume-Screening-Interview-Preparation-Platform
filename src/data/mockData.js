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
  },
  {
    id: 'S113',
    name: 'Aarav Kumar',
    participation: 78,
    quizScore: 85,
    sentiment: 'Positive',
    engagementScore: 81,
    category: 'High',
    atRisk: false,
    weeklyHistory: [76, 79, 83, 81],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-20', text: 'Strong performance in recent quizzes.' }
    ]
  },
  {
    id: 'S114',
    name: 'Vihaan Agarwal',
    participation: 55,
    quizScore: 60,
    sentiment: 'Neutral',
    engagementScore: 57,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [52, 58, 55, 57],
    sentimentHistory: ['Neutral', 'Neutral', 'Neutral', 'Neutral'],
    feedback: [
      { date: '2023-10-21', text: 'Needs more focus during lectures.' }
    ]
  },
  {
    id: 'S115',
    name: 'Saanvi Sharma',
    participation: 90,
    quizScore: 92,
    sentiment: 'Positive',
    engagementScore: 91,
    category: 'High',
    atRisk: false,
    weeklyHistory: [88, 90, 93, 91],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-22', text: 'Outstanding participation.' }
    ]
  },
  {
    id: 'S116',
    name: 'Arjun Rao',
    participation: 70,
    quizScore: 75,
    sentiment: 'Neutral',
    engagementScore: 72,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [68, 72, 74, 72],
    sentimentHistory: ['Neutral', 'Neutral', 'Positive', 'Neutral'],
    feedback: [
      { date: '2023-10-23', text: 'Good progress in assignments.' }
    ]
  },
  {
    id: 'S117',
    name: 'Anika Singh',
    participation: 45,
    quizScore: 50,
    sentiment: 'Negative',
    engagementScore: 47,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [50, 48, 45, 47],
    sentimentHistory: ['Neutral', 'Neutral', 'Negative', 'Negative'],
    feedback: [
      { date: '2023-10-24', text: 'Struggling with participation.' }
    ]
  },
  {
    id: 'S118',
    name: 'Rohan Mehta',
    participation: 88,
    quizScore: 85,
    sentiment: 'Positive',
    engagementScore: 86,
    category: 'High',
    atRisk: false,
    weeklyHistory: [83, 85, 88, 86],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-25', text: 'Excellent teamwork.' }
    ]
  },
  {
    id: 'S119',
    name: 'Ishaan Gupta',
    participation: 62,
    quizScore: 68,
    sentiment: 'Neutral',
    engagementScore: 65,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [60, 65, 67, 65],
    sentimentHistory: ['Neutral', 'Neutral', 'Neutral', 'Neutral'],
    feedback: [
      { date: '2023-10-26', text: 'Consistent effort.' }
    ]
  },
  {
    id: 'S120',
    name: 'Aanya Patel',
    participation: 30,
    quizScore: 35,
    sentiment: 'Negative',
    engagementScore: 32,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [35, 33, 30, 32],
    sentimentHistory: ['Negative', 'Negative', 'Negative', 'Negative'],
    feedback: [
      { date: '2023-10-27', text: 'Needs significant improvement.' }
    ]
  },
  {
    id: 'S121',
    name: 'Vivaan Joshi',
    participation: 95,
    quizScore: 98,
    sentiment: 'Positive',
    engagementScore: 96,
    category: 'High',
    atRisk: false,
    weeklyHistory: [93, 95, 97, 96],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-28', text: 'Top of the class.' }
    ]
  },
  {
    id: 'S122',
    name: 'Diya Malhotra',
    participation: 75,
    quizScore: 80,
    sentiment: 'Positive',
    engagementScore: 77,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [73, 76, 79, 77],
    sentimentHistory: ['Neutral', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-29', text: 'Great quiz scores.' }
    ]
  },
  {
    id: 'S123',
    name: 'Advait Kapoor',
    participation: 50,
    quizScore: 55,
    sentiment: 'Neutral',
    engagementScore: 52,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [55, 53, 50, 52],
    sentimentHistory: ['Neutral', 'Neutral', 'Neutral', 'Neutral'],
    feedback: [
      { date: '2023-10-30', text: 'Falling behind.' }
    ]
  },
  {
    id: 'S124',
    name: 'Kiara Das',
    participation: 82,
    quizScore: 87,
    sentiment: 'Positive',
    engagementScore: 84,
    category: 'High',
    atRisk: false,
    weeklyHistory: [80, 83, 86, 84],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-10-31', text: 'Very engaged.' }
    ]
  },
  {
    id: 'S125',
    name: 'Reyansh Mehra',
    participation: 68,
    quizScore: 72,
    sentiment: 'Neutral',
    engagementScore: 70,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [66, 69, 71, 70],
    sentimentHistory: ['Neutral', 'Neutral', 'Neutral', 'Neutral'],
    feedback: [
      { date: '2023-11-01', text: 'Steady performance.' }
    ]
  },
  {
    id: 'S126',
    name: 'Myra Reddy',
    participation: 40,
    quizScore: 45,
    sentiment: 'Negative',
    engagementScore: 42,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [45, 43, 40, 42],
    sentimentHistory: ['Neutral', 'Negative', 'Negative', 'Negative'],
    feedback: [
      { date: '2023-11-02', text: 'Low participation.' }
    ]
  },
  {
    id: 'S127',
    name: 'Atharv Chawla',
    participation: 91,
    quizScore: 94,
    sentiment: 'Positive',
    engagementScore: 92,
    category: 'High',
    atRisk: false,
    weeklyHistory: [89, 91, 93, 92],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-11-03', text: 'Exceptional work.' }
    ]
  },
  {
    id: 'S128',
    name: 'Zara Verma',
    participation: 73,
    quizScore: 78,
    sentiment: 'Neutral',
    engagementScore: 75,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [71, 74, 77, 75],
    sentimentHistory: ['Neutral', 'Neutral', 'Positive', 'Neutral'],
    feedback: [
      { date: '2023-11-04', text: 'Good balance.' }
    ]
  },
  {
    id: 'S129',
    name: 'Aarush Jain',
    participation: 35,
    quizScore: 40,
    sentiment: 'Negative',
    engagementScore: 37,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [40, 38, 35, 37],
    sentimentHistory: ['Negative', 'Negative', 'Negative', 'Negative'],
    feedback: [
      { date: '2023-11-05', text: 'Needs help.' }
    ]
  },
  {
    id: 'S130',
    name: 'Anaya Iyer',
    participation: 87,
    quizScore: 90,
    sentiment: 'Positive',
    engagementScore: 88,
    category: 'High',
    atRisk: false,
    weeklyHistory: [85, 87, 89, 88],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-11-06', text: 'High achiever.' }
    ]
  },
  {
    id: 'S131',
    name: 'Veer Khanna',
    participation: 65,
    quizScore: 70,
    sentiment: 'Neutral',
    engagementScore: 67,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [63, 66, 69, 67],
    sentimentHistory: ['Neutral', 'Neutral', 'Neutral', 'Neutral'],
    feedback: [
      { date: '2023-11-07', text: 'Average performance.' }
    ]
  },
  {
    id: 'S132',
    name: 'Siya Bansal',
    participation: 25,
    quizScore: 30,
    sentiment: 'Negative',
    engagementScore: 27,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [30, 28, 25, 27],
    sentimentHistory: ['Negative', 'Negative', 'Negative', 'Negative'],
    feedback: [
      { date: '2023-11-08', text: 'Very low engagement.' }
    ]
  },
  {
    id: 'S133',
    name: 'Arnav Saxena',
    participation: 93,
    quizScore: 96,
    sentiment: 'Positive',
    engagementScore: 94,
    category: 'High',
    atRisk: false,
    weeklyHistory: [91, 93, 95, 94],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-11-09', text: 'Outstanding.' }
    ]
  },
  {
    id: 'S134',
    name: 'Kavya Thakur',
    participation: 77,
    quizScore: 82,
    sentiment: 'Positive',
    engagementScore: 79,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [75, 78, 81, 79],
    sentimentHistory: ['Neutral', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-11-10', text: 'Improving steadily.' }
    ]
  },
  {
    id: 'S135',
    name: 'Rudra Pandey',
    participation: 48,
    quizScore: 53,
    sentiment: 'Neutral',
    engagementScore: 50,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [53, 51, 48, 50],
    sentimentHistory: ['Neutral', 'Neutral', 'Neutral', 'Neutral'],
    feedback: [
      { date: '2023-11-11', text: 'Needs motivation.' }
    ]
  },
  {
    id: 'S136',
    name: 'Nisha Choudhury',
    participation: 84,
    quizScore: 89,
    sentiment: 'Positive',
    engagementScore: 86,
    category: 'High',
    atRisk: false,
    weeklyHistory: [82, 85, 88, 86],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-11-12', text: 'Very active.' }
    ]
  },
  {
    id: 'S137',
    name: 'Devansh Nair',
    participation: 69,
    quizScore: 74,
    sentiment: 'Neutral',
    engagementScore: 71,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [67, 70, 73, 71],
    sentimentHistory: ['Neutral', 'Neutral', 'Neutral', 'Neutral'],
    feedback: [
      { date: '2023-11-13', text: 'Solid work.' }
    ]
  },
  {
    id: 'S138',
    name: 'Aisha Gill',
    participation: 32,
    quizScore: 37,
    sentiment: 'Negative',
    engagementScore: 34,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [37, 35, 32, 34],
    sentimentHistory: ['Negative', 'Negative', 'Negative', 'Negative'],
    feedback: [
      { date: '2023-11-14', text: 'Struggling.' }
    ]
  },
  {
    id: 'S139',
    name: 'Kabir Bhatia',
    participation: 89,
    quizScore: 92,
    sentiment: 'Positive',
    engagementScore: 90,
    category: 'High',
    atRisk: false,
    weeklyHistory: [87, 89, 91, 90],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-11-15', text: 'Excellent.' }
    ]
  },
  {
    id: 'S140',
    name: 'Riya Arora',
    participation: 74,
    quizScore: 79,
    sentiment: 'Neutral',
    engagementScore: 76,
    category: 'Medium',
    atRisk: false,
    weeklyHistory: [72, 75, 78, 76],
    sentimentHistory: ['Neutral', 'Neutral', 'Positive', 'Neutral'],
    feedback: [
      { date: '2023-11-16', text: 'Good effort.' }
    ]
  },
  {
    id: 'S141',
    name: 'Aarav Yadav',
    participation: 38,
    quizScore: 43,
    sentiment: 'Negative',
    engagementScore: 40,
    category: 'Low',
    atRisk: true,
    weeklyHistory: [43, 41, 38, 40],
    sentimentHistory: ['Negative', 'Negative', 'Negative', 'Negative'],
    feedback: [
      { date: '2023-11-17', text: 'Needs support.' }
    ]
  },
  {
    id: 'S142',
    name: 'Priya Sinha',
    participation: 86,
    quizScore: 91,
    sentiment: 'Positive',
    engagementScore: 88,
    category: 'High',
    atRisk: false,
    weeklyHistory: [84, 86, 90, 88],
    sentimentHistory: ['Positive', 'Positive', 'Positive', 'Positive'],
    feedback: [
      { date: '2023-11-18', text: 'Great performance.' }
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
