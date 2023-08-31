This boilerplate is using electron, webpack, typescript and react.
It allows for multiple windows / entry, and suport hot reload.

## Installation
clone the repo and run Yarn install.


## Usage
### Development with hot reloading
yarn dev

### launch with no hot reloading
yarn start

### Compiling the files for distribution / release
output in release folder
yarn release

## Electron summary
Electron always start with a headless process refer to as Main process.
The Main process is in charge of opening windows (often refered to as renderes).
note that each windows exist in it's own context and do not share object ( class instance ) with othe winbdows.

### AppComRenderer
Given the Main process must the one opening windows.
we use the AppComRenderer class in conjustion with the appComMain to simplified this process.

#### windows
For any window /page to be use / compiled and recognized by webpack, 
it must first be define in the ./webpackConfig/webpack.react.js entry and plugins.

To simplify the opening and closing of windows and/or loading new page in curent window,
you can use the AppComRenderer singleton class and functions:
openWindow : to open a window.
loadPage : to load a page in the existing window.

#### menus
To simplify the menu creation and events, 
you can use the AppComRenderer singleton class and functions:
setApplicationMenu : to set the mian aplication menu
setMenu : to set the current window menu.
addMenuClickListener : add callback function when a menu item is click.
removeMenuClickListener : remove the menuCLick listener. ( shoudl be called in the window componentWillUnmount to make sure to clean up unused listener. ) 

## Data & Store
In order to keep the data syncronize between windows.
The ProjectStore uses the AppComRenderer getData and syncData to keep the data in sync.

#### references :
boilerplate base on https://dev.to/franamorim/tutorial-reminder-widget-with-electron-react-1hj9
and modified for hot reload and multiple windows (entry point)