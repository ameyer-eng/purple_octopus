# What is it?

This is a very simple game that uses client-side javascript to generate a image of a purple octopus that can move on response to keyboard input and shoot bubbles. 

This is a work in progress, not a complete game.  I am in the state of code cleanup and re-design to make it responsive.  The HTML canvas is not responsive and does not work well on phones.  I will need to implement a 'resize' function to do this.

# Controls

 * Arrow keys will cause the octopus to move in different directions
 * spacebar will cause the octopus to shoot a bursting bubble

# Why the different folders?

* I would like to re-use different parts of the code.  For example...once I got the background with the bubbles working, it may work as a great "splash" or intro screen where instructions could be provided.  
* I am attempting to "snapshot" different aspects of the code for later use. 


## Currently:

I have added a resize functions to the elements.  Radial elements are resized with (R/Rbase).  The Rs are computed with X**2 + Y**2 = R**2.
The object origins are scaled using the previous window size and the next window size as a ratio.  This requires each object to know the window size.

It works...but if there are a couple of issues I can think of

1) If I want to add another object later I must recall to add resize functions
2) There is no reason for an object in a "game" to care about the browser window size
3) I need a generic function to log to console if anything fails.  

# Ideas????

1) Add some sort of coordinate system class. Since all of the draw functions can be broken down into circles, rectangles, and polygons...then the coordinate system class would have the job of handling the transformations of the base shapes.  In this case the draw functions would not worry about browser size because...

circle.resize() 
rectangle.resize()
polygon.resize(){
    coordinate.resize(old browser size, new browser size)
}

origin.scale()

A coordinate system class could also have errors reported by the base coordinate class.  This way it separates the problem of wondering if it was the "game" logic that broke something or the browser resize itself.





