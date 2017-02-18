function Dog(name, intro, decisions, adoptionChance, numCritics, critic, actionsLeft) {
	this.name = name;
	this.intro = intro;
	this.decisions = decisions;
	this.adoptionChance = adoptionChance;
    this.numCritics = numCritics;
    this.critic = critic;
    this.actionsLeft = actionsLeft;
}

var state = 0;
var lose = "Despite her good behavior and loving demeanor, Cooper was not adopted by any of her visitors - and she’s not the only one. Each year, animal shelters in the U.S. take in 7.6 million pets, and only about a third of them get adopted out. The remainder are either put down or left in overcrowded shelters and receive insufficient care and attention due to lack of human resources. Many people looking to become dog owners look to pet shops for younger, supposedly better-behaved dogs. These pet stores, however, often purchase their pets from puppy mills, where dogs are raised in cramped, filthy conditions and shipped across the country without adequate food, water, ventilation, or shelter - far from the ideal conditions for raising a well-behaved, happy pupper. ";
var win = "Unfortunately, Cooper is one of the lucky ones. Each year, animal shelters in the U.S. take in 7.6 million pets, and only about a third of them get adopted out. The remainder are either put down or left in overcrowded shelters and receive insufficient care and attention due to lack of human resources. Many people looking to become dog owners look to pet shops for younger, supposedly better-behaved dogs. These pet stores, however, often purchase their pets from puppy mills, where dogs are raised in cramped, filthy conditions and shipped across the country without adequate food, water, ventilation, or shelter - far from the ideal conditions for raising a well-behaved, happy pupper.";
var moreInfo = "test";
var positiveResponses = ["Awww",  "So cute!", "Wow!", "That's great!", "Good dog!", "Amazing.", "Adorable!"];
var negativeResponses = ["Bad dog!", "Ow!", "I knew sheltered dogs would be like this!", "I wouldn't want to be this dog's friend.", "It'd be hard to take care of this dog."];
var dogChances = [0, 3, 5, 2, 2];
var startingActions = 1;
var totalCritics = 4;
var criticIndex = 0;
var dogs = [];
var myDog;
/*
* 0: Title page
* 1: Dog Intro
* 2: Complex page.
* 3: Win page.
* 4: Lose page.
* 5: More information page.
*/

function initializeDogs() {
	var randomChance = 1 - parseInt(Math.random() * 2, 10);
	dogs[0]  = new Dog("cooper", "Meet Cooper! Cooper is a four year-old female pitbull. She was purchased from a pet store as a puppy but was left behind in the city when her former owners moved. She’s been a resident of the shelter for the past six months and is looking for a new home. Cooper loves chew toys, playing fetch, and taking naps in the sun. Try to get Cooper adopted!", ["Unfortunately, Sarah decides not to adopt Cooper. Although Cooper is energetic, Sarah wants a younger dog, so she will go probably to go a pet store. This leaves many perfectly trainable and loveable dogs like Cooper stuck in shelters.", "Sadly, Terrence decides not to adopt Cooper. He doesn’t like that Cooper is a pitbull, and wants to look for a different breed, probably purebred. Like many potential adopters, Terrence has misconceptions about pitbulls in general, even though many of them don’t have behavioral problems.", "Unfortunately, Logan decides not to adopt Cooper. She is scared that Cooper will have behavioral problems after being abandoned by her previous owners, and doesn’t want to deal with re-training an adopted dog. In reality, her belief in the saying “old dogs can’t learn new tricks” is totally unfounded. Dogs never stop learning, and even if Logan were to purchase a puppy, she would still have to train that puppy."], dogChances[0] + 5 + randomChance, totalCritics, criticIndex, startingActions);
	dogs[1] = new Dog("luna",  "intro", ["Sarah", "Terrence", "Logan"], dogChances[1] + 5 + randomChance, totalCritics, criticIndex, startingActions);
	dogs[2] = new Dog("loki",  "intro", ["Sarah", "Terrence", "Logan"], dogChances[2] + 5 + randomChance, totalCritics, criticIndex, startingActions);
	dogs[3] = new Dog("ace",  "intro", ["Sarah", "Terrence", "Logan"], dogChances[3] + 5 + randomChance, totalCritics, criticIndex, startingActions);
	dogs[4] = new Dog("rufus",  "intro", ["Sarah", "Terrence", "Logan"], dogChances[4] + 5 + randomChance, totalCritics, criticIndex, startingActions);
}

