$(document).ready(function() {
  $(".phonebook-add-contact").css("display", "none");

  var updateContact = function(url, name, phone) {
    $.ajax({
      type: "PUT",
      url: url,
      data: {
        contact: {
          name: name,
          phone: phone
        }
      },
      success: function(data) {
        getContacts();
      },
      error: function(data) {
        alert("error");
      }
    });   
  }

  var updateContactEvent = function() { 
    $(".update-contact").on("click", function(event) {
      event.preventDefault();
  
      var url = $(this).attr("href");
      var id = $(this).data("id");
      var name = $(".edit-contact-name-" + id).val();
      var phone = $(".edit-contact-phone-" + id).val();

      updateContact(url, name, phone);
    });
  }

  var editContact = function() {
    $(".phonebook-edit-contact").on("click", function(event) {
      event.preventDefault();
      var id = $(this).data("id");

      var name = $(this).data("name");
      var phone = $(this).data("phone");

      $(".edit-contact-name-" + id).val(name);
      $(".edit-contact-phone-" + id).val(phone);

      $(".phonebook-edit-contact-form-" + id).toggle();
    });
  }

  var removeContact = function() {
    $(".phonebook-remove-contact").on("click", function(event) {
      event.preventDefault();
      var url = $(this).attr("href");

      $.ajax({
        type: "DELETE",
        url: url,
        success: function(data) {
          getContacts();
        },
        error: function(data) {
          alert("error");
        }
      });
    });
  }

  var toggleAddContact = function() {
    $(".phonebook-add-contact").toggle();
    $(".phonebook-create-contact").trigger("reset");
  }
  
  $(".add-contact, .cancel-create-contact").on("click", function() {
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
          var deleteUrl = "http://localhost:3000/api/contacts/" + contact.id
          var editForm = "<div class='edit-form phonebook-edit-contact-form-" + contact.id + "' style='display:none'> <div class='row'> <div class='col-lg-6'> <input type='text' class='form-control edit-contact-name-" + contact.id + "' /> </div> </div> <div class='row'> <div class='col-lg-6'> <input type='text' class='form-control edit-contact-phone-" + contact.id + "' /> </div> </div> <a data-id='" + contact.id + "' href='http://localhost:3000/api/contacts/" + contact.id + "' class='btn btn-default update-contact'> Update </a> </div>";

          var elem = "<div class='top10'> <span class='lead name'>" + contact.name + "</span> <a href='" + deleteUrl + "' class='text-danger phonebook-remove-contact'> remove </a> <a href='#' class='phonebook-edit-contact' data-name='" + contact.name + "' data-phone='" + contact.phone + "' data-id='" + contact.id + "'> edit </a> <br /> <span class='phone'> " + contact.phone + " </span> " + editForm + "</div>";


          items.push(elem);
        });

        $(".phonebook-list").html(items);
        $(".phonebook-edit-contact-form").css("display", "none");

        removeContact();
        editContact();
        updateContactEvent();
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

  getContacts();
});
