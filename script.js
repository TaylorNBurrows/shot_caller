function doSomething() {
  console.info('DOM loaded');
  var submitButton = document.querySelector("#birthday")
  console.log(submitButton);

  submitButton.addEventListener('click', function () {

    var todayDate = moment().format('YYYY');
    var userBirthday = document.getElementById("bday-input");
    console.log(userBirthday);
    var birthdayValue = userBirthday.value
    var convertBirthday = moment(birthdayValue).format('YYYY');
    console.log(convertBirthday);
    var overAge = parseInt(todayDate) - 21;

    if (overAge > convertBirthday){
      window.location.href = "drink-type.html"
      $("input[type=date]").val("");
    }
    else {
      $("#denied").modal('open');
      $("#age").modal('close');
      $("input[type=date]").val("");
      
    }

  })
}
if (document.readyState === 'loading') {  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', doSomething)
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
}
else {  // DOMContentLoaded has already fired
  doSomething();
}








