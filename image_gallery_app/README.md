# GalleryLab — Interactive Image Gallery (Django)

A full-featured, responsive interactive image gallery built with Django.

## Folder Structure

```
image_gallery_app/
│
├── manage.py
├── requirements.txt
├── db.sqlite3                  ← auto-created on first run
│
├── gallery_project/            ← Django project (settings, urls, wsgi)
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
└── gallery/                    ← Django app
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py               ← GalleryImage + Category models
    ├── views.py                ← index view + /api/images/ endpoint
    ├── urls.py
    │
    ├── templates/
    │   └── gallery/
    │       └── index.html      ← main HTML template
    │
    └── static/
        ├── css/
        │   └── style.css       ← all styles (dark theme)
        ├── js/
        │   └── script.js       ← gallery logic
        └── images/             ← place your own images here
```

## Features

- Responsive dark-navy UI (mobile + desktop)
- Smooth fade/scale slide transitions
- Previous / Next navigation (buttons + keyboard ← →)
- Dot indicators + clickable thumbnail strip
- Autoplay with animated progress bar (Space to toggle)
- Fullscreen lightbox mode (F key or button)
- Category filter sidebar (filters images live)
- Touch/swipe support on mobile
- `/api/images/?category=X` JSON endpoint
- Django admin to add/manage images via database
- Falls back to 8 demo images when DB is empty

## Quick Start

### 1. Create & activate a virtual environment
```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run migrations
```bash
python manage.py migrate
```

### 4. (Optional) Create a superuser for admin access
```bash
python manage.py createsuperuser
```

### 5. Start the development server
```bash
python manage.py runserver
```

### 6. Open in browser
```
http://127.0.0.1:8000/         ← Gallery
http://127.0.0.1:8000/admin/   ← Django Admin (add images here)
http://127.0.0.1:8000/api/images/   ← JSON API
```

## Adding Your Own Images

### Via Django Admin
1. Go to `http://127.0.0.1:8000/admin/`
2. Create **Categories** first (e.g. "Hardware Lab", "AI / ML")
3. Add **Gallery Images** — paste an image URL or upload a file

### Via the models directly (optional)
Edit `gallery/views.py` → `DEMO_IMAGES` list to change the default demo images.

### Placing images in static/images/
Put local `.jpg`/`.png` files into `gallery/static/images/` and reference them as:
```python
image_url = "/static/images/yourfile.jpg"
```

## Keyboard Shortcuts

| Key        | Action             |
|------------|--------------------|
| `←` / `→`  | Previous / Next    |
| `Space`    | Toggle autoplay    |
| `F`        | Open fullscreen    |
| `Esc`      | Close fullscreen   |

## API Endpoint

```
GET /api/images/               → all images (JSON)
GET /api/images/?category=Robotics  → filtered by category
```

Response format:
```json
{
  "images": [
    {
      "id": 1,
      "title": "3D Printing Lab",
      "description": "...",
      "category": "Hardware Lab",
      "src": "https://..."
    }
  ],
  "total": 8
}
```
