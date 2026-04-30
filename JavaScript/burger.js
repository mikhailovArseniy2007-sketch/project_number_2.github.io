document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger-menu").addEventListener("click", function() {
        document.querySelector("header").classList.toggle("open")
    })
}) 