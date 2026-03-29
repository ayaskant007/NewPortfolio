---
description: How to deploy the portfolio to Netlify
---

# Deploying to Netlify

You have two main options to deploy your Next.js portfolio to Netlify:

## Option 1: Netlify CLI (Recommended for quick manual deploys)

1.  **Install Netlify CLI** (if not already installed):
    ```powershell
    npm install -g netlify-cli
    ```

2.  **Login to Netlify**:
    ```powershell
    netlify login
    ```
    *   This will open your browser to authenticate.

3.  **Initialize and Deploy**:
    ```powershell
    netlify init
    ```
    *   Follow the prompts.
    *   Create a new site.
    *   **Build command**: `npm run build`
    *   **Directory to deploy**: `.next` (or leave default if it detects Next.js)

4.  **Deploy to Production**:
    ```powershell
    netlify deploy --prod
    ```

## Option 2: Git Integration (Recommended for continuous deployment)

1.  **Push your code to GitHub**.
2.  **Log in to [Netlify](https://app.netlify.com/)**.
3.  Click **"Add new site"** -> **"Import from an existing project"**.
4.  Select **GitHub**.
5.  Choose your portfolio repository.
6.  Netlify should automatically detect the Next.js settings (Build command: `npm run build`, Publish directory: `.next`).
7.  **Environment Variables**:
    *   Go to **Site Settings** -> **Environment variables**.
    *   Click **Add a variable**.
    *   Key: `GROQ_API_KEY`
    *   Value: `gsk_...` (Your API Key)
8.  Click **Deploy**.

> [!NOTE]
> A `netlify.toml` file has been added to your project to help Netlify understand the configuration automatically.
