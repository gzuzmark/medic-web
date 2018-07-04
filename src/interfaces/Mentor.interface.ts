export interface ISkill {
    color: string;
    id: string;
    name: string;
}

export interface IMentorSession {
    id: string;
    name: string;
    email: string;
    photo: string;
    sessions: {
        totalMinutes: number;
    }
    status: string;
    skills: ISkill[];
};

export const SkillsDummy: ISkill[] = [
    {
        color: 'rgb(228, 255, 196)',
        id: '8802e337-aee5-4ba7-a0d7-56d308823744',
        name : 'Consejería Psicológica',
    },
    {
        color: 'rgb(232, 252, 248)',
        id: '09ccaaa9-4f17-4895-92c7-061b84a986e5',
        name : 'Clases de Videojuegos'
    },
    {
        color: 'rgb(255, 218, 223)',
        id: '5bbe7fd3-714b-4dfe-8b34-764812b62693',
        name : 'Estadística descriptiva y probabilidades'
    }
];