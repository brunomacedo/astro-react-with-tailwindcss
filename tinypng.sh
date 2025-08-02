#!/bin/bash

KEY_FILE="$HOME/.tinypng"

if [[ ! -f "$KEY_FILE" ]]; then
  echo "Missing ~/.tinypng file with your API key."
  exit 1
fi

API_KEY=$(cat "$KEY_FILE")

compress_image() {
  local image="$1"
  echo "Optimizing: $image"

  response=$(curl -s --user api:"$API_KEY" \
    --data-binary @"$image" \
    https://api.tinify.com/shrink)

  compressed_url=$(echo "$response" | jq -r '.output.url')

  if [[ "$compressed_url" == "null" || -z "$compressed_url" ]]; then
    echo "❌ Failed to optimize $image"
    echo "$response" | jq -r '.message // "Unknown error."'
    return
  fi

  curl -s "$compressed_url" -o "$image"
  echo "✔ $image optimized successfully"
}

process_input() {
  local input="$1"

  if [[ -f "$input" ]]; then
    compress_image "$input"
  elif [[ -d "$input" ]]; then
    find "$input" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r img; do
      compress_image "$img"
    done
  else
    echo "⚠️  Skipped: $input (not a valid file or directory)"
  fi
}

if [[ $# -eq 0 ]]; then
  # Usage:
  # bash tinypng.sh ./public/
  echo "Usage: $0 file_or_directory [...]"
  exit 1
fi

for arg in "$@"; do
  process_input "$arg"
done
