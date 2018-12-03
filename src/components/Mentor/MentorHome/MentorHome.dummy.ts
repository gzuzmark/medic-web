

export const url = 'me/sessions?';
const data = {
    "items": [
        {
            "availability": {
                "count": 0,
                "limit": 3
            },
            "credits": 0,
            "from": "2018-10-26T10:12:26.000-05:00",
            "id": "c5f0daac-6729-43a1-a077-1ea4dbd0540d",
            "isActive": false,
            "isEnabledForAttendance": true,
            "location": {
                "type": "VIRTUAL",
                "typeLabel": "Virtual"
            },
            "skill": {
                "id": "a4f80320-10df-4e40-bee0-b85930ebd7c6",
                "name": "Visual Designer II"
            },
            "status": "AVAILABLE",
            "to": "2018-10-26T10:12:27.000-05:00"
        },
        {
            "availability": {
                "count": 0,
                "limit": 30
            },
            "credits": 0,
            "from": "2018-10-27T07:30:00.000-05:00",
            "id": "cea48549-d61b-44e0-865e-3c34e7c00a16",
            "isActive": true,
            "isEnabledForAttendance": false,
            "location": {
                "location": {
                    "address": "Av. Oriental 585",
                    "id": "2",
                    "location": "Av. Oriental 585, Torres Tecnológicas, Piso 4, Aula 405",
                    "maxStudents": 30,
                    "room": "Piso 4, Aula 405",
                    "site": "Torres Tecnológicas",
                    "status": "PUBLISHED"
                },
                "type": "PHYSICAL",
                "typeLabel": "Presencial"
            },
            "skill": {
                "id": "a4f80320-10df-4e40-bee0-b85930ebd7c6",
                "name": "Visual Designer II"
            },
            "status": "AVAILABLE",
            "to": "2018-10-27T07:45:00.000-05:00"
        }
    ]
};

const emptyData = {
    "items": []
};

const Dummy = {
    data,
    emptyData,
    url
};

export default Dummy;