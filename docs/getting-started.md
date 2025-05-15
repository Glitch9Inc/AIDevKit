# Getting Started with GENTask

## Generative AI Tasks for Text, Images, and More

**GENTask** is a unified system for running generative AI tasks (text generation, image creation, audio processing, etc.) within Unity. It simplifies calling AI models (like GPT or DALL·E) by providing easy-to-use classes for each task type and a fluent, chainable API for configuring and executing these tasks. The goal is to make it beginner-friendly to integrate AI-generated content into your Unity project without deep knowledge of HTTP requests or specific AI API details.

**Key Features:**

* **Multiple Task Types:** Built-in classes cover a range of generative AI tasks, such as text completions, chat-based conversations, image generation, image editing, text-to-speech, speech-to-text, and more. This means you can generate content (or analyze content) of various forms using a consistent approach.
* **Fluent API Configuration:** Each task provides chainable methods (like `SetModel`, `SetOutputPath`, etc.) to configure parameters in a readable way. This makes code easy to write and understand as you "chain" settings together.
* **Unity Integration:** You can start tasks directly from common Unity objects (e.g. `string`, `Texture2D`, `AudioClip`, UI `Text`, `Image`, `AudioSource`, etc.), and even target Unity components so that results (like generated text or images) are automatically applied to the object when ready. All tasks run asynchronously (using UniTask under the hood) to keep your game responsive.
* **Streaming Support:** For certain tasks (like text generation), GENTask supports streaming partial results. This allows you to display output (e.g. text) in real-time as it's being generated, similar to how typing appears when using ChatGPT.
* **Sequencing Tasks:** The system provides a **GENSequence** utility to run multiple tasks in order, which is useful for multi-step workflows (for example, generate a text description, then generate an image from that description, sequentially).

In the sections below, we'll explore each major GENTask type with simple code examples, demonstrate how to configure tasks using the fluent API, show how to chain tasks with GENSequence, and explain how to use streaming callbacks like `OnStreamText` for real-time updates. This guide assumes you have imported the necessary AI Dev Kit into your Unity project and have any required API keys or configuration set up (for OpenAI, etc.), but **no prior experience with AI APIs is needed** – GENTask abstracts those details for you.

## Text Generation Tasks (GENTextTask)

Text generation is one of the core uses of generative AI. In the GENTask system, the **GENTextTask** class is used to generate text (for example, completing a prompt or answering a question). This task sends a prompt to a Large Language Model (LLM) and returns a text response.

**How to create a text generation task:** You can start a text task from a plain string prompt by calling the extension method `.GENText()` on a string. This returns a `GENTextTask` which you can then configure and execute. For example:

```csharp
"Tell me a joke about cats."
    .GENText()                            // Create a text-generation task with this prompt
    .SetModel(OpenAIModel.GPT4)           // Choose an AI model (e.g. GPT-4)
    .SetOutputPath("Assets/AIOutputs/joke.txt") // (Optional) save output to a file
    .ExecuteAsync();                      // Run the task asynchronously
```

Let's break down what happens here:

