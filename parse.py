import json

data = {
    "id": "a1",
    "title": "Programming Foundations with Python",
    "days": [
        {
            "id": "day-1",
            "title": "Day 1: Python Environment Setup",
            "topics": [
                {
                    "id": "topic-1-1",
                    "title": "Python Environment Setup: The Big Picture",
                    "type": "reading",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Python Environment Setup: The Big Picture (Beginner-Friendly Mental Model)"},
                        {"type": "heading", "level": 2, "text": "Preparing a Professional Kitchen Before Cooking a Gourmet Meal"},
                        {"type": "paragraph", "html": "Imagine two chefs cooking the same recipe. The first chef grabs whatever tools are lying around from everyone else's kitchen, uses old ingredients that may have expired, and discovers halfway through that someone else moved the salt. The result: a mess, a ruined dish, and two hours of cleanup.<br><br>The second chef has their own dedicated, organised kitchen. Every tool is where it should be. Every ingredient is fresh and labelled. Another chef can walk in and recreate the dish exactly using the same recipe (<code>requirements.txt</code>).<br><br>Python Environment Setup makes you the second chef. Here is the complete mapping:"},
                        {"type": "table", "headers": ["Real-World Concept", "Kitchen Equivalent"], "rows": [
                            ["Python interpreter (3.11+)", "The stove, oven, and knives (the core tool)"],
                            ["Virtual environment (venv)", "Your private kitchen counter (isolated workspace)"],
                            ["pip", "The grocery delivery service (installs packages)"],
                            ["Packages (requests, pandas)", "Fresh ingredients (third-party libraries)"],
                            ["requirements.txt", "The exact shopping list (reproducible environment)"],
                            ["IDE (VS Code / PyCharm)", "Beautifully organised kitchen drawers (code editor)"],
                            [".gitignore (venv excluded)", "Keeping your mess off the shared recipe book (GitHub)"]
                        ]},
                        {"type": "heading", "level": 2, "text": "Without Setup vs. With Setup"},
                        {"type": "code", "language": "text", "code": "WITHOUT SETUP (first chef):\npip install requests            → installs GLOBALLY, pollutes all projects\nWorks today, breaks tomorrow when another project updates requests\n\"It works on MY machine\"        → the most dangerous phrase in software\n\nWITH SETUP (second chef):\npython -m venv myenv             → isolated kitchen\nsource myenv/bin/activate        → enter your kitchen\npip install requests==2.31.0     → fresh, version-locked ingredient\npip freeze > requirements.txt    → write the shopping list"},
                        {"type": "heading", "level": 2, "text": "The One Rule to Remember"},
                        {"type": "paragraph", "html": "<strong>Never install Python packages globally. Always use a virtual environment for every project. This one habit prevents 95% of all Python environment problems you will ever encounter.</strong>"},
                        {"type": "heading", "level": 2, "text": "The Complete Python Ecosystem at a Glance"},
                        {"type": "table", "headers": ["Tool", "Purpose", "Analogy", "When Used"], "rows": [
                            ["Python 3.11+", "The interpreter that runs your code", "The stove", "Always — it IS Python"],
                            ["pip", "Package manager: install/uninstall/upgrade", "Grocery delivery", "Every time you need a library"],
                            ["venv", "Isolated environment per project", "Private kitchen", "Start of EVERY project"],
                            ["requirements.txt", "List of packages + versions", "Shopping list", "Sharing and deploying projects"],
                            ["VS Code / PyCharm", "Code editor with syntax highlighting", "Kitchen drawers", "Writing and running Python code"],
                            ["Terminal", "Command-line interface", "The pass where orders come in", "All pip and venv commands"]
                        ]},
                        {"type": "heading", "level": 2, "text": "Beginner Tip"},
                        {"type": "paragraph", "html": "<em>Run <code>python --version</code> in your terminal right now. If it shows 3.11 or higher, great. If you see 2.7 or nothing, do not worry — Lesson 3 covers the exact installation steps for Windows, macOS, and Linux.</em>"},
                        {"type": "heading", "level": 2, "text": "Your Learning Path for Today"},
                        {"type": "list", "format": "number", "items": [
                            "Understand why environment isolation matters (prevents version conflicts)",
                            "Install Python 3.11+ and verify installation",
                            "Choose and configure your IDE (VS Code recommended for beginners)",
                            "Learn pip: install, upgrade, list, uninstall, freeze",
                            "Create and activate a virtual environment with venv",
                            "Install packages inside the virtual environment",
                            "Write a Python script to verify Python version and modules",
                            "Generate requirements.txt for reproducible environments",
                            "Add venv to .gitignore so it is never committed to Git"
                        ]},
                        {"type": "heading", "level": 2, "text": "Core Concept Check"},
                        {"type": "paragraph", "html": "A virtual environment is simply a folder on your computer that contains a complete, isolated Python installation with its own Python interpreter and packages. When you activate it, your terminal uses THAT Python instead of the system Python. When you deactivate it, everything returns to normal. Nothing is permanently changed on your system."},
                        {"type": "heading", "level": 2, "text": "Learning Outcomes"},
                        {"type": "list", "format": "bullet", "items": [
                            "Master core concepts thoroughly",
                            "Build real-world applications",
                            "Write clean, maintainable code",
                            "Debug like a professional"
                        ]}
                    ]
                },
                {
                    "id": "topic-1-2",
                    "title": "Why Python Environment Setup Matters",
                    "type": "reading",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Why Python Environment Setup Matters: The Hidden Cost of Skipping It"},
                        {"type": "heading", "level": 2, "text": "The Version Conflict Disaster – What Happens Without venv"},
                        {"type": "code", "language": "text", "code": "REAL SCENARIO (without virtual environments):\n\nPROJECT A (Web Scraper) needs: requests==2.28.0\nPROJECT B (API Client) needs: requests==2.31.0 (incompatible API!)\n\nYou install requests for Project B: pip install requests==2.31.0\nNow Project A BREAKS because requests==2.28.0 is gone!\n\npip install django==3.2   → installs globally\npip install django==4.2   → overwrites! Django 3.2 project breaks!\n\nRESULT: One working project, one broken project. No way to run both.\n\"It works on my machine\" → because YOUR machine has the wrong version\n\nWITH VIRTUAL ENVIRONMENTS:\nproject_a/venv/  → has requests==2.28.0 in isolation\nproject_b/venv/  → has requests==2.31.0 in isolation\nBoth projects work simultaneously, forever."},
                        {"type": "heading", "level": 2, "text": "Global vs. Isolated – Side-by-Side Comparison"},
                        {"type": "paragraph", "html": "<strong>Without venv (Global Installation)</strong>"},
                        {"type": "code", "language": "bash", "code": "# pip install requests GLOBALLY:\npip install requests  # installs to system Python\n\n# Problems:\n# - ALL projects share same requests version\n# - Updating for Project B breaks Project A\n# - Deploying to server: no idea which exact versions\n# - Collaborator runs your code: gets different versions\n# - After 6 months: cannot tell which packages belong to which project\n# - sudo/admin required on many systems\n\npython --version    # 3.11.5\npip list            # 47 packages from ALL projects mixed together"},
                        {"type": "paragraph", "html": "<strong>With venv (Isolated Installation)</strong>"},
                        {"type": "code", "language": "bash", "code": "# One isolated environment per project:\npython -m venv myproject_env\nsource myproject_env/bin/activate  # enter isolation\n\n# Benefits:\n# - Only THIS project's packages exist here\n# - Other projects are completely unaffected\n# - pip freeze > requirements.txt: EXACT list for deploy\n# - Collaborator: pip install -r requirements.txt = identical!\n# - No admin/sudo needed (user-owned folder)\n# - Clean slate: delete the env folder to start over\n\npython --version    # 3.11.5\npip list            # only 3 packages: requests, certifi, urllib3"},
                        {"type": "heading", "level": 2, "text": "Why Python 3.11+ Specifically?"},
                        {"type": "code", "language": "bash", "code": "# Python version history and why 3.11+ matters:\n\n# Python 2.7:  End of Life January 2020. DO NOT USE.\n# Python 3.6:  f-strings added. Still common but old.\n# Python 3.8:  Walrus operator (:=). Many servers use this.\n# Python 3.10: Pattern matching (match/case). Significant update.\n# Python 3.11: 10-60% FASTER than 3.10. Better error messages.\n#              \"Did you mean 'xyz'?\" errors. Type hints improved.\n# Python 3.12: Even faster, more improvements.\n\n# Python 3.11 improved error messages (huge for beginners):\n# OLD Python error: AttributeError: 'NoneType' object has no attribute 'split'\n# NEW 3.11 error:   AttributeError: 'NoneType' object has no attribute 'split'\n#                   Hint: Did you forget to return a value from your function?\n\n# Check your current Python version:\npython --version       # may show Python 2.7 on old Macs\npython3 --version      # usually shows Python 3.x\npy --version            # Windows alternative\n\n# IMPORTANT: On macOS/Linux, use \"python3\" and \"pip3\"\n# On Windows (with Python 3 installed), use \"python\" and \"pip\""}
                    ]
                },
                {
                    "id": "topic-1-3",
                    "title": "Installing Python 3.11+: The Foundation of Everything",
                    "type": "reading",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Installing Python 3.11+: The Foundation of Everything"},
                        {"type": "heading", "level": 2, "text": "Installation Guide – All Platforms"},
                        {"type": "code", "language": "bash", "code": "# ── WINDOWS ──────────────────────────────────────────────────────────\n# Method 1: Official Installer (recommended for beginners)\n# 1. Go to python.org/downloads\n# 2. Click \"Download Python 3.11.x\" (the big yellow button)\n# 3. Run the installer\n# 4. CRITICAL: Check \"Add Python to PATH\" checkbox at the bottom!\n# 5. Click \"Install Now\"\n\n# Verify installation (open Command Prompt or PowerShell):\npython --version         # → Python 3.11.x\npip --version             # → pip 23.x from C:\\Users\\...\\python3.11\n\n# If python command not found after install:\n# Search \"Environment Variables\" in Windows → Path → Add Python folder\n\n# Method 2: Microsoft Store (easiest):\n# Open Microsoft Store → search \"Python 3.11\" → Install\n# This auto-adds to PATH\n\n# ── macOS ──────────────────────────────────────────────────────────────\n# Method 1: Official Installer\n# 1. python.org/downloads → Download Python 3.11 for macOS\n# 2. Open the .pkg file and follow instructions\n\n# Verify (open Terminal):\npython3 --version        # → Python 3.11.x\npip3 --version            # → pip 23.x\n\n# Method 2: Homebrew (recommended for developers):\n/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"\nbrew install python@3.11\npython3 --version\n\n# ── LINUX (Ubuntu/Debian) ─────────────────────────────────────────────\nsudo apt update\nsudo apt install python3.11 python3.11-venv python3-pip\npython3.11 --version\n\n# ── VERIFICATION (ALL PLATFORMS) ─────────────────────────────────────\n# After installation, ALL of these should work:\npython --version         # or python3 --version on Mac/Linux\npip --version              # or pip3 --version on Mac/Linux\npython -c \"import sys; print(sys.executable)\"  # shows Python location\n\n# ── COMMON ISSUE: Multiple Python versions ────────────────────────────\n# If \"python\" shows 2.7 but \"python3\" shows 3.11:\n# Always use python3 and pip3 on Mac/Linux\n# Set alias in ~/.zshrc or ~/.bashrc:\nalias python=python3\nalias pip=pip3"},
                        {"type": "heading", "level": 2, "text": "pyenv – Managing Multiple Python Versions Like a Pro"},
                        {"type": "code", "language": "bash", "code": "# pyenv lets you install and switch between multiple Python versions:\n# Perfect when you work on projects requiring different Python versions\n\n# Install pyenv (macOS/Linux):\ncurl https://pyenv.run | bash\n# Add to ~/.bashrc or ~/.zshrc:\nexport PATH=\"$HOME/.pyenv/bin:$PATH\"\neval \"$(pyenv init -)\"\n\n# Install pyenv-win (Windows):\n# https://github.com/pyenv-win/pyenv-win\n\n# Install specific Python versions:\npyenv install 3.11.5\npyenv install 3.12.0\n\n# Set global default:\npyenv global 3.11.5\n\n# Set version for a specific project folder:\ncd my-project\npyenv local 3.11.5       # creates .python-version file\npython --version          # → Python 3.11.5 in this folder only!"}
                    ]
                },
                {
                    "id": "topic-1-4",
                    "title": "Choosing the Right IDE",
                    "type": "reading",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Choosing the Right IDE: VS Code, PyCharm, and Jupyter"},
                        {"type": "heading", "level": 2, "text": "IDE Comparison – Which One Is Right for You?"},
                        {"type": "table", "headers": ["IDE", "Best For", "Cost", "Key Features"], "rows": [
                            ["VS Code", "General Python, web, beginners", "Free", "Python extension, debugger, Git, terminal, lightweight"],
                            ["PyCharm Community", "Pure Python projects", "Free", "Best Python autocomplete, built-in venv, refactoring"],
                            ["PyCharm Professional", "Django, Flask, databases", "Paid (~$99/yr)", "Web frameworks, SQL, Django ORM support, profiler"],
                            ["Jupyter Notebook", "Data science, ML, exploration", "Free", "Cell-by-cell execution, plots inline, markdown"],
                            ["Jupyter Lab", "Data science (advanced)", "Free", "Multi-panel, better UI than Notebook, extensions"],
                            ["Thonny", "Absolute beginners (kids)", "Free", "Step-by-step debugger, extremely simple UI"]
                        ]},
                        {"type": "heading", "level": 2, "text": "Setting Up VS Code for Python (Recommended)"},
                        {"type": "code", "language": "bash", "code": "# Step 1: Download VS Code\n# Go to code.visualstudio.com → Download for your OS → Install\n\n# Step 2: Install the Python Extension\n# Open VS Code → Ctrl+Shift+X (Extensions) → Search \"Python\"\n# Install \"Python\" by Microsoft (the one with 50M+ downloads)\n\n# Step 3: Select your Python Interpreter\n# Ctrl+Shift+P → \"Python: Select Interpreter\"\n# Choose Python 3.11+ (or your venv if already created)\n\n# Step 4: Essential Extensions for Python Development:\n# 1. Python (Microsoft) - autocomplete, linting, debugging\n# 2. Pylance - advanced type checking and IntelliSense\n# 3. Black Formatter - auto-format code on save\n# 4. GitLens - see git blame inline\n# 5. Python Test Explorer - run pytest tests visually\n\n# Step 5: Configure VS Code settings (settings.json):\n# Ctrl+Shift+P → \"Open User Settings (JSON)\""},
                        {"type": "code", "language": "json", "code": "{\n    \"editor.fontSize\": 14,\n    \"editor.tabSize\": 4,\n    \"python.formatting.provider\": \"black\",\n    \"editor.formatOnSave\": true,\n    \"python.linting.enabled\": true,\n    \"python.linting.pylintEnabled\": true,\n    \"terminal.integrated.shell.windows\": \"cmd.exe\"\n}"},
                        {"type": "code", "language": "bash", "code": "# Step 6: Open integrated terminal\n# Ctrl+backtick (`) → opens terminal at project root\n# Now you can run all python, pip, venv commands without leaving VS Code!"}
                    ]
                },
                {
                    "id": "topic-1-5",
                    "title": "pip: Your Python Package Manager",
                    "type": "reading",
                    "content": [
                        {"type": "heading", "level": 1, "text": "pip: Your Python Package Manager"},
                        {"type": "heading", "level": 2, "text": "pip – Complete Command Reference"},
                        {"type": "code", "language": "bash", "code": "# INSTALLING PACKAGES:\npip install requests             # latest version of requests\npip install requests==2.31.0    # exact version (recommended for reproducibility)\npip install requests>=2.28      # minimum version (any 2.28 or above)\npip install requests pandas numpy  # multiple packages in one command\n\n# UPGRADING PACKAGES:\npip install --upgrade requests   # upgrade requests to latest\npip install --upgrade pip        # upgrade pip itself (do this often!)\n\n# UNINSTALLING:\npip uninstall requests           # removes requests\npip uninstall requests pandas    # removes multiple packages\n\n# LISTING INSTALLED PACKAGES:\npip list                         # shows all packages with versions\npip show requests                # detailed info about one package (location, deps)\npip list --outdated              # shows packages with newer versions available\n\n# SEARCHING (limited, PyPI is better):\npip search requests              # search PyPI (may not work in all pip versions)\n# Better: visit pypi.org to discover packages\n\n# GENERATING requirements.txt:\npip freeze                       # prints all installed packages with exact versions\npip freeze > requirements.txt    # saves to file\n\n# INSTALLING FROM requirements.txt:\npip install -r requirements.txt  # installs everything from the file\n# This is how you recreate an environment from scratch!\n\n# WHERE packages are installed:\npip show requests | grep Location  # shows the exact folder\n# With venv active: goes into venv/lib/python3.11/site-packages/\n# Without venv:     goes into system Python (AVOID!)\n\n# COMMON MISTAKE: pip vs pip3\n# macOS/Linux: use pip3 when outside venv, or just use pip inside activated venv\n# Windows: pip works after Python 3 install (no pip3 needed)"},
                        {"type": "heading", "level": 2, "text": "Popular Python Packages – Your First Pantry"},
                        {"type": "table", "headers": ["Package", "Purpose", "Install"], "rows": [
                            ["requests", "HTTP requests (APIs, web scraping)", "pip install requests"],
                            ["pandas", "Data manipulation and analysis", "pip install pandas"],
                            ["numpy", "Numerical computing, arrays", "pip install numpy"],
                            ["flask", "Lightweight web framework", "pip install flask"],
                            ["django", "Full-featured web framework", "pip install django"],
                            ["sqlalchemy", "Database ORM", "pip install sqlalchemy"],
                            ["pytest", "Testing framework", "pip install pytest"],
                            ["black", "Code auto-formatter", "pip install black"],
                            ["matplotlib", "Data visualization/charts", "pip install matplotlib"],
                            ["scikit-learn", "Machine learning", "pip install scikit-learn"]
                        ]}
                    ]
                },
                {
                    "id": "topic-1-6",
                    "title": "Virtual Environments (venv)",
                    "type": "reading",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Virtual Environments (venv): Your Project's Private Kitchen"},
                        {"type": "heading", "level": 2, "text": "Complete venv Workflow – From Creation to Deactivation"},
                        {"type": "code", "language": "bash", "code": "# STEP 1: Navigate to your project folder\ncd ~/projects/my-python-app    # go to project directory\n# Or create a new project folder:\nmkdir ~/projects/my-python-app\ncd ~/projects/my-python-app\n\n# STEP 2: Create the virtual environment\npython -m venv venv            # creates a folder named \"venv\"\n# The folder name \"venv\" is convention, but you can use any name:\n# python -m venv myenv\n# python -m venv .venv         (hidden folder, used in many projects)\n# python3 -m venv venv         (use python3 on macOS/Linux if needed)\n\n# WHAT THE VENV FOLDER CONTAINS:\n# venv/\n#   bin/         (macOS/Linux): python, pip, activate script\n#   Scripts/     (Windows): python.exe, pip.exe, activate.bat\n#   lib/         Python standard library copy\n#   pyvenv.cfg   version info\n\n# STEP 3: ACTIVATE the virtual environment\n# ── Windows (Command Prompt):\nvenv\\Scripts\\activate\n# ── Windows (PowerShell):\nvenv\\Scripts\\Activate.ps1\n# ── macOS / Linux (bash/zsh):\nsource venv/bin/activate\n\n# After activation, your prompt changes:\n# Before: C:\\Users\\alice\\projects\\myapp>\n# After:  (venv) C:\\Users\\alice\\projects\\myapp>\n# The \"(venv)\" prefix confirms you are inside the virtual environment!\n\n# STEP 4: Install packages (INSIDE the activated environment)\npip install requests pandas     # installs ONLY in this venv\n\n# STEP 5: Verify you are using the venv Python\nwhich python                    # macOS/Linux: shows venv/bin/python\nwhere python                    # Windows: shows venv\\Scripts\\python.exe\npython --version                # should show Python 3.11.x\n\n# STEP 6: DEACTIVATE when done\ndeactivate\n# Prompt returns to normal, system Python is used again\n# Your venv still exists, just not active"},
                        {"type": "heading", "level": 2, "text": "venv Inside VS Code – Automatic Activation"},
                        {"type": "code", "language": "bash", "code": "# VS Code can auto-detect and activate your venv!\n\n# After creating venv, VS Code prompts:\n# \"We noticed a new virtual environment. Do you want to select it?\"\n# Click \"Yes\" → VS Code uses venv automatically for all terminals\n\n# Manual selection:\n# Ctrl+Shift+P → \"Python: Select Interpreter\"\n# Choose: ./venv/bin/python (macOS/Linux) or .\\venv\\Scripts\\python.exe (Windows)\n\n# Verify VS Code is using venv:\n# Bottom status bar shows: Python 3.11.5 ('venv':venv)  ← correct!\n# vs: Python 3.11.5 (Global)  ← no venv selected\n\n# IMPORTANT: .gitignore file must exclude venv:\necho \"venv/\" >> .gitignore\necho \"__pycache__/\" >> .gitignore\necho \"*.pyc\" >> .gitignore\necho \".env\" >> .gitignore\n\n# WHY exclude venv from Git?\n# venv/ can be 50-200MB+ (thousands of files)\n# requirements.txt recreates it in seconds\n# venv folders are OS-specific (Windows venv won't work on Mac)"}
                    ]
                },
                {
                    "id": "topic-1-7",
                    "title": "Python Environment Best Practices",
                    "type": "reading",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Python Environment Best Practices: What Every Professional Developer Does"},
                        {"type": "heading", "level": 2, "text": "The 8 Professional Rules"},
                        {"type": "list", "format": "number", "items": [
                            "**Always Create a venv at the Start of Every Project.** Before writing a single line of Python code, run `python -m venv venv` and activate it. This takes 10 seconds and prevents 95% of environment problems forever.",
                            "**Pin Exact Package Versions in requirements.txt.** Use `requests==2.31.0` not just `requests`. Exact versions ensure your code works the same on every machine and every deployment. Use `pip freeze > requirements.txt` to capture exact versions automatically.",
                            "**Always Add venv to .gitignore.** The venv folder is 50-200MB and OS-specific. It should never be committed to Git. Instead, commit requirements.txt and run `pip install -r requirements.txt` to recreate it.",
                            "**Keep pip Updated.** Run `pip install --upgrade pip` regularly. Outdated pip can have security vulnerabilities and may fail to install newer packages.",
                            "**Use a .env File for Secrets, Never Hardcode Them.** Never put API keys, database passwords, or tokens directly in your Python files. Use a `.env` file with python-dotenv and add `.env` to .gitignore.",
                            "**Use Python 3.11+ for New Projects.** Never start a new project with Python 2.x (EOL in 2020) or Python 3.7 and below. Python 3.11 is significantly faster and has better error messages.",
                            "**Separate requirements Files for Dev and Production.** Create `requirements.txt` for production (requests, pandas) and `requirements-dev.txt` for development tools (pytest, black, pylint). Production servers do not need test frameworks.",
                            "**Name Your venv Consistently.** Use `venv` or `.venv` (the leading dot hides it on Mac/Linux) consistently across all projects. Avoid project-specific names like `myapp_env` — they confuse editors and CI/CD pipelines."
                        ]}
                    ]
                },
                {
                    "id": "topic-1-8",
                    "title": "Hands-On Exercise: Create a Virtual Environment",
                    "type": "exercise",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Hands-On Exercise: Create a Virtual Environment and Install External Packages"},
                        {"type": "heading", "level": 2, "text": "Complete Hands-On – Build a Real Python Project Environment"},
                        {"type": "code", "language": "bash", "code": "# ── STEP 1: CREATE THE PROJECT ──────────────────────────────────────\nmkdir my_first_project\ncd my_first_project\n\n# ── STEP 2: CREATE THE VIRTUAL ENVIRONMENT ──────────────────────────\npython -m venv venv        # creates isolated Python environment\n# Windows: python -m venv venv\n# Mac/Linux: python3 -m venv venv\n\n# ── STEP 3: ACTIVATE IT ──────────────────────────────────────────────\n# Windows (Command Prompt):\nvenv\\Scripts\\activate\n# Windows (PowerShell):\nvenv\\Scripts\\Activate.ps1\n# macOS / Linux:\nsource venv/bin/activate\n\n# Your prompt now shows: (venv) $  ← YOU ARE INSIDE THE ENVIRONMENT!\n\n# ── STEP 4: UPGRADE PIP (always do this first!) ──────────────────────\npython -m pip install --upgrade pip\n# Output: Successfully installed pip-23.3.1\n\n# ── STEP 5: INSTALL PACKAGES ─────────────────────────────────────────\npip install requests         # HTTP library\npip install pandas           # data analysis\npip install python-dotenv    # load .env files\n\n# ── STEP 6: VERIFY INSTALLATION ──────────────────────────────────────\npip list\n# Package             Version\n# ------------------- --------\n# certifi             2023.7.22\n# charset-normalizer  3.3.2\n# idna                3.4\n# numpy               1.26.2\n# pandas              2.1.3\n# python-dateutil     2.8.2\n# python-dotenv       1.0.0\n# pytz                2023.3.post1\n# requests            2.31.0\n# six                 1.16.0\n# tzdata              2023.3\n# urllib3             2.1.0\n\n# ── STEP 7: CREATE PROJECT STRUCTURE ─────────────────────────────────\n# Create the main Python file:\n# (use your IDE or the terminal command below)\n# touch main.py          (Mac/Linux)\n# type nul > main.py    (Windows)\n\n# ── STEP 8: SET UP .gitignore ────────────────────────────────────────\n# Create .gitignore file:\ncat > .gitignore << EOF\nvenv/\n__pycache__/\n*.pyc\n*.pyo\n.env\n.DS_Store\n*.egg-info/\ndist/\nbuild/\nEOF\n\n# ── STEP 9: GENERATE requirements.txt ────────────────────────────────\npip freeze > requirements.txt\ncat requirements.txt\n# certifi==2023.7.22\n# charset-normalizer==3.3.2\n# idna==3.4\n# numpy==1.26.2\n# pandas==2.1.3\n# ...\n\n# ── FINAL PROJECT STRUCTURE ───────────────────────────────────────────\n# my_first_project/\n# ├── venv/              ← virtual environment (NOT in Git)\n# ├── main.py            ← your Python code\n# ├── .env               ← secrets (NOT in Git)\n# ├── .gitignore         ← excludes venv and .env\n# └── requirements.txt   ← package list (IN Git)"},
                        {"type": "heading", "level": 2, "text": "Exercises"},
                        {"type": "list", "format": "number", "items": [
                            "Deactivate the venv (`deactivate`), then try `pip list` — notice the packages you installed are gone from the global view.",
                            "Reactivate and run `python -c \"import requests; print(requests.__version__)\"` to verify the package is available.",
                            "Create a second project folder, create its own venv, and install only `flask` — verify that `requests` is NOT in this new environment.",
                            "Delete the venv folder, then recreate it using `pip install -r requirements.txt` and confirm all packages are restored."
                        ]}
                    ]
                },
                {
                    "id": "topic-1-9",
                    "title": "Practice Task: Verify Environment Script",
                    "type": "coding",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Practice Task: Write a Script to Print Python Version and Installed Modules"},
                        {"type": "heading", "level": 2, "text": "Complete environment_check.py Script"},
                        {"type": "code", "language": "python", "code": "# environment_check.py\n# Run this script to verify your Python environment is correctly set up\n# Usage: python environment_check.py\n\nimport sys\nimport platform\nimport subprocess\n\ndef print_separator(title):\n    print(f\"\\n{'='*50}\")\n    print(f\"  {title}\")\n    print('='*50)\n\n# ── PYTHON VERSION ──────────────────────────────────────────\nprint_separator(\"Python Version Information\")\n\nprint(f\"Python Version:     {sys.version}\")\nprint(f\"Version Info:       {sys.version_info}\")\nprint(f\"Major Version:      {sys.version_info.major}\")\nprint(f\"Minor Version:      {sys.version_info.minor}\")\nprint(f\"Platform:           {sys.platform}\")\nprint(f\"OS:                 {platform.system()} {platform.release()}\")\nprint(f\"Python Executable:  {sys.executable}\")\nprint(f\"Python Path:        {sys.prefix}\")\n\n# Check if we are in a virtual environment:\nin_venv = hasattr(sys, 'real_prefix') or (\n    hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix\n)\nprint(f\"In Virtual Env:     {'YES' if in_venv else 'NO (activate your venv!)'}\")\n\n# ── INSTALLED PACKAGES ───────────────────────────────────────\nprint_separator(\"Installed Packages (pip list)\")\n\ntry:\n    result = subprocess.run(\n        [sys.executable, '-m', 'pip', 'list'],\n        capture_output=True,\n        text=True\n    )\n    print(result.stdout)\nexcept Exception as e:\n    print(f\"Error getting packages: {e}\")\n\n# ── CHECK SPECIFIC PACKAGES ──────────────────────────────────\nprint_separator(\"Key Package Version Check\")\n\npackages_to_check = ['requests', 'pandas', 'numpy', 'flask', 'django']\n\nfor pkg_name in packages_to_check:\n    try:\n        pkg = __import__(pkg_name)\n        version = getattr(pkg, '__version__', 'unknown')\n        print(f\"  [OK] {pkg_name:<20} {version}\")\n    except ImportError:\n        print(f\"  [MISSING] {pkg_name:<20} NOT INSTALLED\")\n\n# ── SYSTEM PATH ──────────────────────────────────────────────\nprint_separator(\"sys.path (Where Python Looks for Modules)\")\nfor i, path in enumerate(sys.path[:5]):  # show first 5 paths\n    print(f\"  [{i}] {path}\")\n\nprint(\"\\nEnvironment check complete!\")\nprint(\"If 'In Virtual Env: YES', you are correctly set up.\\n\")"},
                        {"type": "heading", "level": 2, "text": "Expected Output When Everything Is Correct"},
                        {"type": "code", "language": "text", "code": "# Expected output (with venv activated):\n==================================================\n  Python Version Information\n==================================================\nPython Version:     3.11.5 (main, Sep 11 2023, 08:18:25)\nVersion Info:       sys.version_info(major=3, minor=11, micro=5)\nMajor Version:      3\nMinor Version:      11\nPlatform:           darwin\nOS:                 Darwin 22.6.0\nPython Executable:  /Users/alice/projects/myapp/venv/bin/python\nPython Path:        /Users/alice/projects/myapp/venv\nIn Virtual Env:     YES          ← this confirms venv is active!\n\n==================================================\n  Installed Packages (pip list)\n==================================================\nPackage         Version\n--------------- --------\ncertifi         2023.7.22\npandas          2.1.3\npip             23.3.1\nrequests        2.31.0\n\n==================================================\n  Key Package Version Check\n==================================================\n  [OK] requests             2.31.0\n  [MISSING] flask           NOT INSTALLED  ← not installed, that's fine!\n\nEnvironment check complete!"}
                    ]
                },
                {
                    "id": "topic-1-10",
                    "title": "Challenge Task: Configure requirements.txt",
                    "type": "reading",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Challenge Task: Configure requirements.txt for Environment Version Control"},
                        {"type": "heading", "level": 2, "text": "requirements.txt – The Complete Guide"},
                        {"type": "code", "language": "bash", "code": "# GENERATING requirements.txt:\npip freeze > requirements.txt   # captures ALL installed packages with exact versions\n\n# WHAT IT LOOKS LIKE:\ncertifi==2023.7.22\ncharset-normalizer==3.3.2\nidna==3.4\nnumpy==1.26.2\npandas==2.1.3\npython-dateutil==2.8.2\npython-dotenv==1.0.0\npytz==2023.3.post1\nrequests==2.31.0\nsix==1.16.0\ntzdata==2023.3\nurllib3==2.1.0\n\n# USING IT TO RECREATE THE ENVIRONMENT:\n# On another machine or after deleting venv:\npython -m venv venv             # fresh environment\nsource venv/bin/activate        # activate\npip install -r requirements.txt # install EXACT same packages\n\n# ADVANCED: SEPARATE requirements files:\n# requirements.txt (production only):\nrequests==2.31.0\npandas==2.1.3\npython-dotenv==1.0.0\n\n# requirements-dev.txt (development and testing tools):\n-r requirements.txt             # include production deps\npytest==7.4.3\nblack==23.11.0\npylint==3.0.2\npytest-cov==4.1.0\n\n# Install dev dependencies:\npip install -r requirements-dev.txt\n\n# MANUAL requirements.txt (only your direct dependencies, no sub-deps):\n# This is cleaner and more explicit:\nrequests>=2.28.0,<3.0.0        # any 2.x version >= 2.28\npandas==2.1.3                   # exact version\nnumpy>=1.24                     # at least 1.24\n\n# BEST PRACTICE:\n# Use pip freeze for production (guaranteed reproducibility)\n# Use manual versions when you want flexibility (range of versions)"},
                        {"type": "heading", "level": 2, "text": "The .env File – Managing Secrets Professionally"},
                        {"type": "code", "language": "bash", "code": "# NEVER hardcode secrets in Python files!\n# BAD (dangerous, do not do this):\nAPI_KEY = \"sk-live-abc123xyz\"\nDB_PASSWORD = \"mySecretPassword\"\n\n# GOOD: Use .env file + python-dotenv:\n# .env file (add to .gitignore!):\nAPI_KEY=sk-live-abc123xyz\nDB_HOST=localhost\nDB_NAME=myapp\nDB_PASSWORD=mySecretPassword\nDEBUG=True\n\n# Install python-dotenv:\npip install python-dotenv"},
                        {"type": "code", "language": "python", "code": "# main.py - load from .env:\nfrom dotenv import load_dotenv\nimport os\n\nload_dotenv()  # reads .env file and loads into environment\n\napi_key  = os.getenv(\"API_KEY\")\ndb_host  = os.getenv(\"DB_HOST\", \"localhost\")  # default value if not set\ndebug    = os.getenv(\"DEBUG\", \"False\").lower() == \"true\"\n\nprint(f\"API Key: {api_key[:8]}...\")    # only show first 8 chars!\nprint(f\"DB Host: {db_host}\")\nprint(f\"Debug mode: {debug}\")"},
                        {"type": "code", "language": "bash", "code": "# .env.example (COMMIT this to Git - no real secrets, just the key names):\n# API_KEY=your_api_key_here\n# DB_HOST=localhost\n# DB_NAME=myapp\n# DB_PASSWORD=your_password_here\n# DEBUG=True"}
                    ]
                },
                {
                    "id": "topic-1-11",
                    "title": "Python Environment Best Practices & Checklist",
                    "type": "reading",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Python Environment Best Practices & Production Checklist"},
                        {"type": "heading", "level": 2, "text": "Alternative Tools – Beyond Basic venv"},
                        {"type": "code", "language": "bash", "code": "# As you grow, you may encounter these tools:\n\n# CONDA / MINICONDA:\n# Popular in data science. Manages Python + non-Python dependencies (C libs, etc.)\n# conda create -n myenv python=3.11\n# conda activate myenv\n# conda install pandas numpy\n# conda deactivate\n# Best for: Machine learning, data science projects\n\n# POETRY:\n# Modern dependency management + packaging tool\n# pip install poetry\n# poetry new myproject         # creates project with pyproject.toml\n# poetry add requests          # adds and locks dependency\n# poetry install               # recreates environment from lockfile\n# Best for: Professional Python packages, APIs\n\n# PIPENV:\n# Combines pip + virtualenv\n# pip install pipenv\n# pipenv install requests      # creates venv + Pipfile.lock\n# pipenv shell                 # activates the virtual environment\n# Best for: Web applications with Django/Flask\n\n# VENV vs CONDA vs POETRY - WHICH TO CHOOSE?\n# Day 1 Beginner:   venv + pip (we are here - simplest, built-in)\n# Data Science:     conda (handles complex binary packages)\n# Production APIs:  Poetry (best dependency management)\n# Web Apps:         venv + pip (Flask/Django usually use this)\n\n# FOR TODAY: Stick with venv. Master it first. Tools change, concepts stay.\n# Everything you learn about venv translates directly to conda and poetry."},
                        {"type": "heading", "level": 2, "text": "Common Pitfalls Reference"},
                        {"type": "table", "headers": ["#", "Pitfall", "Fix"], "rows": [
                            ["1", "Installing packages globally (no venv)", "Always create and activate venv first, then pip install"],
                            ["2", "Committing venv/ folder to Git (100MB+)", "Add venv/ to .gitignore, use requirements.txt instead"],
                            ["3", "Using python 2.7 unintentionally", "Run `python --version`; use `python3` on Mac/Linux"],
                            ["4", "Hardcoding API keys in Python files", "Use .env file + python-dotenv, add .env to .gitignore"],
                            ["5", "Forgetting to activate venv (packages not found)", "Check prompt for (venv) prefix; run `source venv/bin/activate`"],
                            ["6", "requirements.txt with no version pins", "Use `pip freeze > requirements.txt` for exact versions"],
                            ["7", "One venv for all projects (defeats the purpose)", "Create a separate venv in every project folder"],
                            ["8", "Outdated pip causing install failures", "Run `python -m pip install --upgrade pip` regularly"]
                        ]}
                    ]
                },
                {
                    "id": "topic-1-12",
                    "title": "Challenge Task: Generate and Use requirements.txt End-to-End",
                    "type": "exercise",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Challenge Task: Generate and Use requirements.txt End-to-End"},
                        {"type": "heading", "level": 2, "text": "The Full Environment Lifecycle – Prove It Works"},
                        {"type": "code", "language": "bash", "code": "# CHALLENGE: Prove that requirements.txt truly recreates the environment\n\n# ── PHASE 1: Build the environment ───────────────────────────────────\nmkdir challenge_project && cd challenge_project\npython -m venv venv\nsource venv/bin/activate    # (or venv\\Scripts\\activate on Windows)\npip install requests==2.31.0 pandas==2.1.3 python-dotenv==1.0.0\n\n# Generate the requirements file:\npip freeze > requirements.txt\ncat requirements.txt         # note approximately what's there\n\n# ── PHASE 2: DESTROY the environment ─────────────────────────────────\ndeactivate\nrm -rf venv/                 # delete the entire environment!\n# (on Windows: rmdir /s /q venv)\n\n# Try to import requests (should fail!):\npython -c \"import requests\"\n# → ModuleNotFoundError: No module named 'requests'   ← CONFIRMED DELETED\n\n# ── PHASE 3: RECREATE from requirements.txt ──────────────────────────\npython -m venv venv          # fresh environment\nsource venv/bin/activate\npip install -r requirements.txt  # install EVERYTHING from the list\n\n# ── PHASE 4: VERIFY exact same state ─────────────────────────────────\npython -c \"import requests; print(f'requests {requests.__version__}')\"\n# → requests 2.31.0   ← SAME EXACT VERSION as before!\n\npython -c \"import pandas; print(f'pandas {pandas.__version__}')\"\n# → pandas 2.1.3   ← SAME EXACT VERSION\n\npip list | wc -l             # should show same number of packages\n\necho \"Challenge complete! requirements.txt successfully recreated the environment.\"\n\n# ── BONUS: Share with a colleague ────────────────────────────────────\n# All a colleague needs to recreate your environment:\n# 1. git clone your-repo\n# 2. python -m venv venv\n# 3. source venv/bin/activate\n# 4. pip install -r requirements.txt\n# 5. Done! Same environment on their machine in 60 seconds."},
                        {"type": "heading", "level": 2, "text": "Standard Python Project Structure"},
                        {"type": "code", "language": "text", "code": "# Professional Python project structure (use as a template):\nmy_project/\n├── venv/                   ← virtual environment (in .gitignore!)\n├── src/                    ← your source code\n│   ├── __init__.py\n│   └── main.py\n├── tests/                  ← test files\n│   ├── __init__.py\n│   └── test_main.py\n├── docs/                   ← documentation\n├── .env                    ← secrets (in .gitignore!)\n├── .env.example             ← example env vars (IN git)\n├── .gitignore               ← excludes venv, .env, __pycache__\n├── requirements.txt         ← production packages (IN git)\n├── requirements-dev.txt     ← dev packages: pytest, black (IN git)\n├── README.md                ← project description and setup\n└── pyproject.toml           ← (optional) modern project config"}
                    ]
                },
                {
                    "id": "topic-1-13",
                    "title": "Final Challenge + Complete Cheat Sheet",
                    "type": "reading",
                    "content": [
                        {"type": "heading", "level": 1, "text": "Final Challenge + Complete Cheat Sheet & Expert Summary"},
                        {"type": "heading", "level": 2, "text": "Final Challenge – Complete Professional Python Setup"},
                        {"type": "list", "format": "bullet", "items": [
                            "Python 3.11+ installed and verified (`python --version`)",
                            "VS Code installed with Python extension and Pylance",
                            "Project folder created with venv inside",
                            "venv activated (prompt shows `(venv)`)",
                            "pip upgraded to latest version",
                            "requests, pandas, python-dotenv installed",
                            "environment_check.py script runs and shows \"In Virtual Env: YES\"",
                            "requirements.txt generated with exact versions",
                            ".gitignore created excluding venv/, .env, __pycache__/",
                            "Environment destroyed and recreated from requirements.txt successfully"
                        ]},
                        {"type": "heading", "level": 2, "text": "Complete Cheat Sheet – Python Environment Setup"},
                        {"type": "code", "language": "bash", "code": "# INSTALLATION CHECK:\npython --version                     # should be 3.11+\npython3 --version                    # (Mac/Linux)\npip --version                        # verify pip works\n\n# CREATE PROJECT ENVIRONMENT:\nmkdir my_project && cd my_project\npython -m venv venv                  # create environment\npython -m pip install --upgrade pip  # update pip\n\n# ACTIVATE:\nsource venv/bin/activate             # macOS/Linux\nvenv\\Scripts\\activate                # Windows CMD\nvenv\\Scripts\\Activate.ps1            # Windows PowerShell\n# Prompt shows: (venv) $\n\n# VERIFY ACTIVATION:\nwhich python                         # Mac/Linux: should show venv/bin/python\nwhere python                         # Windows: should show venv\\Scripts\\python.exe\npython -c \"import sys; print(sys.prefix)\"  # shows venv path\n\n# INSTALL PACKAGES:\npip install requests                 # latest\npip install requests==2.31.0        # exact version\npip install requests pandas numpy   # multiple at once\npip install -r requirements.txt     # from file\n\n# VIEW PACKAGES:\npip list                             # all packages\npip show requests                    # details about one package\npip list --outdated                  # packages with newer versions\n\n# FREEZE / REQUIREMENTS:\npip freeze > requirements.txt        # generate (exact versions)\ncat requirements.txt                 # view it\npip install -r requirements.txt      # recreate environment\n\n# UPGRADE / REMOVE:\npip install --upgrade requests       # upgrade\npip uninstall requests               # remove\n\n# DEACTIVATE:\ndeactivate                           # leave virtual environment\n\n# .gitignore MUST INCLUDE:\n# venv/\n# __pycache__/\n# *.pyc\n# .env"},
                        {"type": "code", "language": "python", "code": "# VERIFY PYTHON VERSION IN SCRIPT:\nimport sys\nprint(sys.version)                  # 3.11.5 (main, ...)\nprint(sys.version_info.major)       # 3\nin_venv = hasattr(sys, \"real_prefix\") or sys.base_prefix != sys.prefix\nprint(in_venv)                      # True (if venv is active)"},
                        {"type": "heading", "level": 2, "text": "Top 8 Python Environment Bugs"},
                        {"type": "table", "headers": ["#", "Bug", "Fix"], "rows": [
                            ["1", "`ModuleNotFoundError: No module named 'requests'`", "venv not activated; run `source venv/bin/activate` then `pip install requests`"],
                            ["2", "`python: command not found`", "Python not in PATH; re-install with \"Add to PATH\" checked, or use `python3`"],
                            ["3", "`pip: command not found`", "Use `python -m pip install ...` instead; or `pip3` on Mac/Linux"],
                            ["4", "venv creation fails: `ensurepip is not available`", "Install python3-venv: `sudo apt install python3.11-venv` (Ubuntu)"],
                            ["5", "PowerShell: \"cannot be loaded, running scripts is disabled\"", "Run: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`"],
                            ["6", "Wrong Python version runs despite installing 3.11", "Multiple Python versions on PATH; use pyenv or specify full path"],
                            ["7", "requirements.txt installs wrong versions", "Use `pip freeze` (exact `==`) not `pip list` (no versions)"],
                            ["8", "`ImportError: cannot import name X from package Y`", "Wrong package version; check requirements.txt and pin exact version"]
                        ]},
                        {"type": "heading", "level": 2, "text": "Production Checklist – You Are Now a Python Environment Expert"},
                        {"type": "list", "format": "bullet", "items": [
                            "Python 3.11+ installed and verified with `python --version`",
                            "VS Code installed with Python and Pylance extensions",
                            "Virtual environment created and activated (prompt shows `(venv)`)",
                            "pip upgraded to latest version",
                            "Packages installed inside venv (not globally)",
                            "environment_check.py script shows \"In Virtual Env: YES\"",
                            "requirements.txt generated with `pip freeze`",
                            ".gitignore created with venv/, .env, __pycache__/ excluded",
                            "Environment destroyed and recreated from requirements.txt",
                            "Confirmed: every project gets its own isolated venv"
                        ]},
                        {"type": "heading", "level": 2, "text": "Wrap-Up"},
                        {"type": "paragraph", "html": "Congratulations. You started Day 1 with no Python setup. You now have a clean, isolated, professional Python workspace: Python 3.11+ installed, VS Code configured, a virtual environment activated, packages installed and locked, a requirements.txt that can recreate the environment on any machine, and a .gitignore that keeps your repository clean. This is exactly how professional Python developers set up every single project they build.<br><br>Next stop: <strong>Day 2 — Your First Python Program and Variables.</strong>"}
                    ]
                }
            ]
        }
    ]
}

