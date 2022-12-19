# This game allows me to practice development with HTML canvas and draw functions. 

# Different "iterations" are in different folders.  
I am doing this on purpose to later convert them to "levels" and have node serve them. 

# Re-size issues

(12/19/22)  I am working on making the objects resize to the browser window.  It's starting to work but is leaving me with some design questions. 

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


# I think I have to break it again...?

I will likely create another repo to develop a base coordinate class and test it in there.  Once it is working I can apply it's logic here and hopefully nothing breaks....



