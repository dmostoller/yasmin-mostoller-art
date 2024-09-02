
#!/bin/bash

# Install dependencies for Puppeteer
apt-get update && apt-get install -y \
  libnss3 \
  libxss1 \
  libasound2 \
  fonts-liberation \
  libappindicator3-1 \
  xdg-utils \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libgbm-dev

# Run the usual build
npm run build
