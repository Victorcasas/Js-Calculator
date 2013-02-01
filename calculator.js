$(document).ready(function(){ 

  calculatorLink() 
  prepareCalc()
  enableCalcFunctions()  
  
}) 


function calculatorLink() {

  // inserts link in the bottom right conner, that later could be edited for your needs
  
  $('body').append("<a id='calculator' href='#'> calculator </a>")   
  
  //when the link 'calculator' is being clicked, calculator slides from the right 
  
  $('a#calculator').click(function(){ 
    calcMargin = $('#calc').css('right')
    if(calcMargin == '-200px' ){  
      openCalc() }
    else if( calcMargin == '20px' ){  
      closeCalc() }})  

  function openCalc (){
    $('#calc').animate({'right': 20},400)}

  function closeCalc (){
    $('#calc').animate({'right': -200},400)}   
}



function prepareCalc(){

  // inserts the calculator, which has id 'calc'
  // to make this calculator work by linking only two files (.css and .js) and to avoid inserting any html code, we need this ugly string here...
  
  $('body').append("<table id='calc'><tr><td colspan='3' id='screen'></td></tr><tr><td>1</td><td>2</td><td>3</td> </tr><tr>  <td>4</td><td>5</td><td>6</td> </tr><tr><td>7</td><td>8</td><td>9</td> </tr><tr>  <td>.</td><td>0</td><td>/</td> </tr><tr><td>+</td><td>-</td><td>*</td></tr><tr><td colspan='3' id='calculate'>=</td> </tr><tr><td colspan='3' id='reset'>reset</td> </tr></table>") 
  
  // each td in the calculator table gets its own class.
  
  $('#calc td').each(function(){
  
    // numbers 1-9 and dot get "number" class
    
    if ($(this).html() >= 0 && $(this).html() <= 9 && $(this).attr('id') != 'screen'){
      $(this).addClass('number')} 
    else if ($(this).text() == '.'){
      $(this).addClass('number')
    }  
    // operations */+- get "operation" class
    
    else if ($(this).text() ==  '/' || $(this).text() ==  '*' || $(this).text() ==  '-' || $(this).html() ==  '+'){
      $(this).addClass('operation')
    }  
  })    
}


function enableCalcFunctions() {
  
  reset()
  showResult('0')
  
  //clicking buttons
  
  $('#calc td.number').click(function(){
    if(newNumber == true){
      $('#calc #screen').text('')
    }  
    if ($('#calc #screen').text().length <= 9){
      $('#calc td#screen').append($(this).text())
    }
    newNumber = false 
  }) 
  
  //operations 
  
  $('#calc td.operation').click(function(){
    
    //if operation was already processed, clicking operation button acts like equal sign

    if (operationSpecified == true){    
      calculate()
    }   
    
    firstNum = parseFloat($('#calc td#screen').text())      // parses info from the screen and save it for further calculations
    showResult('0')     // resets screen info for next number
    newNumber = true     // it tells calc, that numbers, that will be pressed futher are part of the second number
    operation = $(this).text()      // identifies the type of operation
    allowCalculationButton = true      // it allows us to press calculation button, because we already have 1 number + 1 operation + second number (which is zero by default)
    operationSpecified = true      //  it tells that some operation button has been clicked

  })

  //final calculation when equal sign is being clicked
  
  $('#calc td#calculate').click(function(){  
    
    // calculation button only works, if some of the operation buttons was clicked
    
    if (allowCalculationButton == true) { 
      calculate()
      showResult()
      reset()
    }
    
    // when calculation button is being pressed, it resets previous numbers
    
    allowCalculationButton = false     // it turns off calculation button. it only works once and then resets all.
    operationSpecified = false     // it tells calculator, that next numbers will be a part of the first number
    
    // turn off calculation if "=" is pressed two times. we need to turn it off only when we press operation buttons
    
  })
  
  $('#calc #reset').click(function(){
    reset()
    showResult('0')
  }) 
}

// calculcation function

function calculate(){

  // parses last enterd number, that now is being shown on the screen
  
  secondNum = parseFloat($('#calc td#screen').text())
  
  // math action depending on the initialized operation
  
  switch(operation) {
    case '+': {
      result = firstNum + secondNum
      break;
    }
    case '-': {
      result = firstNum - secondNum
      break;
    }
    case '*': {
      result = firstNum * secondNum
      break;
    }
    case '/': {
      result = firstNum / secondNum
      break;
    } 
    default: {}
  }
  showResult(result)

}

// show anything oh tne screen
   
function showResult(x){ 
  $('#calc td#screen').text(x)
}

//reset calculations and previous numbers

function reset(){
  newNumber = true
  firstNum = 0
  secondNum = 0
  firstOperation = 0
  secondOperation = 0
  operationSpecified = false
}






