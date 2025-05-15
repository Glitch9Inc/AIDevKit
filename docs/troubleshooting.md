# Troubleshooting

## Issues After Updating AIDevKit?

If you're encountering errors after updating AIDevKit in an existing project, please follow these steps:

### 1. Delete `Glitch9` folder and re-import the asset

In the Project window, delete the entire `Assets/Glitch9` folder, then re-import AIDevKit from the Package Manager or your downloaded package.

> This ensures outdated files are fully removed before importing the latest version.

### 2. Clear Unity’s Asset Store cache *(optional)*

Sometimes Unity may cache old files. You can manually clear the cache:

* **Windows**: `%APPDATA%\Unity\Asset Store-5.x`
* **macOS**: `~/Library/Unity/Asset Store-5.x`

> (These folders are hidden. Use `Win + R` or `Shift + Cmd + G` to access.)

### 3. Check for the latest version

Confirm that you’re importing the most recent release of AIDevKit.

> Version info is available in the Unity Package Manager.
