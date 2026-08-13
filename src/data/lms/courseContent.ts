export interface LmsModule {
  id: string
  title: string
  type: 'video' | 'quiz' | 'exercise' | 'reading'
  durationMins: number
  progress: number // 0 to 100
}

export interface LmsCourse {
  courseId: string
  title: string
  description: string
  totalDurationHours: number
  overallProgress: number // 0 to 100
  modulesCompleted: number
  totalModules: number
  totalXP: number
  modules: LmsModule[]
}

export const lmsCourses: Record<string, LmsCourse> = {
  'java-full-stack': {
    courseId: 'java-full-stack',
    title: 'Java Full Stack Development',
    description: 'Build complete web applications from end to end using Java, Spring Boot, React, and MySQL. This course will take you through the entire process of building modern, scalable web applications.',
    totalDurationHours: 45,
    overallProgress: 12,
    modulesCompleted: 1,
    totalModules: 12,
    totalXP: 250,
    modules: [
      { id: 'm1', title: 'Introduction to Java Full Stack', type: 'video', durationMins: 45, progress: 100 },
      { id: 'm2', title: 'Setting up the Development Environment', type: 'reading', durationMins: 30, progress: 50 },
      { id: 'm3', title: 'Core Java Fundamentals Review', type: 'video', durationMins: 90, progress: 0 },
      { id: 'm4', title: 'Java Object-Oriented Programming', type: 'exercise', durationMins: 120, progress: 0 },
      { id: 'm5', title: 'Introduction to Spring Boot', type: 'video', durationMins: 60, progress: 0 },
      { id: 'm6', title: 'Building RESTful APIs with Spring', type: 'video', durationMins: 80, progress: 0 },
      { id: 'm7', title: 'Database Integration with MySQL', type: 'exercise', durationMins: 110, progress: 0 },
      { id: 'm8', title: 'Spring Security and JWT', type: 'video', durationMins: 75, progress: 0 },
      { id: 'm9', title: 'React Fundamentals', type: 'video', durationMins: 90, progress: 0 },
      { id: 'm10', title: 'State Management with Redux', type: 'video', durationMins: 80, progress: 0 },
      { id: 'm11', title: 'Connecting React to Spring Boot', type: 'exercise', durationMins: 120, progress: 0 },
      { id: 'm12', title: 'Deployment to AWS', type: 'video', durationMins: 60, progress: 0 }
    ]
  },
  'python-full-stack': {
    courseId: 'python-full-stack',
    title: 'Python Full Stack',
    description: 'Master full stack development with Python, Django, PostgreSQL, and modern frontend technologies.',
    totalDurationHours: 40,
    overallProgress: 15,
    modulesCompleted: 1,
    totalModules: 11,
    totalXP: 300,
    modules: [
      { id: 'p1', title: 'Python Refresher', type: 'video', durationMins: 60, progress: 100 },
      { id: 'p2', title: 'Object-Oriented Python', type: 'video', durationMins: 90, progress: 20 },
      { id: 'p3', title: 'Python Advanced Concepts', type: 'exercise', durationMins: 120, progress: 0 },
      { id: 'p4', title: 'Introduction to Django', type: 'video', durationMins: 75, progress: 0 },
      { id: 'p5', title: 'Models and PostgreSQL', type: 'exercise', durationMins: 110, progress: 0 },
      { id: 'p6', title: 'Views and Templates', type: 'video', durationMins: 85, progress: 0 },
      { id: 'p7', title: 'Django Rest Framework (DRF)', type: 'video', durationMins: 95, progress: 0 },
      { id: 'p8', title: 'Authentication in DRF', type: 'quiz', durationMins: 30, progress: 0 },
      { id: 'p9', title: 'Frontend Integration Basics', type: 'reading', durationMins: 45, progress: 0 },
      { id: 'p10', title: 'Building a Full-Stack Clone', type: 'exercise', durationMins: 180, progress: 0 },
      { id: 'p11', title: 'Testing and Deployment', type: 'video', durationMins: 90, progress: 0 },
    ]
  },
  'ai-and-ml': {
    courseId: 'ai-and-ml',
    title: 'AI and ML',
    description: 'A comprehensive introduction to Artificial Intelligence and Machine Learning algorithms and applications.',
    totalDurationHours: 42,
    overallProgress: 5,
    modulesCompleted: 0,
    totalModules: 11,
    totalXP: 100,
    modules: [
      { id: 'a1', title: 'Introduction to ML', type: 'video', durationMins: 45, progress: 50 },
      { id: 'a2', title: 'Python for Data Science', type: 'reading', durationMins: 60, progress: 0 },
      { id: 'a3', title: 'Linear Regression', type: 'exercise', durationMins: 90, progress: 0 },
      { id: 'a4', title: 'Logistic Regression & Classification', type: 'video', durationMins: 75, progress: 0 },
      { id: 'a5', title: 'Decision Trees and Random Forests', type: 'video', durationMins: 85, progress: 0 },
      { id: 'a6', title: 'Support Vector Machines', type: 'quiz', durationMins: 30, progress: 0 },
      { id: 'a7', title: 'Introduction to Deep Learning', type: 'video', durationMins: 90, progress: 0 },
      { id: 'a8', title: 'Neural Networks Architecture', type: 'video', durationMins: 110, progress: 0 },
      { id: 'a9', title: 'Building NN with PyTorch', type: 'exercise', durationMins: 150, progress: 0 },
      { id: 'a10', title: 'Computer Vision Basics', type: 'video', durationMins: 80, progress: 0 },
      { id: 'a11', title: 'NLP Fundamentals', type: 'video', durationMins: 90, progress: 0 },
    ]
  }
}
