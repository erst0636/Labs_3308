/*
	players is an array to hold each player's information.
	Fields:
		name - Football player's name
		img  - The relative/absolute path to the image file.
		alt  - The alternative text that describes the image.
		year - The student's year in college (Freshman, Sophomore, Junior, Senior).
		major- The student's current college major.
		games_played    - The number of football games the student has played for the Buffs.
		pass_yards      - The total number of passing yards in the student's football career for the Buffs.
		rushing_yards   - The total number of rushing yards in the student's football career for the Buffs.
		receiving_yards - The total number of receiving yards in the student's football career for the Buffs.
*/
var players = [{name:"John Doe", img: "../resources/img/player1.jpg", alt:"Image of Player 1", year:"Sophomore", major:"Art", games_played: 23, pass_yards: 435, rushing_yards: 200, receiving_yards: 88},
				{name:"James Smith", img: "../resources/img/player2.jpg", alt:"Image of Player 2", year:"Junior", major:"Science", games_played: 17, pass_yards: 192, rushing_yards: 102, receiving_yards: 344},
				{name:"Samuel Phillips", img: "../resources/img/player3.jpg", alt:"Image of Player 3", year:"Freshman", major:"Math", games_played: 8, pass_yards: 35, rushing_yards: 70, receiving_yards: 98},
				{name:"Robert Myers", img: "../resources/img/player4.jpg", alt:"Image of Player 4", year:"Senior", major:"Computer Science", games_played: 31, pass_yards: 802, rushing_yards: 375, receiving_yards: 128}];


/*
	Registration Page:
		viewStudentStats(id, toggle) method
			parameters:
				id - The css id of the html tag being updated.
				toggle -
					0 - hide the html tag
					1 - make the html tag visible

			purpose: This method will accept the id of an html tag and a toggle value.
					 The method will then set the html tag's css visibility and height.
					 To hide the html tag (toggle - 0), the visibility will be set to hidden and
					 the height will be set to 0.
					 To reveal the html tag (toggle - 1), the visibility will be set to visible and
					 the height will be set to auto.
*/
		function viewStudentStats(id, toggle){
			if (toggle == 0){ //Changes stat style if toggle is 0
				document.getElementById(id).style.visibility = "hidden";
				document.getElementById(id).style.height = "0";
			}
			else if (toggle == 1) { //Changes stat style if toggle is 1
				document.getElementById(id).style.visibility = "visible";
				document.getElementById(id).style.height = "auto";
			}
		}
/*
	Home Page:
		changeColor(color) method
			parameter:
				color- A css color

			purpose: This method will set the html body's background color to the
					 provided parameter.
*/
		function changeColor(color){
			document.body.style.background = color; // Changes color of bg
		}

/*
	Football Season Stats Page:
		loadStatsPage method:
			parameters: none

			purpose: This method will iterate through the stats table and
					 do the following:
						1. Read through each row of the table & determine which team won
						   the game.

						2. Update the winner column to the name of the winning team.

						3. Keep track of the number of wins/losses for the Buffs.

						4. Update the second table to show the total number of wins/losses for the Buffs.
*/
		function loadStatsPage(){
			//constants
			var startTable  = 2; // value for the start of the table
			var oppTeamName = 1; // Index of Opposing teams name
			var homeScore = 2;	 // Index of home score
			var oppScore = 3; 	 // Index of away score
			var winnerIndex = 4; // Index of winner box
			var wins = 0; //Keeping track of Buff wins
			var total = 0; //Keeping track of total games

			var table = document.getElementById("stats_table");
			 for (i = startTable; i < table.rows.length; i++) { // Loops through rows
					 var cols = table.rows.item(i).cells; // Sets variable for info in row
					 //Values to be compared
					 var oppName = cols.item(oppTeamName).innerHTML; // Opposing team name
					 var home = parseInt( cols.item(homeScore).innerHTML); // Home team score
					 var opp = parseInt(cols.item(oppScore).innerHTML); // Opposing team score

					 if (opp > home){ //Opponents win
						 cols.item(winnerIndex).innerHTML = oppName;
					 }
					 else if (home > opp){ // Buffs win
						 cols.item(winnerIndex).innerHTML = "CU Boulder";
						 wins++;
					 }
					 else{ // Its a tie
						 cols.item(winnerIndex).innerHTML = "Tie";
					 }
					 total++;
				}
				// populating W/L table with wins and losses data
				var column = document.getElementById("wins");
				column.innerHTML = wins;
				var column = document.getElementById("losses");
				column.innerHTML = total-wins;
		  } // End of loadStatsPage

/*
	Football Player Information Page
		loadPlayersPage method:
			parameters: none

			purpose: This method will populate the dropdown menu to allow the
					 user to select which player's information to view.

					 To handle this, you will need to iterate through the players array
					 and do the following for each player:
						1. Create an anchor tag
						2. Set the href to "#", this will make sure the
							anchor tag doesn't change pages
						3. Set the onclick to call switchPlayers method
							(this will need to pass in the index inside the players array)
						4. Set the anchor tag's text to the player's name.

					After setting all of the anchor tags, update the innerHTML of the dropdown menu.
					As a note, the id for the dropdown menu is player_selector.

		switchPlayers(playerNum) method:
			parameters:
				playerNum - The index of the football player in the players array.

			purpose:
				This method will update the the spans on the player's information pageX
				and calculate the average passing, rushing, and receiving yards.

				Span ids:
					p_year     - the player's year in college
					p_major    - the player's major in college
					g_played   - the number of games played for Buffs
					player_img - the player's photo (must set src and alt)
					p_yards    - the number of passing yards
					r_yards    - the number of rushing yards
					rec_yards  - the number of receiving yards

					Calculated values:
					  avg_p_yards   - the average number of passing yards for the player's Buff career
					  avg_r_yards   - the average number of rushing yards for the player's Buff career
					  avg_rec_yards - the average number of receiving yards for the player's Buff career
*/
			function loadPlayersPage(){
					var dropMenu = document.getElementById("player_selector");

					for (var i = 0; i<players.length; i++){
						var playerAnchor = document.createElement('a');
						var space = document.createElement('br');
						var selectorStr = "switchPlayers(" + i + ")";
						console.log(selectorStr);
						playerAnchor.setAttribute('href', '#');
						playerAnchor.setAttribute('onclick', selectorStr);
						playerAnchor.textContent = players[i].name;
						dropMenu.appendChild(playerAnchor);

						dropMenu.appendChild(space); //Space in between names
					} // End for loop
			} // End loadPlayersPage function
			// Creates <a href="#" onclick="switchPlayers(0)">John Doe</a> tag in the html file for example
			function switchPlayers(playerNum){
				var playerInfo = players[playerNum];

				document.getElementById("player_img").src = playerInfo.img;
				document.getElementById("p_year").innerHTML = playerInfo.year;
				document.getElementById("p_major").innerHTML = playerInfo.major;
				document.getElementById("g_played").innerHTML = playerInfo.games_played;
				document.getElementById("p_yards").innerHTML = playerInfo.pass_yards;
				document.getElementById("avg_p_yards").innerHTML = Math.floor((playerInfo.pass_yards / playerInfo.games_played));
				document.getElementById("r_yards").innerHTML = playerInfo.rushing_yards;
				document.getElementById("avg_r_yards").innerHTML = Math.floor((playerInfo.rushing_yards / playerInfo.games_played));
				document.getElementById("rec_yards").innerHTML = playerInfo.receiving_yards;
				document.getElementById("avg_rec_yards").innerHTML = Math.floor((playerInfo.receiving_yards / playerInfo.games_played));
			} // End of switchPlayers function
