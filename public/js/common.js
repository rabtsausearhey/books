// let AUTHORS_LIST = {'a-1000': {'authorName': '', 'authorImage': '', 'books': {}}};
$(document).ready(() => {
    initControls();
});

/**
 * Initialize
 */
function initControls() {
    $('[id^="substitution-"]').click(substitution).on({'touchstart': substitution});
    $('[id^="books-preview-"]').click(bookPreview).on({'touchstart': bookPreview});
    $('[id^="btn-buy-"]').click(buyBook).on({'touchstart': buyBook});
    $('#send-mail').click(sendMail);
    $('#customer-email').keyup(checkParametersForMail);
    $('#customer-name').keyup(checkParametersForMail);
}

/**
 * Request for show all books by selected author
 */
function bookPreview() {
    const parentElement = $(this).parent();
    const authorName = parentElement.attr('data-author-name');
    const authorId = parentElement.attr('data-author-id');
    $.ajax({
        url: `/api/get-books-by-author/${authorId}`,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: (result) => {
            if (result['status']['code'] === 200) {
                const viewModal = $('#view-books-modal');
                const books = result['books'];
                $('#view-modal-header').text(authorName);
                const modalBody = $('#view-books-modal-body');
                modalBody.empty();

                for (let i = 0; i < books.length; i++) {

                    const item = books[i];
                    modalBody.append(
                        `<div class="preview-book-info"><img src="/images/books/${item['image']}" class="book-image"><div class="book-name">${item['name']}</div></div>`
                    )
                }
                viewModal.modal('show')
            } else {
                alert(`error ${result['status']['code']} :: ${result['status']['message']}`)
            }
        },
        error: ajaxErrorFunction
    });
}

/**
 * View books in store for selected author
 */
function substitution() {
    const parentElement = $(this).parent();
    const authorId = parentElement.attr('data-author-id');
    $.ajax({
        url: `/get-books-by-author/${authorId}`,
        success: (result) => {
            $('.common-container').html(result);
            initControls();
        },
        error: ajaxErrorFunction
    });
}

/**
 * This method use for default error response
 * @param xhr
 * @param status
 * @param error
 */
function ajaxErrorFunction(xhr, status, error) {
    alert(`${status} :\n${error}`)
}

function buyBook() {
    const bookName = $(this).attr('data-buy-book-name');
    const buyModal = $('#buy-book-modal');
    buyModal.find('#buy-book-name').text(bookName);
    // $('#send-mail').attr('disabled',"true");
    buyModal.modal('show');
}

/**
 * Request for sending a letter
 */
function sendMail() {
    const buyModal = $('#buy-book-modal');
    const bookName = buyModal.find('#buy-book-name').text();
    const name = $('#customer-name').val();
    const email = $('#customer-email').val();
    const currenDate = new Date();
    const date = `${currenDate.getHours()}:${currenDate.getMinutes()} ${currenDate.getDate()} ${getMonthFullName(currenDate.getMonth())} ${currenDate.getFullYear()}`
    const data = {email, name, date, bookName};
    $.ajax({
        type: 'POST',
        url: '/api/send-mail',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: 'json',
        success: (result) => {
            if (result['status']['code'] === 200) {
                alert(result['status']['message'])
            } else {
                alert(`error ${result['status']['code']} :: ${result['status']['message']}`)
            }
        },
        error: ajaxErrorFunction
    });
}

/**
 * Convert month number to month name
 * @param id int
 * @returns {string}
 */
function getMonthFullName(id) {
    const mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return mlist[id];
}

/**
 * The method checks the correctness of filling the fields before sending the letter
 * @returns {boolean}
 */
function checkParametersForMail() {
    const email = $('#customer-email').val();
    const name = $('#customer-name').val();

    if (!name) {
        rejectValidation('Fill in the name field');
        return false;
    }

    if (name.length < 3) {
        rejectValidation('Name must be longer than 3 characters');
        return false;
    }
    if (name.match(/\d+/g)) {
        rejectValidation('The name must not contain numbers');
        return false;
    }

    if (!email) {
        rejectValidation('Fill in the email field');
        return false;
    }

    if (!email.match('@')) {
        rejectValidation('The email not contain @');
        return false;
    }
    const firstEmailSplit = email.split('@');

    if (!firstEmailSplit[0]) {
        rejectValidation('Forgot something before "@"?');
        return false;
    }else if(firstEmailSplit.length > 2){
        rejectValidation('So match "@"?');
        return false;
    }

    if (!firstEmailSplit[1].includes('.')) {
        rejectValidation('Email is not valid. are missing "." after "@" ?');
        return false;
    }

    const secondEmailSplit = firstEmailSplit[1].split('.');

    if (!secondEmailSplit[0]) {
        rejectValidation('Forgot something before "."?');
        return false;
    }

    if (!secondEmailSplit[1]) {
        rejectValidation('Add TLD to email');
        return false;
    }

    if (email.length < 6) {
        rejectValidation('Email must be longer than 6 characters');
        return false;
    }
    $('.check-mail-params').text('');
    $('#send-mail').removeAttr('disabled');
    return true;
}

/**
 * Method disabled button for send mail & show warning for user
 * @param text string
 */
function rejectValidation(text) {
    $('.check-mail-params').text(text);
    $('#send-mail').attr('disabled', 'true');
}