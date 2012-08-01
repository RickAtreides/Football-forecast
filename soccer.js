
/*
Bet = { 
		teamId,
		GoalAccepted,
		GoalScored : array [ playerid, playerid, playerid ]
	  }
	  
Game : Array of Bet

Seazon : Array of Game (id -> gameid)

var Seazon = [
						[ { teamid : 1, GoalAccepted : 2, GoalScored : [ 22, 6, 22 ] },  { teamid : 2, GoalAccepted : 0, GoalScored : [ 6, 22 ] } ],
				];
				
				
Result = {
			GoalAccepted : int
			GoalScored : array [ playerid, playerid, ...]
		}
		
Results Array of Result (id -> gameid)		
				
var Results = [
				];
*/

var res =  {"status":0,"results":[{"action":"getteams","status":0,"results":[{"id":"1","Name":"Хозяиновы","authId":"","sessionId":"","logonTime":""},{"id":"2","Name":"Виталик Шимко","authId":"","sessionId":"","logonTime":""},{"id":"3","Name":"Нефёдовы","authId":"","sessionId":"","logonTime":""},{"id":"4","Name":"Бесядовские","authId":"","sessionId":"","logonTime":""},{"id":"5","Name":"Сибиряковы","authId":"","sessionId":"","logonTime":""}]}]};
res =   {"status":0,"results":[{"action":"getteams","status":0,"results":[{"id":"1","Name":"Хозяиновы","authId":"","sessionId":"","logonTime":""},{"id":"2","Name":"Виталик Шимко","authId":"","sessionId":"","logonTime":""},{"id":"3","Name":"Нефёдовы","authId":"","sessionId":"","logonTime":""},{"id":"4","Name":"Бесядовские","authId":"","sessionId":"","logonTime":""},{"id":"5","Name":"Сибиряковы","authId":"","sessionId":"","logonTime":""}]},{"action":"getbets","status":0,"results":[{"id":"1","Season":"2012\/2013","Tour":"1","Team":"4","GoalAccepted":"1","GoalScored":["22","22","22"]},{"id":"2","Season":"2012\/2013","Tour":"1","Team":"5","GoalAccepted":"0","GoalScored":["22","6"]},{"id":"3","Season":"2012\/2013","Tour":"2","Team":"4","GoalAccepted":"0","GoalScored":["22"]},{"id":"4","Season":"2012\/2013","Tour":"2","Team":"5","GoalAccepted":"0","GoalScored":["22","22"]}]},{"action":"getresults","status":0,"results":[{"id":"1","Season":"2012\/2013","Tour":"1","GameTime":"2012-07-22 15:00:00","Opponent":"Амкар","HomeAway":"H","GoalAccepted":"0","GoalScored":["22","22"]},{"id":"2","Season":"2012\/2013","Tour":"2","GameTime":"2012-07-28 13:30:00","Opponent":"Динамо","HomeAway":"H","GoalAccepted":"0","GoalScored":["22","6"]}]}]} ;


Bet = { teamId : 1,
		GoalAccepted : 0,
		GoalScored : [ 22, 22 ]
	  };

				
// Угадали исход
function GetScore1X2(Bet, Result) {
	var res = Result.GoalAccepted - Result.GoalScored.length == 0 ? 0 : (Result.GoalAccepted - Result.GoalScored.length) / Math.abs(Result.GoalAccepted - Result.GoalScored.length);
	var bet = Bet.GoalAccepted - Bet.GoalScored.length == 0 ? 0 : (Bet.GoalAccepted - Bet.GoalScored.length) / Math.abs(Bet.GoalAccepted - Bet.GoalScored.length);
	if (res == bet) {
		return 1;
	}
	return 0;
};

// Угадали счёт
function GetScoreExactGoals(Bet, Result) {
	return (Bet.GoalAccepted == Result.GoalAccepted && Bet.GoalScored.length == Result.GoalScored.length) ? 2 : 0;
}

// Угадали всё
function GetScoreExactProvision(Bet, Result) {
	return (Bet.GoalAccepted == Result.GoalAccepted && (getIntersection(Bet.GoalScored, Result.GoalScored).length == Result.GoalScored.length)) ? 5 : 0;
}


if (!Array.prototype.indexOf) {  
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {  
		"use strict";  
		if (this == null) {  
			throw new TypeError();  
		}  
		var t = Object(this);  
		var len = t.length >>> 0;  
		if (len === 0) {  
			return -1;  
		}  
		var n = 0;  
		if (arguments.length > 0) {  
			n = Number(arguments[1]);  
			if (n != n) { // shortcut for verifying if it's NaN  
				n = 0;  
			} else if (n != 0 && n != Infinity && n != -Infinity) {  
				n = (n > 0 || -1) * Math.floor(Math.abs(n));  
			}  
		}  
		if (n >= len) {  
			return -1;  
		}  
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);  
		for (; k < len; k++) {  
			if (k in t && t[k] === searchElement) {  
				return k;  
			}  
		}  
		return -1;  
	}  
}  

// Find elements in array, that present in specified array, with duplicates support
function getIntersection(a, b) {
	var c = b.slice();
	var res = Array();
	var i;
	for (i = 0; i < a.length; i++) {
		if (c.indexOf(a[i]) > -1) {
			res.push(a[i]);
			c.splice(c.indexOf(a[i]), 1);
		}
	}
	return res;
}

// Угадали забивших
function GetPlayersGoalScored(Bet, Result) {
	return getIntersection(Bet.GoalScored, Result.GoalScored).length * 0.5;
}