$(document).ready(function(){  
prepareCalc()
enableCalcFunctions()	  
}) 

function prepareCalc(){
	$('body').append("<a id='calculator' href='#'> calculator </a>")	 
	$("a#calculator").css({'position': 'fixed', 'bottom': '20px', 'right':'10px', 'width': '100px', 'z-index': '9000','color': 'white'})
	
	$('body').append("<table id='calc' class='css3calc'><tr><td colspan='3' id='screen'></td></tr><tr><td>1</td><td>2</td><td>3</td> </tr><tr>	<td>4</td><td>5</td><td>6</td> </tr><tr><td>7</td><td>8</td><td>9</td> </tr><tr>	<td>.</td><td>0</td><td>/</td> </tr><tr><td>+</td><td>-</td><td>*</td></tr><tr><td colspan='3' id='calculate'>=</td> </tr><tr><td colspan='3' id='reset'>reset</td> </tr></table>")	
	$("#calc").css({'z-index': '9000', 'padding': '0px'})	
	
	$('#calc td').each(function(){
		if ($(this).html() >= 0 && $(this).html() <= 9 && $(this).attr('id') != 'screen'){
			$(this).addClass('number  css3button')
		}
	
		else if ($(this).text() == '.'){
			$(this).addClass('number  css3button')
		}  
		else if ($(this).text() ==  '/' || $(this).text() ==  '*' || $(this).text() ==  '-' || $(this).html() ==  '+'){
			$(this).addClass('operation  css3button')
		} 
		if ($(this).attr('id') != 'screen' & $(this).attr('id') != 'calculate' & $(this).attr('id') != 'reset' ){
			innerNumber = $(this).text()
			$(this).text('')
			$(this).prepend('<div class="bluebutton">' + innerNumber)
			$(this).append('</div>')
		}
		else { 
			$(this).addClass('css3button')
		}	
	}) 	 
	
	$('a#calculator').click(function(){ 
		calcMargin = $('#calc').css('right')
		if(calcMargin == '-200px' ){  
			openCalc() }
		else if( calcMargin == '20px' ){  
			closeCalc() }
	})	

	function openCalc (){
		$('#calc').animate({'right': 20},400)  
	}

	function closeCalc (){
		$('#calc').animate({'right': -200},400)   
	}  
}


function enableCalcFunctions() {
	
	reset()
	showResult('0')
	
	//clicking buttons
	$('#calc td.number div.bluebutton').click(function(){
		if(newNumber == 1){
			$('#calc #screen').text('')
		}	
		if ($('#calc #screen').text().length < 8){
			$('#calc td#screen').append($(this).text())
		}
		newNumber = 0 
	}) 
	
	//operations 
	$('#calc td.operation div.bluebutton').click(function(){
		
		//если уже операция была, то сначала сложить и вывести на экран результат
		
		if (pastOperation == false){
			firstNum = parseFloat($('#calc td#screen').text())
			showResult('0')
			newNumber = 1   
			operation = $(this).text() 
			calculationButton = true
			pastOperation = true
		}	
		else if (pastOperation == true){
		
			calculate()
			newNumber = 1
			firstNum = parseFloat($('#calc td#screen').text())
			showResult('0')   
			operation = $(this).text() 
			calculationButton = true
			pastOperation = true
		}
		
		
		
	})


	//final calculation 
	$('#calc td#calculate').click(function(){  
		
		if (calculationButton == true) {
			calculate()
			showResult()
			reset()
		}
		
		calculationButton = false
		pastOperation = false
		// turn off calculation if "=" is pressed two times. we need to turn it off only when we press operation buttons
	})
	
	$('#calc #reset').click(function(){
		reset()
		showResult('0')
	}) 
}

function calculate(){

	secondNum = parseFloat($('#calc td#screen').text())
	
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
		
function showResult(x){ 
	$('#calc td#screen').text(x)
}

function reset(){
	newNumber = 1
	firstNum = 0
	secondNum = 0
	firstOperation = 0
	secondOperation = 0
	pastOperation = false
}






