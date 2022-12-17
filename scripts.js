// Thanks to Dan Dascalescu on Stack Overflow. I owe you a Dr. Pepper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function gradualInsert(interval, elementId, string) {
	let gradualString = "";

	for (let i = 0; i <= string.length; i++) {
		document.getElementById(elementId).innerHTML = gradualString;
		await sleep(interval);
		gradualString += string[i];
	}
}

async function gradualRemove(interval, elementId) {
	let string = document.getElementById(elementId).innerHTML;
	length = string.length;
	for (let i = 0; i <= length; i++) {
		string = string.substring(0, length - i);
		await sleep(interval);
		document.getElementById(elementId).innerHTML = string;
	}
}

async function textLoop() {
	count = 1;
	while (true) {
		switch (count) {
			case 1: string = "programming"; break;
			case 2: string = "video games"; break;
			case 3: string = "bad advice"; break;
			case 4: string = "theater"; break;
			case 5: string = "whatever I want"; count = 0; break;
		}
		await gradualInsert(75, "highlight-title", string);
		await sleep(5000);
		await gradualRemove(50, "highlight-title");
		count += 1;
	}
	console.log("Something happened and the loop ended");
}

textLoop();