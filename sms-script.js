$('#name-input').val(window.localStorage.getItem('Name'));
$('#address-input').val( window.localStorage.getItem('Address'));

let name = $('#name-input').val();
let address = $('#address-input').val();

$(document).ready(() => {
    setButtonsHref();

    // Set event listener
    const saveButton = $('#save-button');
    saveButton.click(saveData)

})

function setButtonsHref() {
    let buttons = document.querySelectorAll('.sms-button');
    buttons.forEach(button => {
        
        let code = button.getAttribute('id').split('-')[1];
        let href = `sms:13033?body=${code} ${name} ${address}`;
        button.setAttribute('href', href);
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