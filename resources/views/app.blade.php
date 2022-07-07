<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir='rtl'>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>بازی اسم و فامیل</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v32.102/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
    <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/316/316337.png">

    <style>
        * {
            font-family: Vazirmatn, sans-serif;
        }
    </style>
</head>

<body>
    <div id="game"></div>

    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>