$(document).ready(function () {
    initializeDogs();
	initializeTitle(); //Initialize title.
});

function findDogGivenName(name) {
	for (var i = 0; i < dogs.length; i++) {
		if (dogs[i].name == name) {
			return dogs[i];
		}
	}
}

function initializeTitle() {
	state = 0;
	//Title image is already set, intro text is already set, and play button is showing.
	$('#dog').hide();
	$('#dog-pic').hide();
	$('.selection').click(function(){
	   $('.selected').removeClass('selected');
	   $(this).addClass('selected');
	});
	$('#continue-button').click(function () { 
		myDog = findDogGivenName($('.selected').attr('id'));
		$('#continue-button').prop('disabled',true);
    	setTimeout(function(){
       		$('#continue-button').prop('disabled',false);
    	},1000); //Delaying click by one second because clicks carry through methods. 
		initializeDogIntro();
	});
}

function initializeDogIntro() {
	state = 1;
	$('#dog-selection-panel').hide();
	$('#dog-pic img').attr('src', "images/doggo.png"); //Set dog image.
	$('#text p').text(myDog.intro); //Set dog intro text.
	//Play button is already showing.
	
	$('#continue-button').unbind(); //We need to unbind previous handlers, or else all handlers will be called.
	$('#continue-button').click(function(){
		initializeComplex();
	});
}

function initializeComplex() {
	state = 2;
	$('#dog-pic').hide(); //Don't show icon.
	$('#continue-button').hide(); 
	$('#visitors').width(400); //Show visitor sidebar.
	$('#text').hide();
	$('#dog').show(); //Show dog interface now. 
	/*
	* 0 is Sarah
	* 1 is Terrence
	* 2 is Logan
	* 3 is Tony
	*/
	$('#picture').text(myDog.critic);
	$('#fetch').click(function() {
		$('#comments p').text(positiveResponses[parseInt((Math.random() * positiveResponses.length), 10)]);
        updateDogOptions();
	});
	$('#roll').click(function() {
		$('#comments p').text(positiveResponses[parseInt((Math.random() * positiveResponses.length), 10)]);
         updateDogOptions();
	});
	$('#wag').click(function() {
		$('#comments p').text(positiveResponses[parseInt((Math.random() * positiveResponses.length), 10)]);
         updateDogOptions();
	});
	$('#bite').click(function() {
		$('#comments p').text(negativeResponses[parseInt((Math.random() * negativeResponses.length), 10)]);
         updateDogOptions();
        myDog.adoptionChance -= 2;
        console.log("chance: " + myDog.adoptionChance);
	});
}

function updateDogOptions() {
    myDog.actionsLeft--;
    console.log("actions left: " + myDog.actionsLeft + " critics left: " + myDog.numCritics);
	if (myDog.actionsLeft < 0) {
		if (myDog.critic + 1 >= myDog.numCritics) {
	       prepareResultPages();
		}
		myDog.actionsLeft = 3;
		myDog.critic++;
        $('#picture').text(myDog.critic);
	}
}
function prepareResultPages() {
	$('#visitors').hide();
	$('#dog').hide();
	$('#continue-button').show();
	$('#continue-button').text("Get more information");
	$('#continue-button').unbind();
	$('#continue-button').click(function(){
		initializeMoreInfo();
	});
	if (dog.adoptionChance)
		initializeWinPage();
}

function initializeWinPage() {
	state = 3;
	//Icon isn't shown.
	$('#text p').text(win); //Change text to win text.
	$('#text').show();
}

function initializeLosePage() {
	state = 4;
	//Icon isn't shown.
	$('#text p').text(lose); //Change text to lose text.
	$('#text').show();
}

function initializeMoreInfo() {
	state = 5;
	$('#text p').text("More info.");
	$('#continue-button').text("Play again.");
	$('#continue-button').click(function() {
		location.reload();
	});
}