* `"Tell me a joke about cats."` – This is our prompt string. By calling `.GENText()` on it, we construct a `GENTextTask` using that string as the prompt. Under the hood, this creates a new `GENTextTask` instance.
* `.SetModel(OpenAIModel.GPT4)` – We specify which AI model to use. The Dev Kit likely provides an `OpenAIModel` class or enum with options like GPT3, GPT4, etc. Here we choose GPT-4. If you don’t call `SetModel`, a default model (configured in your settings) will be used. Using `SetModel` ensures we target the model we want.
* `.SetOutputPath("Assets/AIOutputs/joke.txt")` – This optional step sets a file path to save the generated text. If provided, the system will write the output to that path (e.g., a text or JSON file) when the task completes. This is useful for logging or reusing the content later. If omitted, the text is still available in memory (as the return value or via callbacks), just not automatically saved.
* `.ExecuteAsync()` – Finally, we execute the task asynchronously. This sends the request to the AI model and returns a UniTask that completes when the AI's response is received. We don't `await` it in this snippet (for simplicity), but in a real script you might want to `await` this call inside an async method, or handle the result in a callback (we'll discuss handling results in a moment). The task runs in the background without freezing your game.

**Using the result:** After execution, the generated text (let's call it `GeneratedText`) will be returned by `ExecuteAsync()`. If you're in an async context, you can capture it like:

```csharp
GeneratedText result = await "Tell me a joke about cats."
                          .GENText()
                          .SetModel(OpenAIModel.GPT4)
                          .ExecuteAsync();
// Now do something with result, e.g. display it
Debug.Log(result);
```

Here, `GeneratedText` is essentially the resulting text (the library uses a `GeneratedText` type for the output, which can be treated as a `string`). If you provided a Unity UI `Text` or TMP text object as a target when creating the task, the system would automatically assign the resulting text to that UI element for you. For example:

```csharp
myTextComponent.GENText("Once upon a time,")
    .SetModel(OpenAIModel.GPT3)   // choose a model, say GPT-3 for faster response
    .ExecuteAsync();
```

In this case, `myTextComponent` is a `UnityEngine.UI.Text` element in the scene. Because we called `.GENText` on a `Text` object (with the prompt as a parameter), the `GENTextTask` knows about that target text object. When the task completes, it will automatically set `myTextComponent.text` to the generated text for you – no manual assignment needed. This is a convenient way to have AI-generated text appear directly in your UI.

**Chat completions (GENChatTask):** If you want to have a conversational AI (with system, user, assistant roles or multi-turn dialogue), the GENTask system provides **GENChatTask**. This is similar to `GENTextTask` but uses a chat-centric model (like ChatGPT). To use it, you'd typically maintain a `ChatSession` object and create a new `ChatMessage`, then call `chatSession.GENChat(chatMessage)`. For example:

```csharp
chatSession.GENChat(userMessage)
    .SetModel(OpenAIModel.GPT4)  // e.g. GPT-4 in chat mode
    .ExecuteAsync();
```

Here, `chatSession` might hold the conversation history and system instructions, and `userMessage` is the latest user prompt (perhaps created as `ChatMessage.CreateUserMessage("Hello, how are you?")`). The details of `ChatSession`/`ChatMessage` are part of the Dev Kit's conversation management, but the key idea is that `GENChatTask` will incorporate context from the session (previous messages, etc.) when generating a response. Use `GENChatTask` if you need the AI to remember conversation context or if you're calling chat-specific models. If you're just generating one-off text from a prompt, `GENTextTask` is sufficient.

## Image Generation Tasks (GENImageCreationTask, GENImageEditTask, GENImageVariationTask)

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

**Image Editing and Variations:** To use these, you start from an existing image (a `Texture2D` or an `Image`/`RawImage`/`SpriteRenderer`). For example, say you have a `Texture2D` named `baseTexture` and you want to edit it:

```csharp
baseTexture.GENImageEdit("Add a red hat to the person")
    .SetModel(ImageModel.DallE2)   // choose a model that supports image editing
    .ExecuteAsync();
```

This will send the `baseTexture` along with the prompt "Add a red hat to the person" to the AI model. The result (a `GeneratedImage`) will be an edited version of the original image reflecting the prompt. Similarly, to get a variation:

```csharp
baseTexture.GENImageVariation()
    .SetModel(ImageModel.DallE2)   // choose a model that supports variations
    .ExecuteAsync();
```

Since variation tasks simply take the image and no additional prompt text, you just call `.GENImageVariation()` on the `Texture2D` (or Image/RawImage).

**Note:** Not all models support editing or variation. For instance, at the time of writing, OpenAI's DALL·E 3 may not support editing/variation via API (only via their UI). In such cases, you might use DALL·E 2 or another provider that supports it. Always ensure the model you set is compatible with the task type.

Both `GENImageEditTask` and `GENImageVariationTask` return a generated image similar to `GENImageCreationTask`. If you chain from a Unity component (like in the examples above using `baseTexture` or an `Image`), the result will also be auto-applied to that component.

## Audio Tasks (Text-to-Speech and Speech-to-Text)

The GENTask system also covers audio generation and processing tasks. This opens up possibilities like generating voice-over audio from text or transcribing player speech. Major audio-related task types include:

* **GENSpeechTask** – Text-to-Speech (TTS): generates spoken audio from a text prompt (using AI voices).
* **GENTranscriptTask** – Speech-to-Text (STT): transcribes spoken audio from an AudioClip into text.
* **GENTranslationTask** – Translates speech in an AudioClip to English text (useful for multilingual speech input).
* **GENSoundEffectTask** – Sound effect generation from a text description (e.g., "footsteps on snow" -> AI-generated sound).
* **GENVoiceChangeTask** – Voice transformation: changes the voice in an AudioClip (e.g., modify a recorded voice to sound like a target voice).
* **GENAudioIsolationTask** – Audio processing to isolate or remove elements (e.g., separate vocals from background music in a clip).

For beginners, the most common would be TTS and STT, so let's focus on those first.

**Text-to-Speech (GENSpeechTask):** You can create a speech synthesis task from a string using `.GENSpeech()`. For example:

```csharp
"Hello, world!".GENSpeech()
    .SetVoice(ElevenLabsVoice.Rachel)   // choose a voice (e.g., a preset from ElevenLabs)
    .ExecuteAsync();
```

This will send the text to a TTS model and produce an audio clip (the `GeneratedAudio`). If you call `.GENSpeech()` on an `AudioSource` component instead of a string, the resulting audio clip will be automatically assigned to that AudioSource. For instance:

```csharp
myAudioSource.GENSpeech("Welcome to our game!")
    .SetVoice(ElevenLabsVoice.Rachel)
    .ExecuteAsync();
// After completion, myAudioSource.clip is set to the generated speech audio.
```

Now that the AudioSource has the clip, you can play it in-game. In this example, you might want to call `myAudioSource.Play()` after the task finishes to actually hear it. If using an async method, you could `await` the `ExecuteAsync()` call, then call `Play()` on the next line. Alternatively, as we'll see in the streaming section, you could use a callback to play automatically when done.

**Choosing a Voice:** The `.SetVoice(...)` method on GENSpeechTask lets you pick a specific voice preset for TTS. The Dev Kit likely includes predefined voices (for example, `ElevenLabsVoice.Rachel` as used above, or other providers' voices). If not set, a default voice may be used. You might also have methods like `.SetSpeed(float)` to control playback speed of the voice or `.SetSeed(uint)` for reproducibility, depending on the AI provider capabilities.

**Speech-to-Text (GENTranscriptTask):** To transcribe an `AudioClip` (e.g., microphone recording) to text, use `.GENTranscript()` on the AudioClip. For example:

```csharp
audioClip.GENTranscript()
    .ExecuteAsync();
```

This will produce a `GeneratedText` result with the transcription of the audio (often using models like OpenAI's Whisper for speech recognition). If you have a UI text element where you want the transcription to appear, you can call `.GENTranscript()` on that text element and pass the clip as a parameter:

```csharp
myTranscriptTextUI.GENTranscript(myRecordedClip)
    .ExecuteAsync();
```

Because we started from `myTranscriptTextUI` (a `Text` or TMP text), once the transcription is done, the resulting text will automatically be set on that UI element (so the spoken words appear as on-screen text).

There is also an optional `.SetLanguage()` for GENTranscriptTask if you want to hint the language of the audio for better accuracy (if not English). For example: `audioClip.GENTranscript().SetLanguage(SystemLanguage.French).ExecuteAsync();`.

**Other audio tasks:** They work similarly:

* To generate a **sound effect** from text: `"Footsteps on snow".GENSoundEffect().ExecuteAsync();` (this returns an AudioClip; you can target an AudioSource similarly with `.GENSoundEffect()` on the AudioSource).
* To **change the voice** in a clip: `myClip.GENVoiceChange().SetVoice(ElevenLabsVoice.Antoni).ExecuteAsync();` (this might use an AI voice transformation model; target an AudioSource to apply the new voice clip to it).
* To **isolate audio** elements: `myClip.GENAudioIsolation().ExecuteAsync();` (e.g., returns an AudioClip of isolated vocals or removed vocals, depending on default settings).

Keep in mind some of these specialized tasks may require specific AI providers (for example, the ElevenLabs API for certain voice cloning or sound generation features). If you attempt to use them without the appropriate model or API configured, you might get a "Not supported" error. Always ensure you have set a suitable model via `SetModel` or that your default provider supports the task.

## Configuring Tasks with Fluent APIs

All GENTask types support a set of **fluent configuration methods** that you can chain together. We've already seen a few (like `SetModel` and `SetOutputPath`) in the examples above. Here is a quick rundown of the most commonly used configuration methods and what they do:

* **`SetModel(Model model)`** – Specifies which AI model to use for the task. For example, `OpenAIModel.GPT4` for text, `ImageModel.DallE3` for image, or a custom model if supported. If not set, the system will use a default model for that task type (configurable in your AI Dev Kit settings). This returns the task itself, allowing further chaining.
* **`SetOutputPath(string path)`** – If you want to save the result to a file, use this to provide a path. For text it might be a `.txt` or `.json`, for images `.png` (the system infers format from the task and path). When the task finishes, it will write the output to this path on disk. If not called, no file is written (the result is only in memory).
* **`SetCount(int n)`** – Requests multiple outputs in one go. For example, `SetCount(3)` on an image task might generate 3 images with one call, or on a text task might return multiple completion variants. Note that not all models support bulk generation in a single request; the toolkit may handle multiple requests behind the scenes if needed. The results may come as a collection or you may retrieve them one by one (for instance, `GENImageCreationTask` provides a `YieldAsync()` to iterate results if `outputCount` > 1).
* **`SetSender(string id)`** – Tags the task with a sender ID (useful if you are tracking which part of your app initiated the request, for logging or analytics). This is optional and mainly for internal tracking; beginners might not need this.
* **`EnablePromptHistory(bool enable=true)`** – Controls whether to keep this prompt in history (if the system has a mechanism to store past prompts/answers). By default, runtime prompt history might be enabled via settings; you can override per task. This is an advanced feature for apps that, say, want to log all prompts.
* **`AddAttachment(...)`** – Attaches binary data to the prompt. This is useful for tasks that support file inputs (e.g., some LLMs can take an image or additional file context, or chat messages with attachments). You can attach a file path, a Texture2D, or AudioClip directly with these overloads. For example, `.AddAttachment("Documents/data.csv")` or `.AddAttachment(someTexture2D)`. Use this only if the model expects an additional file input.
* **Task-specific settings:** Many tasks have their own extra fluent methods. For instance, `GENSpeechTask` has `.SetVoice(...)` and `.SetSpeed(...)` as shown earlier. `GENTranscriptTask` has `.SetLanguage(...)`. `GENSoundEffectTask` might have something like `.SetDuration(seconds)` to control sound length. These can be chained after the generic ones. Intellisense or documentation can reveal these if you type `task.` and see what's available for that task type.

All these methods return the task object (`this`), which is why you can keep chaining one after another. You typically end the chain with an execution call (`ExecuteAsync()` or `StreamAsync()`), which actually runs the task. If you forget to call an execution method, nothing will happen – configuring a task alone doesn’t start it.

## Executing Multiple Tasks in Sequence with GENSequence

Sometimes you may want to run several generative tasks one after the other. For example, generate a piece of text, then use that text in a subsequent task, or just run a batch of independent tasks in order. **GENSequence** is a utility class to help with this.

Using GENSequence is straightforward:

1. Create a new sequence: `var sequence = new GENSequence();`
2. Append tasks to it using `sequence.Append(task)`. You can append any object that implements `IGENTask` – which includes all the GENTask types (GENTextTask, GENImageCreationTask, etc.). The `Append` method returns the sequence itself, so you can chain multiple appends.
3. Call `sequence.ExecuteAsync()` to run all appended tasks in order. This returns a UniTask you can await, or you can `.Forget()` it if you fire-and-forget.

Each task in the sequence will start only after the previous one finishes. This is handy to ensure you don't overload your system with simultaneous requests or when one task's result is needed for the next (with manual passing of data in between).

**Example: Generating text then speech** – Suppose we want to first generate a line of dialogue and then synthesize it into speech audio:

```csharp
var sequence = new GENSequence();
GeneratedText lineResult = null;  // to capture the text result of the first task

sequence.Append(
    "Write a one-sentence line for a pirate character.".GENText()
        .SetModel(OpenAIModel.GPT3)
        .OnStreamComplete(text => lineResult = text)  // capture result when done
)
.Append(
    () => lineResult?.GENSpeech()                    // lambda to create next task using previous result
          .SetVoice(ElevenLabsVoice.Rachel)
          .SetOutputPath("Assets/AIOutputs/pirateVoice.mp3")
);
// Now execute the sequence
await sequence.ExecuteAsync();
```

Let's unpack this pattern:

* We create a GENTextTask with a prompt and use `OnStreamComplete` to save the generated text to the `lineResult` variable when done. (We use `OnStreamComplete` here to hook into task completion without blocking, effectively giving us a callback with the result.) Note: `OnStreamComplete` is actually part of the streaming interface for text tasks, but it works as a handy way to get the final text in a callback form.
* For the second task, we need to wait until `lineResult` is ready. We used a **lambda** `() => lineResult?.GENSpeech()...` when appending. GENSequence supports appending an `IGENTask` directly, but here we pass a lambda that produces a task. The sequence will invoke that lambda at execution time (after the first task completes) to get the actual second task. This way, it uses the updated `lineResult` for the prompt. We then configure that speech task normally.
* Finally we `await sequence.ExecuteAsync()`. The sequence will run the first task, trigger the callback to set `lineResult`, then run the second task using that text. After execution, we have also saved the speech audio to an MP3 as specified.

For simpler cases where tasks are independent, you don't need the lambda or capturing variables – you can just append tasks outright:

```csharp
new GENSequence()
    .Append("What is the capital of France?".GENText().SetModel(OpenAIModel.GPT3))
    .Append("E=mc^2 explained in simple terms.".GENText().SetModel(OpenAIModel.GPT3))
    .Append("A cat playing a violin".GENImage().SetModel(ImageModel.DallE2))
    .ExecuteAsync();
```

This will run three tasks in order (two texts then one image). Each will use the specified model and run one after the other. You could await the `ExecuteAsync()` if you need to know when all are done. The sequence itself doesn't automatically collect or return all results, but you could obtain each result by either awaiting each task separately or using callbacks on each if needed.

**Why use GENSequence?** In Unity, you could always `await` one task then call the next, or chain using `ContinueWith` or simply call in sequence. GENSequence is just a convenience that makes the intention clear (run these tasks sequentially) and abstracts the looping/awaiting for you. It can help keep your code cleaner when dealing with multiple generative steps. Internally, it essentially does:

```csharp
foreach(var task in tasks) await task.ExecuteAsync();
```

as seen in its implementation.

## Streaming Results in Real Time (OnStreamText and OnStreamComplete)

For tasks like text generation, waiting for the whole response to finish can take several seconds if the output is long. Streaming allows you to get partial results from the model as they are generated. The GENTask system supports streaming particularly for text-based tasks (like GENTextTask and GENChatTask), and even for speech tasks in a way (some TTS models might stream audio).

When you enable streaming, you can provide callbacks to handle the data as it arrives:

* **`OnStreamText(Action<string> onTextReceived)`** – Sets a callback to receive portions of the text as the model streams them. The string you get might be a chunk of text (e.g., a few words) or the growing full text so far, depending on the AI provider. You can use this to update the UI in real-time (for example, appending characters to a dialogue box as the AI "types").
* **`OnStreamComplete(Action<GeneratedText> onComplete)`** – Callback for when streaming is done (the final full output is ready). This gives you the final result (as a `GeneratedText` object, which you can treat as the complete string). You can use this to do any wrap-up work once the generation is finished (like enabling a "Continue" button, or analyzing the full text).
* **`OnStreamError(Action<string> onError)`** – Callback if an error occurs during streaming (network issue, etc.). You can use this to display an error message or retry.
* *(For advanced use, there's also `OnStreamToolCall` for handling special "tool" messages if the AI model can call functions/tools mid-stream, but beginners don't need this in most cases.)*

To use streaming, you typically call a special **Stream execution** method instead of the normal `ExecuteAsync()`. For text tasks, that's `StreamAsync()`. For example:

```csharp
myTextUI.text = "";  // clear any existing text
"Once upon a time in a distant galaxy,".GENText()
    .SetModel(OpenAIModel.GPT4)
    .OnStreamText(partialText => {
        // Append the new text as it comes in
        myTextUI.text += partialText;
    })
    .OnStreamComplete(fullText => {
        Debug.Log("Final story: " + fullText);
    })
    .OnStreamError(errorMessage => {
        Debug.LogError("Stream error: " + errorMessage);
    })
    .StreamAsync();
```

In this example, we clear a UI Text (`myTextUI`) and then start a streaming text generation. As the AI generates the story bit by bit, the `OnStreamText` callback fires repeatedly, giving us pieces of text. We append each piece to the UI text, creating a typewriter effect where the text gradually appears on screen. Once the story is fully generated, `OnStreamComplete` fires with the entire story (we log it to console, but you could also use it to ensure the UI text is finalized or trigger another action). If something goes wrong, `OnStreamError` will let us know.

**How does this work internally?** When you call `StreamAsync()`, the GENTask system calls the AI API in streaming mode (if the provider supports it). The `OnStreamText` callback is tied to the event of receiving new tokens or text from the stream. The toolkit uses a `ChatStreamHandler` behind the scenes to manage these events. You don't need to manage that handler manually – calling the fluent `OnStream...` methods sets it all up for you. Just remember to use `StreamAsync()` at the end of the chain for streaming; if you use `ExecuteAsync()`, you will *not* get partial updates (it waits for full completion).

**Streaming audio:** For text-to-speech, some TTS services stream audio chunks. GENTask provides a similar pattern where you might supply an `OnStreamAudio` callback or use a special audio player that plays as it streams. Specifically, `GENSpeechTask.StreamAsync(StreamAudioPlayer player)` could be used to stream audio directly to a player. The idea is that as audio is synthesized, it begins playing without waiting for the entire clip. This is more advanced and depends on support from the TTS provider. If your TTS model supports streaming, you could utilize this to reduce latency (the user hears the speech as it's being generated). The usage would be analogous: set up a player and call `.StreamAsync(player)` instead of `.ExecuteAsync()`. For simplicity, if you're a beginner, you can first focus on non-streaming audio (generate then play).

**Tip:** Not all tasks support streaming. Primarily, it's for text and chat completions, and possibly TTS. Image generation and others usually have to wait for the whole result. The fluent API methods `OnStreamText`, `OnStreamComplete`, etc., are available on `GENTextTask` and `GENChatTask`. If you attempt to use `StreamAsync()` on a task that doesn't stream, it will likely throw a not-supported exception or simply behave like a normal call. Always test your specific use-case.

## Conclusion

In summary, the GENTask system in Unity’s AI Dev Kit allows you to easily leverage generative AI for a variety of content types with minimal code. You create tasks from your data (text, images, audio) via intuitive extension methods, configure them with a fluent API, and run them asynchronously – keeping your game interactive. For multi-step AI workflows, GENSequence helps organize sequential execution, and for responsive UI or interactivity, streaming callbacks like `OnStreamText` let you present AI output in real-time.

As a beginner, start with simple examples: generate some text and display it, create an image from a prompt and show it in a UI, or convert a line of dialogue to speech and play it. Once comfortable, you can explore more advanced features like chat sessions, structured JSON outputs (using `GENObjectTask<T>` for getting AI to fill a C# object), content moderation checks with `GENModerationTask`, or fine-tuning how each task operates with the many configuration options provided.

With GENTask, you don't need to know the intricacies of HTTP calls or JSON parsing for AI APIs – you can focus on creative ideas of *what* to generate and *how* to use it in your game. Happy experimenting with generative AI in Unity!
