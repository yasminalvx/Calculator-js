function getOutput(){ //pegar saída
	return document.getElementById("output-value").innerText;
}
function printOutput(num){ //imprimir saída
	document.getElementById("output-value").innerText=num;
}
function getHistory(){ //pegar valor do histórico
	return document.getElementById("history-value").innerText;
}
function printHistory(num){ //imprimir histórico
	document.getElementById("history-value").innerText=num;
}
//Quando clica em um operador
var operator = document.getElementsByClassName("operator");
for(var i = 0; i < operator.length; i++){

	operator[i].addEventListener('click',function(){ 
		if(this.id=="clear"){ //limpar tudo
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){ //apagar último digito
			let output = getOutput();
			if(output){ //if output has a value
				output = output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output = getOutput();
			var history = getHistory();

			if(output=="" && history!=""){ //mudar a última operação do histórico
				if(isNaN(history[history.length-1])){ 
					history = history.substr(0, history.length-1);
				}
			}
			if(output!="" || history!=""){ //obter resultado final
				history = history + output;
				if(this.id == "="){
					var result = calculate(history);
					printOutput(result);
					printHistory("");
				}
				else{ //click em +, -, / ou *
					history = history + this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

//quando clica em um número
var number = document.getElementsByClassName("number");
for(var i = 0; i < number.length; i++){
	number[i].addEventListener('click',function(){
		var output = getOutput();
		if(output != NaN){ //se output é um número
			output = output + this.id;
			printOutput(output);
		}
	});
}

//lógica da calculadora
function calculate(num) {
	let result = num.toString();

	if(result.includes("%")) { //7%100 -> 7*0.01*100
		for(let i = 0; i < num.length; i++) {
			if(num[i]=='%') {
				result = result.replace("%", "*0.01*");//substituir % pelo valor real que o representa	
			}
		}
	}
	return eval(result);
}

