# screenaudit-webapp
Web app for ScreenAudit.

## Project Structure

```plaintext
project-name/
|-- node_modules/                # Node modules and dependencies
|-- src/                         # Source files
|   |-- client/                  # Frontend specific code
|   |   |-- assets/              # Images, fonts, and other static assets
|   |   |-- css/                 # CSS files
|   |   |-- js/                  # Vanilla JavaScript files
|   |   |-- index.html           # Entry point HTML file
|   |-- server/                  # Backend specific code
|   |   |-- config/              # Configuration files and constants
|   |   |   |-- config.json      # Sequelize configuration
|   |   |-- controllers/         # Controllers for handling requests
|   |   |-- middleware/          # Custom express middleware
|   |   |-- migrations/          # Database migration files
|   |   |-- models/              # Sequelize models
|   |   |-- routes/              # Express route definitions
|   |   |-- seeders/             # Database seeder files
|   |   |-- services/            # Business logic implementation
|   |   |-- utils/               # Utility classes and functions
|   |   |-- app.js               # Express app
|   |   |-- db.js                # Database connection and setup
|   |-- shared/                  # Code shared between the frontend and backend
|   |   |-- utils/               # Shared utility functions
|-- public/                      # Compiled assets that will be served directly
|-- scripts/                     # Scripts for deployment, running tasks
|   |-- run-migration.sh         # Shell script to run migrations
|-- views/                       # Templates for server-side rendering (if used)
|-- .env.development             # Environment variables for development
|-- .env.production              # Environment variables for production
|-- .gitignore                   # Specifies intentionally untracked files to ignore
|-- package.json                 # Project manifest with metadata, scripts, and dependencies
|-- package-lock.json            # Auto-generated file for any operations where npm modifies the node_modules tree
|-- README.md                    # Project overview and documentation
|-- LICENSE                      # License information
|-- webpack.config.js            # Webpack configuration file
|-- jsdoc.json                   # JSDoc configuration file
```