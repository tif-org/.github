import requests
import os

ORG_NAME = "tif-org"
README_PATH = "profile/README.md"

def get_org_members(org_name):
    url = f"https://api.github.com/orgs/{org_name}/members"
    headers = {
        "Authorization": f"Bearer {os.getenv('GITHUB_TOKEN')}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def generate_markdown_table(members):
    table = "| Foto Profil | Nama Anggota |\n| --- | --- |\n"
    for member in members:
        profile_url = member['html_url']
        avatar_url = member['avatar_url']
        username = member['login']
        table += f"| ![Avatar]({avatar_url}) | [{username}]({profile_url}) |\n"
    return table

def update_readme(content):
    with open(README_PATH, "w") as readme_file:
        readme_file.write(content)

def main():
    members = get_org_members(ORG_NAME)
    table_content = generate_markdown_table(members)
    readme_content = f"# Anggota Organisasi\n\n{table_content}"
    update_readme(readme_content)

if __name__ == "__main__":
    main()
