# GLabs Interactive Image Grid

## How to Install

Before proceeding, insure the Glabs Project Shell has been downloaded and installed.

```
Create New Folder ‘iig’ in the Glabs Project Shell > src/js/application
Clone repo to the this folder
```

## Download Dependencies 

```
npm i react-swipeable-views
npm i react-slick
npm i lodash
```

## Setting up the Application:

> Add the Application to the shell:

EDIT:   src/js/pages/Main.js
Include the path to the application
```
import ImageGrid from "../Application/ImageGrid/ImageGrid";
```
And include it in the render, with the application props

```
<ImageGrid {... this.props}/>
```

> Hook in the Redux Reducers

EDIT : src/reducers/index.js
Add an import to the application reducer as APP
```
import APP from "../js/Application/ImageGrid/reducers/Application";
```
And uncomment the APP:APP in the object if required




```
const reducers = combineReducers({
        UI:UI_DATA,
        APP:APP
    })
```

## Include the Application Styles to be processed:

Navigation to: src/css/pages/_Main.scss and include the path to the Application styles

```
// Application
  // Include Path to Application SCSS
  @import "../../js/Application/ImageGrid/scss/_Application.scss";
```


## Include the Application Data

Copy the application.json file found in > src/js/Application/iig/Json to the public location > public/json/




#Installation Complete:


##Editing the Application.

All of the data found in the image grid can be traced back to the application.json file in the public folder.
To add/remove/edit items use this file!
An example of the Grid Node from the Amex campaign is as follows

```
"Grid":[

{
           "Thumb":"Perspective.png",
           "IMG":"Perspective.png",
           "Title":"New perspective",
           "category":"",
           "GridMeta":{
              "Title":"CES",
              "Sub":"the global stage for innovation",
              "When":"8-11 January 2019",
              "Where":"Las Vegas, US",
              "What":"<a href=\"https://www.ces.tech/Conference/Conference-Program.aspx\" target=\"_blank\"> CES </a> is considered the world stage on which next-generation innovations are introduced to the marketplace. With more than 300 sessions headed up by industry leaders and visionary speakers, CES will delve into key and emerging trends in the industry. Speakers include IBM chairman, president and CEO Ginni Rometty, who will discuss how technologies such as AI and quantum, when built on a foundation of trust and transparency, will drastically change business and society for the better.",
              "While":"Sure, you can spend some time in the glittering grounds of the 24-hour casinos and take in the non-stop action of the Strip, but don’t miss the opportunity to explore the surreal and spectacular desert landscape of nearby Death Valley. After all, a change in environment can help change your perspective and stimulate new ways of thinking. Take a drive (or hike) among the labyrinth of gold-coloured hills of Golden Canyon, view the rainbow-hued sedimentary rocks on Artist’s Drive, or the colourful Badlands loop on an ancient lakebed."
             
          },
          "CTA":["<a href=\"https://www.americanexpress.com/au/content/business-credit-cards/the-american-express-business-explorer-card/\" target=\"_blank\"> Make the most of your points </a> by travelling to expand your business and mind with the American Express Business Explorer card"],
           "Description":[""]
       }
]

```

##Editing the Layout

In most cases the Grid layout can be edited via the CSS channels, mentioned below.
However if you wish to change the number of items in the rows, use the “Griditem.js” file under  >iig/js to amend the col-* to how ever you wish

To edit the modal overlay navigation to: > src/js/Application/iig/js/stepper.js

This file contains the basic layout of the modal overlay.


## Styling the Application

All Applications pull from the shells theme styles from baseline colors and fonts. You do however have control over elements in a specific application.
In the Application folder Navigate to >scss/_Application_Variables.scss for a host of settings for the grid layout and tone.

_Dialod.scss and _ImageGrid.scss also have a number of Media Query options to play around with as well.