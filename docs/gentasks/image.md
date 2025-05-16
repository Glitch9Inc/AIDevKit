## Image Generation - GENImage

Another exciting feature is the ability to generate or modify images using AI. The GENTask system includes tasks for image generation:

* **GENImageCreationTask** – creates new image(s) from a text prompt (e.g. using models like OpenAI's DALL·E or others).
* **GENImageEditTask** – takes an existing image plus a text instruction to modify the image (e.g. "add sunglasses to this person").
* **GENImageVariationTask** – takes an existing image and produces variations of it (remixes or similar images).

**Creating an image from text:** Just like text, you can start an image generation task from a prompt string with the extension `.GENImage()`. For example:

```csharp
"An astronaut riding a unicorn in space".GENImage()
    .SetModel(ImageModel.DallE3)                // choose an image generation model (e.g., DALL·E 3)
    .SetOutputPath("Assets/AIOutputs/astronaut.png") // save the generated image to a PNG file
    .ExecuteAsync();
```

When this task completes, it will return a `GeneratedImage` (which in this toolkit is likely a Sprite or Texture2D under the hood). If you provided a Unity UI `Image` or `RawImage` as the target, it would automatically assign the resulting image to that component's sprite/texture. For example:

```csharp
myImageUI.GENImage("A sunset over mountains")
    .SetModel(ImageModel.DallE2)
    .ExecuteAsync();
```

Here `myImageUI` is a `UnityEngine.UI.Image`. The extension method recognizes an `Image` object and uses its `sprite` as the output target. After the task runs, `myImageUI.sprite` will be set to the generated image sprite automatically. For a `RawImage`, the texture would be assigned, and for a `SpriteRenderer` in the scene, its sprite would be set. This makes displaying generated images in your game UI or scene very straightforward.
