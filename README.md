# acorn

## Getting Started
- use [quick_install](https://github.com/NathanaelLee15/Acorn/blob/main/scripts/quick_install.bat) script
    - run `curl -s https://raw.githubusercontent.com/NathanaelLee15/Acorn/refs/heads/main/scripts/quick_install.bat | cmd
`
- set up your project
- run `acorn` in your project

## Application
- Setup Acorn & Plugins
    - copy fields from `.env.template` into your projects `.env`
- 2 ways to create a `profile.json`
    - initially running `acorn` in a directory will prompt you to make one
    - copy from [example](https://github.com/NathanaelLee15/Acorn/blob/main/profile.json)
- Run `acorn` from your project root (or where a profile.json is)
    - `acorn` [path] [-flag [prompt]]

|    Mode   |        Flags          |       Purpose     |
| --------- | --------------------- | ----------------- |
|   Server  | -s -S -serve -Serve   |     Api Server    |
|   Auto    | -a -A -auto  -Auto    |     Automation    |

|              command              |                  effect               |
| --------------------------------- | ------------------------------------- |
| `acorn`                           | cli mode in current dir               |
| `acorn ./example`                 | cli mode in `./example` dir           |
| `acorn . -S`                      | server mode in current dir            |
| `acorn ./server-example -S`       | server mode in `./server-example` dir |
| `acorn ./example -A "my prompt"`  | cli auto mode in `./example` dir      |

<br>

#### Manual Project Setup

#### Acorn [this](https://github.com/NathanaelLee15/Acorn)
- clone this
- install bun
- cd to this dir
- bun install
- create system-var called `ACORN_PATH` and set it to where you cloned this
- call `.../Acorn/scripts/bootstrap.bat`
- add `.../Acorn/bin` to PATH

#### Plugins [repo](https://github.com/NathanaelLee15/acorn-plugins)
- clone this
- set your project env `ACORN_PLUGINS_PATH` to wherever you cloned this

Install Bun:
```bash
install_bun.bat
install_bun.ps1
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
dev.bat
```

To distribute:

```bash
compile.bat
deploy.bat
```

<br>

##### Todos
- Data Dashboard
    - measure in/out tokens
    - Lifetime Avg Tokens by request
    - Avg Tokens per hour
    - Avg Tokens per day

- Web Search Tools

- 

<br>

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
