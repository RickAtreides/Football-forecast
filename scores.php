<?php
	// on request, validate session_id and time expiration
	// get authid from db
	// else return { status : 403 }
 
	// request { action : 'getbets', season : '2012/2013' }
	//         { action : 'getresults', season : '2012/2013' }

//	$db = new SQLite3('C:\Users\rbesyad1\Documents\soccer\champ.s3db');
	$db = new SQLite3('champ.s3db');
	
	// get bets
	//$stmt = $db->prepare("SELECT * FROM Bets Where Season = :season");

	// getresults

	//$request = '{ "requests" : [ { "action" : "getteams" }, { "action" : "getbets", "season" : "2012/2013" }, { "action" : "getresults", "season" : "2012/2013" } ] }';
	//$request = '{ "requests" : [ { "action" : "getteams" } ] }';
	
	// Get raw POST data
	$request = file_get_contents('php://input');
	$req = json_decode( $request );
	
	$JSON = [ 'status' => 0, 'results' => Array() ];
	
	foreach ($req->requests as $id => $action) {
		if ($action->action == 'getbets') {
			$t = getBets($db, $action->season);
			array_push ( $JSON['results'], [ 'action' => $action->action, 'status' => 0, 'results' => $t ] );
		} else if ($action->action == 'getresults') {
			$t = getResults($db, $action->season);
			array_push ( $JSON['results'], [ 'action' => $action->action, 'status' => 0, 'results' => $t ] );
		} else if ($action->action == 'getchamp') {
			$t = getChampionat($db, $action->season);
			array_push ( $JSON['results'], [ 'action' => $action->action, 'status' => 0, 'results' => $t ] );
		} else if ($action->action == 'getteams') {
			$t = getTeams($db);
			array_push ( $JSON['results'], [ 'action' => $action->action, 'status' => 0, 'results' => $t ] );
		} else if ($action->action == 'getplayers') {
			$t = getPlayers($db);
			array_push ( $JSON['results'], [ 'action' => $action->action, 'status' => 0, 'results' => $t ] );
		} else if ($action->action == 'setbet') {
			$t = setBet($db, $action->bet);
			array_push ( $JSON['results'], [ 'action' => $action->action, 'status' => 0, 'results' => $t ] );							
		} else {
			array_push ( $JSON['results'], [ 'action' => $action->action, 'status' => 1, 'results' => 'Unknown Action' ] );
		}
	}

	echo json_encode($JSON, JSON_UNESCAPED_UNICODE);
	

	function getTeams($db) {
		$stmt = $db->prepare("SELECT * FROM ManagerTeams");
		$res = $stmt->execute();
		
		$resArray = Array();
		
		while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
			foreach ($row as $k => $v) { $row[$k] =  iconv('windows-1251', 'utf-8', $v); }
			array_push($resArray, $row);
		}	
		
		return $resArray;
	}

	function getPlayers($db) {
		$stmt = $db->prepare("SELECT * FROM ZenitTeam");
		$res = $stmt->execute();
		
		$resArray = Array();
		
		while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
			foreach ($row as $k => $v) { $row[$k] =  iconv('windows-1251', 'utf-8', $v); }
			array_push($resArray, $row);
		}	
		
		return $resArray;
	}
	
	function getBets($db, $season) {
		$stmt = $db->prepare("SELECT * FROM Bets Where Season = :season");

		$season = '2012/2013';
		$stmt->bindValue(':season', $season, SQLITE3_TEXT);
		$res = $stmt->execute();
		
		$resArray = Array();
		
		while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
			foreach ($row as $k => $v) { $row[$k] =  iconv('windows-1251', 'utf-8', $v); if ($k == 'GoalScored') { $row[$k] = explode(';', $row[$k]); } }
			array_push($resArray, $row);
		}	
		
		return $resArray;
	}

	function getResults($db, $season) {
		$stmt = $db->prepare("SELECT * FROM Championat Where Season = :season AND GoalScored IS NOT NULL;");

		$season = '2012/2013';
		$stmt->bindValue(':season', $season, SQLITE3_TEXT);
		$res = $stmt->execute();
		
		$resArray = Array();
		
		while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
			foreach ($row as $k => $v) { $row[$k] =  iconv('windows-1251', 'utf-8', $v); if ($k == 'GoalScored' && $row[$k] != "") { $row[$k] = explode(';', $row[$k]); } }
			array_push($resArray, $row);
		}	
		
		return $resArray;
	}
	
	function getChampionat($db, $season) {
		$stmt = $db->prepare("SELECT * FROM Championat Where Season = :season;");

		$season = '2012/2013';
		$stmt->bindValue(':season', $season, SQLITE3_TEXT);
		$res = $stmt->execute();
		
		$resArray = Array();
		
		while ($row = $res->fetchArray(SQLITE3_ASSOC)) {
			foreach ($row as $k => $v) { $row[$k] =  iconv('windows-1251', 'utf-8', $v); if ($k == 'GoalScored') { $row[$k] = explode(';', $row[$k]); } }
			array_push($resArray, $row);
		}	
		
		return $resArray;
	}
	
	function setBet($db, $bet) {
		$goals = join(";", $bet->GoalScored);
		if ($bet->type == 'bet') {
			if ($bet->id == 0) {
				$stmt = $db->prepare("INSERT INTO Bets Values (null, :season, :tour, :team, :goalAccepted, :goalScored);");
				$stmt->bindValue(':season', $bet->season, SQLITE3_TEXT);
				$stmt->bindValue(':tour', $bet->Tour, SQLITE3_INTEGER);
				$stmt->bindValue(':team', $bet->Team, SQLITE3_INTEGER);
			} else {
				$stmt = $db->prepare("UPDATE Bets SET GoalAccepted = :goalAccepted, GoalScored = :goalScored WHERE id = :id;");
				$stmt->bindValue(':id', $bet->id, SQLITE3_INTEGER);
			}
			$stmt->bindValue(':goalAccepted', $bet->GoalAccepted, SQLITE3_INTEGER);
			$stmt->bindValue(':goalScored', $goals, SQLITE3_TEXT);

			$res = $stmt->execute();
			if (!$res) {
				return "Bet Error : " + $db->lastErrorMsg();
			} else {
				if ($bet->id == 0) {
					return "Bet inserted : " + $db->lastInsertRowID();
				} else {
					return "Bet updated";
				}
			}
		} else if ($bet->type == 'result') {
			$stmt = $db->prepare("UPDATE Championat SET GoalAccepted = :goalAccepted, GoalScored = :goalScored WHERE id = :id;");
			$stmt->bindValue(':id', $bet->id, SQLITE3_INTEGER);
			$stmt->bindValue(':goalAccepted', $bet->GoalAccepted, SQLITE3_INTEGER);
			$stmt->bindValue(':goalScored', $goals, SQLITE3_TEXT);

			$res = $stmt->execute();
			if (!$res) {
				return "Result Error : " + $db->lastErrorMsg();
			} else {
				return "Result updated";
			}
		} 
	}
?> 