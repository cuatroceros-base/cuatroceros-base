function addDrink (id, price) {
  document.getElementById(id).innerHTML = parseInt( document.getElementById(id).innerHTML) + 1
  document.getElementById('hidden_' + id).setAttribute('value', parseInt( document.getElementById('hidden_' + id).getAttribute('value')) + 1)
  addToTotalPrice(price)
}
function removeDrink (id, price) {
  if(parseInt( document.getElementById(id).innerHTML)) {
    document.getElementById(id).innerHTML = parseInt( document.getElementById(id).innerHTML) - 1
    document.getElementById('hidden_' + id).setAttribute('value', parseInt( document.getElementById('hidden_' + id).getAttribute('value')) - 1)
    removeToTotalPrice(price)
  }
}

function addToTotalPrice(price) {
  document.getElementById('total').innerHTML = (parseFloat( document.getElementById('total').innerHTML) + parseFloat(price)).toFixed(2)
}

function removeToTotalPrice(price) {
  document.getElementById('total').innerHTML = (parseFloat( document.getElementById('total').innerHTML) - parseFloat(price)).toFixed(2)
}
