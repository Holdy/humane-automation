

function tokenizeTemplate(templateText) {
	var tokens=[];
	var currentToken = null;
	
	for(var i=0; i < templateText.length; i++) {
		if(templateText[i] == '[') {
			if (currentToken && currentToken.isPlaceholder) {
				throw new Error("Open bracket '[' found in placeholder:" + templateText);
			} else {
				// start a placeholder
				currentToken = {isPlaceholder:true, text:''};
				tokens.push(currentToken);
			}
		} else if (templateText[i] == ']') {
			if (currentToken && currentToken.isPlaceholder) {
				currentToken = null; // end the placeholder.
				
			} else { // presumably the first character in the template
				if (!currentToken) {
					currentToken = {isPlaceholder:false, text:''};
					tokens.push(currentToken);
				}
				currentToken.text += templateText[i];
			}
		
		} else {
			// add it to the current token
			currentToken.text += templateText[i];
		}
	}
}

function matchToken(input, inputIndex, template, tokenIndex) {
	let token = template.tokens[tokenIndex];

	if (token.isPlaceholder) {
		if (inputIndex+1 < template.tokens.length) {
			let nextToken = template.tokens[tokenIndex+1];
			let nextMatchIndex = input.indexOf(nextToken.text, inputIndex);
			if (nextMatchIndex == -1) {
				return null; // No next match so whole template fails.	
			} else {
				let matchData = matchTokens(input, nextMatchIndex, template, tokenIndex+1);
				if (matchData) { // We got to the end and everything matches.
					matchData.placeholders[token.text] = input.substring(inputIndex, nextMatchIndex-1); // Add this match too
				}
				return matchData;
			}
		} else { // this is the last token.
			let matchData = {template: template, placeholders:{}};
			matchData.placeholders[template.text] input.substring(inputIndex);
			return matchData;
		}
	} else { // token is literal text.
		if (input.indexOf(token.text, inputIndex) == 0) {
			// its a match
			return matchRemainingTokens(input, inputIndex + token.text.length, template, tokenIndex+1);
		} else {
			return null;
		}
	}
}

function matchTemplate(input, template) {
	
	if (!template.tokens) {
		template.tokens = tokenizeText(template.text);
	}
	
	return matchRemainingTokens(input, 0, template, 0);
}

function match(input, templateList) {
	let matchData = null;
	for (let i = 0; i < templateList.length; i++) {
		matchData = matchTemplate(input, templateList[i]);	
		if (matchData) {
			break;
		}
	}
	return matchData;
}