# Getting Started with GENTask

**GENTask** is a unified system for running generative AI tasks (text generation, image creation, audio processing, etc.) within Unity. It simplifies calling AI models (like GPT or DALL·E) by providing easy-to-use classes for each task type and a fluent, chainable API for configuring and executing these tasks. The goal is to make it beginner-friendly to integrate AI-generated content into your Unity project without deep knowledge of HTTP requests or specific AI API details.

**Key Features:**

* **Multiple Task Types:** Built-in classes cover a range of generative AI tasks, such as text completions, chat-based conversations, image generation, image editing, text-to-speech, speech-to-text, and more. This means you can generate content (or analyze content) of various forms using a consistent approach.
* **Fluent API Configuration:** Each task provides chainable methods (like `SetModel`, `SetOutputPath`, etc.) to configure parameters in a readable way. This makes code easy to write and understand as you "chain" settings together.
* **Unity Integration:** You can start tasks directly from common Unity objects (e.g. `string`, `Texture2D`, `AudioClip`, UI `Text`, `Image`, `AudioSource`, etc.), and even target Unity components so that results (like generated text or images) are automatically applied to the object when ready. All tasks run asynchronously (using UniTask under the hood) to keep your game responsive.
* **Streaming Support:** For certain tasks (like text generation), GENTask supports streaming partial results. This allows you to display output (e.g. text) in real-time as it's being generated, similar to how typing appears when using ChatGPT.
* **Sequencing Tasks:** The system provides a **GENSequence** utility to run multiple tasks in order, which is useful for multi-step workflows (for example, generate a text description, then generate an image from that description, sequentially).

In the sections below, we'll explore each major GENTask type with simple code examples, demonstrate how to configure tasks using the fluent API, show how to chain tasks with GENSequence, and explain how to use streaming callbacks like `OnStreamText` for real-time updates. This guide assumes you have imported the necessary AI Dev Kit into your Unity project and have any required API keys or configuration set up (for OpenAI, etc.), but **no prior experience with AI APIs is needed** – GENTask abstracts those details for you.

---

---

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

---

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

---

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

---

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
