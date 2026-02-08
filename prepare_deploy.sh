#!/bin/bash

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "Git initialized."
fi

# Add all files
git add .

# Commit changes
git commit -m "Ready for Render Deployment: Enhanced UI + Full Stack"

echo "=========================================="
echo "✅ Code committed and ready to push!"
echo "=========================================="
echo "Next Steps:"
echo "1. Create a new repository on GitHub."
echo "2. Run the following commands (replace URL with your repo):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/mile-vaganan-events.git"
echo "   git push -u origin main"
echo ""
echo "3. Go to dashboard.render.com -> New Blueprint -> Connect this repo."
echo "=========================================="
