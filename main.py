import requests
import os
from datetime import datetime

ORG_NAME = "tif-org"
README_PATH = "profile/README.md"

def get_org_repos(org_name):
    url = f"https://api.github.com/orgs/{org_name}/repos"
    headers = {
        "Authorization": f"Bearer {os.getenv('GITHUB_TOKEN')}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def get_recent_commits(org_name, repos):
    headers = {
        "Authorization": f"Bearer {os.getenv('GITHUB_TOKEN')}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
    }
    commit_data = []
    for repo in repos:
        commits_url = f"https://api.github.com/repos/{org_name}/{repo['name']}/commits"
        commit_response = requests.get(commits_url, headers=headers)
        if commit_response.ok and commit_response.json():
            latest_commit = commit_response.json()[0]
            commit_data.append({
                "repo_name": repo['name'],
                "message": latest_commit['commit']['message'],
                "url": latest_commit['html_url'],
                "date": latest_commit['commit']['author']['date']
            })
    return commit_data

def generate_repo_stats(repos):
    content = "## 📊 Statistik Repository\n\n"
    content += "| Repository | Stars | Forks | Issues Terbuka |\n| --- | --- | --- | --- |\n"
    for repo in repos:
        repo_name = repo['name']
        repo_url = repo['html_url']
        stars = repo['stargazers_count']
        forks = repo['forks_count']
        open_issues = repo['open_issues_count']
        content += f"| [{repo_name}]({repo_url}) | {stars} | {forks} | {open_issues} |\n"
    return content

def generate_commit_log(commits):
    content = "## 🔄 Komitmen Terbaru\n\n"
    content += "| Repository | Komit Terbaru | Tanggal |\n| --- | --- | --- |\n"
    for commit in commits:
        date_str = datetime.strptime(commit['date'], "%Y-%m-%dT%H:%M:%SZ").strftime("%Y-%m-%d %H:%M")
        content += f"| {commit['repo_name']} | [{commit['message']}]({commit['url']}) | {date_str} |\n"
    return content

def update_readme(content):
    with open(README_PATH, "w") as readme_file:
        readme_file.write(content)

def main():
    repos = get_org_repos(ORG_NAME)
    commits = get_recent_commits(ORG_NAME, repos)
        
    repo_content = generate_repo_stats(repos)
    commit_content = generate_commit_log(commits)
    
    readme_content = (
        f"# 🌐 Profil Organisasi {ORG_NAME}\n\n"
        f"{repo_content}\n\n"
        f"{commit_content}\n"
    )
        
    update_readme(readme_content)

if __name__ == "__main__":
    main()
