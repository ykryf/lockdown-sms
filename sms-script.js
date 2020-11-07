$('#name-input').val(window.localStorage.getItem('Name'));
$('#address-input').val( window.localStorage.getItem('Address'));

$('#footer-year').text(new Date().getFullYear());

const buttons = $('.sms-button');
// Prevent sending sms with empty data
buttons.on('click', (event) => {
    if (!name || !address) {
        $('#modal-form').modal('show');
        event.preventDefault();
    }
})

let name = $('#name-input').val();
let address = $('#address-input').val();

$(document).ready(() => {
    setButtonsHref();

    // Set event listener
    const saveButton = $('#save-button');
    saveButton.click(saveData)

})

function setButtonsHref() {
    $.each(buttons, (index, button) => {
        let code = $(button).attr('id').split('-')[1];
        let href = `sms:13033?body=${code} ${name} ${address}`;
        $(button).attr('href', href);
    });
}

function saveData() {
    name = $('#name-input').val();
    address = $('#address-input').val();

    window.localStorage.setItem('Name', name);
    window.localStorage.setItem('Address', address);
    setButtonsHref();
    alert('Τα στοιχεία αποθηκεύτηκαν επιτυχώς!');
    $('#modal-form').modal('hide');
}

