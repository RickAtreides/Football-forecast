var ZenitPlayers = [
						{ id : 1, num:  16, name: '�������� ��������',  orign: '������',     amplua: '�������' },
						{ id : 2, num:  22, name: '������� �������',    orign: '������',     amplua: '�������' }, 
						{ id : 3, num:  30, name: '���� ������',        orign: '��������',   amplua: '�������' },
						{ id : 4, num:  2,  name: '��������� ������',   orign: '������',     amplua: '��������' }, 
						{ id : 5, num:  3,  name: '����� �����',        orign: '����������', amplua: '��������' }, 
						{ id : 6, num:  4,  name: '�������� �������',   orign: '������',     amplua: '��������' }, 
						{ id : 7, num:  6,  name: '������� ��������',   orign: '�������',    amplua: '��������' }, 
						{ id : 8, num:  14, name: '����� �������',      orign: '��������',   amplua: '��������' }, 
						{ id : 9, num:  24, name: '���������� �������', orign: '������',     amplua: '��������' }, 
						{ id : 10, num: 28, name: '������� ����',       orign: '�����',      amplua: '��������' }, 
						{ id : 11, num: 50, name: '����� ��������',     orign: '������',     amplua: '��������' }, 
						{ id : 12, num: 10, name: '������ �����',       orign: '����������', amplua: '������������' }, 
						{ id : 13, num: 15, name: '����� �������',      orign: '������',     amplua: '������������' }, 
						{ id : 14, num: 17, name: '���������� ������',  orign: '������',     amplua: '������������' }, 
						{ id : 15, num: 18, name: '���������� �������', orign: '������',     amplua: '������������' }, 
						{ id : 16, num: 20, name: '������ ��������',    orign: '������',     amplua: '������������' }, 
						{ id : 17, num: 25, name: '������ �����',       orign: '������',     amplua: '������������' }, 
						{ id : 18, num: 27, name: '����� �������',      orign: '������',     amplua: '������������' }, 
						{ id : 19, num: 34, name: '�������� �������',   orign: '������',     amplua: '������������' }, 
						{ id : 20, num: 8,  name: '����� �������',      orign: '������',     amplua: '����������' }, 
						{ id : 21, num: 9,  name: '��������� �������',  orign: '������',     amplua: '����������' }, 
						{ id : 22, num: 11, name: '��������� ��������', orign: '������',     amplua: '����������' }, 
						{ id : 23, num: 77, name: '���� ����������',    orign: '����������', amplua: '����������' }, 
						{ id : 24, num: 99, name: '������ ����������',  orign: '������',     amplua: '����������' }
					];

var ManagerTeams = [
						{ id : 1, name : '���������' },
						{ id : 2, name : '������� �����' },
						{ id : 3, name : '�������' },
						{ id : 4, name : '�����������' },
						{ id : 5, name : '����������' }
					];
					

var ZenitGames = [
					{ id : 1, name : '�����', type : 'H', date : '21.07.2012' },
					{ id : 2, name : '������', type : 'H', date : '28.07.2012' },
					{ id : 3, name : '����', type : 'A', date : '04.08.2012' },
					{ id : 4, name : '�������', type : 'H', date : '11.08.2012' }
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