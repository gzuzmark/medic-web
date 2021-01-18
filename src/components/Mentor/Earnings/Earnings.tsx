import * as React from 'react';
// tslint:disable:ordered-imports
import { Sticky, StickyContainer } from 'react-sticky';
import { TableFull, TableHeader } from '../../../common/TableMentor';
import {
	TableBody,
	TableContainer,
	TableContainerExtraLarge,
	PageContainer,
	DescriptionContainer,
} from './Styles';
import colors, { FONTS } from '../../../common/MentorColor';
import {
	Body1,
	Small1,
	Headline1,
	LIGHT_TEXT,
} from '../../../common/MentorText';
import { LAYOUT_HEIGHT } from '../../../common/Settings';
import MentorService from 'src/services/Mentor/Mentor.service';
import Icon from '../../../common/Icon/Icon';
import Loader from '../../../common/Loader/Loader';
import * as moment from 'moment';
// tslint:disable:ordered-imports

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

interface IResponseEarning {
	cost: string;
	doctor_id: string;
	from: string;
	id: string;
	patient_name: string;
	status: string;
	to: string;
}

interface IEarning {
	date: string;
	patient: string;
	status: string;
	cost: string;
	earned: string;
}

const mapEarnings = (list: IResponseEarning[]) =>
	list.map(({ from, status, cost: strCost, patient_name }) => {
		const date = moment(from).format('DD/MM/YYYY');
		const cost = Number(strCost).toFixed(2);
		const earned = status === 'COMPLETE' ? cost : '0.00';
		return {
			cost,
			date,
			earned,
			patient: patient_name,
			status,
		};
	});

const Earnings = () => {
	const [earnings, setEarnings] = React.useState<IEarning[]>([]);
	const [loadingEarnings, setLoadingEarnings] = React.useState(false);
	const [patientCount, setPatientCount] = React.useState(0);
	const [totalEarned, setTotalEarned] = React.useState(0);
	const mentorService = new MentorService();

	React.useEffect(() => {
		setLoadingEarnings(true);
		const date = new Date();
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23);
		mentorService
			.getEarnings(firstDay.toISOString(), lastDay.toISOString())
			.then((response) => {
				if (response) {
					setLoadingEarnings(false);
					const items: IResponseEarning[] = response.items;
					const list = mapEarnings(items);
					const total = items.reduce((acc, val) => acc + Number(val.cost), 0);
					setEarnings(list);
					setPatientCount(list.length);
					setTotalEarned(total);
				}
			});
	}, []);

	return (
		<div>
			<div style={headerStyle}>
				<div>
					<Headline1 style={titleStyle}>Gestión de Citas</Headline1>
					{patientCount > 0 && (
						<DescriptionContainer>
							<Body1 weight={LIGHT_TEXT} style={{ fontSize: 18 }}>
								Este mes has atendido a un total de {patientCount} pacientes,
								ganando un total de{' '}
								<Body1 style={{ fontSize: 18 }} color='font_green'>
									S/. {totalEarned.toFixed(2)}
								</Body1>
							</Body1>
						</DescriptionContainer>
					)}
				</div>
			</div>
			<PageContainer>
				<StickyContainer style={{ marginBottom: 70 }}>
					<Sticky topOffset={-80}>
						{({ style }) => {
							return (
								<TableContainer style={{ ...style, top: LAYOUT_HEIGHT }}>
									<TableHeader>
										<Small1 color={FONTS.highlight}>Fecha</Small1>
									</TableHeader>
									<TableHeader>
										<Small1 color={FONTS.highlight}>Paciente</Small1>
									</TableHeader>
									<TableHeader>
										<Small1 color={FONTS.highlight}>Estado</Small1>
									</TableHeader>
									<TableHeader>
										<Small1 color={FONTS.highlight}>Precio consulta</Small1>
									</TableHeader>
									<TableHeader>
										<Small1 color={FONTS.highlight}>Monto ganado</Small1>
									</TableHeader>
								</TableContainer>
							);
						}}
					</Sticky>
					<TableContainer>
						{earnings.length === 0 && !loadingEarnings && (
							<TableFull message={true}>
								<Icon
									name={'alert'}
									style={{
										fill: colors.BACKGROUND_COLORS.background_disabled_button,
										height: 40,
										width: 40,
									}}
								/>
								<Body1 color={FONTS.disabled}>
									Aún no hay citas facturadas para este mes
								</Body1>
							</TableFull>
						)}
						{loadingEarnings && (
							<TableFull>
								<Loader />
							</TableFull>
						)}
					</TableContainer>
					<TableContainerExtraLarge>
						{!loadingEarnings &&
							earnings.map((e: IEarning, i: number) => {
								const fontColor = e.status === 'COMPLETE' ? 'font_green' : '';
								return (
									<div key={`students_list-${i}`}>
										<TableBody>
											<Body1>{e.date}</Body1>
										</TableBody>
										<TableBody>
											<Body1>{e.patient}</Body1>
										</TableBody>
										<TableBody>
											<Body1 color={fontColor}>{e.status}</Body1>
										</TableBody>
										<TableBody>
											<Body1>S/. {e.cost}</Body1>
										</TableBody>
										<TableBody>
											<Body1 color={fontColor}>S/. {e.earned}</Body1>
										</TableBody>
									</div>
								);
							})}
					</TableContainerExtraLarge>
				</StickyContainer>
			</PageContainer>
		</div>
	);
};

export default Earnings;
