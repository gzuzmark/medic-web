import * as Yup from 'yup';
export const errorRequired = 'Campo es requerido.';
export const errorLetter = 'Campo solo permite letras.';
export const phoneRequired = 'Número de contacto incorrecto.';
export const limitDescription = 150;

export const DOCUMENT_STATUS = {
    EMPTY: 3,
    ERROR: 1,
    EXIST: 409,
    FOUND: 200,
    NOT_FOUND: 404,
    REQUEST_ERROR: 400,
    WAITING: 0
};
export const listValidDocumentStatus = [DOCUMENT_STATUS.NOT_FOUND, DOCUMENT_STATUS.FOUND];

const getDate = (year: number, month: number) =>
    new Date(year, month);

const createDate = (year?: string, month?: string) => {
    let date = null;
    if (!!year && !!month) {
        date = getDate(parseInt(year, 10), parseInt(month, 10));
    }
    return date;
};

const isFirstDateGreater = (date1: Date | null, date2: Date | null) => {
    return !!date2 && !!date1 && date2.getTime() <= date1.getTime()
};
const mentorFormBaseSchema = Yup.object().shape({
    contactNumber: Yup.string().trim()
        .test('phoneValidation', phoneRequired, (phoneContact: string) => {
            let isValid = true;
            if (!!phoneContact && phoneContact.length >= 6) {
                const phone = phoneContact
                    .replace("-", '')
                    .replace(")", '')
                    .replace("(", '')
                    .split(' ').join('');
                isValid = !isNaN(Number(phone)) && phone.length >= 6;
            } else {
                if (phoneContact && phoneContact.length > 0) {
                    isValid = phoneContact.length >= 6 || phoneContact.length === 0;
                }
            }
            return isValid;
        }),
    currentCompany: Yup.string().trim(),
    currentPosition: Yup.string().trim(),
    description: Yup.string().trim().max(limitDescription, `Campo tiene más de ${limitDescription}`),
    document: Yup.string().required(errorRequired)
        .test('documentTypeValidation', 'El campo no es válido', function (document: string) {
            const documentType = this.resolve(Yup.ref('documentType'));
            let isValid = false;
            if (documentType && document) {
                if (documentType.value === "DNI") {
                    isValid = document.length === 8 && !document.split("").some((v) => isNaN(parseInt(v, 10)))
                } else if (documentType.value === "CARNET_EXT") {
                    isValid = document.length <= 12
                }
            } 
            return isValid;
        }),    
    documentType: Yup.object().required(errorRequired),
    experiences: Yup.array().min(1).max(3).of(
        Yup.object().shape({
            company: Yup.string().trim(),
            currentJob: Yup.boolean(),
            fromMonth: Yup.string(),
            fromYear: Yup.string()
                .test('currentDateValidationFrom', 'Fecha "Desde" fuera de rango',  function (fromYear: string) {
                    let isValid = true;
                    const fromMonth = this.resolve(Yup.ref('fromMonth'));
                    const current = getDate((new Date().getFullYear()), (new Date().getMonth()));
                    const from = createDate(fromYear, fromMonth);
                    isValid = isFirstDateGreater(current, from);
                    return isValid;
                }),
            position: Yup.string().trim(),
            toMonth: Yup.string(),
            toYear: Yup.string()
                .test('currentDateValidationTo', 'Fecha "Hasta" fuera de rango',  function (toYear: string) {
                    let isValid = true;
                    const currentJob = !!this.resolve(Yup.ref('currentJob'));
                    if (!currentJob) {
                        const toMonth = this.resolve(Yup.ref('toMonth'));
                        const current = getDate((new Date().getFullYear()), (new Date().getMonth()));
                        const to = createDate(toYear, toMonth);
                        isValid = isFirstDateGreater(current, to);
                    };
                    return isValid;
                }).test('toDateFromDateValidation', 'Rango de fechas inválidas',  function (toYear: string) {
                    let isValid = true;
                    const currentJob = !!this.resolve(Yup.ref('currentJob'));
                    if (!currentJob) {
                        const fromMonth = this.resolve(Yup.ref('fromMonth'));
                        const fromYear = this.resolve(Yup.ref('fromYear'));
                        const toMonth = this.resolve(Yup.ref('toMonth'));
                        const from = createDate(fromYear, fromMonth);
                        const to = createDate(toYear, toMonth);
                        isValid = isFirstDateGreater(to, from);
                    }
                    return isValid;
                })
        })
    ),
    firstName: Yup.string().required(errorRequired).trim()
        .matches(/^[a-zA-Z áéíóúñÁÉÍÓÚÑ]+$/, { message: errorLetter, excludeEmptyString: true }),
    lastName: Yup.string().required(errorRequired).trim()
        .matches(/^[a-zA-Z áéíóúñÁÉÍÓÚÑ]+$/, { message: errorLetter,  excludeEmptyString: true }),
    location: Yup.string().required(errorRequired),
    medicCollegeNumber: Yup.string().required(errorRequired)
    .test('medicCollegeNumber', 'El campo no es válido', (medicCollegeNumber: string) => {        
        let isValid = false;
        if (medicCollegeNumber) {            
            isValid =
                medicCollegeNumber.length >= 4 &&
                medicCollegeNumber.length <= 8 &&
                !medicCollegeNumber
                    .split('')
                    .some(v => isNaN(parseInt(v, 10)));
        }
        return isValid;
    }),
    picture: Yup.string(),
    skills: Yup.array().required(errorRequired).min(1).of(Yup.string()),
    status: Yup.string(),
    utp: Yup.boolean(),

});

export default mentorFormBaseSchema;
