#!/bin/bash

# Output file
output_file="all_combined_files.txt"

# Clear the output file if it exists
>$output_file

# Function to concatenate files recursively
concat_files() {
  local dir_path=$1
  for file in $(find "$dir_path" -type f); do
    echo "File: $file" >>$output_file
    cat "$file" >>$output_file
    echo -e "\n\n" >>$output_file
  done
}

# Concatenate files from the specified directories
concat_files "components"
concat_files "layouts"
concat_files "pages"
concat_files "styles"

echo "All files have been concatenated into $output_file"
