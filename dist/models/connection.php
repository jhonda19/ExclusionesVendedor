<?php

class Connection {
	
	static public function connectSQLWFM() {
		$dsn = "sqlsrv:Server=10.208.254.8;Database=COL_GlobalRoster";
		$user = 'workforce.app';
		$pass = 'WFOnel1nk$2020';
		$conn = new PDO($dsn, $user, $pass);
		$conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		return $conn;
	}

	static public function connectGlobalMeli() {
		$dsn = "sqlsrv:Server=10.208.231.10;Database=APP_GuiaInformativa";
		$user = 'workforce.app';
		$pass = 'WFOnel1nk$2020';
		$conn = new PDO($dsn, $user, $pass);
		$conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		return $conn;
	}

}