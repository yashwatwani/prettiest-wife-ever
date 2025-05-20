import os
import json # Import the json module

def get_photo_filenames(folder_path):
    """
    Scans a folder for image files and returns a list of their filenames.
    """
    supported_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp')
    photo_files = []
    try:
        for filename in os.listdir(folder_path):
            if os.path.isfile(os.path.join(folder_path, filename)) and \
               filename.lower().endswith(supported_extensions):
                photo_files.append(filename)
        photo_files.sort() # Optional: sort them alphabetically
        return photo_files
    except FileNotFoundError:
        print(f"Error: Folder not found at '{folder_path}'")
        return []
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

if __name__ == "__main__":
    photo_folder_name = "photos"
    output_json_filename = "photo_list.json" # Name of the JSON file to create

    current_script_directory = os.path.dirname(os.path.abspath(__file__))
    photos_directory = os.path.join(current_script_directory, photo_folder_name)
    output_json_filepath = os.path.join(current_script_directory, output_json_filename)

    print(f"Scanning for photos in: {photos_directory}")
    filenames = get_photo_filenames(photos_directory)

    if filenames:
        try:
            with open(output_json_filepath, 'w') as f:
                json.dump(filenames, f, indent=4) # Write the list as JSON
            print(f"Successfully created/updated: {output_json_filepath}")
            print("Your JavaScript will now read this file to get the photo list.")
        except IOError as e:
            print(f"Error writing to {output_json_filepath}: {e}")
    else:
        print(f"No photo files found in '{photos_directory}' or the folder doesn't exist.")
        print(f"Ensure '{output_json_filename}' can be created if no photos are found (it will be an empty list).")
        # Optionally create an empty JSON file if no photos are found
        try:
            with open(output_json_filepath, 'w') as f:
                json.dump([], f)
            print(f"Created an empty '{output_json_filepath}'.")
        except IOError as e:
            print(f"Error writing empty list to {output_json_filepath}: {e}")

    print("\nPython script finished.")