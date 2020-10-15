function regex() {

    console.log("fjdkas");

    var password = document.getElementById('passwordRegister').value;
    /*var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");*/
    var httpr=new XMLHttpRequest();
    httpr.open("POST")
    if (strongRegex.test(password)){
      console.log("Password: strong");
      var firstName = document.getElementById("firstName").value
      var lastName = document.getElementById("lastName").value
      var email = document.getElementById("email").value
      var password = document.getElementById("password").value

      
      
          }
    else{
      console.log("Password: weak");
      window.alert("Password invalid . It must contain a least 1 uppercase 1, 1 lowercase letter, a number , a special caracter, and be at least 8 caracters long."); 
    }
  }


  function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
  }