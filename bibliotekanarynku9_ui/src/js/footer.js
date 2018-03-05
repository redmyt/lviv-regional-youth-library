// Save mail and skype icons and texts
var $mailIcon = $('.contact-information__mail-link'),
    $skypeIcon = $('.contact-information__skype-link'),
    $mailText = $('.contacts__mail-text'),
    $skypeText = $('.contacts__skype-text');

// Add mail and skype texts to one set
var contactsShowingElements = [$mailText, $skypeText];

// Show the mail text when user click the mail icon
$mailIcon.click(function () {
    emphasizeOneOfTheSetElement($mailText, contactsShowingElements, 'contacts__skype-mail-text_visible');
    emphasizeOneOfTheSetElement($skypeText, contactsShowingElements, 'contacts__skype-mail-text_invisible');
});

// Show the mail text when user click the mail icon
$skypeIcon.click(function () {
    emphasizeOneOfTheSetElement($skypeText, contactsShowingElements, 'contacts__skype-mail-text_visible');
    emphasizeOneOfTheSetElement($mailText, contactsShowingElements, 'contacts__skype-mail-text_invisible');
});
