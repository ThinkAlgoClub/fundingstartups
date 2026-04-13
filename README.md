# Funding Startups

### Clone the repository
- Open Command Prompt on Windows
- Navigate to the folder where you want to clone the repository
- Type the following command:
```
C:\...\fundingstartups> git clone https://github.com/ThinkAlgoClub/fundingstartups.git
```

### Virtual Envirnoment inside repository
- Create a virtual environment named `.env`
- Open Command Prompt on Windows
- Navigate to the `fundingstartups` folder
- Type the following command:
```
C:\...\fundingstartups> python -m venv .env
```
### Activate the virtual environment
- Open Command Prompt on Windows
- Navigate to the `fundingstartups` folder
- Type the following command:
C:\...\fundingstartups> .env\Scripts\activate

### Install required packages
- Open Command Prompt on Windows
- Navigate to the `.env`
(.env) C:\...\fundingstartups> pip install -r requirements.txt


### Creating Django project
```text
(.env) C:\...\fundingstartups> django-admin startproject config .
```