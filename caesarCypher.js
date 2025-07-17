/*
//
//
//
//
// 
//        ░█████╗░░█████╗░███████╗░██████╗░█████╗░██████╗░
//        ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗
//        ██║░░╚═╝███████║█████╗░░╚█████╗░███████║██████╔╝
//        ██║░░██╗██╔══██║██╔══╝░░░╚═══██╗██╔══██║██╔══██╗
//        ╚█████╔╝██║░░██║███████╗██████╔╝██║░░██║██║░░██║
//        ░╚════╝░╚═╝░░╚═╝╚══════╝╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝
//
//
//
//
//
//
*/


function Caesar(){
	let alphabet, offset, output = "", message, messageArr, mode;

	let ukrAlphabet = [
		"а", "б", "в", "г", "ґ", "д", "е", "є",
		"ж", "з", "и", "і", "ї", "й", "к", "л",
		"м", "н", "о", "п", "р", "с", "т", "у",
		"ф", "х", "ц", "ч", "ш", "щ", "ь", "ю",
		"я", "а", "б", "в", "г", "ґ", "д", "е",
		"є", "ж", "з", "и", "і", "ї", "й", "к",
		"л", "м", "н", "о", "п", "р", "с", "т",
		"у", "ф", "х", "ц", "ч", "ш", "щ", "ь",
		"ю", "я", "А", "Б", "В", "Г", "Ґ", "Д",
		"Е", "Є", "Ж", "З", "И", "І", "Ї", "Й",
		"К", "Л", "М", "Н", "О", "П", "Р", "С",
		"Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ",
		"Ь", "Ю", "Я", "А", "Б", "В", "Г", "Ґ",
		"Д", "Е", "Є", "Ж", "З", "И", "І", "Ї",
		"Й", "К", "Л", "М", "Н", "О", "П", "Р",
		"С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш",
		"Щ", "Ь", "Ю", "Я",
	];
	let engAlphabet = [
		"a", "b", "c", "d", "e", "f", "g", "h",
		"i", "j", "k", "l", "m", "n", "o", "p",
		"q", "r", "s", "t", "u", "v", "w", "x",
		"y", "z", "a", "b", "c", "d", "e", "f",
		"g", "h", "i", "j", "k", "l", "m", "n",
		"o", "p", "q", "r", "s", "t", "u", "v",
		"y", "z", "A", "B", "C", "D", "E", "F",
		"G", "H", "I", "J", "K", "L", "M", "N",
		"O", "P", "Q", "R", "S", "T", "U", "V",
		"W", "X", "Y", "Z", "A", "B", "C", "D",
		"E", "F", "G", "H", "I", "J", "K", "L",
		"M", "N", "O", "P", "Q", "R", "S", "T",
		"U", "V", "W", "X", "Y", "Z",
	];

	do{
		mode = prompt("choose mode(coder - c, decoder - d)");
	} while(mode instanceof String || null);

	do{
		alphabet = prompt("choose alphabet(ukr/eng)");

		if (alphabet === "ukr"){
  			alphabet = ukrAlphabet;
  		} else if(alphabet === "eng"){
  			alphabet = engAlphabet;
  		} else if (alphabet == null) {
  			return 0;
  		} else {
  			alert("specify the correct alphabet(ukr/eng)");
  		}
	} while(!Array.isArray(alphabet));
	if (mode === "c"){
		message = prompt("enter original message");
	}
	else{
		message = prompt("enter coded message");
	}
	
	messageArr = message.split("");

		do{
		offset = +prompt("specify the offset");
  		if (offset > 33){
  			alert("offset should be less than 33")
  		}
		} while(offset > 33);
  	
		if (mode === "c"){
			messageArr.forEach((e) => {
  			for (let i = 0; i <= alphabet.length; i++){
				if (e === " "){
					output += " ";
					break;
				} else if(e === ","){
					output += ",";
					break;
				} else if(e === "?"){
					output += "?";
				} else if(e === "!"){
					output += "!"
				} else if(e === "."){
					output += ".";
				}

 				if (e === alphabet[i]){
  					output += alphabet[i+offset];
  					break;
				}	
  			}
  		})
		} else {
			messageArr.forEach((e) => {
  			for (let i = 0; i <= alphabet.length; i++){
				if (e === " "){
					output += " ";
					break;
				} else if(e === ","){
					output += ",";
					break;
				} else if(e === "?"){
					output += "?";
				} else if(e === "!"){
					output += "!"
				} else if(e === "."){
					output += ".";
				}

 				if (e === alphabet[i]){
 					if (alphabet.length !== engAlphabet.length){
 						output += alphabet[33+i-offset];
 						break;
 					}
					output += alphabet[26+i-offset];
					break;
				}	
  			}
  		})
		}


		return alert(output + output.length);
}


Caesar();