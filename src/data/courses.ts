import type { Course } from '../types'
import javaImage from '../assets/course cards/java.webp'
import pythonImage from '../assets/course cards/python.webp'
import aiImage from '../assets/course cards/image.webp'
import analyticsImage from '../assets/course cards/analytics.webp'

export const courses: Course[] = [
  {
    id: 'java-full-stack',
    slug: 'java-full-stack',
    title: 'Java Full Stack Development',
    category: 'Engineering',
    level: 'Intermediate',
    thumbnail: javaImage,
    shortDescription: 'Build complete web applications from end to end using Java, Spring Boot, React, and MySQL.',
    longDescription: 'This comprehensive course will take you through the entire process of building modern, scalable web applications. You will learn frontend development with React, backend architecture with Java and Spring Boot, and database management with MySQL. By the end of this course, you will have a complete, production-ready application to showcase in your portfolio.',
    instructor: {
      name: 'Rahul Verma',
      title: 'Senior Java Architect',
      avatar: '/react_course.webp',
      bio: 'Rahul has over 10 years of experience building enterprise Java applications. He specializes in distributed systems and microservices architecture.',
      stats: { students: 15400, courses: 3, rating: 4.8 }
    },
    rating: 4.8,
    ratingCount: 1250,
    studentsEnrolled: 15400,
    durationHours: 45,
    moduleCount: 10,
    lessonCount: 85,
    price: 3499,
    tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'Full Stack'],
    isBestseller: true,
    whatYouWillLearn: [
      'Core Java and advanced Object-Oriented Programming concepts',
      'Building RESTful APIs with Spring Boot',
      'Modern frontend development with React and TypeScript',
      'Database design and integration with MySQL and Hibernate',
      'Authentication and security with Spring Security and JWT',
      'Deploying full-stack applications to the cloud'
    ],
    curriculum: [
      {
        title: 'Module 1: Frontend with React',
        lessons: [
          { title: 'React Fundamentals', type: 'video', durationMins: 30 },
          { title: 'State Management with Redux', type: 'video', durationMins: 45 },
          { title: 'Building the UI components', type: 'exercise', durationMins: 60 }
        ]
      },
      {
        title: 'Module 2: Backend with Spring Boot',
        lessons: [
          { title: 'Spring Boot Basics', type: 'video', durationMins: 35 },
          { title: 'Creating REST Endpoints', type: 'video', durationMins: 40 },
          { title: 'Connecting to the Database', type: 'exercise', durationMins: 50 }
        ]
      }
    ],
    requirements: [
      'Basic programming knowledge in any language',
      'Familiarity with HTML, CSS, and basic JavaScript'
    ],
    reviews: [
      { user: 'Amit K.', avatar: '/react_course.webp', rating: 5, date: '2024-11-15', text: 'Excellent course! The integration between React and Spring Boot was explained very clearly.' }
    ],
    language: 'English',
    certificate: true
  },
  {
    id: 'python-full-stack',
    slug: 'python-full-stack',
    title: 'Python Full Stack',
    category: 'Engineering',
    level: 'Intermediate',
    thumbnail: pythonImage,
    shortDescription: 'Master full stack development with Python, Django, PostgreSQL, and modern frontend technologies.',
    longDescription: 'Learn to build robust and scalable web applications using the Python ecosystem. This course covers everything from Python fundamentals to advanced Django concepts, REST APIs, and integrating with modern frontend frameworks to create complete web solutions.',
    instructor: {
      name: 'Shreya Pillai',
      title: 'Full-Stack Developer & Educator',
      avatar: '/ui_ux_course.webp',
      bio: 'Shreya has been building web apps for 7 years and teaching for 4. Her courses have been taken by developers in 120+ countries.',
      stats: { students: 31000, courses: 6, rating: 4.8 }
    },
    rating: 4.7,
    ratingCount: 2100,
    studentsEnrolled: 22000,
    durationHours: 40,
    moduleCount: 8,
    lessonCount: 72,
    price: 3299,
    tags: ['Python', 'Django', 'PostgreSQL', 'Full Stack', 'Web Development'],
    isNew: false,
    whatYouWillLearn: [
      'Advanced Python programming and best practices',
      'Building web applications with Django',
      'Creating APIs with Django Rest Framework',
      'Database modeling and querying with PostgreSQL',
      'Integrating frontend templates and frameworks',
      'Test-driven development in Django'
    ],
    curriculum: [
      {
        title: 'Module 1: Python Mastery',
        lessons: [
          { title: 'Python Refresher', type: 'video', durationMins: 25 },
          { title: 'Object-Oriented Python', type: 'video', durationMins: 35 },
          { title: 'Advanced Concepts', type: 'exercise', durationMins: 45 }
        ]
      },
      {
        title: 'Module 2: Django Web Framework',
        lessons: [
          { title: 'Introduction to Django', type: 'video', durationMins: 30 },
          { title: 'Models, Views, and Templates', type: 'video', durationMins: 40 },
          { title: 'Building your first Django app', type: 'exercise', durationMins: 60 }
        ]
      }
    ],
    requirements: [
      'Basic understanding of programming concepts',
      'Familiarity with HTML and CSS'
    ],
    reviews: [
      { user: 'Sara J.', avatar: '/ui_ux_course.webp', rating: 5, date: '2024-10-10', text: 'The Django sections are very well structured. Highly recommended for aspiring full stack devs.' }
    ],
    language: 'English',
    certificate: true
  },
  {
    id: 'ai-and-ml',
    slug: 'ai-and-ml',
    title: 'AI and ML',
    category: 'AI/ML',
    level: 'Beginner',
    thumbnail: aiImage,
    shortDescription: 'A comprehensive introduction to Artificial Intelligence and Machine Learning algorithms and applications.',
    longDescription: 'Dive deep into the world of Artificial Intelligence and Machine Learning. This course builds genuine mathematical intuition for algorithms while providing hands-on coding experience using Python, scikit-learn, TensorFlow, and PyTorch.',
    instructor: {
      name: 'Dr. Meena Iyer',
      title: 'AI Researcher',
      avatar: '/ui_ux_course.webp',
      bio: 'Dr. Iyer holds a PhD in Machine Learning and has published research at top conferences. She leads an ML research team focusing on deep learning applications.',
      stats: { students: 52000, courses: 2, rating: 4.9 }
    },
    rating: 4.9,
    ratingCount: 8741,
    studentsEnrolled: 52000,
    durationHours: 42,
    moduleCount: 12,
    lessonCount: 108,
    price: 3999,
    tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow', 'Deep Learning'],
    isBestseller: true,
    whatYouWillLearn: [
      'Foundations of Machine Learning and Artificial Intelligence',
      'Supervised and unsupervised learning algorithms',
      'Deep Learning and Neural Networks with TensorFlow/PyTorch',
      'Natural Language Processing (NLP) and Computer Vision',
      'Model evaluation and hyperparameter tuning',
      'Deploying ML models to production'
    ],
    curriculum: [
      {
        title: 'Module 1: Machine Learning Basics',
        lessons: [
          { title: 'Introduction to ML', type: 'video', durationMins: 30 },
          { title: 'Linear Regression and Classification', type: 'video', durationMins: 45 },
          { title: 'Implementing basic algorithms', type: 'exercise', durationMins: 60 }
        ]
      },
      {
        title: 'Module 2: Deep Learning Foundations',
        lessons: [
          { title: 'Neural Networks Architecture', type: 'video', durationMins: 40 },
          { title: 'Introduction to PyTorch and TensorFlow', type: 'video', durationMins: 35 },
          { title: 'Building your first Neural Network', type: 'exercise', durationMins: 55 }
        ]
      }
    ],
    requirements: [
      'Basic Python programming experience',
      'High school level mathematics (algebra, basic statistics)'
    ],
    reviews: [
      { user: 'Tanaka H.', avatar: '/ui_ux_course.webp', rating: 5, date: '2024-12-05', text: 'Dr. Iyer explains complex concepts incredibly well. The best AI course I have taken.' }
    ],
    language: 'English',
    certificate: true
  },
  {
    id: 'data-analytics',
    slug: 'data-analytics',
    title: 'Data Analytics',
    category: 'Data',
    level: 'Beginner',
    thumbnail: analyticsImage,
    shortDescription: 'Learn to extract actionable insights from data using Python, SQL, Tableau, and Excel.',
    longDescription: 'Transform raw data into meaningful insights. This comprehensive Data Analytics course covers the entire data pipeline: from data extraction and cleaning with Python and SQL, to visualization and storytelling with Tableau and PowerBI.',
    instructor: {
      name: 'Pooja Rajan',
      title: 'Lead Data Analyst',
      avatar: '/ui_ux_course.webp',
      bio: 'Pooja has helped numerous companies make data-driven decisions. She is passionate about making data analytics accessible and practical.',
      stats: { students: 45000, courses: 4, rating: 4.8 }
    },
    rating: 4.8,
    ratingCount: 5400,
    studentsEnrolled: 45000,
    durationHours: 35,
    moduleCount: 9,
    lessonCount: 82,
    price: 2499,
    tags: ['Data Analytics', 'Python', 'SQL', 'Tableau', 'Visualization'],
    isNew: true,
    whatYouWillLearn: [
      'Data cleaning and preprocessing techniques',
      'Advanced SQL queries for data extraction',
      'Data analysis with Python (Pandas, NumPy)',
      'Creating interactive dashboards with Tableau',
      'Statistical analysis and A/B testing basics',
      'Communicating data insights effectively'
    ],
    curriculum: [
      {
        title: 'Module 1: Data Analysis with SQL',
        lessons: [
          { title: 'SQL Fundamentals Refresher', type: 'video', durationMins: 25 },
          { title: 'Advanced Queries and Joins', type: 'video', durationMins: 40 },
          { title: 'Real-world data extraction', type: 'exercise', durationMins: 45 }
        ]
      },
      {
        title: 'Module 2: Data Visualization',
        lessons: [
          { title: 'Principles of Data Visualization', type: 'video', durationMins: 30 },
          { title: 'Building Dashboards in Tableau', type: 'video', durationMins: 45 },
          { title: 'Telling a story with your data', type: 'exercise', durationMins: 50 }
        ]
      }
    ],
    requirements: [
      'No prior programming experience required',
      'Basic knowledge of working with spreadsheets'
    ],
    reviews: [
      { user: 'Ken L.', avatar: '/ui_ux_course.webp', rating: 5, date: '2024-11-20', text: 'The hands-on projects were fantastic. I feel ready to tackle real data challenges.' }
    ],
    language: 'English',
    certificate: true
  }
]
