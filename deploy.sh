#!/bin/bash
# File: deploy.sh
# Website: aqualibrium.oze.au
# Description: Deployment automation script
# Version: 26.03.010
# Date: 19 Mar 2026 | 12:40 AM AEDT
# Author: Colin Dixon
set -e

echo "Preparing to launch Aqualibrium Ocean Adventures updates..."

# Ensure we are on the main branch
branch=$(git branch --show-current)
if [ "$branch" != "main" ]; then
    echo "Error: You are on branch '$branch', not 'main'. Aborting."
    exit 1
fi

# Show current status first to verify what is being staged
git status --short

# Stage all changes
git add .

# Check whether anything is actually staged
if git diff --cached --quiet; then
    echo "No changes staged. Nothing to commit."
    exit 0
fi

# Prompt for a custom commit message
echo "Enter a commit message (or press Enter to use 'Routine Aqualibrium site update'):"
read -r message

# Set default message if left blank
if [ -z "$message" ]; then
    message="Routine Aqualibrium site update"
fi

# Commit the changes
git commit -m "$message"

# Push to trigger Hostinger deployment
git push origin main

echo "Successfully pushed to main. Hostinger deployment triggered."
