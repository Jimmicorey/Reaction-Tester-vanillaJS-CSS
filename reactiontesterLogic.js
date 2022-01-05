//<<< this lil' web app was made using vanilla Javascript, HTML, and CSS >>>//

//SETUP INITIAL REACTION TIMER
let start = new Date().getTime();
let timer;

//SETUP REACTION TIMES LIST AS AN EMPTY ARRAY
let reactionTimesList = [];

//GENERATE A RANDOM HEXADECIMAL COLOR
function getRandomColor() {            
  let letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++ ) {    
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//MAKE A NEW SHAPE APPEAR
function makeShapeAppear() {  
  //RANDOM MARGIN UP TO 300 PIXELS          
  let margin = Math.random() * 300; 
  //RANDOM SIZE 50 TO 250 PIXELS         
  let size = (Math.random() * 200) + 50;
          
  //GENERATE EITHER CIRCLE OR SQUARE
  if (Math.random() > 0.5) {
    document.getElementById('shape').style.borderRadius = '50%';    
  } else {      
    document.getElementById('shape').style.borderRadius = '0';     
  }
          
  document.getElementById('shape').style.backgroundColor = getRandomColor();         
  document.getElementById('shape').style.width = `${size}px`;          
  document.getElementById('shape').style.height = `${size}px`;            
  document.getElementById('shape').style.marginTop = `${margin}px`;           
  document.getElementById('shape').style.marginLeft = `${margin}px`;
  document.getElementById('shape').style.display = 'block';
          
  //START NEW TIMER AFTER SHAPE APPEARS
  start = new Date().getTime();   
}

//NEW SHAPE APPEARS AFTER 0 - MAX NUMBER SECONDS
function appearAfterDelay(max) {            
  timer = setTimeout(makeShapeAppear, Math.random() * max);
  return timer;       
}

//STORE NEW REACTION TIME TO THE REACTION TIMES LIST
function storeResults(time) {
  reactionTimesList.push(time);
}

/************* START THE REACTION TESTER **********************/
document.getElementById('start_button').onclick = () => { 
  //CLEAR ANY DISPLAYED TIMES AND TEXT
  document.getElementById('time_display').innerHTML = '';
  document.getElementById('playing_field').innerHTML = '';
  document.getElementById('reaction_times_list').innerHTML = '';

  //CLEAR REACTION TIMES LIST
  reactionTimesList = [];

  //INITIAL DISPLAY     
  appearAfterDelay(3000);
        
  //CLICK THE SHAPE LOGIC
  document.getElementById('shape').onclick = () => {            
    document.getElementById('shape').style.display = 'none';            
    let end = new Date().getTime();            
    let reactionTime = (end - start) / 1000;           
    document.getElementById('time_display').innerHTML = `${reactionTime}s`;
    storeResults(reactionTime);            
    appearAfterDelay(2000);  
  };      
};

/************* END THE REACTION TESTER **********************/
document.getElementById('end_button').onclick = () => {
  clearTimeout(timer); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  document.getElementById('shape').style.display = 'none';
  document.getElementById('playing_field').innerHTML = 'Thanks for playing!';
  document.getElementById('reaction_times_list').innerHTML = `Here's your reaction times ${reactionTimesList.map(x => `<li>${x}</li>`).join('')}`;
};