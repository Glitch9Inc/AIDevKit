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

## The type or namespace name 'Newtonsoft' could not be found

![The type or namespace name 'Newtonsoft' could not be found](../images/error_newtonsoft.png)

### Cause

The automatic installation of the required packages has failed. This may happen in some Unity environments due to asset import issues, missing dependencies, or project-specific conflicts.
In particular, you may encounter the following error:
❗ The type or namespace name 'Cysharp.UniTask' could not be found
This means the UniTask library by Cysharp—which provides lightweight asynchronous operations in Unity—is missing or not properly installed.

### Solution

To resolve these issues, please install the missing libraries manually by following the official setup guides:
Newtonsoft.Json
👉 Manual Installation Guide
Cysharp.UniTask
👉 Manual Installation Guide
Each guide provides step-by-step instructions for adding the packages to your Unity project and verifying that everything is set up correctly. After completing the installations, restart Unity to ensure the changes take effect.
