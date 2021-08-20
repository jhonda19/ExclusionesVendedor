<?php

class Connection {
	
	static public function connectSQLRegional($database) {
		$dsn = "sqlsrv:Server=10.205.31.44;Database=".$database."";
		$user = 'edson.romero';
		$pass = 'REds0n*1920';
		$conn = new PDO($dsn, $user, $pass);
		$conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		return $conn;
	}

	static public function connectSQLWFM() {
		$dsn = "sqlsrv:Server=10.208.254.8;Database=COL_GlobalRoster";
		$user = 'workforce.app';
		$pass = 'WFOnel1nk$2020';
		$conn = new PDO($dsn, $user, $pass);
		$conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		return $conn;
	}

	static public function connectGlobalWfm() {
		$dsn = "sqlsrv:Server=10.208.254.8;Database=COL_GlobalWfm";
		$user = 'workforce.app';
		$pass = 'WFOnel1nk$2020';
		$conn = new PDO($dsn, $user, $pass);
		$conn -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		return $conn;
	}

}