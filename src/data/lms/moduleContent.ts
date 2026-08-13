export type ContentBlock =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'paragraph'; html: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'list'; format: 'bullet' | 'number'; items: string[] }

export type Topic = {
  id: string
  title: string
  type: 'reading' | 'quiz' | 'coding'
  isCompleted?: boolean
  content: ContentBlock[]
}

export type Day = {
  id: string
  title: string
  topics: Topic[]
}

export type ModuleData = {
  id: string
  title: string
  days: Day[]
}

export const moduleDataMap: Record<string, ModuleData> = {
  'm1': {
    id: 'm1',
    title: 'Introduction to Java Full Stack',
    days: [
      {
        id: 'day-1',
        title: 'Day 1: Getting Started with Java',
        topics: [
          {
            id: 'topic-1-1',
            title: 'Welcome to Java Full Stack',
            type: 'reading',
            isCompleted: true,
            content: [
              { type: 'heading', level: 1, text: 'Welcome to Java Full Stack' },
              { type: 'paragraph', html: 'Java is one of the most popular and versatile programming languages in the world. In this course, you will learn how to build robust, scalable web applications from scratch.' },
              { type: 'heading', level: 2, text: 'What is a Full Stack Developer?' },
              { type: 'paragraph', html: 'A full stack developer is an engineer who can handle all the work of databases, servers, systems engineering, and clients. Depending on the project, what clients need may be a mobile stack, a Web stack, or a native application stack.' },
              { type: 'list', format: 'bullet', items: [
                '<b>Front-end</b>: HTML, CSS, JavaScript, React',
                '<b>Back-end</b>: Java, Spring Boot',
                '<b>Database</b>: MySQL, PostgreSQL, MongoDB'
              ]}
            ]
          },
          {
            id: 'topic-1-2',
            title: 'Your First Java Program',
            type: 'reading',
            isCompleted: false,
            content: [
              { type: 'heading', level: 1, text: 'Your First Java Program' },
              { type: 'paragraph', html: 'Every Java application begins with a class name, and that class must match the filename. Inside the class, you need a <code>main</code> method, which serves as the entry point for your application.' },
              { type: 'code', language: 'java', code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
              { type: 'heading', level: 2, text: 'Understanding the Code' },
              { type: 'table', headers: ['Keyword', 'Meaning', 'Usage'], rows: [
                ['public', 'Access modifier', 'Makes the class/method visible to all'],
                ['static', 'Memory management', 'Allows calling the method without instantiating the class'],
                ['void', 'Return type', 'Indicates the method does not return any value'],
                ['String[]', 'Data type', 'An array of strings used for command-line arguments']
              ]}
            ]
          },
          {
            id: 'topic-1-3',
            title: 'Variables and Data Types',
            type: 'reading',
            isCompleted: false,
            content: [
              { type: 'heading', level: 1, text: 'Variables and Data Types' },
              { type: 'paragraph', html: 'Java is a strongly typed language, which means every variable must be declared with a data type. There are two major categories of data types in Java: Primitive and Non-Primitive.' },
              { type: 'heading', level: 2, text: 'Primitive Data Types' },
              { type: 'list', format: 'number', items: [
                '<b>byte</b>: 8-bit integer (Values: -128 to 127)',
                '<b>short</b>: 16-bit integer',
                '<b>int</b>: 32-bit integer (Default for whole numbers)',
                '<b>long</b>: 64-bit integer',
                '<b>float</b>: 32-bit floating point',
                '<b>double</b>: 64-bit floating point (Default for decimals)',
                '<b>boolean</b>: true or false',
                '<b>char</b>: 16-bit Unicode character'
              ]},
              { type: 'code', language: 'java', code: 'int age = 25;\ndouble price = 19.99;\nboolean isStudent = true;\nchar grade = \'A\';' }
            ]
          },
          {
            id: 'topic-1-quiz',
            title: 'Day 1 Knowledge Check',
            type: 'quiz',
            isCompleted: false,
            content: [] // Rendered separately by the Quiz Engine
          }
        ]
      },
      {
        id: 'day-2',
        title: 'Day 2: Control Flow & Loops',
        topics: [
          {
            id: 'topic-2-1',
            title: 'If-Else Statements',
            type: 'reading',
            isCompleted: false,
            content: [
              { type: 'heading', level: 1, text: 'Control Flow: If-Else' },
              { type: 'paragraph', html: 'Java uses boolean expressions to determine which block of code to execute. The <code>if</code> statement evaluates a condition, and if it is true, it executes a block of code.' },
              { type: 'code', language: 'java', code: 'int score = 85;\n\nif (score >= 90) {\n    System.out.println("Grade A");\n} else if (score >= 80) {\n    System.out.println("Grade B");\n} else {\n    System.out.println("Grade C");\n}' }
            ]
          },
          {
            id: 'topic-2-2',
            title: 'For and While Loops',
            type: 'reading',
            isCompleted: false,
            content: [
              { type: 'heading', level: 1, text: 'Iterating with Loops' },
              { type: 'paragraph', html: 'Loops allow you to execute a block of code multiple times. The <code>for</code> loop is typically used when you know exactly how many times you want to iterate.' },
              { type: 'code', language: 'java', code: 'for (int i = 0; i < 5; i++) {\n    System.out.println("Iteration: " + i);\n}' },
              { type: 'heading', level: 2, text: 'While Loop' },
              { type: 'paragraph', html: 'The <code>while</code> loop continues to execute as long as its condition remains true.' },
              { type: 'code', language: 'java', code: 'int count = 0;\nwhile (count < 3) {\n    System.out.println("Count is: " + count);\n    count++;\n}' }
            ]
          }
        ]
      },
      {
        id: 'day-3',
        title: 'Day 3: Arrays & Methods',
        topics: [
          {
            id: 'topic-3-1',
            title: 'Declaring and Using Arrays',
            type: 'reading',
            isCompleted: false,
            content: [
              { type: 'heading', level: 1, text: 'Arrays in Java' },
              { type: 'paragraph', html: 'An array is a container object that holds a fixed number of values of a single type. The length of an array is established when the array is created. After creation, its length is fixed.' },
              { type: 'code', language: 'java', code: 'int[] numbers = new int[5];\nnumbers[0] = 10;\nnumbers[1] = 20;\n\n// Inline initialization\nString[] fruits = {"Apple", "Banana", "Orange"};' }
            ]
          }
        ]
      }
    ]
  },
  'm9': {
    id: 'm9',
    title: 'React Fundamentals',
    days: [
      {
        id: 'day-1',
        title: 'Day 1: Intro to React',
        topics: [
          {
            id: 'topic-1-1',
            title: 'What is React?',
            type: 'reading',
            isCompleted: false,
            content: [
              { type: 'heading', level: 1, text: 'Introduction to React' },
              { type: 'paragraph', html: 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces.' }
            ]
          }
        ]
      }
    ]
  },
  'm5': {
    id: 'm5',
    title: 'Spring Boot Essentials',
    days: [
      {
        id: 'day-1',
        title: 'Day 1: Spring Basics',
        topics: [
          {
            id: 'topic-1-1',
            title: 'Spring Inversion of Control',
            type: 'reading',
            isCompleted: false,
            content: [
              { type: 'heading', level: 1, text: 'Inversion of Control (IoC)' },
              { type: 'paragraph', html: 'IoC is a design principle in which a custom-written portion of a computer program receives the flow of control from a generic framework.' }
            ]
          }
        ]
      }
    ]
  }
}
