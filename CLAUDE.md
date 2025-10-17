# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Development Commands

### Core Development Tasks

- **Start the application**: `deno task start` - Runs the interactive TypeScript
  learning tool
- **Run tests**: `deno task test` - Executes the test suite
- **Test with coverage**: `deno task test-cov` - Runs tests and generates
  coverage report
- **Lint code**: `deno task lint` - Runs Deno linter
- **Format code**: `deno fmt` - Formats TypeScript code
- **Pre-PR preparation**: `deno task pr-fix` - Formats, lints, and tests code
  before submitting PRs

### Prerequisites

- Requires Deno runtime (not Node.js)
- Uses Deno's built-in TypeScript compiler and standard library

## Architecture Overview

### Core Application Flow

TypeScriptlings follows an Observer pattern for real-time exercise checking:

1. **Main Entry** (`src/main.ts`): Sets up file watching on `./exercises`
   directory and initializes the application
2. **File System Observer** (`src/fs.ts`): Monitors exercise files for changes
   and notifies observers
3. **Exercise Checking Loop**: When files change, automatically runs TypeScript
   compilation and checks completion status
4. **State Management** (`src/state.ts`): Tracks current exercise and provides
   navigation between exercises
5. **Automatic Progression**: Successfully completed exercises automatically
   advance to the next one

### Key Components

**Exercise System** (`src/exercise.ts`):

- Defines Exercise class with path and mode ("compile" or "test")
- Handles cross-platform path normalization

**Runner** (`src/runner.ts`):

- Executes `deno check` for TypeScript compilation validation
- Determines exercise completion by checking for "// I AM NOT DONE" comments
- Returns structured results with success status and compiler output

**UI System** (`src/ui.ts`):

- Provides colored terminal feedback using Deno's color utilities
- Shows success/failure messages and progress indicators

### Exercise Structure

- Exercises are defined in `exercises/index.ts` as an array of Exercise objects
- Exercise files are located in `exercises/test/` directory
- Each exercise contains intentional TypeScript errors that users must fix
- Exercises use "// I AM NOT DONE" comments to mark incomplete status
- Once this comment is removed AND the TypeScript compiles successfully, the
  exercise is considered complete

### Development Patterns

**File Watching Implementation**:

- Uses Deno's native file system APIs for watching
- Implements debouncing to handle rapid file changes
- Observer pattern allows multiple components to react to file system events

**Exercise Progression Logic**:

- The `rewind()` method automatically advances through completed exercises on
  startup
- Exercises are checked sequentially - must complete current exercise before
  next becomes available
- Application celebrates completion when all exercises are finished

**Error Handling**:

- TypeScript compilation errors are captured and displayed to users as learning
  feedback
- Different UI feedback for compilation failures vs. incomplete exercises
- Clear instructions provided for next steps

### Testing Strategy

- Uses Deno's built-in test runner
- Tests require `--allow-run` permission for subprocess execution
- Coverage reporting available via `deno task test-cov`
