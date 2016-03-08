// variables---------------------------------------------------
var animalArray = ["Dolphin", "Dog", "Elephant", "Panda", "Snake"];

// functions--------------------------------------------------


//this will make buttons with the name/data type of z
function makebutton(z){

	var b = $('<button>');
	b.addClass('populate');
	b.attr('data-name', z);
	b.text("Magic " + z + " Button");
	$('#buttons').append(b);

};

//this makes animals for each of the array items
function looper(number, action){

	for (x=0;x<number;x++){

		action(animalArray[x]);
	}
}

//main methods----------------------------------------------------

//populates the gifs, gives them attributes
$(document.body).on('click', '.populate', function() {

	ilovecats();

	$('#animals').empty()

	var target = $(this).data('name');

	console.log(target);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + target + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({url: queryURL, method: 'GET'}).done(function(response){

			console.log(queryURL);
			console.log(response);
			var results = response.data;
			console.log(results);
			console.log(results.length);

			for (var i = 0; i < results.length; i++){

				var newimage = $('<img>');
				newimage.addClass('moveStill');
				newimage.data('status', 'still');
				newimage.data('move', results[i].images.fixed_height.url);
				newimage.data('still', results[i].images.fixed_height_still.url);
				newimage.attr('src', results[i].images.fixed_height_still.url);
				$('#animals').append(newimage);
			}
		});

	return false;
});

//main method, ajax on animal click-----------------------------------------
$('#submit').on('click', function(){

	//looks at text value, pulls it and assigns
	var animal = $('#newanimal').val();
	if (animal == ""){animal = "Cat"};

	//sets text value to nothing
	$('#newanimal').val("");


	//does a lookup for that animal
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10"

	$.ajax({url: queryURL, method: 'GET'}).done(function(response){

		var results = response.data;

		makebutton(animal);

	});

	return false;

});


//move/still function--------------------------------------------------------------------------------
	$(document.body).on('click', '.moveStill', function() {
		//click-anything with class "movestill"

		//set a var equal to the status of the gif. default is "still"
	var status = $(this).data('status');
		//if that var is "still" then set the img src to the moving gif and change the status. or vice versa. 
		if (status=='still'){

			$(this).data('status', 'moving');
			$(this).attr('src', $(this).data('move'));

		}else if (status=='moving'){

			$(this).data('status', 'still');
			$(this).attr('src', $(this).data('still'));

		}
		return false;
	});

//cats joke code---------------------------------------------------------------------------------------
var catcounter = 1;
function ilovecats(){

	switch(catcounter){
		case 1:
		alert("I'm so glad cats are you favorite animal!");catcounter++;break;
		case 2:
		alert("They're my favorite animal too!");catcounter++;break;
		case 3:
		alert("Ten more cats? Absolutely");catcounter++;break;
		case 4:
		alert("I've never heard of that type of cat, so here are some other cats!");catcounter++;break;
		case 5:
		alert("It seems you misspelled cat again...");catcounter++;break;
		case 6:
		alert("It's C A T, try and type is correctly next time.");catcounter++;break;
		case 7:
		alert("C... A... T...");catcounter++;break;
		case 8:
		alert("There you go, for a second there I thought you didn't want to see more cats");catcounter++;bre
		ak;
		case 9:
		alert("More cats? More cats!");catcounter++;break;
		case 10:
		alert("Wow you really love cats!");catcounter++;break;
		case 11:alert("Everyone should have a cat!");catcounter++;break;
		case 12:alert("In ancient Egypt, they worshipped cats.");catcounter++;break;
	};
};




//onload----------------------------------------------------------------
//this function runs x times of makebutton function
//make button creates a button with array name x as the data-name, and class
looper(5, makebutton);