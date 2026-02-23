import requests
import time
import csv

BASE_URL = "https://hacker-news.firebaseio.com/v0"
OUTPUT_FILE = "hn_ai_dataset.csv"

KEYWORDS = ["AI", "artificial", "machine learning", "llm", "chatgpt"]

def get_item(item_id):
    url = f"{BASE_URL}/item/{item_id}.json"
    return requests.get(url).json()

# Get latest stories
top_stories = requests.get(f"{BASE_URL}/newstories.json").json()

with open(OUTPUT_FILE, "a", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)

    for story_id in top_stories[:500]:  # scale this up
        item = get_item(story_id)
        if not item or "text" not in item:
            continue

        text = item.get("text", "").lower()
        if any(k.lower() in text for k in KEYWORDS):
            writer.writerow([
                item.get("id"),
                item.get("time"),
                item.get("by"),
                item.get("title", ""),
                item.get("text", "")
            ])
            print("Saved:", item.get("title"))

        time.sleep(0.5)  # avoid hammering API
