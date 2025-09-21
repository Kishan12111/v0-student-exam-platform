export interface CalendarEvent {
  id: string
  date: string
  type: "editorial" | "quiz" | "deadline" | "exam"
  title: string
  status: "completed" | "attempted" | "missed" | "upcoming"
  score?: number
}

export interface StudyStreak {
  currentStreak: number
  longestStreak: number
  lastStudyDate: string
}

export interface LeaderboardEntry {
  id: string
  name: string
  avatar?: string
  totalPoints: number
  rank: number
  weeklyPoints: number
  streak: number
  level: number
  badges: Badge[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  points: number
  badge?: Badge
  progress: number
  target: number
  completed: boolean
}

export interface Editorial {
  id: string
  title: string
  date: string
  content: string
  summary: string
  category: "politics" | "economy" | "environment" | "social" | "international"
  readTime: number
  vocabularyWords: VocabularyWord[]
  quiz: Quiz
  isCompleted: boolean
  score?: number
}

export interface VocabularyWord {
  id: string
  word: string
  meaning: string
  hindiMeaning: string
  pronunciation: string
  example: string
  difficulty: "easy" | "medium" | "hard"
  category: string
}

export interface Quiz {
  id: string
  editorialId: string
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

// Mock calendar events
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "editorial",
    title: "Digital India Initiative",
    status: "completed",
    score: 85,
  },
  {
    id: "2",
    date: "2024-01-15",
    type: "quiz",
    title: "Digital India Quiz",
    status: "completed",
    score: 85,
  },
  {
    id: "3",
    date: "2024-01-14",
    type: "editorial",
    title: "Climate Change and Renewable Energy",
    status: "completed",
    score: 92,
  },
  {
    id: "4",
    date: "2024-01-14",
    type: "quiz",
    title: "Climate Change Quiz",
    status: "attempted",
    score: 65,
  },
  {
    id: "5",
    date: "2024-01-13",
    type: "editorial",
    title: "Economic Survey Highlights",
    status: "missed",
  },
  {
    id: "6",
    date: "2024-01-16",
    type: "deadline",
    title: "Monthly Assessment",
    status: "upcoming",
  },
  {
    id: "7",
    date: "2024-01-20",
    type: "exam",
    title: "SSC CGL Mock Test",
    status: "upcoming",
  },
]

export const mockStudyStreak: StudyStreak = {
  currentStreak: 7,
  longestStreak: 15,
  lastStudyDate: "2024-01-15",
}

// Mock leaderboard data
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: "1",
    name: "Priya Sharma",
    totalPoints: 2450,
    rank: 1,
    weeklyPoints: 380,
    streak: 15,
    level: 8,
    badges: [
      { id: "1", name: "Quiz Master", description: "Complete 50 quizzes", icon: "🏆", rarity: "epic" },
      { id: "2", name: "Streak Champion", description: "Maintain 14-day streak", icon: "🔥", rarity: "rare" },
    ],
  },
  {
    id: "2",
    name: "Rahul Kumar",
    totalPoints: 2380,
    rank: 2,
    weeklyPoints: 420,
    streak: 12,
    level: 7,
    badges: [
      { id: "3", name: "Early Bird", description: "Study before 7 AM", icon: "🌅", rarity: "common" },
      { id: "4", name: "Vocabulary Expert", description: "Master 100 words", icon: "📚", rarity: "rare" },
    ],
  },
  {
    id: "3",
    name: "Anjali Patel",
    totalPoints: 2250,
    rank: 3,
    weeklyPoints: 350,
    streak: 8,
    level: 7,
    badges: [{ id: "5", name: "Perfect Score", description: "Get 100% in a quiz", icon: "⭐", rarity: "rare" }],
  },
  {
    id: "4",
    name: "Vikram Singh",
    totalPoints: 2100,
    rank: 4,
    weeklyPoints: 290,
    streak: 6,
    level: 6,
    badges: [
      { id: "6", name: "Consistent Learner", description: "Study 7 days in a row", icon: "📈", rarity: "common" },
    ],
  },
  {
    id: "5",
    name: "You",
    totalPoints: 1850,
    rank: 42,
    weeklyPoints: 180,
    streak: 7,
    level: 5,
    badges: [
      { id: "7", name: "First Steps", description: "Complete first editorial", icon: "👶", rarity: "common" },
      { id: "8", name: "Quiz Starter", description: "Complete 10 quizzes", icon: "🎯", rarity: "common" },
    ],
  },
]

// Mock achievements data
export const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Reading Streak",
    description: "Read editorials for 7 consecutive days",
    points: 100,
    progress: 7,
    target: 7,
    completed: true,
    badge: { id: "streak7", name: "Week Warrior", description: "7-day reading streak", icon: "🔥", rarity: "common" },
  },
  {
    id: "2",
    title: "Quiz Master",
    description: "Complete 25 quizzes with 80%+ score",
    points: 250,
    progress: 18,
    target: 25,
    completed: false,
  },
  {
    id: "3",
    title: "Vocabulary Builder",
    description: "Master 50 vocabulary words",
    points: 200,
    progress: 32,
    target: 50,
    completed: false,
  },
  {
    id: "4",
    title: "Perfect Score",
    description: "Get 100% in any quiz",
    points: 150,
    progress: 0,
    target: 1,
    completed: false,
    badge: { id: "perfect", name: "Perfectionist", description: "100% quiz score", icon: "⭐", rarity: "rare" },
  },
  {
    id: "5",
    title: "Early Bird",
    description: "Study before 7 AM for 5 days",
    points: 120,
    progress: 2,
    target: 5,
    completed: false,
    badge: { id: "early", name: "Early Bird", description: "Morning study sessions", icon: "🌅", rarity: "common" },
  },
]

