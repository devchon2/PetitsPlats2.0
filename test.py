import os

def get_js_files_content(root_dir):
    js_files_content = []
    for root, dirs, files in os.walk(root_dir):
        # Exclure le fichier eslintrc.js et le dossier node_modules
        if "eslintrc.js" in files:
            files.remove("eslintrc.js")
        if "node_modules" in dirs:
            dirs.remove("node_modules")
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)
                with open(file_path, "r") as f:
                    content = f.read()
                    js_files_content.append(content)
    return js_files_content

current_dir = os.getcwd()
js_content = get_js_files_content(current_dir)

output_file_path = os.path.join("./", "site_complet.txt")
with open(output_file_path, "w") as output_file:
    output_file.write("\n".join(js_content))
