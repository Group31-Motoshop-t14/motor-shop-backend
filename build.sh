// build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn build
npx prisma migrate deploy