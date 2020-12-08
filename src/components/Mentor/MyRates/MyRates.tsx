import * as React from 'react';
import { Sticky, StickyContainer } from 'react-sticky';
import MentorService from 'src/services/Mentor/Mentor.service';
import Icon from '../../../common/Icon/Icon';
import LoaderFullScreen from '../../../common/Loader/LoaderFullsScreen';
import colors, { FONTS } from '../../../common/MentorColor';
import {
	Body1,
	Headline1,
	LIGHT_TEXT,
	Small1,
} from '../../../common/MentorText';
import { LAYOUT_HEIGHT } from '../../../common/Settings';
import { TableFull, TableHeader } from '../../../common/TableMentor';
import { TableBody, TableContainer, TableContainerExtraLarge } from './Styles';

const mentorService = new MentorService();

const MAX_STARS = 5;

const STAR_STYLE = { width: 36, height: 36 };

const renderRate = (rate: number): React.ReactNode[] => {
	const filled = new Array(rate).fill(
		<Icon name='starFilled' style={STAR_STYLE} />,
	);
	const empty = new Array(MAX_STARS - rate).fill(
		<Icon name='star' style={STAR_STYLE} />,
	);
	return [...filled, ...empty];
};

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

const subtitleContainer = {
	margin: '5px auto',
	maxWidth: 350,
	textAlign: 'center' as 'center',
};

const subtitleStyle = {
	fontSize: 20,
};

const rateLabel = {
	display: 'flex',
	flexDirection: 'column' as 'column',
	justifyContent: 'center' as 'center',
};

const MyRates = () => {
	const [loading, setLoading] = React.useState(false);
	const [ratings, setRatings] = React.useState([]);
	const [stars, setStars] = React.useState(0);

	React.useEffect(() => {
		setLoading(true);
		mentorService.getRates().then((response) => {
			setLoading(false);
			if (response) {
				setStars(response.average);
				setRatings(response.ratings);
			}
		});
	}, [0]);

	return (
		<div className='u-LayoutMargin' style={{ padding: '0 35px' }}>
			<div style={headerStyle}>
				<div>
					<Headline1 style={titleStyle}>Comentarios de Pacientes</Headline1>
					<div style={subtitleContainer}>
						<Body1 style={subtitleStyle} weight={LIGHT_TEXT}>
							Tienes {ratings.length} calificaciones de pacientes y en promedio
							un puntaje de {stars}.
						</Body1>
					</div>
				</div>
			</div>
			{loading && (
				<LoaderFullScreen
					text={'Cargando...'}
					styleLoaderContainer={{ marginTop: 300 }}
				/>
			)}
			{!loading && (
				<StickyContainer style={{ marginBottom: 70 }}>
					<Sticky topOffset={-80}>
						{({ style }) => {
							return (
								<TableContainer style={{ ...style, top: LAYOUT_HEIGHT }}>
									<TableHeader>
										<Small1 color={FONTS.highlight}>Calificación</Small1>
									</TableHeader>
									<TableHeader>
										<Small1 color={FONTS.highlight}>Fecha</Small1>
									</TableHeader>
									<TableHeader>
										<Small1 color={FONTS.highlight}>Paciente</Small1>
									</TableHeader>
									<TableHeader>
										<Small1 color={FONTS.highlight}>Comentario</Small1>
									</TableHeader>
								</TableContainer>
							);
						}}
					</Sticky>

					<TableContainer>
						{ratings.length === 0 && (
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
									¡Uy! No encontramos calificaciones para este doctor
								</Body1>
							</TableFull>
						)}
					</TableContainer>
					<TableContainerExtraLarge>
						{ratings.map((rate: any, i: number) => {
							return (
								<div key={`students_list-${i}`}>
									<TableBody>
										<Body1 weight={LIGHT_TEXT} style={{ display: 'flex' }}>
											<div>{renderRate(stars)}</div>
											<div style={rateLabel}>
												<Body1 style={{ fontSize: 20 }} weight={LIGHT_TEXT}>{`${
													rate.rating
												}/5`}</Body1>
											</div>
										</Body1>
									</TableBody>
									<TableBody>
										<Body1 weight={LIGHT_TEXT}>{rate.date}</Body1>
									</TableBody>
									<TableBody>
										<Body1 weight={LIGHT_TEXT}>{rate.patient}</Body1>
									</TableBody>
									<TableBody>
										<Body1 weight={LIGHT_TEXT}>{rate.comment}</Body1>
									</TableBody>
								</div>
							);
						})}
					</TableContainerExtraLarge>
				</StickyContainer>
			)}
		</div>
	);
};

export default MyRates;
