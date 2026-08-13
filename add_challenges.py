import json

try:
    with open('d:\\KLM3\\KL2\\src\\data\\lms\\moduleContent.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    idx = content.find("'a1': {")
    prefix = content[:idx]
    json_str = content[idx + 6:-2].strip()

    data = json.loads(json_str)

    challenge_topic = {
      "id": "topic-1-15",
      "title": "Coding Challenge: Python Syntax & Logic",
      "type": "coding",
      "isCompleted": False,
      "content": [
        {
          "type": "heading",
          "level": 1,
          "text": "Coding Challenges"
        },
        {
          "type": "paragraph",
          "html": "Put your Python knowledge to the test! These coding challenges will verify your understanding of variables, loops, arrays, and problem-solving logic. Click on any problem to open the interactive IDE."
        },
        {
          "type": "challenge_list",
          "challenges": [
            {
              "id": "two-sum",
              "title": "Two Sum",
              "difficulty": "Easy",
              "status": "Todo"
            },
            {
              "id": "best-time-buy-sell",
              "title": "Best Time to Buy and Sell Stock",
              "difficulty": "Easy",
              "status": "Todo"
            },
            {
              "id": "longest-substring",
              "title": "Longest Substring Without Repeating Characters",
              "difficulty": "Medium",
              "status": "Todo"
            },
            {
              "id": "merge-intervals",
              "title": "Merge Intervals",
              "difficulty": "Medium",
              "status": "Todo"
            },
            {
              "id": "lru-cache",
              "title": "LRU Cache Implementation",
              "difficulty": "Hard",
              "status": "Todo"
            }
          ]
        }
      ]
    }

    data['days'][0]['topics'].append(challenge_topic)

    out_json = json.dumps(data, indent=2)
    with open('d:\\KLM3\\KL2\\src\\data\\lms\\moduleContent.ts', 'w', encoding='utf-8') as f:
        f.write(prefix + "'a1': " + out_json + "\n}\n")
    print("Success")
except Exception as e:
    print(f"Error: {e}")
