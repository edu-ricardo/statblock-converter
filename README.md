# D&D Statblock Helper (for 2024 Rules)

This is a web-based tool designed to assist Dungeon Masters in creating and formatting monster statblocks for use with virtual tabletops, specifically styled for the Above VTT platform using the 2024 D&D ruleset formatting.

## Features

This tool currently has two main functionalities:

1.  **JSON Converter:** Converts a monster statblock from a JSON format (such as the one exported from *Improved Initiative*) into a clean HTML format ready to be pasted into Above VTT.
2.  **Statblock Creator:** A user-friendly form that allows you to build a monster from scratch by filling in its attributes. It then generates the same clean HTML format.

## Technologies Used

*   **[Vite](https://vitejs.dev/):** A modern and fast frontend build tool.
*   **[TypeScript](https://www.typescriptlang.org/):** For type-safe JavaScript development.
*   **HTML5:** For the application structure.
*   **CSS3:** For styling the application.

## How to Use

To run this project locally, you need to have [Node.js](https://nodejs.org/) installed.

1.  **Clone the repository and navigate to the project directory.**

2.  **Install dependencies:**
    Open your terminal in the project root and run:
    ```bash
    npm install
    ```

3.  **Run the development server:**
    After the installation is complete, run:
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Your terminal will display a local URL (usually `http://localhost:5173`). Open this URL in your web browser to use the tool.

## Future Ideas

This section is for tracking potential new features and improvements.

- [ ] Add support for more complex fields in the creator form (e.g., Skills, Saving Throws, Immunities).
- [ ] Implement a "Preview" pane for the generated HTML statblock.
- [ ] Add a feature to save/load created monsters from local storage.
- [ ] Support for different output formats/templates.
- [ ] Parse complex action descriptions (e.g., `Melee Attack Roll: +4 to hit`) to auto-format them.

