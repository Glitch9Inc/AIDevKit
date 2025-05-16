
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
