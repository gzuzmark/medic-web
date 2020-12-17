import * as React from 'react';
// tslint:disable:ordered-imports
import {
	Day,
	Inject,
	Month,
	ScheduleComponent,
	Week,
	ViewsDirective,
	ViewDirective,
} from '@syncfusion/ej2-react-schedule';
// tslint:disable:ordered-imports
import { L10n } from '@syncfusion/ej2-base';
import { Headline1 } from '../../../common/MentorText';

const headerStyle = {
	display: 'flex',
	justifyContent: 'center' as 'center',
	marginBottom: '20px',
	textAlign: 'center' as 'center',
};

const titleStyle = {
	fontSize: 30,
	marginBottom: 20,
	textAlign: 'center' as 'center',
};

// tslint:disable:object-literal-sort-keys
L10n.load({
	'en-US': {
		schedule: {
			cancelButton: 'Cerrar',
			deleteButton: 'Quitar',
			newEvent: 'Agregar Evento',
			saveButton: 'Agregar',
			today: 'Hoy',
			addTitle: 'Agregar Título',
			save: 'Crear',
			moreDetails: 'Más Detalles',
		},
	},
});
const Scheduler = () => {
	const onPopUpOpen = (args: any) => {
		if (args.type === 'Editor') {
			// removing unnecessary fields
			args.element.querySelector('.e-location-container').remove();
			args.element.querySelector('.e-all-day-time-zone-row').remove();
			args.element
				.querySelector('.e-control.e-recurrenceeditor.e-lib')
				.remove();
		}
	};

	return (
		<div className='u-LayoutMargin' style={{ padding: '0 35px' }}>
			<div style={headerStyle}>
				<div>
					<Headline1 style={titleStyle}>Calendario de Citas</Headline1>
				</div>
			</div>
			<div>
				<ScheduleComponent
					popupOpen={onPopUpOpen}
					timeScale={{ enable: true, interval: 60, slotCount: 3 }}
				>
					<ViewsDirective>
						<ViewDirective option='Month' displayName='Vista mensual' />
						<ViewDirective
							option='Week'
							displayName='Vista semanal'
							startHour='08:00'
							endHour='20:00'
						/>
						<ViewDirective
							option='Day'
							displayName='Vista diaria'
							startHour='08:00'
							endHour='20:00'
						/>
					</ViewsDirective>
					<Inject services={[Day, Week, Month]} />
				</ScheduleComponent>
				;
			</div>
		</div>
	);
};

export default Scheduler;
