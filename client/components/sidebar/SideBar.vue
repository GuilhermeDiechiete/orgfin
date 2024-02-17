<template>

<div class="sidebar">
        <ul>
            <li><a href="#">Página 1</a></li>
            <li><a href="#">Página 2</a></li>
            <li><a href="#">Página 3</a></li>
            <li><a href="#">Página 4</a></li>
        </ul>
    </div>

</template>

<style>
body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.sidebar {
    height: 100%;
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #333;
    padding-top: 20px;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.sidebar ul li {
    padding: 8px 16px;
}

.sidebar ul li a {
    text-decoration: none;
    color: white;
    display: block;
}

.sidebar ul li a:hover {
    background-color: #555;
}

.content {
    margin-left: 200px;
    padding: 20px;
}


</style>