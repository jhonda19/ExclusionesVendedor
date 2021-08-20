<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
        <!-- <base href="/wfm/"> -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Last-Modified" content="0">
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
    <meta http-equiv="Pragma" content="no-cache">

    <link rel="icon" type="image/png" href="./public/img/one.png">
    <title>WFM</title>
    <link href="'../../css/app.css" rel="stylesheet" type="text/css">
    <link href="./js/plugins/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

</head>

<body id="page-top">
    <div class="loader-page"></div>
    <?php
    $renderContent = ControllerTemplate::renderContent();
    ?>
    <script src="js/custom.bundle.js"></script>
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
</body>

</html>

<script>
    $(window).on('load', function() {
        setTimeout(function() {
            $(".loader-page").css({
                visibility: "hidden",
                opacity: "0"
            })
        }, 300);

    });
</script>