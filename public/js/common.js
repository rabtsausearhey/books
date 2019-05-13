let CURRENT_PAGE = null;
let PREVIEW_PAGE = null;
const CACHE = {};
$(document).ready(() => {
    $('#show-preview-page').click(showPreviwPage);
    $('#show-next-page').click(showNextPage);
    $('.preview-btn-main').click(previewPage);
    initCurrentPage();
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
    $('#page-number').change(changePageParams);
    $('#elements-count-on-page').change(changePageParams)
}

function showPreviwPage() {

    const needlesPageNumber = parseInt($('#page-number').val()) - 1;
    const name = $('.full-element-name').text();
    const countOnPage = $('#elements-count-on-page').val();
    getPageBody(name, countOnPage, needlesPageNumber)
}

function showNextPage() {
    const needlesPageNumber = parseInt($('#page-number').val()) + 1;
    const name = $('.full-element-name').text();
    const countOnPage = $('#elements-count-on-page').val();
    getPageBody(name, countOnPage, needlesPageNumber)
}

function initCurrentPage() {
    const name = $('.full-element-name').text();
    const count = $('.full-element-count').text();
    const countOnPage = $('#elements-count-on-page').val();
    const pageNumber = $('#page-number').val();
    const cacheKey = `${name}::${countOnPage}::${pageNumber}`;
    CURRENT_PAGE = cacheKey;
    CACHE[cacheKey] = {
        'html': $('.common-container').html(),
        'pageCount': $('.page-number-option').length,
        'elementsName': name,
        'elementsCount': count,
        'currentPage': '1',
        'countOnPage': countOnPage
    }
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
    const name = 'books of ' + parentElement.attr('data-author-name');
    const defaultCountOnPage = '10';
    const defaultPageNumber = '1';
    getPageBody(name, defaultCountOnPage, defaultPageNumber);
}

/**
 * This method use for default error response
 * @param xhr
 * @param status
 * @param error
 */
function ajaxErrorFunction(xhr, status, error) {
    alert(`${status}\n${error}`);
    $('#wait-modal').hide();
}

/**
 * This function show purchase window
 */
function buyBook() {
    const bookName = $(this).attr('data-buy-book-name');
    const authorName = $(this).attr('data-author')
    const buyModal = $('#buy-book-modal');
    buyModal.find('#buy-book-name').text(bookName);
    buyModal.find('#buy-book-author').text(authorName);
    buyModal.modal('show');
}

/**
 * Request for sending a letter
 */
function sendMail() {
    $('#wait-modal').show();
    const buyModal = $('#buy-book-modal');
    const bookName = buyModal.find('#buy-book-name').text();
    const bookAuthor = buyModal.find('#buy-book-author').text();
    const name = $('#customer-name').val();
    const email = $('#customer-email').val();
    const currenDate = new Date();
    const time = `${currenDate.getHours()}:${currenDate.getMinutes()}`;
    const date = `${currenDate.getDate()} ${getMonthFullName(currenDate.getMonth())} ${currenDate.getFullYear()}`;
    const data = {email, name, date,time, bookName, bookAuthor};
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
                alert(`error ${result['status']['code']} :: ${result['status']['message']}`);
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

/**
 * Check cache for update page body
 */
function getPageBody(name, count, pageNumber) {
    const cacheKey = `${name}::${count}::${pageNumber}`;
    let response = CACHE[cacheKey];
    if (response) {
        PREVIEW_PAGE = CURRENT_PAGE;
        CURRENT_PAGE = cacheKey;
        setBodySuccess(response);
    } else {
        requirePageBody(name, count, pageNumber, cacheKey);
    }
}

function changePageParams() {
    const name = $('.full-element-name').text();
    const count = $('#elements-count-on-page').val();
    const pageNumber = $('#page-number').val();
    getPageBody(name, count, pageNumber)
}

function previewPage() {
    CURRENT_PAGE = PREVIEW_PAGE;
    setBodySuccess(CACHE[PREVIEW_PAGE])
}

function setBodySuccess(result) {
    $('.common-container').html(result['html']);
    setPageParameters(result['elementsCount'], result['elementsName'], result['pageCount'], result['currentPage'], result['countOnPage']);
}

function setPageParameters(count, name, pageCount, currentPage, elementsCount = '10') {
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
    $('#elements-count-on-page').val(elementsCount);
    initControls();
    const previewPageBtn = $('.preview-btn-main');
    if (!PREVIEW_PAGE || PREVIEW_PAGE === CURRENT_PAGE) {
        previewPageBtn.hide();
    } else {
        previewPageBtn.show();
    }
    const previewPageSpan = $('#show-preview-page');
    if (currentPage <= 1) {
        previewPageSpan.css('visibility', 'hidden');
    } else {
        previewPageSpan.css('visibility', 'visible');
    }

    const nextPageSpan = $('#show-next-page');
    if (currentPage >= pageCount) {
        nextPageSpan.css('visibility', 'hidden')
    } else {
        nextPageSpan.css('visibility', 'visible')
    }
    $('#wait-modal').hide();
}

function requirePageBody(name, count, pageNumber, cacheKey) {
    $('#wait-modal').show();
    $.ajax({
        url: `/api/change-page/${name}/${count}/${pageNumber}`,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: (result) => {
            if (result['status']['code'] === 200) {
                PREVIEW_PAGE = CURRENT_PAGE;
                CURRENT_PAGE = cacheKey;
                result['countOnPage'] = count;
                CACHE[cacheKey] = result;
                setBodySuccess(result)
            } else {
                alert(`error ${result['status']['code']} :: ${result['status']['message']}`);
                $('#wait-modal').hide();
            }
        },
        error: ajaxErrorFunction
    });
}