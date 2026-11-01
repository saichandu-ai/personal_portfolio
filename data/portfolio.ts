export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  tags: string[];
  features: string[];
  featured?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  score: string;
  scoreLabel: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  items: {
    name: string;
    description: string;
    icon: string;
  }[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  description: string;
  credentialUrl?: string | null;
  date?: string;
  badgeType: "azure" | "fcc" | "general";
}

export interface JourneyMilestone {
  step: string;
  title: string;
  status: "Completed Foundation" | "Active Exploration" | "Expanding Frontier";
  description: string;
  focusAreas: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    role: string;
    headline: string;
    description: string;
    email: string;
    location: string;
    social: {
      linkedin: string;
      github: string;
    };
    resume: {
      fileName: string;
      filePath: string;
      isAvailable: boolean;
    };
  };
  about: {
    heading: string;
    subheading: string;
    intro: string;
    philosophy: string;
    interests: string[];
    pillars: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  education: EducationItem[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: CertificationItem[];
  journey: JourneyMilestone[];
  contact: {
    heading: string;
    subheading: string;
    note: string;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "TADIKAMALLA VENKATA SAI CHANDU",
    firstName: "Sai Chandu",
    lastName: "Tadikamalla",
    role: "B.Tech Artificial Intelligence & Machine Learning Student",
    headline: "Building Tomorrow Through Technology, Creativity & Intelligence.",
    description:
      "Exploring Artificial Intelligence, Machine Learning and software development while transforming ideas into meaningful digital experiences.",
    email: "saichandutadikamalla@gmail.com",
    location: "Jonnalagadda / Chilakaluripeta, Andhra Pradesh, India",
    social: {
      linkedin: "https://www.linkedin.com/in/saichandutadikamalla",
      github: "https://github.com/saichandu-ai",
    },
    resume: {
      fileName: "Tadikamalla_Venkata_Sai_Chandu_Resume.pdf",
      filePath: "/resume/Tadikamalla_Venkata_Sai_Chandu_Resume.pdf",
      isAvailable: false, // Set to true when PDF is placed in public/resume/
    },
  },

  about: {
    heading: "Beyond the Code",
    subheading: "STUDENT • BUILDER • AI PRACTITIONER",
    intro:
      "I am an Artificial Intelligence and Machine Learning student passionate about programming, emerging technologies and building practical digital solutions.",
    philosophy:
      "I believe the intersection of mathematical reasoning and creative software engineering is where the next technological frontier lies. My journey is centered around disciplined curiosity—mastering core engineering principles first, then applying intelligent algorithms to build tools that solve genuine problems.",
    interests: [
      "Artificial Intelligence",
      "Machine Learning",
      "Generative AI",
      "AI Agents",
      "Software Development",
      "Emerging Technologies",
    ],
    pillars: [
      {
        title: "Intelligent Systems",
        description:
          "Investigating supervised and unsupervised learning algorithms, probabilistic models, and agent architectures.",
        icon: "BrainCircuit",
      },
      {
        title: "Structured Engineering",
        description:
          "Writing robust, maintainable code in C, Java, and Python with clean architectural separation and algorithmic rigor.",
        icon: "Cpu",
      },
      {
        title: "Emerging Tech & WebGL",
        description:
          "Exploring modern interactive digital spaces, generative AI workflows, and cutting-edge user interfaces.",
        icon: "Sparkles",
      },
    ],
  },

  education: [
    {
      id: "edu-01",
      degree: "B.Tech – Artificial Intelligence & Machine Learning",
      institution: "Tirumala Engineering College, Jonnalagadda",
      duration: "2024–2028",
      score: "8.7",
      scoreLabel: "CGPA",
      highlights: [
        "Core Artificial Intelligence & Machine Learning specialization",
        "Foundations in Data Structures, Discrete Mathematics & Algorithms",
        "Active member of academic tech clubs and collaborative coding groups",
      ],
    },
    {
      id: "edu-02",
      degree: "Intermediate – MPC",
      institution: "Sri Chaitanya Junior College, ChilakaluriPeta",
      duration: "2022–2024",
      score: "96.8%",
      scoreLabel: "Percentage",
      highlights: [
        "Rigorous coursework in Higher Mathematics, Physics, and Chemistry",
        "Top-percentile academic achievement (96.8%)",
        "Analytical problem-solving and mathematical Olympiad preparation",
      ],
    },
    {
      id: "edu-03",
      degree: "SSC",
      institution: "Sai Vikas High School, Chilakaluripeta",
      duration: "2021–2022",
      score: "91%",
      scoreLabel: "Percentage",
      highlights: [
        "Strong foundation in science, computer basics, and computational thinking",
        "Graduated with 91% distinction",
        "Active participation in mathematics and science exhibitions",
      ],
    },
  ],

  skills: [
    {
      title: "Programming Languages",
      description: "Core languages used for problem solving, systems, and intelligence pipelines",
      items: [
        {
          name: "C",
          description: "Low-level computational logic, pointers, memory mechanics, and algorithmic efficiency.",
          icon: "Terminal",
        },
        {
          name: "Java",
          description: "Object-oriented design, modular architecture, collections, and robust software patterns.",
          icon: "FileCode2",
        },
        {
          name: "Python",
          description: "Primary language for AI/ML modeling, automation scripts, and rapid application prototyping.",
          icon: "Binary",
        },
        {
          name: "SQL",
          description: "Relational database modeling, complex queries, indexing, and data retrieval.",
          icon: "Database",
        },
      ],
    },
    {
      title: "Technology & Concepts",
      description: "Fundamental domains and collaborative developer tools",
      items: [
        {
          name: "Artificial Intelligence",
          description: "Core AI heuristics, search algorithms, state representation, and agent concepts.",
          icon: "Sparkles",
        },
        {
          name: "Machine Learning",
          description: "Supervised and unsupervised learning principles, model evaluation, and dataset processing.",
          icon: "Network",
        },
        {
          name: "GitHub",
          description: "Version control workflows, branch management, collaborative code review, and CI/CD basics.",
          icon: "GitBranch",
        },
      ],
    },
  ],

  projects: [
    {
      id: "vektra",
      title: "VEKTRA",
      category: "Creative Web & High-Performance Design",
      description:
        "A fictional premium high-performance electric motorcycle brand website created using AI-assisted development. Combines cinematic aesthetics, modern interactive interfaces, and cutting-edge visual presentation.",
      liveUrl: "https://vektra-55wa.onrender.com",
      githubUrl: null, // Placeholder: can be added anytime
      tags: ["Next.js", "WebGL", "Creative Development", "AI-Assisted", "Tailwind CSS"],
      features: [
        "Cinematic website design with bespoke branding",
        "Interactive visual experience & 3D aesthetic presentation",
        "Modern responsive interface with fluid transitions",
        "Deployed live on Render platform",
      ],
      featured: true,
    },
    {
      id: "job-application-tracker",
      title: "Job Application Tracker",
      category: "Python CLI Application",
      description:
        "A Python command-line application for managing job applications. Offers complete CRUD operations, JSON-based persistent storage, and organized status tracking for career opportunities.",
      liveUrl: null,
      githubUrl: null, // Placeholder: can be configured
      tags: ["Python", "CLI", "JSON Storage", "CRUD Operations", "Data Management"],
      features: [
        "Full lifecycle CRUD operations for job applications",
        "Structured JSON-based local database storage",
        "Status filters (Applied, Interviewing, Offered, Archived)",
        "Formatted terminal table outputs and search capability",
      ],
      featured: false,
    },
    {
      id: "personal-finance-manager",
      title: "Personal Finance Manager",
      category: "Python Terminal Application",
      description:
        "A Python terminal application to manage personal finances. Enables comprehensive income and expense tracking, transaction management, and automatic monthly financial summaries.",
      liveUrl: null,
      githubUrl: null, // Placeholder: can be configured
      tags: ["Python", "Finance", "Terminal UI", "Analytics", "Automation"],
      features: [
        "Income and expense ledger with category tagging",
        "Automated monthly expenditure summaries and breakdowns",
        "Input validation and persistent data records",
        "Quick balance check and financial health overview",
      ],
      featured: false,
    },
  ],

  certifications: [
    {
      id: "cert-01",
      title: "Microsoft Azure AI Fundamentals",
      issuer: "Microsoft",
      description:
        "Foundational mastery of Artificial Intelligence and Machine Learning workloads, Computer Vision, Natural Language Processing, and related cloud AI services on Microsoft Azure.",
      credentialUrl: null, // Placeholder for credential verification link
      badgeType: "azure",
    },
    {
      id: "cert-02",
      title: "freeCodeCamp Python Programming",
      issuer: "freeCodeCamp",
      description:
        "Hands-on certification covering core Python syntax, algorithms, data structures, computational logic, and modular program design.",
      credentialUrl: null, // Placeholder for credential verification link
      badgeType: "fcc",
    },
  ],

  journey: [
    {
      step: "01",
      title: "Programming Fundamentals",
      status: "Completed Foundation",
      description:
        "Established deep roots in computational thinking, procedural logic, pointer arithmetic, and algorithmic complexity using C and Java.",
      focusAreas: ["Logic Formulation", "Memory Management", "Data Structures", "OOP Principles"],
    },
    {
      step: "02",
      title: "Python Programming",
      status: "Completed Foundation",
      description:
        "Mastered modern Python for automation, data manipulation, file systems, and rapid algorithmic prototyping.",
      focusAreas: ["Scripting", "JSON Pipelines", "CLI Engineering", "Functional Patterns"],
    },
    {
      step: "03",
      title: "Artificial Intelligence",
      status: "Active Exploration",
      description:
        "Diving into classical AI methodologies, search trees, heuristic optimization, knowledge representation, and autonomous agents.",
      focusAreas: ["Search Algorithms", "A* & Heuristics", "Game Trees", "Agent Architecture"],
    },
    {
      step: "04",
      title: "Machine Learning",
      status: "Active Exploration",
      description:
        "Studying mathematical foundations of ML: linear algebra, gradient descent, regression, classification, clustering, and validation metrics.",
      focusAreas: ["Supervised Learning", "Unsupervised Models", "Feature Engineering", "Model Evaluation"],
    },
    {
      step: "05",
      title: "Generative AI",
      status: "Expanding Frontier",
      description:
        "Exploring transformer architectures, prompt engineering, multi-modal synthesis, and next-generation autonomous AI agents.",
      focusAreas: ["LLM Workflows", "Prompt Engineering", "Autonomous Agents", "Creative Applications"],
    },
  ],

  contact: {
    heading: "Let's Connect",
    subheading: "GET IN TOUCH • COLLABORATE • DISCUSS AI",
    note: "Open to discussions regarding AI/ML innovations, academic collaborations, open-source projects, and engineering opportunities.",
  },
};

