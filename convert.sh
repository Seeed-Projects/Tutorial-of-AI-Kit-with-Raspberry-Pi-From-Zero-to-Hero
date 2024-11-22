#!/bin/bash

set -euo pipefail

ARTICLES_DIR="./articles"
IPYNB_TEMPLATE="./articles/ipynb_template.tpl"

checkNbConvertApp() {
    if ! command -v jupyter-nbconvert &>/dev/null; then
        echo "Error: jupyter-nbconvert is not installed." >&2
        return 1
    fi
}

getNotebooksInDir() {
    local dir=$ARTICLES_DIR
    local -n articles_ref=$1

    while IFS= read -r -d '' file; do
        articles_ref+=("$file")
    done < <(find "$dir" -type f -name "*.ipynb" -print0)
}

notebook2Markdown() {
    local file=$1
    jupyter-nbconvert --to markdown --template "$IPYNB_TEMPLATE" "$file"
}

main() {
    checkNbConvertApp || exit 1

    local notebooks=()
    getNotebooksInDir notebooks

    for notebook in "${notebooks[@]}"; do
        echo "Converting $notebook to Markdown..."
        notebook2Markdown "$notebook"
    done

    echo "Conversion has completed."
}

main "$@"
