$(document).ready(function() {
  $(".phonebook-add-contact").css("display", "none");

  var toggleAddContact = function() {
    $(".phonebook-add-contact").toggle();
  }
  
  $(".add-contact").on("click", function() {
    toggleAddContact();
  });

  $(".phonebook-create-contact").on("submit", function(event) {
    event.preventDefault();

    var name = $(this).find(".contact-name").val();
    var phone = $(this).find(".contact-phone").val();

    createContact( $(this).attr("action"), name, phone );
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

  var createContact = function(url, name, phone) {
    $.ajax({
      type: "POST",
      url: url,
      data: { 
        contact: {
          name: name,
          phone: phone
        }
      },
      success: function(data) {
        getContacts();
        toggleAddContact();
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
