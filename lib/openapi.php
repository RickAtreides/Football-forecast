<?php

define ('VK_APP_ID', 'vk_app_3055016');
define ('VK_APP_PASSWORD', 'VVd3W35yqmyPvrKwSTxz');

class Auth_Vkontakte {

	public $cookie_data = array();

	/**
	* Проверяет, залогинен пользователь. Если да - возвращает его ID ВКонтакте, в противном случае - false.
	*/
	public function is_auth() {
		if (!isset($_COOKIE[VK_APP_ID]))
			return false;

		$vk_cookie = $_COOKIE[VK_APP_ID];

		if (!empty($vk_cookie)) {
			foreach (explode('&', $vk_cookie) as $item) {
				$item_data = explode('=', $item);
				$this->cookie_data[$item_data[0]] = $item_data[1];
			}

			// Проверяем sig
			$string = sprintf("expire=%smid=%ssecret=%ssid=%s%s", $this->cookie_data['expire'], $this->cookie_data['mid'],
									      $this->cookie_data['secret'], $this->cookie_data['sid'], VK_APP_PASSWORD);

			if (md5($string) == $this->cookie_data['sig']) {
				// sig не подделан - возвращаем ID пользователя ВКонтакте.
				return $this->cookie_data['mid'];
			}
		}

		return false;
	}

	/**
	* Производит разлогинивание
	*/
	public function logout() {

		// Заменяем куку от ВКонтакте на пустую
		if (setcookie(VK_APP_ID, '', 0, "/", '.'.$_SERVER['HTTP_HOST'])) {
			return true;
		}

		return false;
	}



	/**
	* Возвращает HTML со всеми необходимыми скриптами
	*/
	public function render_login_form() {
		return <<< LOGINFORM
<div id="vk_api_transport"></div>
<div id="vk_login" onclick="doLogin()"></div>
<script src="http://vkontakte.ru/js/api/openapi.js" type="text/javascript" charset="windows-1251"></script>
<script type="text/javascript">
	window.vkAsyncInit = function() {
		VK.init({
			apiId: 3055016,
			nameTransportPath: '/xd_receiver.htm'
		});

		VK.UI.button('vk_login');
	};

	(function() {
		var el = document.createElement("script");
		el.type = "text/javascript";
		el.charset = "windows-1251";
		el.src = "http://vkontakte.ru/js/api/openapi.js";
		el.async = true;
		document.getElementById("vk_api_transport").appendChild(el);
	}());

function doLogin() {
  VK.Auth.login(afterLogin);
}

function afterLogin (response) {
	window.location = '/soccer/index.php';
}

</script>
LOGINFORM;
	}
}

?>