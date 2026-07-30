# Silo // Local Archive Intelligence

Silo is a lightweight, private local document and file search engine designed to run entirely on your machine. It features a modern dark-mode frontend and a fast local backend powered by native OS indexing.

---

## Quick Start Guide (For Non-Developers)

If you downloaded this repository as a zip or cloned it directly, follow these simple steps to get it running on your local machine:

### Step 1: Install Node.js
Silo requires Node.js to run its local search server. 
1. Go to [nodejs.org](https://nodejs.org/) and download the **LTS (Long Term Support)** version.
2. Run the installer and click through the standard setup steps.

### Step 2: Open Terminal in the Silo Folder
1. Open your computer's **Terminal** application.
2. Type `cd ` (with a space after it), then drag and drop your `silo` folder directly from Finder into the terminal window, and press **Enter**.

### Step 3: Run the Server
Once you are inside the folder in your terminal, run this command to start the backend search engine:
```bash
node filesystem-search-server.js
