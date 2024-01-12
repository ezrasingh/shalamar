# Game Engine

## Project Structure

For packages that required a larger scale approach a somewhat [ternary design system (inspired by @nagibaba's Medium post)](https://nagibaba.medium.com/ultimate-ternary-folder-structure-for-large-react-applications-9bb6882d4372) was applied.

### Partials

Partials are layout building blocks of pages.

Example: Header, Content, Footer, Sidebar. A sidebar can be both partial if it possesses page scope or block if it doesn’t.

### Blocks

Blocks are compositions of 2 or more components logically or positionally.

They form partials together. Example: EditForm, Filter, Sorter, AccountDetails, Wizard, etc. If it seems challenging to find semantic names for them, you can use their position: TopLeft, Top, Middle, etc.

### Components

Components are familiar to everyone.

These smallest parts of our whole tree are more maintainable and globally useful. Sometimes even a page can become a “component” by its reusability. So the trademark of components is “reusable”.
