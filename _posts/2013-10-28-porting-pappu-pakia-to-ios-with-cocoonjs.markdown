---
layout: post
title:  "Porting Pappu Pakia to iOS with CocoonJS"
date:   2013-10-28 12:02:19
comments: true
---

I and [Rishabh][rishabhp] worked on a game for [Github GameOff 2012][gameoff] roughly a year ago and we named it Pappu Pakia.
We were fortunate enough to score the first place (along with four other winners) and get our hands on our first iOS device.

The game was pretty simple and was created using HTML5 Canvas. Everything (graphics, sounds and music) was created from scratch 
(thanks to [Rezoner][rezoner] for the music!). It also hit the the [first page of HN][hnpost] where we got a lot of critiques and
praises. We also received a lot of requests to make it an iOS game but it seemed hard as we had no experience in developing for iOS.

We then came across [CocoonJS][cocoonjs] and [Phonegap][phonegap]. Using these, one can easily _transform_ their HTML5 app into 
_native_ mobile apps without any extra effort. Phonegap is more focused on apps while CocoonJS is more focused on games as it
accelerates the canvas by adding native graphics support. Back then, CocoonJS was very buggy and Phonegap was too slow for a game which made
us drop the idea of porting the game to iOS.

![](https://pbs.twimg.com/media/BXmI2-dCMAAf97Z.png)

Now a year later, I thought of giving CocoonJS a try again and to my surprise, it worked without any hiccups! It took me around 3-4 hours
and the game was [running at 62fps on an iPhone 5][mytweet]. This got us back in the track and now we've started porting the game again to 
various devices (with a lot of improvements too!). Here's the process I followed when I ported the game.

Process
=======

CocoonJS only accelerates the `canvas` element and doesn't care much about the DOM elements like links, spans etc. In our original
game, we used a lot of DOM elements for the whole interface including menu, buttons, invincible timer and text. So, first of all I 
removed all the UI elements and just kept the canvas element for drawing the game. CocoonJS automatically resizes the canvas to 
fullscreen so I had to make the canvas flexible (previously it was 1000x500). 

Previously, the background layers were made for 1000x500 canvas so I had to resize them to fit iPhone 5's screen but will make them
flexible to fit any screen size soon enough.

Now, as CocoonJS needs an extension (WebView) to handle DOM elements floating over canvas, I first removed all of my HTML code and just
kept the JS code. For that, I had to create the canvas element using JS only which is also recommended in the CocoonJS's documentation.
After that, I removed/commented out all the methods for JS code that required the use of those UI elements which made the game work on CocoonJS
for the first time (boy, I was in heaven)!

Now there comes the interesting part – the UIWebView extension. I had to create a new file with all the UI elements and loaded it up using some
default JS code given by CocoonJS's plugin.

    CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(function(pageURL) {
      CocoonJS.App.showTheWebView();
    });

    CocoonJS.App.onLoadInTheWebViewFailed.addEventListener(function(pageURL) {
      console.error("Could not load the HTML file in the webview");
    });

    CocoonJS.App.loadInTheWebView("game_screen");

This loaded my `game_screen.html` file on top of the canvas. In this file, I put all my previous HTML code as it is, changed the styling a bit
to perfectly fit any screen size and boom, it was showing perfectly in the CocoonJS launcher app! But ofcourse, the buttons were not working 
as I had no code associated with them. Also, CocoonJS treats both of them independently (Canvas and UIWebView) so they don't know if the other
one exists or not.

Here comes the best thing about CocoonJS. You can _forward_ the method calls from one view to another synchronously or asynchronously using just 
one extra line of code. You can read more about it [here][cocoonjsdoc]. For example, to start the main game loop, I just had to do this:

    ui.start_game.on('click', function() {
      CocoonJS.App.forward("mit.startGame();");
      // CocoonJS.App.forward("console.log('Start button touched');");

      $("#start_screen").fadeOut();
      return false;
    });

The main magic lies in the `CocoonJS.App.forward();` function. It forwards the given string of commands to the other view, executes it there and 
returns back the result. I did the same for every element and everything went smooth as expected. The game was up and running at 62fps!

Challenges
==========

The main challenge that I faced was the backgrounds. In our web version of the game, we are using two canvas elements, one for the main game
and one for drawing the parallax backgrounds. I couldn't find a way to use two canvases in CocoonJS so had to render the backgrounds and the main
game on the single canvas only. This didn't produce any performance degradations but now I couldn't _erase_ something from the front canvas without
erasing the background from the same place. I am still looking for a solution to this and will update this post as soon as I found one.

Next was the audio. It was not much of a challenge but yes, it was an extra step. I had to remove all the `<audio>` elements and create them 
in JS itself by using `var music = new Audio()` and load it up. It was enough to get the sounds working with CocoonJS perfectly.


Conclusion
==========

CocoonJS is still in development and has quite a number of bugs but it's perfect if you don't want to go into the hassle of learning native iOS
or Android development. It's like the best thing ever happened to indie game developers. We have some more plans of ideas for new games which
we'll be working on very soon! I'll be writing up a more in-depth process on [Codetheory](http://codetheory.in) once the game is completed. 
Also, the game is open-source so head over to [Github](https://github.com/mindd-it/pappu-pakia/) and feel free to experiment with it! 


[rishabhp]:             http://twitter.com/_rishabhp
[rezoner]:              http://twitter.com/rezoner
[gameoff]:              https://github.com/github/game-off-2012
[hnpost]:               https://news.ycombinator.com/item?id=4853042
[cocoonjs]:             http://ludei.com/tech/cocoonjs
[phonegap]:             http://phonegap.com
[mytweet]:              https://twitter.com/kushsolitary/status/394496920426524672/
[cocoonjsdoc]:          http://wiki.ludei.com/cocoonjs:extensions:basic:webview