#!/bin/bash

echo "🚀 Starting Real Estate Abroad CMS..."

# Ensure database directory exists
mkdir -p .tmp
touch .tmp/data.db

# Start Strapi
npm run start