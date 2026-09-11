if [ -n "$(git status --short)" ]; then
    echo "Error: Uncommitted changes detected. Exiting..."
    exit 1
fi
echo "No uncommitted changes. Continuing..."

git switch __cloudflare__
git checkout __main__ -- src
git add --all
git commit -m 'Sync from __main__ branch'
git push
git switch __main__