// Mock editorials data
export const mockEditorials: Editorial[] = [
  {
    id: "1",
    title: "Digital India Initiative: Transforming Governance",
    date: "2024-01-15",
    category: "politics",
    readTime: 8,
    summary:
      "An analysis of Digital India's impact on governance, citizen services, and digital infrastructure development.",
    content: `The Digital India initiative, launched in 2015, has been a transformative force in modernizing India's governance and public service delivery. This ambitious program aims to transform India into a digitally empowered society and knowledge economy.

The initiative encompasses three key areas: digital infrastructure as a core utility, governance and services on demand, and digital empowerment of citizens. The program has made significant strides in creating a robust digital infrastructure across the country.

One of the most notable achievements has been the expansion of broadband connectivity. The BharatNet project aims to connect all gram panchayats with high-speed internet, bridging the digital divide between urban and rural areas. This infrastructure development has been crucial for enabling digital services in remote areas.

The Common Service Centers (CSCs) have emerged as vital touchpoints for digital service delivery in rural areas. These centers provide various government services, including Aadhaar enrollment, banking services, and certificate issuance, making governance more accessible to citizens.

The Jan Aushadhi scheme, integrated with digital platforms, has improved access to affordable medicines. Digital payment systems have revolutionized financial transactions, with initiatives like UPI (Unified Payments Interface) gaining widespread adoption.

However, challenges remain in terms of digital literacy, cybersecurity, and ensuring equitable access across all sections of society. The government must continue to focus on capacity building and creating awareness about digital services.

The COVID-19 pandemic highlighted the importance of digital infrastructure, with services like telemedicine, online education, and digital payments becoming essential. This has accelerated the adoption of digital technologies across various sectors.

Moving forward, the focus should be on strengthening cybersecurity measures, improving digital literacy, and ensuring that the benefits of digitalization reach all citizens, particularly those in marginalized communities.`,
    vocabularyWords: [
      {
        id: "1",
        word: "encompass",
        meaning: "to include or contain as a part of something larger",
        hindiMeaning: "शामिल करना, घेरना",
        pronunciation: "/ɪnˈkʌmpəs/",
        example: "The program encompasses three key areas of development.",
        difficulty: "medium",
        category: "general",
      },
      {
        id: "2",
        word: "robust",
        meaning: "strong and healthy; vigorous",
        hindiMeaning: "मजबूत, दृढ़",
        pronunciation: "/roʊˈbʌst/",
        example: "The country needs a robust digital infrastructure.",
        difficulty: "medium",
        category: "general",
      },
      {
        id: "3",
        word: "marginalized",
        meaning: "treated as insignificant or peripheral",
        hindiMeaning: "हाशिए पर धकेला गया",
        pronunciation: "/ˈmɑːrdʒɪnəlaɪzd/",
        example: "The benefits should reach marginalized communities.",
        difficulty: "hard",
        category: "social",
      },
    ],
    quiz: {
      id: "quiz-1",
      editorialId: "1",
      questions: [
        {
          id: "q1",
          question: "What are the three key areas of the Digital India initiative?",
          options: [
            "Infrastructure, governance, and empowerment",
            "Technology, education, and healthcare",
            "Banking, communication, and transport",
            "Urban development, rural development, and industry",
          ],
          correctAnswer: 0,
          explanation:
            "Digital India focuses on digital infrastructure as core utility, governance and services on demand, and digital empowerment of citizens.",
        },
        {
          id: "q2",
          question: "What is the primary objective of the BharatNet project?",
          options: [
            "To provide free smartphones to citizens",
            "To connect all gram panchayats with high-speed internet",
            "To establish digital libraries in cities",
            "To create employment in the IT sector",
          ],
          correctAnswer: 1,
          explanation:
            "BharatNet aims to connect all gram panchayats with high-speed internet to bridge the digital divide.",
        },
        {
          id: "q3",
          question: "Which payment system has gained widespread adoption in India?",
          options: ["Credit cards", "Debit cards", "UPI (Unified Payments Interface)", "Net banking"],
          correctAnswer: 2,
          explanation: "UPI has revolutionized digital payments in India with its widespread adoption and ease of use.",
        },
      ],
    },
    isCompleted: true,
    score: 85,
  },
  {
    id: "2",
    title: "Climate Change and Renewable Energy Transition",
    date: "2024-01-14",
    category: "environment",
    readTime: 10,
    summary:
      "Examining India's renewable energy goals, challenges in climate action, and the path toward sustainable development.",
    content: `India's commitment to combating climate change has been demonstrated through ambitious renewable energy targets and policy initiatives. The country has set a target of achieving 500 GW of renewable energy capacity by 2030, which represents a significant leap from current levels.

The renewable energy sector has witnessed remarkable growth, with solar and wind power leading the charge. The cost of solar energy has decreased dramatically, making it competitive with conventional energy sources. This cost reduction has been driven by technological advancements, economies of scale, and supportive government policies.

The National Solar Mission, part of the National Action Plan on Climate Change, has been instrumental in promoting solar energy adoption. Large-scale solar parks and rooftop solar installations have contributed to the rapid expansion of solar capacity.

Wind energy has also shown substantial growth, with India ranking among the top countries in wind power generation. The development of offshore wind energy presents new opportunities for further expansion of renewable energy capacity.

However, challenges remain in terms of grid integration, energy storage, and financing. The intermittent nature of renewable energy sources requires sophisticated grid management and storage solutions. Battery technology and pumped hydro storage are being explored as viable options.

The transition to renewable energy is not just an environmental imperative but also an economic opportunity. The sector has the potential to create millions of jobs and reduce India's dependence on fossil fuel imports.

International cooperation and technology transfer play crucial roles in accelerating the renewable energy transition. India's participation in global initiatives like the International Solar Alliance demonstrates its commitment to leading climate action.

The success of renewable energy transition will depend on continued policy support, technological innovation, and public-private partnerships. Investment in research and development, skill development, and infrastructure will be critical for achieving the ambitious targets.`,
    vocabularyWords: [
      {
        id: "4",
        word: "intermittent",
        meaning: "occurring at irregular intervals; not continuous",
        hindiMeaning: "रुक-रुक कर होने वाला",
        pronunciation: "/ˌɪntərˈmɪtənt/",
        example: "Solar energy is intermittent due to weather conditions.",
        difficulty: "hard",
        category: "technical",
      },
      {
        id: "5",
        word: "imperative",
        meaning: "of vital importance; crucial",
        hindiMeaning: "अत्यावश्यक, जरूरी",
        pronunciation: "/ɪmˈperətɪv/",
        example: "Climate action is an environmental imperative.",
        difficulty: "medium",
        category: "general",
      },
    ],
    quiz: {
      id: "quiz-2",
      editorialId: "2",
      questions: [
        {
          id: "q4",
          question: "What is India's renewable energy target for 2030?",
          options: ["200 GW", "350 GW", "500 GW", "750 GW"],
          correctAnswer: 2,
          explanation: "India has set an ambitious target of 500 GW renewable energy capacity by 2030.",
        },
        {
          id: "q5",
          question: "Which factors have contributed to the cost reduction in solar energy?",
          options: [
            "Government subsidies only",
            "Technological advancements, economies of scale, and supportive policies",
            "International aid",
            "Reduced labor costs",
          ],
          correctAnswer: 1,
          explanation:
            "The cost reduction has been driven by technological advancements, economies of scale, and supportive government policies.",
        },
      ],
    },
    isCompleted: true,
    score: 92,
  },
]

