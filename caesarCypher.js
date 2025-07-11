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
	let alphabet, offset, output = "";
	let ukrAlphabet = [
			"а", "б", "в", "г", "ґ", "д", "е", "є",
			"ж", "з", "и", "і", "ї", "й", "к", "л",
			"м", "н", "о", "п", "р", "с", "т", "у",
			"ф", "х", "ц", "ч", "ш", "щ", "ь", "ю", 
			"я"," а", "б", "в", "г", "ґ", "д", "е", 
			"є", "ж", "з", "и", "і", "ї", "й", "к", 
			"л", "м", "н", "о", "п", "р", "с", "т", 
			"у", "ф", "х", "ц", "ч", "ш", "щ", "ь", 
			"ю",  "я",
		];
		let engAlphabet = [
			"a", "b", "c", "d", "e", "f", "g", "h", 
			"i", "j", "k", "l", "m", "n", "o", "p", 
			"q", "r", "s", "t", "u", "v", "w", "x", 
			"y", "z", "a", "b", "c", "d", "e", "f", 
			"g", "h", "i", "j", "k", "l", "m", "n", 
			"o", "p", "q", "r", "s", "t", "u", "v",
			"y", "z", 
	];

	do{
		alphabet = prompt("choose alphabet(ukr/eng)");

		if (alphabet == "ukr"){
  			alphabet = ukrAlphabet;
  		} else if(alphabet == "eng"){
  			alphabet = engAlphabet;
  		} else if (alphabet == null) {
  			return 0;
  		} else {
  			alert("specify the correct alphabet(ukr/eng)");
  		}
	} while(!Array.isArray(alphabet));

	let message = prompt("enter original message");
	let messageArr = message.split("");

		do{
		offset = +prompt("specify the offset");
  		if (offset > 33){
  			alert("offset should be less than 33")
  		}
		} while(offset > 33);
  		
		messageArr.forEach((e) => {
			for (let i = 0; i <= alphabet.length; i++){
				if (e === " "){
				output += " ";
				break;
				} else if(e === ","){
					output += ",";
					break;
				}

				if (e === alphabet[i]){
					output += alphabet[i+offset];
					break;
			}	
			}
		})
		return alert(output);
}


Caesar();