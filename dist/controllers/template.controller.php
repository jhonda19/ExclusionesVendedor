<?php

class ControllerTemplate
{
	static public function template()
	{
		include 'views/template.php';
	}

	static public function rutas($val)
	{
		$n = $_SESSION['n'];
		$userViews = [];
		$userViews = explode(",", $_SESSION['pUser' . $n]);

		if ($val === 'a') {
			$page =  $_GET['ruta'];
		} else {
			$page = 'inicio';
		}

		if (in_array($page, $userViews)) {

			include 'views/modules/header.php';
			echo '<div class="container-fluid">';
			if (file_exists('views/modules/' . $page . '.php')) {
				include 'views/modules/' . $page . '.php';
			} else {
				include 'views/modules/404.php';
			}
			echo '</div> <!-- End of Main Content -->
		 		 </div> <!-- End of Content Wrapper -->
		  		</div>';
		} else {
			echo '<script>history.pushState(null, "", "404");</script>';
			include 'views/modules/header.php';
			include 'views/modules/404.php';
		}
	}

	static public function renderContent()
	{
		session_start();
		if (isset($_SESSION['n'])) {
			if (isset($_SESSION['idUser' . $_SESSION['n']]) && $_SESSION['idUser' . $_SESSION['n']] > 0) {
				if (isset($_GET['ruta']) && $_GET['ruta'] != '') {
					$val = 'a';
					$inicio = ControllerTemplate::rutas($val);
				} else {
					$val = 'b';
					$inicio = ControllerTemplate::rutas($val);
				}
			} else {
				echo '<script>history.pushState(null, "", "login");</script>';
				include 'views/modules/login.php';
			}
		} else {
			echo '<script>history.pushState(null, "", "login");</script>';
			include 'views/modules/login.php';
		}
	} //-- End of function
} // End of class