# The target file is src/data/lms/moduleContent.ts
# Let's read it, and add 'a1': data to moduleDataMap
with open('d:\\KLM3\\KL2\\src\\data\\lms\\moduleContent.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to insert the data into the moduleDataMap. 
# We'll generate the string representation of the data.
import textwrap

data_str = json.dumps(data, indent=2)
# Convert JSON to a format compatible with TS (quotes around keys aren't necessary but they work)
# We can just inject it before the last closing brace of moduleDataMap.
# But moduleDataMap could be like: export const moduleDataMap: Record<string, ModuleData> = { ... }

# Find the start of moduleDataMap
start_idx = content.find('export const moduleDataMap: Record<string, ModuleData> = {')
if start_idx != -1:
    # Find the end by keeping track of braces
    brace_count = 0
    in_map = False
    insert_pos = -1
    for i in range(start_idx, len(content)):
        if content[i] == '{':
            if not in_map:
                in_map = True
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if in_map and brace_count == 0:
                insert_pos = i
                break
    
    if insert_pos != -1:
        # We can insert our 'a1': data, here
        inject_str = f",\n  'a1': {data_str}\n"
        new_content = content[:insert_pos] + inject_str + content[insert_pos:]
        
        with open('d:\\KLM3\\KL2\\src\\data\\lms\\moduleContent.ts', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully injected AIML content!")
    else:
        print("Could not find the end of moduleDataMap")
else:
    print("Could not find moduleDataMap")
