# Changelog

#### v.3.4.19 (Apr 21, 2025)

* Added ElevenLabs prompt history builder
* Fixed CustomEditor not saving values
* Integrated FunctionManager into ChatCompletionTool and ChatSessionTool
* Fixed broken demo scenes
* Fixed OpenAI prompt history builder
* Fixed Google prompt history builder
* Refactored PromptHistoryViewer

#### v.3.4.18 (Apr 20, 2025)

* Changed edit icon for clarity
* Added argument support to FunctionManager
* Added save button to CodeGen
* Fixed multi-image rendering in IconGen
* Improved ModelSelector by hiding providers with no models

#### v.3.4.17 (Apr 20, 2025)

* Fixed index out of range issue in VoiceSelectorGUI

#### v.3.4.16 (Apr 18, 2025)

* Added FunctionManager
* \[Demo] Realtime API + Function integration

#### v.3.4.15 (Apr 18, 2025)

* Fixed model categorizing regex
* Added cancel request feature to GENTask
* Implemented IconGenWindow
* Cleaned up codegen files
* Added output path tracking for GeneratedImage and GeneratedAudio
* Fixed realtime API sample voice paths
* Fixed Addressables amsdef

#### v.3.4.14 (Apr 18, 2025)

* Removed implicit operator from EPrefs to prevent Mono JIT crash

#### v.3.4.13 (Apr 17, 2025)

* Added missing constraints to:

  * Samples.Editor
  * MaterialDesign
  * MaterialDesign.Editor
* Moved Setup folder outside of assembly

#### v.3.4.12 (Apr 17, 2025)

* Fixed ElevenLabs voice library errors

#### v.3.4.08 (Apr 17, 2025)

* Refactored EditorChatToolbar as separate component
* Implemented export chat as .txt
* Displayed chat list names as date instead of thread ID
* Added more options to GENText and ElevenLabs GENTasks
* Added Texture generator
* Added default model settings to each API
* Added fallback model support using default models
* Renamed ImageModel → DallEModel, TTSModel → OpenAITTS
* Fixed issue fetching Google models
* Improved model family categorization

#### v.3.4.07 (Apr 16, 2025)

* Fixed TTS file path issues
* Fixed build errors related to StartOnInit
* Fixed Unity hang on startup
* Fixed model update triggering every time
* Added ElevenLabs subscription feature
* Added VoiceChanger and AudioIsolation to GENTask
* Added more options to GENText
* Improved EditorChat GUI and stream handling
* Added drag & drop support in EditorChat
* Added AI-powered script menu options:

  * "Improve Readability"
  * "Refactor"

#### v.3.4.2 (Apr 13, 2025)

* Broken GUIDs fixed

#### v.3.2.0 (Apr 10, 2025)

* Compile errors resolved
* Refactored tons of codes

#### v.3.1.4 (Apr 7, 2025)

* Build errors resolved

#### v.3.1.2 (Mar 31, 2025)

* Added Google image models (Gemini, Imagen) to Editor Tool
* Added new Google model families
* Refactored the project

#### v.3.0.0 (Mar 17, 2025)

* Added automatic model updates on Editor startup
* Added automatic model enum code generation

#### v.2.5.4 (Jan 19, 2025)

* Resolved issues with WebGL microphone
* Microphone switching issue resolved

#### v.2.4.3 (Dec 17, 2024)

* Added microphone support for WebGL builds
* Minor bug fixes related to function call delegates

#### v.2.4.2 (Dec 1, 2024)

* Fixed issues with SubmitToolCallOutput calls

#### v.2.4.1 (Oct 22, 2024)

* Fixed package assembly errors

#### v.2.4.0 (Oct 14, 2024)

* Added Realtime API
* Resolved model repository issue
* Minor bug fixes

#### v.2.3.2 (Sep 20, 2024)

* Fixed JsonSettings not applying to MultipartFormSection requests
* Fixed null checks for ImageEditRequest and ImageVariationRequest

#### v.2.2.2 (Aug 29, 2024)

* Fixed UnityWebRequest becoming null

#### v.2.1.2 (Aug 9, 2024)

* Implemented vision request in ChatCompletion API demo scene

#### v.2.1.1 (Aug 8, 2024)

* Fixed ChatCompletion API issues from the last update

#### v.2.1.0 (Aug 6, 2024)

* Fixed Codice namespace issue
* Added more assistant event handlers
* Added ChatCompletion API vision request sample codes

#### v.2.0.9 (Aug 2, 2024)

* Fixed GPT-4o Mini ID issue
* Added FileSearch and CodeInterpreter to AssistantApiV2

#### v.2.0.8 (Jul 24, 2024)

* Fixed editor assembly definitions causing build issue

#### v.2.0.7 (Jul 23, 2024)

* Added GPT-4o Mini and GPT-4o Mini-2024-07-19
* Added thread deletion in EditorChatGPT
* Improved GUI in editor tools

#### v.2.0.6 (Jul 19, 2024)

* Fixed build issues with Asset Database
* Fixed build issues with Model Data
* AssistantsApiV2 demo now generates images

#### v.2.0.5 (Jul 17, 2024)

* Fixed Unity.Plastic.Newtonsoft.Json namespace issue

#### v.2.0.4 (Jul 9, 2024)

* Fixed Google recursive query crash
* Updated model manager

#### v.2.0.3 (Jul 8, 2024)

* Fixed OpenAI recursive query freeze
* Enhanced EditorChatGPT UI (with syntax highlighting)
* Removed confusing error messages

#### v.2.0.2 (Jul 3, 2024)

* Fixed build errors

#### v.2.0.0 (Jul 2, 2024)

* Added full support for Google Gemini API
* Refactored to support multiple APIs

> ⚠️ Note: Model/log data incompatible with v.1.*.* versions. Backup required.

#### v.1.3.3 (Jun 18, 2024)

* Fixed issues with download paths

#### v.1.3.2 (Jun 17, 2024)

* Fixed build issue with CoreLib

#### v.1.3.0 (Jun 16, 2024)

* Added new Editor Tool: File Manager
* Added Assistants API v2 demo scene
* Added Moderations API demo scene

#### v.1.2.5 (Jun 14, 2024)

* Renamed classes to avoid API confusion
* Added AssistantsAPI-v2 demo scene

#### v.1.2.4 (Jun 9, 2024)

* Fixed OpenAISettings loading
* Fixed RunLog duplication and model detection

#### v.1.2.2 (Jun 7, 2024)

* Fixed Message class string output
* Added price calculation to image request logs

#### v.1.2.0 (Jun 5, 2024)

* Added AssistantsAPI streaming
* Introduced new management tool: Assistant Manager
* Added Batch APIs and Vector Store APIs
* Improved Chat streaming usage handling
* Refactored OpenAI client

#### v.1.1.4 (May 24, 2024)

* Support for AssistantsAPI v2
* EditorChatGPT now uses AssistantsAPI

#### v.0.1.5 (May 15, 2024)

* Added GPT-4o support

#### v.0.1.0 (Apr 4, 2024)

* First release
