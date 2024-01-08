#!/bin/bash

# Specify the output directory
output_directory="/Users/ch.sarun/Documents/MyCodes/Code/Projects/Inventory/server/src/dtos/"

# Create the index.ts file
index_file="${output_directory}/index.ts"
echo "// index.ts" > "$index_file"

# Loop through each model file
for model_file in "${output_directory}"/*.*.ts
do
  # Extract the base name of the model file
  base_name=$(basename "$model_file")

  # Convert the base name to lowercase using tr
  model_name_lowercase=$(echo "$base_name" | tr '[:upper:]' '[:lower:]')

  # Remove the ".ts" extension
  model_name="${model_name_lowercase%.ts}"

  # Write the export statement to the index.ts file without the .ts extension
  echo "export * from \"./${model_name_lowercase%.*}\";" >> "$index_file"
done

echo "Created $index_file"
