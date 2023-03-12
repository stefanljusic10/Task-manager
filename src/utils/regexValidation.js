const nameLatinLettersRegex = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi;
const fullNameRegex = /^\s*[\S]+(\s[\S]+)+\s*$/gms;
const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const salaryRegex = /^[1-9]\d*\$$/;

export { nameLatinLettersRegex, fullNameRegex, phoneRegex, salaryRegex }