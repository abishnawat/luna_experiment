<?php
$toMail = 'samuel1robinroy@gmail.com';
$fromMail = 'samuel1robinroy@gmail.com';
$replyToMail = 'webmaster@my-domain.com';

$subject = 'This is a test subject from the form on my web site';
$message = 'To not end up in the filters Im writing some text here. Im testing my web site but Im having a hard time getting e-mails to go through? Thats strange! The mail is from: ' .  $fromMail . '. Send time: ' . date(DATE_RFC2822). '.';

$headers =  'From: ' . $fromMail . '"\r\n"' .
            'Reply-To: '  . $replyToMail . '"\r\n"' .
            'X-Mailer: PHP/' . phpversion();

$output = mail($toMail, $subject, $message, $headers, '-f'.$toMail);

var_dump($output);
?>