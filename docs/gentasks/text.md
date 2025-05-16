
## Text Generation - GENText

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
