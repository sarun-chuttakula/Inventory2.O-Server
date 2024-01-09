#!/bin/bash

# Specify the target directory
target_directory="/Users/ch.sarun/Documents/MyCodes/Code/Projects/Inventory/server/src/"

# Directories to generate index files for
directories=("controllers" "dtos" "enums" "middlewares" "models" "repositories" "routes" "utils" "validations")

for directory in "${directories[@]}"
do
    index_file="${target_directory}/${directory}/index.ts"
    # Create the index file and append export statements
    echo "// Auto-generated index file for ${directory}" > "$index_file"
    echo "" >> "$index_file"
    find "${target_directory}/${directory}" -maxdepth 1 -type f -name "*.ts" -exec basename {} \; | sed 's/\.ts$/";/;s/^/export * from ".\//;' >> "$index_file"
    echo "" >> "$index_file"
done
