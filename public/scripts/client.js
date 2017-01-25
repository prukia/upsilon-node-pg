//client side logic
$(function(){
  console.log('document loaded');

  getBooks();
  //listen for a submit event on the form
  $('#book-form').on('submit', addBook);
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
    $li.append('<p><strong>' + book.title + '</strong></p>');
    $li.append('<p><em>' + book.author + '</em></p>');
    var date = new Date(book.publication_date).toDateString();
    $li.append('<p><time>' + date + '</time></p>');

    $li.append('<p><strong>' + book.edition + '</strong></p>');
    $li.append('<p><em>' + book.publisher + '</em></p>');

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
