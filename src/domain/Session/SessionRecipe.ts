interface IPatientRecipe {
	patientDni: string;
	patientFirstName: string;
	patientLastName: string;
	patientAge: number;
	patientPhone: string;
	patientAddress: string;
	patientClinicHistory: string;
}

interface IDoctorRecipe {
	doctorFirstName: string;
	doctorLastName: string;
	doctorSpecialty: string;
	doctorCmp: string;
}

interface IMedicineRecipe {
	skuSAP: string;
	skuInkafarma: string;
	activePrinciples: string;
	concentrations: string;
	quantity: number;
	pharmaceuticalForm: string;
	productName: string;
	administrationRoute: string;
	dose: number;
	timeBetweenDosesInHours: number;
	totalPrescriptionTimeInDays: number;
	prescriptionRequirements: string;
}

export interface IRecipe {
	issueDate: Date;
	ipress: string;
	patient: IPatientRecipe;
	doctor: IDoctorRecipe;
	medicines: IMedicineRecipe[];
	diagnostic: string;
	additionalRecomendations: string;
}
