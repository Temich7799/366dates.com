export default function generateRandomEmail() {

    // const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const domains = ['nomail.com'];
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let username = '';
    let domain = '';

    for (var i = 0; i < Math.floor(Math.random() * 6) + 5; i++) {
        username += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    domain = domains[Math.floor(Math.random() * domains.length)];

    var email = username + '@' + domain;
    return email;
}