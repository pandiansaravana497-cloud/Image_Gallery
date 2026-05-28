# Ex.07 Design of Interactive Image Gallery

## AIM
  To design a web application for an inteactive image gallery with minimum five images.

## DESIGN STEPS

## Step 1:

Clone the github repository and create Django admin interface

## Step 2:

Change settings.py file to allow request from all hosts.

## Step 3:

Use CSS for positioning and styling.

## Step 4:

Write JavaScript program for implementing interactivit

## Step 5:

Validate the HTML and CSS code

## Step 6:

Publish the website in the given URL.

## PROGRAM
~~~
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background: #f4f4f4;
            padding: 20px;
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .gallery img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 10px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }

        .gallery img:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .lightbox img {
            max-width: 90%;
            max-height: 80%;
            border-radius: 10px;
        }

        .lightbox span {
            position: absolute;
            top: 20px;
            right: 40px;
            font-size: 40px;
            color: white;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <h1>Responsive Image Gallery</h1>

    <div class="gallery">
        <img src="https://picsum.photos/id/1015/600/400" alt="Image 1">
        <img src="https://picsum.photos/id/1016/600/400" alt="Image 2">
        <img src="https://picsum.photos/id/1018/600/400" alt="Image 3">
        <img src="https://picsum.photos/id/1020/600/400" alt="Image 4">
        <img src="https://picsum.photos/id/1024/600/400" alt="Image 5">
        <img src="https://picsum.photos/id/1035/600/400" alt="Image 6">
    </div>

    <div class="lightbox" id="lightbox">
        <span id="closeBtn">&times;</span>
        <img id="lightboxImg" src="">
    </div>

    <script>
        const galleryImages = document.querySelectorAll('.gallery img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeBtn = document.getElementById('closeBtn');

        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = image.src;
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    </script>

</body>
</html>
~~~
## OUTPUT
<img width="1911" height="939" alt="Screenshot 2026-05-28 100536" src="https://github.com/user-attachments/assets/473d8c43-7dff-4e33-a8b4-de67af0629e6" />

<img width="1919" height="874" alt="Screenshot 2026-05-28 100609" src="https://github.com/user-attachments/assets/9380bd5f-c9d6-4816-b989-2df9eed6c742" />

<img width="1919" height="870" alt="Screenshot 2026-05-28 100555" src="https://github.com/user-attachments/assets/9c54a290-5171-4dfd-b77d-5b30c6d1fb20" />

<img width="1918" height="865" alt="Screenshot 2026-05-28 100625" src="https://github.com/user-attachments/assets/6f5fd02c-80a3-44aa-8df6-e56fc4b6f2f9" />


## RESULT
  The program for designing an interactive image gallery using HTML, CSS and JavaScript is executed successfully.
