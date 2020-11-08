$('#name-input').val(window.localStorage.getItem('Name'));
$('#address-input').val( window.localStorage.getItem('Address'));

$('#footer-year').text(new Date().getFullYear());


const url = 'https://kryfos.com/lockdown-sms';
const buttons = $('.sms-button');
const downloadButton = $('#download-button');

downloadButton.hide();

//EVENT HANDLERS

// Prevent sending sms with empty data
buttons.on('click', (event) => {
    if (!name || !address) {
        $('#modal-form').modal('show');
        event.preventDefault();
    }
})

$('#share-button').click(() => {
    if (navigator.share) {
        navigator.share({
            url: '',
            title: 'Lockdown SMS',
        })        
    } else {
        navigator.clipboard.writeText(url);
        $.notify({
            message: 'Το link αντιγράφηκε με επιτυχία.'
        }, {
            type: 'success'
        })
    }
})

// ON beforeInstallPrompt
let deferredEvent;
$(document).on('beforeInstallPrompt', (event) => {
    console.log('Prompt');
    event.preventDefault();
    deferredEvent = event;

    //downloadButton.show(2000);
})

// ON download
downloadButton.click(() => {    
    downloadButton.hide();
    deferredEvent.prompt();
})


let name = $('#name-input').val();
let address = $('#address-input').val();

$(document).ready(() => {
    setButtonsHref();

    // Set event listener
    const saveButton = $('#save-button');
    saveButton.click(saveData);

})

function setButtonsHref() {
    $.each(buttons, (index, button) => {
        let code = $(button).attr('id').split('-')[1];

        let dataString = `${code} ${name} ${address}`;
        let href;
        // Check for ios
        if (isIos()) {
            href = `sms:13033&body=${dataString}`;
        } else {
            href = `sms:13033?body=${dataString}`;
        }
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

function isIos() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

