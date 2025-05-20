# Prettiest Wife Ever - Collage Website

A simple, dynamic, and loving photo collage website.

## Features

*   Displays a "There she is!" message.
*   Dynamically creates a collage of photos from the `photos/` directory.
*   Collage is different each time.
*   Photos appear one by one with a fade-in and animation.
*   Sparkling text effect.
*   Responsive design.

## Setup and Running Locally

1.  **Prerequisites:**
    *   Python 3 (for the helper script and local server)
    *   A web browser

2.  **Clone the Repository (Optional - if you don't have it locally):**
    ```bash
    git clone https://github.com/yashwatwani/prettiest-wife-ever.git
    cd prettiest-wife-ever
    ```

3.  **Add Your Photos:**
    *   Place all your desired photos into the `photos/` subfolder. Supported formats include `.jpg`, `.jpeg`, `.png`, `.gif`.
    *   **Important:** Optimize your photos (resize and compress) for faster loading on the web.

4.  **Generate the Photo List:**
    *   Open your terminal or command prompt in the project's root directory (`ever` or `prettiest-wife-ever`).
    *   Run the Python script to scan the `photos/` folder and create/update `photo_list.json`:
        ```bash
        python list_photos.py
        ```
    *   You need to re-run this script whenever you add, remove, or rename photos in the `photos/` folder.

5.  **Run a Local Web Server:**
    *   In the same terminal, from the project's root directory, start a simple Python HTTP server:
        ```bash
        python -m http.server
        ```
    *   The terminal will usually show `Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...`. Note the port number (usually 8000).

6.  **View in Browser:**
    *   Open your web browser and go to: `http://localhost:8000`
    *   (Replace `8000` if your server started on a different port).

## File Structure