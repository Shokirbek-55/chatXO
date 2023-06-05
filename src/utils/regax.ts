const Regex = {
  Password: /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[\w\W].+$/,
  Alphabetic: /^[A-Za-z\s]+$/,
  // eslint-disable-next-line no-useless-escape
  HashtagInput:
    /^[^\s±§¥£€/’“‘`•””~,.<>±§`~,.<>\/?;:'"|+=_\-\)\(**&^%$#@!\[\]{}]+$/,
  Email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
};

export default Regex;
