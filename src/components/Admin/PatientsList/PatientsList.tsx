import * as React from 'react';
import { ButtonNormal } from '../../../common/Buttons/Buttons';
import FormColumn from '../../../common/FormRow/components/FormColumn/FormColumn';
import FormRow from '../../../common/FormRow/FormRow';
import MenuAside from '../../../common/Layout/components/MenuAside/MenuAside';
import Layout from '../../../common/Layout/Layout';
import ListHeader from '../../../common/List/ListHeader';
import Loader from '../../../common/Loader/Loader';
import colors, { FONTS } from '../../../common/MentorColor';
import MentorInput from '../../../common/MentorInput/MentorInput';
import { Headline1 } from '../../../common/MentorText';
import Sticky from '../../../common/Sticky/Sticky';
import { ISessionPatient } from '../../../domain/Session/SessionMentorBean';
import StudentService from '../../../services/Student/Student.service';
import FormSection from '../ScheduleSession/components/FormSection/FormSection';
import ListPatientsBody from './components/ListPatientsBody/ListPatientsBody';
import './PatientsList.scss';

const DEFAULT_STICKY_HEIGHT = 220;
const DEFAULT_STICKY_TOP = 80;
const TABLE_HEADER_TEXTS = [
	'DNI O CE',
	'NOMBRE',
	'APELLIDO',
	'CELULAR',
	'EMAIL',
];

const PatientsList: React.FC<{}> = () => {
	const [query, setQuery] = React.useState<string>('');
	const [patients, setPatients] = React.useState<ISessionPatient[]>([]);
	const [filteredPatients, setFilteredPatients] = React.useState<
		ISessionPatient[]
	>([]);
	const [loading, setLoading] = React.useState<boolean>(false);

	const studentService = new StudentService();

	const handleQueryChange = (e: any) => {
		const value = e.target.value;
		setQuery(value);
		if (!value) {
			setFilteredPatients([...patients]);
		}
	};
	const handleQueryBlur = (e: any) => {
		const value = e.target.value;
		if (!value) {
			setFilteredPatients([...patients]);
		}
	};

	const handleQuerySearch = () => {
		setLoading(true);
		const filteredPatient = patients.filter(
			(patient: ISessionPatient) => patient.document_number === query.trim()
		);
		setFilteredPatients(filteredPatient);
		setLoading(false);
	};

	React.useEffect(() => {
		setLoading(true);
		studentService
			.list()
			.then((list: ISessionPatient[]) => {
				setLoading(false);
				setPatients(list);
				setFilteredPatients(list);
			})
			.catch(() => {
				setLoading(false);
				setPatients([]);
				setFilteredPatients([]);
			});
		return () => {
			window.scrollTo(0, 0);
		};
	}, []);

	const renderTopMenu = () => (
		<Sticky
			height={DEFAULT_STICKY_HEIGHT}
			top={DEFAULT_STICKY_TOP}
			style={{ background: 'white' }}
		>
			<MenuAside
				icon={'user'}
				items={[{ text: 'Pacientes', url: '/pateints' }]}
			/>
			<div className="u-LayoutMargin u-ListPatients_padding ListPatients_sticky">
				<FormSection style={{ display: 'block' }} itemStyle={{ width: 650 }}>
					<FormRow
						columns={[
							<FormColumn key="queryInput" width={2}>
								<MentorInput
									disabled={patients.length === 0}
									attrs={{
										maxLength: 11,
										onBlur: handleQueryBlur,
										onChange: handleQueryChange,
										placeholder: 'Ingresa el DNI o CE del paciente',
										value: query,
									}}
								/>
							</FormColumn>,
							<FormColumn key="searchButton" width={3}>
								<ButtonNormal
									text={'Buscar'}
									attrs={{ onClick: handleQuerySearch }}
								/>
							</FormColumn>,
						]}
					/>
				</FormSection>
			</div>
			<ListHeader header={TABLE_HEADER_TEXTS} baseClass="ListPatients" />
		</Sticky>
	);

	const listPatients = () => {
		const noResults = !loading && filteredPatients.length === 0;
		const renderNoResults = () => (
			<div className="ListPatients_row ListPatients_row--center">
				<Headline1 color={FONTS.medium}>No hay resultados</Headline1>
			</div>
		);
		const renderLoader = () => (
			<div className="ListPatients_row ListPatients_row--center">
				<Loader />
			</div>
		);

		return (
			<div className="ListPatients_body u-LayoutMargin">
				{!loading && noResults && renderNoResults()}
				{loading && noResults && renderLoader()}
				{filteredPatients.length > 0 &&
					filteredPatients.map((item) => {
						const withRowStyle = {
							borderBottom: `1px solid ${colors.MISC_COLORS.background_grey_2}`,
						};
						return (
							<div
								key={'list-patient-row' + item.id}
								className={`ListPatients_row ListPatients_row--border u-ListPatients_padding`}
								style={{ ...withRowStyle }}
							>
								<ListPatientsBody patient={item} />
							</div>
						);
					})}
			</div>
		);
	};

	return (
		<Layout menu={renderTopMenu()}>
			<div className="ListPatients">
				{loading && (
					<div className="ListPatients_row ListPatients_row--center">
						<Loader />
					</div>
				)}
				{listPatients()}
			</div>
		</Layout>
	);
};

export default PatientsList;
