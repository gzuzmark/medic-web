import * as Yup from 'yup';
export const errorRequired = 'Campo es requerido.';
export const emailRequired = 'Campo no es un correo.';

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

const mentorCreateSchema = Yup.object().shape({
    currentCompany: Yup.string(),
    currentPosition: Yup.string(),
    description: Yup.string(),
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
    email: Yup.string().required(errorRequired)
        .test('emailValidation', 'Validación de correo electrónico', (email: string) => {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }),
    experiences: Yup.array().min(1).max(3).of(
        Yup.object().shape({
            company: Yup.string().required(errorRequired),
            currentJob: Yup.boolean(),
            fromMonth: Yup.string().required(errorRequired),
            fromYear: Yup.string().required(errorRequired)
                .test('currentDateValidationFrom', 'Fecha "Desde" fuera de rango',  function (fromYear: string) {
                    let isValid = true;
                    const fromMonth = this.resolve(Yup.ref('fromMonth'));
                    const current = getDate((new Date().getFullYear()), (new Date().getMonth()));
                    const from = createDate(fromYear, fromMonth);
                    isValid = isFirstDateGreater(current, from);
                    return isValid;
                }),
            position: Yup.string().required(errorRequired),
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
    firstName: Yup.string().required(errorRequired),
    lastName: Yup.string().required(errorRequired),
    location: Yup.string().required(errorRequired),
    numberContact: Yup.string(),
    picture: Yup.string().required(errorRequired),
    skills: Yup.array().min(0).of(Yup.string()),
    validation: Yup.boolean().required(errorRequired)
});

export default mentorCreateSchema;
