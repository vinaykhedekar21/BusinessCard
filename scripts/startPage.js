function openSlideMenuLEFT() {
  document.getElementById('side-menu-left').style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenuLEFT() {
  document.getElementById('side-menu-left').style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
}

$( document ).ready(function() {
    openSlideMenuLEFT();
});
