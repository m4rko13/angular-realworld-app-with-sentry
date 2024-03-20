#!/bin/sh

if [ -z "$1" ]; then
  echo "Directory path is required."
  exit 1
fi

vars=$(printenv | grep '^APP_' | cut -d= -f1 | sed 's/^/$/g' | tr '\n' ' ')

for file in ${1}/*.js; do
  echo "Start envsubst for $file..."
  temp_file="$(mktemp)"
  envsubst "${vars}" < "${file}" > "${temp_file}"
  mv "${temp_file}" "${file}"
  chmod 644 "${file}"
done
echo "Finished env replacements with envsubst for all *.js files."
