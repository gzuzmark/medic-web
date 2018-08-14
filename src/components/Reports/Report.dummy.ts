

export const url = 'sessions/report?';
const data = {
    "currentPage": 1,
    "items": [
        {
            "from": "2018-08-14T03:00:00.000Z",
            "maxStudents": 1,
            "mentorName": "Juan Luis Magallanes Rodríguez",
            "room": "Piso 2, oficina DACE",
            "sede": "Torres tecnológicas",
            "skillName": "Principios de algoritmos",
            "to": "2018-08-14T03:45:00.000Z",
            "type": "Tutoría Presencial"
        }
    ],
    "pageSize": 20,
    "totalItems": 148
};

const dataAlternative1 = {
    "currentPage": 1,
    "items": [
        {
            "from": "2018-08-14T03:00:00.000Z",
            "maxStudents": 1,
            "mentorName": "Juan Luis Magallanes Rodríguez",
            "room": "Piso 2, oficina DACE",
            "sede": "Torres tecnológicas",
            "skillName": "Principios de algoritmos",
            "to": "2018-08-14T03:45:00.000Z",
            "type": "Tutoría Presencial"
        },
        {
            "from": "2018-08-14T03:00:00.000Z",
            "maxStudents": 1,
            "mentorName": "Juan Luis Magallanes Rodríguez",
            "room": "Piso 2, oficina DACE",
            "sede": "Torres tecnológicas",
            "skillName": "Principios de algoritmos",
            "to": "2018-08-14T03:45:00.000Z",
            "type": "Tutoría Presencial"
        },
        {
            "from": "2018-08-14T03:00:00.000Z",
            "maxStudents": 1,
            "mentorName": "Juan Luis Magallanes Rodríguez",
            "room": "Piso 2, oficina DACE",
            "sede": "Torres tecnológicas",
            "skillName": "Principios de algoritmos",
            "to": "2018-08-14T03:45:00.000Z",
            "type": "Tutoría Presencial"
        }
    ],
    "pageSize": 20,
    "totalItems": 148
};

const emptyData = {
    "currentPage": 1,
    "pageSize": 100,
    "totalItems": 0
};

const Dummy = {
    data,
    dataAlternative1,
    emptyData,
    url
};

export default Dummy;