import json

try:
    with open('d:\\KLM3\\KL2\\src\\data\\lms\\moduleContent.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    idx = content.find("'a1': {")
    prefix = content[:idx]
    json_str = content[idx + 6:-2].strip()

    data = json.loads(json_str)

    # find topic-1-8
    for day in data['days']:
        for topic in day['topics']:
            if topic['id'] == 'topic-1-8':
                new_content = []
                for block in topic['content']:
                    if block['type'] == 'code' and 'CREATE THE PROJECT' in block.get('code', ''):
                        # Split the code block
                        new_content.append({"type": "heading", "level": 3, "text": "Step 1: Create the Project"})
                        new_content.append({"type": "code", "language": "bash", "code": "mkdir my_first_project\ncd my_first_project"})
                        
                        new_content.append({"type": "heading", "level": 3, "text": "Step 2: Create the Virtual Environment"})
                        new_content.append({"type": "code", "language": "bash", "code": "python -m venv venv        # creates isolated Python environment\n# Windows: python -m venv venv\n# Mac/Linux: python3 -m venv venv"})
                        
                        new_content.append({"type": "heading", "level": 3, "text": "Step 3: Activate It"})
                        new_content.append({"type": "code", "language": "bash", "code": "# Windows (Command Prompt):\nvenv\\Scripts\\activate\n\n# Windows (PowerShell):\nvenv\\Scripts\\Activate.ps1\n\n# macOS / Linux:\nsource venv/bin/activate\n\n# Your prompt now shows: (venv) $    YOU ARE INSIDE THE ENVIRONMENT!"})

                        new_content.append({"type": "heading", "level": 3, "text": "Step 4: Upgrade Pip"})
                        new_content.append({"type": "code", "language": "bash", "code": "python -m pip install --upgrade pip\n# Output: Successfully installed pip-23.3.1"})

                        new_content.append({"type": "heading", "level": 3, "text": "Step 5: Install Packages"})
                        new_content.append({"type": "code", "language": "bash", "code": "pip install requests         # HTTP library\npip install pandas           # data analysis\npip install python-dotenv    # load .env files"})

                        new_content.append({"type": "heading", "level": 3, "text": "Step 6: Verify Installation"})
                        new_content.append({"type": "code", "language": "bash", "code": "pip list\n\n# Package             Version\n# ------------------- -------\n# requests            2.31.0\n# pandas              2.1.3"})

                        new_content.append({"type": "heading", "level": 3, "text": "Step 7: Create Project Structure"})
                        new_content.append({"type": "code", "language": "bash", "code": "# Create the main Python file:\ntouch main.py          # (Mac/Linux)\ntype nul > main.py     # (Windows)"})

                        new_content.append({"type": "heading", "level": 3, "text": "Step 8: Set Up .gitignore"})
                        new_content.append({"type": "code", "language": "bash", "code": "cat > .gitignore << EOF\nvenv/\n__pycache__/\n*.pyc\n*.pyo\n.env\n.DS_Store\n*.egg-info/\ndist/\nbuild/\nEOF"})

                        new_content.append({"type": "heading", "level": 3, "text": "Step 9: Generate requirements.txt"})
                        new_content.append({"type": "code", "language": "bash", "code": "pip freeze > requirements.txt\ncat requirements.txt\n\n# certifi==2023.7.22\n# pandas==2.1.3\n# requests==2.31.0"})

                    else:
                        new_content.append(block)
                topic['content'] = new_content

    out_json = json.dumps(data, indent=2)
    with open('d:\\KLM3\\KL2\\src\\data\\lms\\moduleContent.ts', 'w', encoding='utf-8') as f:
        f.write(prefix + "'a1': " + out_json + "\n}\n")
    print("Success")
except Exception as e:
    print(f"Error: {e}")
