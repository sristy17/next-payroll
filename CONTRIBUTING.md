# Contributing to the Multi-Tenant Payroll & Tax Compliance System

We warmly welcome contributions to this project! Whether you're fixing a bug, adding a new feature, improving documentation, or suggesting an enhancement, your efforts are highly valued.

Please take a moment to review this document to understand how to contribute effectively and adhere to our community standards.

## Table of Contents

* [How to Ask Questions](#how-to-ask-questions)
* [Reporting Bugs](#reporting-bugs)
* [Suggesting Enhancements](#suggesting-enhancements)
* [Setting Up Your Development Environment](#setting-up-your-development-environment)
* [Branching Strategy](#branching-strategy)
* [Commit Message Guidelines](#commit-message-guidelines)
* [Pull Request Guidelines](#pull-request-guidelines)
* [Code Style](#code-style)
* [Testing](#testing)
* [Where to Get Help](#where-to-get-help)
* [Code of Conduct](#code-of-conduct)

## How to Ask Questions

If you have questions about using the system or about contributing, please open a new issue on the [GitHub Issues page](https://github.com/sristy17/next-payroll/issues) with the label `question`.

## Reporting Bugs

A bug is a demonstrable problem caused by the code. Good bug reports are incredibly helpful!

Before submitting a bug report, please:
1.  **Check existing issues:** Search the [GitHub Issues page](https://github.com/sristy17/next-payroll/issues) to see if the bug has already been reported.
2.  **Ensure it's a bug:** Confirm the issue is with the code and not due to incorrect usage.
3.  **Provide context:** Describe your environment (OS, browser, Node.js version, etc.).

When reporting a bug, please include:
* A clear and concise title.
* Steps to reproduce the bug.
* Expected behavior.
* Actual behavior.
* Any error messages (full stack traces if applicable).
* Screenshots or screen recordings (if helpful).

## Suggesting Enhancements

We welcome suggestions for new features or improvements!

Before submitting an enhancement suggestion, please:
1.  **Check existing issues:** Search the [GitHub Issues page](https://github.com/sristy17/next-payroll/issues) to see if the enhancement has already been suggested.
2.  **Describe the problem:** Clearly explain the problem you're trying to solve.
3.  **Describe the solution:** Explain how your proposed enhancement would address the problem.
4.  **Consider alternatives:** Briefly mention any alternative solutions you've considered.

## Setting Up Your Development Environment

To set up your local development environment, please refer to the [Installation & Setup](#installation--setup) section in the main [README.md](README.md) file. It contains detailed instructions on cloning the repository, installing dependencies, and configuring environment variables.

## Branching Strategy

We follow a [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) branching strategy:
1.  **Fork** the repository.
2.  **Create a new branch** from the `main` branch for your feature or bug fix. Use descriptive names like `feat/new-feature-name` or `fix/bug-description`.
    ```bash
    git checkout -b your-branch-name-here
    ```
3.  **Commit your changes** regularly.
4.  **Push** your branch to your forked repository.
5.  **Open a Pull Request** (PR) against the `main` branch of the original repository.

## Commit Message Guidelines

We prefer descriptive and clear commit messages. Please follow these guidelines:
* **Type(scope): Subject line** (e.g., `feat(payroll): Add automated payslip generation`)
* **Type:** `feat` (new feature), `fix` (bug fix), `docs` (documentation), `style` (formatting, no code change), `refactor` (code refactoring), `test` (adding tests), `chore` (maintenance, build process, etc.)
* **Scope (optional):** The part of the codebase affected (e.g., `payroll`, `tax-filing`, `auth`, `ui`, `deps`).
* **Subject:** Concise, imperative, present tense. Max 50 characters.
* **Body (optional):** More detailed explanation if needed.

## Pull Request Guidelines

When submitting a Pull Request, please:
* **Link relevant issues:** Reference any issues the PR addresses (e.g., `Fixes #123`, `Closes #456`).
* **Describe your changes:** Provide a clear summary of what your PR does and why.
* **Include screenshots/GIFs:** If your PR involves UI changes, provide visuals.
* **Ensure tests pass:** Make sure all existing tests pass and add new tests if applicable.
* **Request a review:** Once ready, request a review from a maintainer.

## Code Style

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. While there are no strict linters enforced yet, please try to maintain consistency with the existing code style. 

## Testing

* Currently, we rely on manual testing during development and through pull request reviews.
* For any new features or bug fixes, please describe how you have tested your changes in the Pull Request.
* If you add automated tests (e.g., unit tests, integration tests), ensure they are well-documented.

## Where to Get Help

If you get stuck or have questions during your contribution process, feel free to:
* Open an issue on the [GitHub Issues page](https://github.com/sristy17/next-payroll/issues) with the `help wanted` or `question` label.
* Reach out to the project maintainers directly if appropriate.

## Code of Conduct

Please note that this project has a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.