// Mock quizzes data
export const mockQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    editorialId: "1",
    questions: [
      {
        id: "q1",
        question: "What are the three key areas of the Digital India initiative?",
        options: [
          "Infrastructure, governance, and empowerment",
          "Technology, education, and healthcare",
          "Banking, communication, and transport",
          "Urban development, rural development, and industry",
        ],
        correctAnswer: 0,
        explanation:
          "Digital India focuses on digital infrastructure as core utility, governance and services on demand, and digital empowerment of citizens.",
      },
      {
        id: "q2",
        question: "What is the primary objective of the BharatNet project?",
        options: [
          "To provide free smartphones to citizens",
          "To connect all gram panchayats with high-speed internet",
          "To establish digital libraries in cities",
          "To create employment in the IT sector",
        ],
        correctAnswer: 1,
        explanation:
          "BharatNet aims to connect all gram panchayats with high-speed internet to bridge the digital divide.",
      },
      {
        id: "q3",
        question: "Which payment system has gained widespread adoption in India?",
        options: ["Credit cards", "Debit cards", "UPI (Unified Payments Interface)", "Net banking"],
        correctAnswer: 2,
        explanation: "UPI has revolutionized digital payments in India with its widespread adoption and ease of use.",
      },
    ],
  },
  {
    id: "quiz-2",
    editorialId: "2",
    questions: [
      {
        id: "q4",
        question: "What is India's renewable energy target for 2030?",
        options: ["200 GW", "350 GW", "500 GW", "750 GW"],
        correctAnswer: 2,
        explanation: "India has set an ambitious target of 500 GW renewable energy capacity by 2030.",
      },
      {
        id: "q5",
        question: "Which factors have contributed to the cost reduction in solar energy?",
        options: [
          "Government subsidies only",
          "Technological advancements, economies of scale, and supportive policies",
          "International aid",
          "Reduced labor costs",
        ],
        correctAnswer: 1,
        explanation:
          "The cost reduction has been driven by technological advancements, economies of scale, and supportive government policies.",
      },
    ],
  },
]
