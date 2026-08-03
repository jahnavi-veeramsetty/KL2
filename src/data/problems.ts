import type { Problem } from '../types'

export const problems: Problem[] = [
  {
    id: 'two-sum',
    slug: 'two-sum',
    number: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Array', 'Hashing'],
    companies: ['Google', 'Amazon', 'Facebook', 'Apple'],
    acceptanceRate: 51.2,
    status: 'solved',
    isBookmarked: false,
    likes: 52341,
    dislikes: 1823,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return **indices** of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
    hints: ['A brute-force approach is O(n²). Can you do better?', 'Think about what data structure gives O(1) lookup.'],
    starterCode: {
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        `,
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};`,
      typescript: `function twoSum(nums: number[], target: number): number[] {\n    \n};`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    \n}`
    },
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1,2]' }
    ]
  },
  {
    id: 'best-time-buy-sell',
    slug: 'best-time-buy-sell',
    number: 121,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topics: ['Array', 'DP'],
    companies: ['Amazon', 'Microsoft', 'Goldman Sachs'],
    acceptanceRate: 54.7,
    status: 'solved',
    isBookmarked: true,
    likes: 31200,
    dislikes: 1100,
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i^th\` day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the *maximum profit* you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No profitable transaction possible.' }
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    hints: ['Track the minimum price seen so far.', 'For each price, check if selling gives a better profit than current max.'],
    starterCode: {
      python: `class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        `,
      javascript: `var maxProfit = function(prices) {\n    \n};`,
      typescript: `function maxProfit(prices: number[]): number {\n    \n};`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};`,
      c: `int maxProfit(int* prices, int pricesSize) {\n    \n}`
    },
    testCases: [
      { input: 'prices = [7,1,5,3,6,4]', expected: '5' },
      { input: 'prices = [7,6,4,3,1]', expected: '0' }
    ]
  },
  {
    id: 'valid-parentheses',
    slug: 'valid-parentheses',
    number: 20,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topics: ['Stack', 'Strings'],
    companies: ['Google', 'Meta', 'Microsoft'],
    acceptanceRate: 40.8,
    status: 'attempted',
    isBookmarked: false,
    likes: 24100,
    dislikes: 1450,
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 10^4', "s consists of parentheses only '()[]{}'."],
    hints: ['Use a stack data structure.', 'Push open brackets; pop when you see a closing bracket.'],
    starterCode: {
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        `,
      javascript: `var isValid = function(s) {\n    \n};`,
      typescript: `function isValid(s: string): boolean {\n    \n};`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};`,
      c: `bool isValid(char* s) {\n    \n}`
    },
    testCases: [
      { input: 's = "()"', expected: 'true' },
      { input: 's = "()[]{}"', expected: 'true' },
      { input: 's = "(]"', expected: 'false' }
    ]
  },
  {
    id: 'merge-intervals',
    slug: 'merge-intervals',
    number: 56,
    title: 'Merge Intervals',
    difficulty: 'Medium',
    topics: ['Array', 'Sorting'],
    companies: ['Google', 'Facebook', 'Microsoft', 'LinkedIn'],
    acceptanceRate: 47.3,
    status: 'todo',
    isBookmarked: false,
    likes: 18900,
    dislikes: 790,
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.`,
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]', explanation: 'Intervals [1,4] and [4,5] are considered overlapping.' }
    ],
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i <= end_i <= 10^4'],
    hints: ['Sort by start time first.', 'Keep a pointer to the last merged interval.'],
    starterCode: {
      python: `class Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        `,
      javascript: `var merge = function(intervals) {\n    \n};`,
      typescript: `function merge(intervals: number[][]): number[][] {\n    \n};`,
      java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        \n    }\n};`,
      c: `int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {\n    \n}`
    },
    testCases: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' },
      { input: 'intervals = [[1,4],[4,5]]', expected: '[[1,5]]' }
    ]
  },
  {
    id: 'lru-cache',
    slug: 'lru-cache',
    number: 146,
    title: 'LRU Cache',
    difficulty: 'Medium',
    topics: ['Hashing', 'Linked List', 'Design'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Uber'],
    acceptanceRate: 41.2,
    status: 'todo',
    isBookmarked: true,
    likes: 21300,
    dislikes: 940,
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the \`LRUCache\` class:\n- \`LRUCache(int capacity)\` Initialize the LRU cache with **positive size** \`capacity\`.\n- \`int get(int key)\` Return the value of the \`key\` if it exists, otherwise return \`-1\`.\n- \`void put(int key, int value)\` Update the value if the \`key\` exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the \`capacity\`, evict the **least recently used** key.`,
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'LRUCache lRUCache = new LRUCache(2); lRUCache.put(1, 1); ...'
      }
    ],
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls to get and put'],
    hints: ['Use a HashMap for O(1) lookup.', 'Combine with a doubly linked list for O(1) insertion and deletion.'],
    starterCode: {
      python: `class LRUCache:\n    def __init__(self, capacity: int):\n        \n    def get(self, key: int) -> int:\n        \n    def put(self, key: int, value: int) -> None:\n        `,
      javascript: `class LRUCache {\n    constructor(capacity) {\n        \n    }\n    get(key) {\n        \n    }\n    put(key, value) {\n        \n    }\n}`,
      typescript: `class LRUCache {\n    constructor(capacity: number) {\n        \n    }\n    get(key: number): number {\n        \n    }\n    put(key: number, value: number): void {\n        \n    }\n}`,
      java: `class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n    public int get(int key) {\n        \n    }\n    public void put(int key, int value) {\n        \n    }\n}`,
      cpp: `class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n    int get(int key) {\n        \n    }\n    void put(int key, int value) {\n        \n    }\n};`,
      c: `typedef struct {} LRUCache;\nLRUCache* lRUCacheCreate(int capacity) {}\nint lRUCacheGet(LRUCache* obj, int key) {}\nvoid lRUCachePut(LRUCache* obj, int key, int value) {}`
    },
    testCases: [
      { input: 'capacity=2, ops=[put(1,1),put(2,2),get(1),put(3,3),get(2)]', expected: '[null,null,1,null,-1]' }
    ]
  },
  {
    id: 'word-break',
    slug: 'word-break',
    number: 139,
    title: 'Word Break',
    difficulty: 'Medium',
    topics: ['DP', 'Hashing', 'Strings'],
    companies: ['Google', 'Amazon', 'Salesforce'],
    acceptanceRate: 45.8,
    status: 'todo',
    isBookmarked: false,
    likes: 13700,
    dislikes: 680,
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.`,
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true', explanation: 'Return true because "leetcode" can be segmented as "leet code".' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20'],
    hints: ['DP: dp[i] = can we form s[0..i-1]?', 'For each position, try all words in the dictionary.'],
    starterCode: {
      python: `class Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        `,
      javascript: `var wordBreak = function(s, wordDict) {\n    \n};`,
      typescript: `function wordBreak(s: string, wordDict: string[]): boolean {\n    \n};`,
      java: `class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        \n    }\n};`,
      c: `bool wordBreak(char* s, char** wordDict, int wordDictSize) {\n    \n}`
    },
    testCases: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', expected: 'true' },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', expected: 'true' }
    ]
  },
  {
    id: 'serialize-binary-tree',
    slug: 'serialize-binary-tree',
    number: 297,
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    topics: ['Trees', 'BFS', 'DFS'],
    companies: ['Facebook', 'Google', 'Amazon', 'Microsoft'],
    acceptanceRate: 56.3,
    status: 'todo',
    isBookmarked: false,
    likes: 9820,
    dislikes: 388,
    description: `Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. Just make sure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.`,
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 10^4]', '-1000 <= Node.val <= 1000'],
    hints: ['BFS level-order traversal works well for serialization.', 'For deserialization, use a queue to reconstruct level by level.'],
    starterCode: {
      python: `class Codec:\n    def serialize(self, root):\n        \n    def deserialize(self, data):\n        `,
      javascript: `var serialize = function(root) {\n    \n};\nvar deserialize = function(data) {\n    \n};`,
      typescript: `function serialize(root: TreeNode | null): string {\n    \n};\nfunction deserialize(data: string): TreeNode | null {\n    \n};`,
      java: `public class Codec {\n    public String serialize(TreeNode root) {\n        \n    }\n    public TreeNode deserialize(String data) {\n        \n    }\n}`,
      cpp: `class Codec {\npublic:\n    string serialize(TreeNode* root) {\n        \n    }\n    TreeNode* deserialize(string data) {\n        \n    }\n};`,
      c: `char* serialize(struct TreeNode* root) {\n    \n}\nstruct TreeNode* deserialize(char* data) {\n    \n}`
    },
    testCases: [
      { input: 'root = [1,2,3,null,null,4,5]', expected: '[1,2,3,null,null,4,5]' },
      { input: 'root = []', expected: '[]' }
    ]
  },
  {
    id: 'median-two-sorted-arrays',
    slug: 'median-two-sorted-arrays',
    number: 4,
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    topics: ['Array', 'Searching', 'Binary Search'],
    companies: ['Google', 'Amazon', 'Apple', 'Adobe'],
    acceptanceRate: 36.8,
    status: 'todo',
    isBookmarked: true,
    likes: 24700,
    dislikes: 3400,
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.\n\nThe overall run time complexity should be \`O(log (m+n))\`.`,
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.00000', explanation: 'merged array = [1,2,3] and median is 2.' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.50000', explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.' }
    ],
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000', '1 <= m + n <= 2000'],
    hints: ['Binary search on the smaller array.', 'Partition both arrays such that left half total = right half total.'],
    starterCode: {
      python: `class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        `,
      javascript: `var findMedianSortedArrays = function(nums1, nums2) {\n    \n};`,
      typescript: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n    \n};`,
      java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
      c: `double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {\n    \n}`
    },
    testCases: [
      { input: 'nums1 = [1,3], nums2 = [2]', expected: '2.00000' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', expected: '2.50000' }
    ]
  },
  {
    id: 'product-array-except-self',
    slug: 'product-array-except-self',
    number: 238,
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    topics: ['Array', 'Prefix Sum'],
    companies: ['Facebook', 'Amazon', 'Microsoft', 'Apple'],
    acceptanceRate: 65.4,
    status: 'solved',
    isBookmarked: false,
    likes: 19800,
    dislikes: 1100,
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.\n\nThe product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in \`O(n)\` time and **without using the division operation**.`,
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' }
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'The product of any prefix or suffix is guaranteed to fit in 32-bit integer.'],
    hints: ['Use prefix products from left and suffix products from right.', 'Can you do it with O(1) extra space?'],
    starterCode: {
      python: `class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        `,
      javascript: `var productExceptSelf = function(nums) {\n    \n};`,
      typescript: `function productExceptSelf(nums: number[]): number[] {\n    \n};`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};`,
      c: `int* productExceptSelf(int* nums, int numsSize, int* returnSize) {\n    \n}`
    },
    testCases: [
      { input: 'nums = [1,2,3,4]', expected: '[24,12,8,6]' }
    ]
  },
  {
    id: 'climbing-stairs',
    slug: 'climbing-stairs',
    number: 70,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topics: ['DP', 'Math', 'Recursion'],
    companies: ['Amazon', 'Adobe', 'Bloomberg'],
    acceptanceRate: 52.1,
    status: 'solved',
    isBookmarked: false,
    likes: 17900,
    dislikes: 580,
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.\n\nEach time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: 'n = 2', output: '2', explanation: '1. 1 step + 1 step\n2. 2 steps' },
      { input: 'n = 3', output: '3', explanation: '1. 1 + 1 + 1\n2. 1 + 2\n3. 2 + 1' }
    ],
    constraints: ['1 <= n <= 45'],
    hints: ['This is the Fibonacci sequence in disguise.', 'dp[i] = dp[i-1] + dp[i-2]'],
    starterCode: {
      python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        `,
      javascript: `var climbStairs = function(n) {\n    \n};`,
      typescript: `function climbStairs(n: number): number {\n    \n};`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};`,
      c: `int climbStairs(int n) {\n    \n}`
    },
    testCases: [
      { input: 'n = 2', expected: '2' },
      { input: 'n = 3', expected: '3' },
      { input: 'n = 10', expected: '89' }
    ]
  },
  {
    id: 'number-of-islands',
    slug: 'number-of-islands',
    number: 200,
    title: 'Number of Islands',
    difficulty: 'Medium',
    topics: ['Graphs', 'BFS', 'DFS', 'Union Find'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    acceptanceRate: 58.9,
    status: 'attempted',
    isBookmarked: false,
    likes: 21600,
    dislikes: 490,
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return *the number of islands*.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' }
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', "grid[i][j] is '0' or '1'."],
    hints: ['DFS/BFS from every unvisited land cell.', 'Mark visited cells to avoid counting twice.'],
    starterCode: {
      python: `class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        `,
      javascript: `var numIslands = function(grid) {\n    \n};`,
      typescript: `function numIslands(grid: string[][]): number {\n    \n};`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};`,
      c: `int numIslands(char** grid, int gridSize, int* gridColSize) {\n    \n}`
    },
    testCases: [
      { input: 'grid = [["1","1","1","1","0"],...]', expected: '1' }
    ]
  },
  {
    id: 'longest-substring',
    slug: 'longest-substring',
    number: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topics: ['Strings', 'Hashing', 'Sliding Window'],
    companies: ['Amazon', 'Adobe', 'Goldman Sachs', 'Bloomberg'],
    acceptanceRate: 34.1,
    status: 'solved',
    isBookmarked: false,
    likes: 38200,
    dislikes: 1750,
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    hints: ['Use a sliding window with a HashSet.', 'Move the left pointer when you encounter a duplicate.'],
    starterCode: {
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        `,
      javascript: `var lengthOfLongestSubstring = function(s) {\n    \n};`,
      typescript: `function lengthOfLongestSubstring(s: string): number {\n    \n};`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};`,
      c: `int lengthOfLongestSubstring(char* s) {\n    \n}`
    },
    testCases: [
      { input: 's = "abcabcbb"', expected: '3' },
      { input: 's = "bbbbb"', expected: '1' }
    ]
  }
]
