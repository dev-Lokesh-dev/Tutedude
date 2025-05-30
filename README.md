# Tutedude
# 🎥 Video Progress Tracker

A smart tracking system for online learning platforms that measures **real engagement** with lecture videos. Instead of simply marking a video as "completed" when it reaches the end, this system tracks **unique portions watched**, ensuring more accurate progress reporting.

---

## 🚀 Features

- ✅ Tracks **only new and unique** watched video intervals.
- ⏩ **Prevents skipping** – Fast-forwarded sections aren’t counted.
- 💾 **Persistent progress** – Data saved to MongoDB and resumes where user left off.
- 📊 Real-time progress bar that only updates when new sections are viewed.
- 📱 Fully **responsive** front-end design for all screen sizes.

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS (Responsive)
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- dotenv

---

## 📁 Project Structure (MVC)

video-progress-tracker/
├── backend/
│ ├── controllers/
│ │ └── progressController.js
│ ├── models/
│ │ └── progressModel.js
│ ├── routes/
│ │ └── progressRoutes.js
│ ├── .env
│ └── app.js
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
├── README.md



---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/dev-Lokesh-dev/Tutedude
cd video-progress-tracker


## 📊 How It Works

### 📌 1. Tracking Watched Intervals

The frontend listens to key video events like `timeupdate` and `pause` to track which parts of the video are being watched.

- When the user starts watching, we mark a `startTime`.
- On pause or after a 5-second change, we mark an `endTime` and send this `[start, end]` interval to the backend.
- If the user skips forward or backward, the tracker identifies jumps and does not count the skipped parts unless they are actually watched.

This data is sent to the backend via:
```http
POST /progress/:videoId
[
  { start: 0, end: 10 },
  { start: 8, end: 20 },
  { start: 30, end: 40 }
]
