from django.shortcuts import render
from django.http import JsonResponse
from .models import GalleryImage, Category


# Fallback demo images (used when DB is empty)
DEMO_IMAGES = [
    {
        "id": 1,
        "title": "3D Printing Lab",
        "description": "State-of-the-art 3D printers producing complex engineering models and prototypes.",
        "category": "Hardware Lab",
        "src": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=85",
    },
    {
        "id": 2,
        "title": "Computer Science Lab",
        "description": "Students building software projects in a modern full-stack coding environment.",
        "category": "Software Lab",
        "src": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=85",
    },
    {
        "id": 3,
        "title": "Robotics Workshop",
        "description": "Hands-on robotics projects — building and programming autonomous machines.",
        "category": "Robotics",
        "src": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=85",
    },
    {
        "id": 4,
        "title": "Software Development",
        "description": "Full-stack development sessions tackling real-world project challenges.",
        "category": "Software Lab",
        "src": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=85",
    },
    {
        "id": 5,
        "title": "AI & Machine Learning",
        "description": "Exploring neural networks, data pipelines, and intelligent system design.",
        "category": "AI / ML",
        "src": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=85",
    },
    {
        "id": 6,
        "title": "Electronics Lab",
        "description": "Circuit design, microcontrollers, and embedded systems engineering.",
        "category": "Electronics",
        "src": "https://images.unsplash.com/photo-1562408590-e32931084e23?w=1200&q=85",
    },
    {
        "id": 7,
        "title": "Data Science Studio",
        "description": "Big data analytics, visualisation, and statistical modelling sessions.",
        "category": "AI / ML",
        "src": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85",
    },
    {
        "id": 8,
        "title": "Networking Lab",
        "description": "Hands-on configuration of routers, switches, and enterprise network topologies.",
        "category": "Networking",
        "src": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=85",
    },
]


def index(request):
    """Main gallery page."""
    db_images = list(GalleryImage.objects.select_related('category').all())
    if db_images:
        images = [
            {
                "id": img.id,
                "title": img.title,
                "description": img.description,
                "category": img.category.name if img.category else "Uncategorised",
                "src": img.get_image_src(),
            }
            for img in db_images
        ]
    else:
        images = DEMO_IMAGES

    categories = sorted(set(img["category"] for img in images))

    context = {
        "images": images,
        "categories": categories,
        "total": len(images),
    }
    return render(request, 'gallery/index.html', context)


def api_images(request):
    """JSON API endpoint for gallery images."""
    category_filter = request.GET.get('category', '')
    db_images = list(GalleryImage.objects.select_related('category').all())

    if db_images:
        images = [
            {
                "id": img.id,
                "title": img.title,
                "description": img.description,
                "category": img.category.name if img.category else "Uncategorised",
                "src": img.get_image_src(),
            }
            for img in db_images
        ]
    else:
        images = DEMO_IMAGES

    if category_filter and category_filter != 'All':
        images = [img for img in images if img['category'] == category_filter]

    return JsonResponse({"images": images, "total": len(images)})
