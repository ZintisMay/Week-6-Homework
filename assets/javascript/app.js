// variables---------------------------------------------------
var animalArray = [
"Siamese Cat", 
"Housecat", 
"Lion", 
"Tiger",
"Leopard", 
"Cheetah", 
"Bobcat", 
"Puma", 
"Mountain Lion", 
"Serval", 
"Sphinx Cat", 
"Tuxedo Cat", 
"Lolcat", 
"Nyancat", 
"Longcat", 
"Grumpycat"];
var catcounter = 1;

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

//cats joke code
function ilovecats(){

	switch(catcounter){
		case 1:
		writenewanimal("I'm so glad cats are you favorite animal!");catcounter++;break;
		case 2:
		writenewanimal("Cats are my favorite animal too!");catcounter++;break;
		case 3:
		writenewanimal("More cats? Absolutely");catcounter++;break;
		case 4:
		writenewanimal("I've never heard of that type of cat, so here are some other cats!");catcounter++;break;
		case 5:
		writenewanimal("It seems you misspelled cat again...");catcounter++;break;
		case 6:
		writenewanimal("It's C A T, try and type is correctly next time.");catcounter++;break;
		case 7:
		writenewanimal("C... A... T...");catcounter++;break;
		case 8:
		writenewanimal("There you go, for a second there I thought you didn't want to see more cats");catcounter++;break;
		case 9:
		writenewanimal("More cats? More cats!");catcounter++;break;
		case 10:
		writenewanimal("Wow you really love cats!");catcounter++;break;
		case 11:writenewanimal("Everyone should have a cat!");catcounter++;break;
		case 12:writenewanimal("In ancient Egypt, they worshipped cats.");catcounter = 1;break;
	};
};

//writes the ilovecats functions out
function writenewanimal(x){

	$('#writenewanimal').html(x)
}



//main methods----------------------------------------------------



//populates the gifs, gives them attributes
$(document.body).on('click', '.populate', function() {
//changes the comment
	ilovecats();
//clears the gif area
	$('#animals').empty()
//sets the new animal search
	var target = $(this).data('name');
//sets how many gifs to search for
	var limiter = $('#howmany option:selected').val();
//builds the query URL
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + target + "&api_key=dc6zaTOxFJmzC&limit=" + limiter;
//ajax call
		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
//sets results var to hold the data
			var results = response.data;
//loop to cycle through each response.data entry
			for (var i = 0; i < results.length; i++){
//make a div to hold the info, give it a class to be identified, float it left, put it in animals div field
				var dv = $('<div>')
				dv.addClass('animalnumber' + [i]);
				dv.addClass('floater');
				$('#animals').append(dv);
//makes a paragraph
				var p = $('<p>');
//finds image rating
				var rating = results[i].rating.toUpperCase();
//catch empty ratings
				if (rating == ""){rating = "None";}
//set rating
				p.text("Rating: " + rating);
//appends the paragraph to the div in the gif area
				$('.animalnumber' + [i]).append(p);

//make an image
				var newimage = $('<img>');
//add some identifier classes
				newimage.addClass('moveStill');
				newimage.data('status', 'still');
//give it the image data
				newimage.data('move', results[i].images.fixed_height.url);
				newimage.data('still', results[i].images.fixed_height_still.url);
				newimage.attr('src', results[i].images.fixed_height_still.url);
//append the image to the gif div in the gif area
				$('.animalnumber' + [i]).append(newimage);
			}
		});

	return false;
});



//main method, ajax on animal click-----------------------------------------

$('#submit').on('click', function(){

	/////////////////////I had some code here while working out the jquery, but it became redundant later on.////////////////////////////////////////////

	// //looks at text value, pulls it and assigns
	// var animal = $('#newanimal').val();
	// if (animal == ""){animal = "Cat"};

	// //sets text value to nothing
	// $('#newanimal').val("");


	// //does a lookup for that animal
	// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10"


	// $.ajax({url: queryURL, method: 'GET'}).done(function(response){

	// 	var results = response.data;

		makebutton(animal);

	// });

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




//onload----------------------------------------------------------------
//this function runs x times of makebutton function
//make button creates a button with array name x as the data-name, and class
looper(animalArray.length, makebutton);