//client side logic
$(function(){
  console.log('document loaded');

  getBooks();
  //listen for a submit event on the form
  $('#book-form').on('submit', addBook);
  $('#book-list').on('click', '.save', updateBook);
  $('#book-list').on('click', '.delete', deleteBook);
});
function getBooks(){
  $.ajax({
    url: '/books',
    type: 'GET',
    success: displayBooks
  });
}

function displayBooks(books){
  console.log('Got books from the server', books);

  $('book-list').empty();
  books.forEach(function(book){
    //can't create in the DOM because you're not sure how much we need from the DB
    var $li = $('<li></li>');
    var $form = $('<form></form>');
$form.append('<input type="text" name="title" value="' + book.title + '"/>');
$form.append('<input type="text" name="author" value="' + book.author + '"/>');
var date = new Date(book.publication_date).toISOString().slice(0,10);
//desired format yy-mm-dd format
//ISO format: yyyy-mm-ddThh-mm-ssz
$form.append('<input type="date" name="published" value="' + date + '">');
$form.append('<input type="number" name="edition" value="' + book.edition + '"/>');
$form.append('<input type="text" name="publisher" value="' + book.publisher + '"/>');


    // $li.append('<p><strong>' + book.title + '</strong></p>');
    // $li.append('<p><em>' + book.author + '</em></p>');

    // $li.append('<p><strong>' + book.edition + '</strong></p>');
    // $li.append('<p><em>' + book.publisher + '</em></p>');
    var $savebutton= $('<button class="save">Save!</button>');
    $savebutton.data('id', book.id);
    $form.append($savebutton);

    //delete button
    var $deletebutton=$('<button class="delete">Delete!</button>');
    $deletebutton.data('id', book.id);
    $form.append($deletebutton);


    $li.append($form);
    $('#book-list').append($li);
  });

}
function  addBook(event){
  //prevent browser from refreshing
  event.preventDefault();
//get the infor out of the form
//jQuery method to get info out of form
var formData = $(this).serialize();
//send data to server
$.ajax({
  url: '/books',
  type: 'POST',
  data: formData,
  success: getBooks
})

}

function updateBook(event){
  event.preventDefault();
  var $button= $(this);
  var $form = $button.closest('form');

  var data = $form.serialize();

  $.ajax({
    url: '/books/' + $button.data('id'),
    type: 'PUT',
    data: data,
    success: getBooks
  });

}

function deleteBook(event){
    event.preventDefault();
    //$(this) refers to a delete button that was clicked on
    $.ajax({
      url: '/books/' + $(this).data('id'),
      type: 'DELETE',
      success: getBooks
    });

}
