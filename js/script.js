var colors = [
  '#ED5565',
  '#DA4453',
  '#FC6E51',
  '#E9573F',
  '#FFCE54',
  '#F6BB42',
  '#A0D468',
  '#8CC152',
  '#48CFAD',
  '#37BC9B',
  '#4FC1E9',
  '#3BAFDA',
  '#5D9CEC',
  '#4A89DC',
  '#AC92EC',
  '#967ADC',
  '#EC87C0',
  '#D770AD',
  '#CCD1D9',
  '#AAB2BD',
  '#656D78',
  '#434A54'
]

// Set a different color on each reload
var el = document.querySelector('span.blog_image');
el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; 