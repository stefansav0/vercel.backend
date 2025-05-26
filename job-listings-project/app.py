from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Replace this list with real job data (you can add multiple)
jobs = [
    {
        "slug": "rpsc-assistant-electrical-inspector-2025",
        "title": "RPSC Assistant Electrical Inspector Recruitment 2025",
        "postDate": "03 April 2025",
        "shortInfo": "RPSC has released recruitment for Assistant Electrical Inspector.",
        "importantDates": {
            "applicationBegin": "15/04/2025",
            "lastDateApply": "14/05/2025",
            "lastDateFee": "14/05/2025",
            "examDate": "To be announced",
            "admitCard": "Notified Soon"
        },
        "importantLinks": {
            "applyOnline": "https://sso.rajasthan.gov.in",
            "downloadNotification": "https://doc.sarkariresults.org.in",
            "officialWebsite": "https://rpsc.rajasthan.gov.in"
        }
    },
    {
        "slug": "kgmu-nursing-officer-2025",
        "title": "KGMU Nursing Officer Online Form 2025",
        "postDate": "04 April 2025",
        "shortInfo": "KGMU invites application for Nursing Officer posts.",
        "importantDates": {
            "applicationBegin": "12/04/2025",
            "lastDateApply": "10/05/2025",
            "lastDateFee": "10/05/2025",
            "examDate": "To be announced",
            "admitCard": "Notified Soon"
        },
        "importantLinks": {
            "applyOnline": "https://kgmu.org/apply",
            "downloadNotification": "https://kgmu.org/notification.pdf",
            "officialWebsite": "https://kgmu.org"
        }
    }
]


# ✅ API to get all jobs
@app.route("/api/jobs", methods=["GET"])
def get_jobs():
    return jsonify({"success": True, "jobs": jobs})

# ✅ API to get a specific job by ID
@app.route("/api/jobs/<slug>", methods=["GET"])
def get_job_detail(slug):
    job = next((job for job in jobs if job["slug"] == slug), None)
    if job:
        return jsonify({"success": True, "job": job})
    return jsonify({"success": False, "error": "Job not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
