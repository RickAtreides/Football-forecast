var ZenitPlayers = [
						{ id : 1, num:  16, name: 'Вячеслав Малафеев',  orign: 'Россия',     amplua: 'Вратарь' },
						{ id : 2, num:  22, name: 'Дмитрий Бородин',    orign: 'Россия',     amplua: 'Вратарь' }, 
						{ id : 3, num:  30, name: 'Юрий Жевнов',        orign: 'Беларусь',   amplua: 'Вратарь' },
						{ id : 4, num:  2,  name: 'Александр Анюков',   orign: 'Россия',     amplua: 'Защитник' }, 
						{ id : 5, num:  3,  name: 'Бруну Алвеш',        orign: 'Португалия', amplua: 'Защитник' }, 
						{ id : 6, num:  4,  name: 'Доменико Кришито',   orign: 'Италия',     amplua: 'Защитник' }, 
						{ id : 7, num:  6,  name: 'Николас Ломбертс',   orign: 'Бельгия',    amplua: 'Защитник' }, 
						{ id : 8, num:  14, name: 'Томаш Губочан',      orign: 'Словакия',   amplua: 'Защитник' }, 
						{ id : 9, num:  24, name: 'Александар Лукович', orign: 'Сербия',     amplua: 'Защитник' }, 
						{ id : 10, num: 28, name: 'Микаэль Лумб',       orign: 'Дания',      amplua: 'Защитник' }, 
						{ id : 11, num: 50, name: 'Игорь Чеминава',     orign: 'Россия',     amplua: 'Защитник' }, 
						{ id : 12, num: 10, name: 'Мигель Данни',       orign: 'Португалия', amplua: 'Полузащитник' }, 
						{ id : 13, num: 15, name: 'Роман Широков',      orign: 'Россия',     amplua: 'Полузащитник' }, 
						{ id : 14, num: 17, name: 'Алессандро Розина',  orign: 'Италия',     amplua: 'Полузащитник' }, 
						{ id : 15, num: 18, name: 'Константин Зырянов', orign: 'Россия',     amplua: 'Полузащитник' }, 
						{ id : 16, num: 20, name: 'Виктор Файзулин',    orign: 'Россия',     amplua: 'Полузащитник' }, 
						{ id : 17, num: 25, name: 'Сергей Семак',       orign: 'Россия',     amplua: 'Полузащитник' }, 
						{ id : 18, num: 27, name: 'Игорь Денисов',      orign: 'Россия',     amplua: 'Полузащитник' }, 
						{ id : 19, num: 34, name: 'Владимир Быстров',   orign: 'Россия',     amplua: 'Полузащитник' }, 
						{ id : 20, num: 8,  name: 'Данко Лазович',      orign: 'Сербия',     amplua: 'Нападающий' }, 
						{ id : 21, num: 9,  name: 'Александр Бухаров',  orign: 'Россия',     amplua: 'Нападающий' }, 
						{ id : 22, num: 11, name: 'Александр Кержаков', orign: 'Россия',     amplua: 'Нападающий' }, 
						{ id : 23, num: 77, name: 'Лука Джорджевич',    orign: 'Черногория', amplua: 'Нападающий' }, 
						{ id : 24, num: 99, name: 'Максим Канунников',  orign: 'Россия',     amplua: 'Нападающий' }
					];

var ManagerTeams = [
						{ id : 1, name : 'Хозяиновы' },
						{ id : 2, name : 'Виталик Шимко' },
						{ id : 3, name : 'Нефдовы' },
						{ id : 4, name : 'Бесядовские' },
						{ id : 5, name : 'Сибиряковы' }
					];
					

var ZenitGames = [
					{ id : 1, name : 'Амкар', type : 'H', date : '21.07.2012' },
					{ id : 2, name : 'Динамо', type : 'H', date : '28.07.2012' },
					{ id : 3, name : 'ЦСКА', type : 'A', date : '04.08.2012' },
					{ id : 4, name : 'Спартак', type : 'H', date : '11.08.2012' }
				];
				
				
				

/*
Bet = { 
		teamId,
		accept,
		score : array [ playerid, playerid, playerid ]
	  }
	  
Game : Array of Bet

Seazon : Array of Game (id -> gameid)

var Seazon = [
						[ { teamid : 1, accept : 2, score : [ 22, 6, 22 ] },  { teamid : 2, accept : 0, score : [ 6, 22 ] } ],
				];
				
				
Result = {
			accept : int
			score : array [ playerid, playerid, ...]
		}
		
Results Array of Result (id -> gameid)		
				
var Results = [
				];

Bet = { teamId : 1,
		accept : 0,
		score : [ 22, 22 ]
	  }
*/
					
function Get1X2Score(Bet, Result) {
	var res = Result.accept - Result.score.length == 0 ? 0 : (Result.accept - Result.score.length) / Math.abs(Result.accept - Result.score.length);
	var bet = Bet.accept - Bet.score.length == 0 ? 0 : (Bet.accept - Bet.score.length) / Math.abs(Bet.accept - Bet.score.length);
	if (res == bet) {
		return 1;
	}
	return 0;
}

fnction GetExactScore(Bet, Result) {
	return (Bet.accept == Result.accept && Bet.score.length == Result.score.length) ? 2 : 0;
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
	for (i = 0; i < a.length; i++) {
		if (c.indexOf(a[i]) > -1) {
			res.push(a[i]);
			c.splice(c.indexOf(a[i]), 1);
		}
	}
	return res;
}

function GetPlayersScore(Bet, Result) {
	return getIntersection(Bet.score, Result.score).length * 0.5;
}