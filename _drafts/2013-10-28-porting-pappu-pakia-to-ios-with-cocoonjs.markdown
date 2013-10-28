---
layout: post
title:  "Porting Pappu Pakia to iOS with CocoonJS"
date:   2013-10-28 12:02:19
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
various devices. Here's the process I followed when I ported the game.

Process
=======

CocoonJS only accelerates the `canvas` element and doesn't care much about the DOM elements like links, spans etc. In our original
game, we used a lot of DOM elements for the whole interface including menu, buttons, invincible timer and text. So, first of all I 
removed all the UI elements and just kept the canvas element for drawing the game. CocoonJS automatically resizes the canvas to 
fullscreen so I had to make the canvas flexible (previously it was 1000x500). 



[rishabhp]:             http://twitter.com/_rishabhp
[rezoner]:              http://twitter.com/rezoner
[gameoff]:              https://github.com/github/game-off-2012
[hnpost]:               https://news.ycombinator.com/item?id=4853042
[cocoonjs]:             http://ludei.com/tech/cocoonjs
[phonegap]:             http://phonegap.com
[mytweet]:              https://twitter.com/kushsolitary/status/394496920426524672/