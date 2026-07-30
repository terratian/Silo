<p align="center">
  <img src="silologo.png" alt="Silo Logo" width="180" />
</p>

<h1 align="center">Silo // Local Archive Intelligence</h1>
<p align="center"><b>S</b>ecure <b>I</b>nformation <b>L</b>ogistics & <b>O</b>vervisor</p>
<p align="center">A lightning-fast, private local archive search engine and filesystem tuner.</p>

---

## Overview

Silo is a lightweight, private local document and file search engine designed to run entirely on your machine. It features a modern dark-mode frontend and a fast local backend powered by native OS indexing. It also includes an automated file system tune-up utility to quarantine duplicates and segment messy directories.

---

## Licensing & Distribution

* **Free Tier (AGPL-3.0):** This project is open-source under the GNU AGPLv3 license for personal, non-commercial, and open-source use.
* **Commercial / Closed-Source Tier:** If you want to use Silo in closed-source commercial workflows without copyleft obligations, you can purchase a commercial waiver for just **$1** over on my [mrjoshua Gumroad Store](https://mrjoshua.gumroad.com).

---

## Features

- **Local OS Integration:** Powered by native search indexing (`mdfind`) for instant results.
- **Automated Tune-Up Engine (`tuneup.js`):** Deep-scans messy workspaces, uses cryptographic hashing (SHA-256) to catch duplicate files, and organizes files into clean semantic categories.
- **Cross-Platform Packaging:** Easily bundled via Electron into a standalone desktop application.

---

## Quick Start Guide (For Non-Developers)

If you downloaded this repository as a zip or cloned it directly, follow these simple steps to get it running on your local machine:

### Step 1: Install Node.js
Silo requires Node.js to run its local scripts. 
1. Go to [nodejs.org](https://nodejs.org/) and download the **LTS (Long Term Support)** version.
2. Run the installer and click through the standard setup steps.

### Step 2: Open Terminal in the Silo Folder
1. Open your computer's **Terminal** application.
2. Type `cd ` (with a space after it), then drag and drop your `silo` folder directly from Finder into the terminal window, and press **Enter**.

### Step 3: Run the Server & Tune-Up Engine
Once you are inside the folder in your terminal, run this command to start the backend search engine:
```bash
node filesystem-search-server.js
