const Regex = {
    Password: /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[\w\W].+$/,
    PasswordLogin: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/,
    Alphabetic: /^[A-Za-z\s]+$/,
    HashtagInput: /^[^\s±§¥£€/’“‘`•””~,.<>±§`~,.<>\/?;:'"|+=_\-\)\(**&^%$#@!\[\]{}]+$/,
    Email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
};

export default Regex;

export const regex = /\/@([a-fA-F0-9-]+)$/;
