$(document).ready(function() {
  $(".phonebook-add-contact").css("display", "none");

  $(".add-contact").on("click", function() {
    $(".phonebook-add-contact").toggle();
  });

  var getContacts = function() {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/api/contacts.json",
      success: function(data) {
        var contacts = data;
        var items = [];

        $.each(contacts, function(index) {
          var contact = contacts[index];

          items.push("<div class='top10'> <span class='lead name'>" + contact.name + "</span> <br /> <span class='phone'> " + contact.phone + " </span> </div>");
        });

        $(".phonebook-list").html(items);
      },
      error: function(data) {
        alert("error");
      }
    });
  }

  var createContacts = function() {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/contacts",
      data: { 
        // contact: {
        //   name: 
        //   phone: 
        // }
      },
      success: function(data) {
        alert("success");
      },
      error: function(data) {
        alert("error");
      }
    });
  }

  getContacts();
});
