$(document).ready(function () {

    Stripe.setPublishableKey('pk_test_9D43kM3d2vEHZYzPzwAblYXl');

    var cardNumber, cardMonth, cardYear, cardCVC, cardHolder;

    // check for any empty inputs
    function findEmpty() {
        var emptyText = $('#form-container input').filter(function () {

            return $(this).val == null;
        });

        // add invalid class to empty inputs
        console.log(emptyText.prevObject);
        emptyText.prevObject.addClass('invalid');
    }

    // check for card type and display corresponding icon
    function checkCardType() {
        cardNumber = $('#card-number').val();
        var cardType = Stripe.card.cardType(cardNumber);
        switch (cardType) {
            case 'Visa':
                $('#card-image').html('<img src="visaCard.svg" height="100%">');
                break;
            case 'Unknown':
                $('#card-image').html('<img src="regCard.svg" height="100%">');
                break;
        }
    }

    // check card type on card number input blur 
    $('#card-number').blur(function (event) {
        event.preventDefault();
        checkCardType();
    });

    // on button click: 
    $('#card-btn').click(function (event) {

        // get each input value and use Stripe to determine whether they are valid
        var cardNumber = $('#card-number').val();
        var isValidNo = Stripe.card.validateCardNumber(cardNumber);
        var expMonth = $('#card-month').val();
        var expYear = $('#card-year').val();
        var isValidExpiry = Stripe.card.validateExpiry(expMonth, expYear);
        var cardCVC = $('#card-cvc').val();
        var isValidCVC = Stripe.card.validateCVC(cardCVC);
        var cardHolder = $('#card-holder').val();
        event.preventDefault();

        // alert the user if any fields are missing
        if (!cardNumber || !cardCVC || !cardHolder || !expMonth || !expYear) {
            console.log(cardNumber + cardCVC + cardHolder + cardMonth + cardYear);
            $('#form-errors').addClass('hidden');
            $('#card-success').addClass('hidden');
            $('#form-errors').removeClass('hidden');
            $('#card-error').text('Please complete all fields.');
            findEmpty();
        } else {

            // alert the user if any fields are invalid
            if (!isValidNo || !isValidExpiry || !isValidCVC) {
                $('#form-errors').css('display', 'block');
                if (!isValidNo) {
                    $('#card-error').text('Invalid credit card number.');
                } else if (!isValidExpiry) {
                    $('#card-error').text('Invalid expiration date.')
                } else if (!isValidCVC) {
                    $('#card-error').text('Invalid CVC code.')
                }

            } else {
                $('#card-success').removeClass('hidden');
            }
        }
    })

});
