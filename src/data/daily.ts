import type { DailyChallenge } from '../types'

// Generate dates for the past 7 days and today
const today = new Date()
const dates = Array.from({ length: 8 }, (_, i) => {
  const d = new Date(today)
  d.setDate(d.getDate() - (7 - i))
  return d.toISOString().split('T')[0]
})

export const dailyChallenges: DailyChallenge[] = [
  {
    id: 'dc-1',
    date: dates[0], // 7 days ago
    title: 'Two Sum',
    type: 'Coding',
    difficulty: 'Easy',
    xpReward: 50,
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    isCompleted: true,
    problemId: 'two-sum'
  },
  {
    id: 'dc-2',
    date: dates[1],
    title: 'Time Complexity of Binary Search',
    type: 'MCQ',
    difficulty: 'Easy',
    xpReward: 30,
    description: 'What is the worst-case time complexity of finding a value in a sorted array using binary search?',
    isCompleted: true,
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    correctOptionIndex: 2
  },
  {
    id: 'dc-3',
    date: dates[2],
    title: 'Star Pyramid Pattern',
    type: 'Pattern',
    difficulty: 'Medium',
    xpReward: 60,
    description: 'Write a program to print a star pyramid pattern of N rows. Example for N=3:\\n  *\\n ***\\n*****',
    isCompleted: true
    // No linked problem: pattern exercises are not in the problem set yet.
  },
  {
    id: 'dc-4',
    date: dates[3],
    title: 'Merge Intervals',
    type: 'Coding',
    difficulty: 'Medium',
    xpReward: 70,
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    isCompleted: true,
    problemId: 'merge-intervals'
  },
  {
    id: 'dc-5',
    date: dates[4],
    title: 'Valid Parentheses',
    type: 'Coding',
    difficulty: 'Easy',
    xpReward: 50,
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    isCompleted: true,
    problemId: 'valid-parentheses'
  },
  {
    id: 'dc-6',
    date: dates[5],
    title: 'Data Structure for LIFO',
    type: 'MCQ',
    difficulty: 'Easy',
    xpReward: 30,
    description: 'Which of the following data structures follows the Last-In-First-Out (LIFO) principle?',
    isCompleted: true,
    options: ['Queue', 'Stack', 'Linked List', 'Tree'],
    correctOptionIndex: 1
  },
  {
    id: 'dc-7',
    date: dates[6], // Yesterday
    title: 'Longest Substring Without Repeating Characters',
    type: 'Coding',
    difficulty: 'Medium',
    xpReward: 70,
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    isCompleted: false, // Missed!
    problemId: 'longest-substring'
  },
  {
    id: 'dc-8',
    date: dates[7], // Today
    title: 'Median of Two Sorted Arrays',
    type: 'Coding',
    difficulty: 'Hard',
    xpReward: 100,
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    isCompleted: false,
    problemId: 'median-two-sorted-arrays'
  }
]
