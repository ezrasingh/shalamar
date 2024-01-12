# Overview

The objective of this game engine is to allow users to
create, develop and play web-first games.

# Research & Considerations

- Why React Three Fiber and not just vanilla JS?

- Why not use an ECS based backend?

  - Ape ECS?
  - Problems with ECS and L1 cache utilization.

- Benefits to web first approach for Game Dev
  - Scripting with WASM
  - BYOL(bring your own language) w/ WASM bridge

# Architecture

The core architecture presents three packages:

- Engine
- Editor
- Runner

# Project Config

The project config can be found in `project.json`, here are the available options:

| Parameter    |  Default   |                                                        Description |
| ------------ | :--------: | -----------------------------------------------------------------: |
| `name`       | _required_ |                                               Title of the project |
| `models`     |    `{}`    |     Key-Value map for model data stores their name and URI(string) |
| `animations` |    `{}`    | Key-Value map for animation data stores their name and URI(string) |
| `scenes`     |    `{}`    |   Key-Value map for scene data stores their name and configuration |
| `scenes`     |    `{}`    |   Key-Value map for scene data stores their name and configuration |

## Downloading Your Project

When you download the project config and unpack the Zip file it will contain the following:

```
/
├── assets/
│   ├── models/
│   │   ├── my-model.fbx
│   │   └── ...
│   └── animations/
│       ├── my-anim.fbx
│       └── ...
├── scenes/
│   ├── default.json
│   └── ...
├── scripts/
│   ├── my-vanilla-script.js
│   ├── my-bridged-script.wasm
│   └── ...
└── project.json
```
