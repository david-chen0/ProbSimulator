/*!
* Start Bootstrap - Bare v5.0.1 (https://startbootstrap.com/template/bare)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
var targetProb = 50;
const bitValue = [0];
var numBits = 32; //Maximum number of bits(hardcoded) to prevent infinite loop
var numTrials;
const results = [];
const flipNum = []; //Tracks number of flips for graph later on
const successTracker = []; //Tracks number of successful flips at each step for graph later on
var success; //Number of successful flips


function main() {
	targetProb = parseInt(document.getElementById('targetProbability').value, 10);
	if (targetProb < 0 || targetProb > 100) {
		return;
	}
	success = 0; //Reset counter between multiple submissions
	storeTrials();
	binaryExpansion();
	for (i = 0; i < numTrials; i++) {
		result = probSimulate();
		if (bitValue[result] == 1) {
			success++;
		}
		results[i] = (bitValue[result] == 1);
		successTracker[i] = success;
		flipNum[i] = i + 1;
	}
	displaySampleFlip();
	showDescription();
	hideInput();
	createGraph();
}

function storeTrials() {
	numTrials = parseInt(document.getElementById('numTrials').value, 10);
	if (!numTrials || numTrials < 0) {
		numTrials = 1000; //Default value(hardcoded) if a negative or non-integral value is entered
	}
}

function binaryExpansion() {
	let remainder = targetProb / 100;
	binaryDigit = 1;
	while (binaryDigit < numBits) {
		let binaryAmount = 1 / Math.pow(2, binaryDigit);
		if (remainder >= binaryAmount) {
			bitValue[binaryDigit - 1] = 1;
			remainder -= binaryAmount;
		} else {
			bitValue[binaryDigit - 1] = 0;
		}
		binaryDigit++;
	}
}

function probSimulate() {
	let index = 0;
	while (index < bitValue.length) {
		//True with probability 50% and false with probability 50%
		if (Math.random() < 0.5) {
			index++
		} else {
			break;
		}
	}
	index = Math.min(index, bitValue.length - 1);
	return index;//(bitValue[index] == 1); Returns whether the bit at index has value 1
}

function displaySampleFlip() {
	index = probSimulate();
	bitVal = bitValue[index];
	document.getElementById("sampleFlip").innerHTML = "Sample Flip:";
	//long line incoming boi
	document.getElementById("stats").innerHTML = "First heads was encountered on flip " + (index + 1) + " of the fair coin <br> The binary bit value of probability " + (targetProb / 100) + " at position " + (index + 1) + " is " + (bitVal) + "<br>Therefore the flip is " + interpret(bitVal == 1);
}

function interpret(bool) {
	if (bool) {
		return "successful"
	}
	return "unsuccessful"
}

function showDescription() {
	document.getElementById("target").innerHTML = "Chosen Probability: " + targetProb;
	document.getElementById("numFlips").innerHTML = "Number of Trials: " + numTrials;
	document.getElementById("numSuccess").innerHTML = "Number of Successful Flips: " + success;
	document.getElementById("frequency").innerHTML = "Relative Frequency: " + success / numTrials;
	document.getElementById("graphName").innerHTML = "Number of successful flips at each step";
	document.getElementById("description").innerHTML = "Graph approaches linearity as input probability increases";
}

function hideInput() {
	document.getElementById("probPrompt").style.display = "none";
	document.getElementById("trialPrompt").style.display = "none";
	document.getElementById("runSimulation").style.display = "none";
	document.getElementById("return").style.display = "initial"
}

function createGraph() {
	var ctx = document.getElementById('flipTracker').getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: flipNum,
	        datasets: [{
	            label: 'Number of Successful Flips',
	            data: successTracker,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            y: {
	                beginAtZero: true
	            }
	        }
	    }
	});
}