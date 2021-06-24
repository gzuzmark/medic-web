import * as React from 'react';


export interface IHistoryTreatmentsFormContext {
	diagonostic: any;
}

const defaultValue: IHistoryTreatmentsFormContext = {
	diagonostic: ""
};

const HistoryTreatmentsFormContext = React.createContext(defaultValue);

export default HistoryTreatmentsFormContext;