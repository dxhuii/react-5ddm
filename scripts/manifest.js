const config = require('../config/index')
const fs = require('fs')

fs.writeFile(
  './dist/client/manifest.json',
  `{
  "short_name": "${config.name}",
  "name": "${config.name}",
  "description": "${config.description}",
  "icons": [
    {
        "src": "/favicon.ico",
        "type": "image/x-icon",
        "sizes": "64x64"
    },
    {
        "src": "/favicon.png",
        "type": "image/png",
        "sizes": "64x64"
    }
  ],
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#f7f9fa",
  "theme_color": "#f7f9fa",
  "related_applications": [],
  "prefer_related_applications": false
}
`,
  err => {
    if (err) throw err
    console.log('manifest.json create completed.')
  }
)
