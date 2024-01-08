#!/bin/bash

# Specify the path to the DTO and model files
dto_file="/Users/ch.sarun/Documents/MyCodes/Code/Projects/Inventory/server/src/dtos/ac.dto.ts"
model_file="/Users/ch.sarun/Documents/MyCodes/Code/Projects/Inventory/server/src/models/ac.model.ts"

# Extract attribute names from DTO
dto_attributes=$(grep -o -E 'export interface INewACRequest \{(.*)\}' "$dto_file" | tr -d ' ' | tr -d '\n' | tr -d '\r' | sed 's/;//g' | tr ',' '\n')

# Extract attribute names from model
model_attributes=$(grep -o -E '@Column\({ nullable:.*\n(.*)!:.*\n\})' "$model_file" | awk '{print $1}' | tr -d ',')

# Function to remove attributes from DTO
remove_attributes() {
    for attribute in $dto_attributes
    do
        sed -i "/$attribute;/d" "$dto_file"
        sed -i "/$attribute:/d" "$dto_file"
        sed -i "/$attribute,/d" "$dto_file"
    done
}

# Function to add missing attributes to DTO
add_missing_attributes() {
    for attribute in $model_attributes
    do
        if ! grep -q "$attribute" <<< "$dto_attributes"; then
            sed -i "/export interface INewACRequest {/a\\
  $attribute: undefined;" "$dto_file"
        fi
    done
}

# Execute functions
remove_attributes
add_missing_attributes

echo "Attributes synchronized between DTO and model."
