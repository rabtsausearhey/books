const SETTINGS = {'authors': {'count': '10', 'page': '1'}, 'books': {'count': '10', 'page': '1'}};
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
    $('#page-number').change(changePageParameters);
    $('#elements-count-on-page').change(changePageParameters)
}

/**
 * Request for show all books by selected author
 */
function bookPreview() {
    $('#wait-modal').show();
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
                const books = result['elements'];
                $('#view-modal-header').text(authorName);
                const modalBody = $('#view-books-modal-body');
                modalBody.empty();
                for (let i = 0; i < books.length; i++) {
                    const item = books[i];
                    modalBody.append(
                        `<div class="preview-book-info"><img src="/images/books/${item['image']}" class="book-image"><div class="book-name">${item['name']}</div></div>`
                    )
                }
                $('#wait-modal').hide();
                viewModal.modal('show')
            } else {
                alert(`error ${result['status']['code']} :: ${result['status']['message']}`)
                $('#wait-modal').hide();
            }
        },
        error: ajaxErrorFunction
    });
}

/**
 * View books in store for selected author
 */
function substitution() {
    $('#wait-modal').show();
    const parentElement = $(this).parent();
    const authorName = parentElement.attr('data-author-name');
    $.ajax({
        url: `/api/change-page/books of ${authorName}/20`,
        success: (result) => {
            if (result['status']['code'] === 200) {
                const count = $('#elements-count-on-page').val();
                const pageNumber = $('#page-number').val();
                SETTINGS[`books of ${authorName}`] = {'count': count, 'page': pageNumber};
                $('.common-container').html(result['html']);
                setCountData(result['elementsCount'], result['elementsName'], result['pageCount'], result['currentPage']);
            }
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
    $('#wait-modal').hide();
}

function buyBook() {
    const bookName = $(this).attr('data-buy-book-name');
    const buyModal = $('#buy-book-modal');
    buyModal.find('#buy-book-name').text(bookName);
    buyModal.modal('show');
}

/**
 * Request for sending a letter
 */
function sendMail() {
    $('#wait-modal').show();
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
                alert(result['status']['message']);
                $('#wait-modal').hide();
            } else {
                alert(`error ${result['status']['code']} :: ${result['status']['message']}`)
                $('#wait-modal').hide();
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
    } else if (firstEmailSplit.length > 2) {
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

function setCountData(count, name, pageCount, currentPage) {
    $('.full-element-count').text(count);
    $('.full-element-name').text(name);
    $('#page-number').remove();
    $('#page-number-n').append(
        `<select id="page-number"></select>`
    );
    const pageNumberElement = $('#page-number');
    pageNumberElement.empty();
    for (let i = 1; i <= pageCount; i++) {
        pageNumberElement.append(
            `<option class="page-number-option" value="${i}">${i}</option>`
        )
    }
    pageNumberElement.val(currentPage);
    $('#elements-count-on-page').remove();
    $('#elements-count-n').append(
        '<select id="elements-count-on-page">' +
        '<option value="1">1</option>\n' +
        '<option value="3">3</option>\n' +
        '<option value="5">5</option>\n' +
        '<option value="10">10</option>\n' +
        '<option value="20">20</option>\n' +
        '<option value="100">100</option>\n' +
        '</select>'
    );
    $('#elements-count-on-page').val(SETTINGS[name]['count']);
    initControls();
    $('#wait-modal').hide();
}

function changePageParameters() {
    $('#wait-modal').show();
    const name = $('.full-element-name').text();
    const count = $('#elements-count-on-page').val();
    const pageNumber = $('#page-number').val();
    $.ajax({
        url: `/api/change-page/${name}/${count}/${pageNumber}`,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: (result) => {
            if (result['status']['code'] === 200) {
                SETTINGS[name] = {'count': count, 'page': pageNumber}
                $('.common-container').html(result['html']);
                setCountData(result['elementsCount'], result['elementsName'], result['pageCount'], result['currentPage']);
            } else {
                alert(`error ${result['status']['code']} :: ${result['status']['message']}`)
                $('#wait-modal').hide();
            }
        },
        error: ajaxErrorFunction
    });
}