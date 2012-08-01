<?php

include ("lib/openapi.php");
$vk = new Auth_Vkontakte();
$vk_auth = $vk->is_auth();

define ('SOCCER_DB_PATH', 'champ.s3db');


if ($vk_auth === false) {

	echo '<div style="text-align:center">'. ($vk->render_login_form() ). '</div>';

}
else {
	// Здесь проверяем, зарегистирован ли у вас пользователь с таким VK_ID, в случае, если зарегистирован - перекидываем его на главную
	// Если не зарегистирован - надо показать ему упрощенную форму регистрации
	//header ('Location: /soccer/index.php');

	$db = new SQLite3(SOCCER_DB_PATH);

	$stmt = $db->prepare('SELECT * FROM ManagerTeams WHERE authId=:id');
	$stmt->bindValue(':id', $vk_auth, SQLITE3_INTEGER);

	$result = $stmt->execute();
	$row = $result->fetchArray();
	if ($row['authId'] != $vk_auth) {
		echo "Auth error. User not registred.";
		exit();
	}

	$time = time();
	if (!empty($row['sessionId']) &&  ($time < $vk->cookie_data['expire']) ) {
		// Ok, session is active
	} else {
		// Renew session
		$stmt = $db->prepare("UPDATE ManagerTeams SET sessionId = :sid, logonTime = datetime(  :time, 'unixepoch' ) WHERE authId = :id");
		$stmt->bindValue(':id', $vk_auth, SQLITE3_INTEGER);
		$stmt->bindValue(':sid', $vk->cookie_data['sid'], SQLITE3_TEXT);
		$stmt->bindValue(':time', $time, SQLITE3_INTEGER);
		$result = $stmt->execute();
	}


	echo "User : $vk_auth, Team : ".($row['Name']).'. <a href="/soccer/logout.php">logout</a>';

	// Далее обрабатывем комманды пользователя
}
