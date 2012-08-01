 <?php
 	// auth complete
	// session_start()
	// store session_id to db
	
	// on request, validate session_id and time expiration
	// get authid from db
	// else return { status : 403 }
 
	$db_link = new SQLite3('C:\Users\rbesyad1\Documents\soccer\champ.s3db');
	$db_res = $db_link->query( 'SELECT * FROM ManagerTeams'  );

	while ($row = $db_res->fetchArray(SQLITE3_ASSOC)) {
		foreach ($row as $key => $value) {
			echo "$key --> $value\n";
		}
	}	
?> 