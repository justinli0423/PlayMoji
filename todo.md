## To-dos for redesign

### Refactor / cleanup
- factor redux method handlers into separate handlers
- factor conditional renders into methods
- component naming
- change the emoji string name! (parsedStats?)
- create helpers for song filtering from response.data
- create a utils file for helpers
- generic components filtered out into own file/folder
- factor out all variable declarations from render()
- proptype defaults and validators
- convert all display units to px and media query properly (?)
- APIs into own file (remove all constants)
- reorganize css 
- change css into flex[done]
- more UI feedback on loads
  - logout message
  - better "created playlist" message

### UI
- fix cursor [done]
- add fontawesome for UI enhancement
- better visuals selection size exceeded
- sidebar customization to fit with rest of page
- color fixing (sidebar/topbar)
- UI acknowledgement of max 5 songs for basis
- fix button layout
- pick better global font 
- error indication of removing songs
- create icon for user (move logout to a less accessible area)
- do not load anything until DOM is ready
- do not need the "remove songs" section (merge with create)[done]
- convert emoji into input selectors for stats (under top result)
- widget for emoji status [done]

### Performance
- debouncers [done]
- factor API calls (async) [done]
- rebuild APIs directly (no need for middleware)
- fix all warnings for iterators
- switch to object instead of array for songs (super messy right now) [done]
- switch to object instead of array for emojis (super messy right now)

### Features
- add preview to songs
- get artist names from api
- customize playlist size
- more search options (artist, album..)