import json

try:
    with open('d:\\KLM3\\KL2\\src\\data\\lms\\moduleContent.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    idx = content.find("'a1': {")
    prefix = content[:idx]
    json_str = content[idx + 6:-2].strip()

    data = json.loads(json_str)

    quiz_topic = {
        "id": "topic-1-10",
        "title": "Knowledge Check: Python Foundations",
        "type": "quiz",
        "isCompleted": False,
        "content": []
    }

    data['days'][0]['topics'].append(quiz_topic)

    out_json = json.dumps(data, indent=2)
    with open('d:\\KLM3\\KL2\\src\\data\\lms\\moduleContent.ts', 'w', encoding='utf-8') as f:
        f.write(prefix + "'a1': " + out_json + "\n}\n")
    print("Success")
except Exception as e:
    print(f"Error: {e}")
