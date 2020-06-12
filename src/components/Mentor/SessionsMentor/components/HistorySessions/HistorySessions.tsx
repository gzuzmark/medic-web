import * as React from 'react';
import { Heading2 } from '../../../../../common/MentorText';
import './HistorySessions.scss';

interface ITabObject {
	title: string;
	component: JSX.Element;
}

interface IPropsHistorySessions {
	tabs: ITabObject[];
}

const TAB_ACTIVE_CLASS = 'HistorySessions_active';

const HistorySessions: React.FC<IPropsHistorySessions> = React.memo(
	({ tabs }) => {
		if (tabs.length === 0) {
			return null;
		}
		const [activeTab, setActiveTab] = React.useState(0);

		const setClassActive = (tabIndex: number) =>
			tabIndex === activeTab ? TAB_ACTIVE_CLASS : '';

		const buildTabButtons = () => (
			<div className='HistorySessions_buttonsContainer'>
				{tabs.map((tab: ITabObject, i: number) => {
					const handleClickTab = () => setActiveTab(i);
					return (
						<Heading2
							key={`tabTitle_${i}`}
							className={setClassActive(i)}
							onClick={handleClickTab}
						>
							{tab.title}
						</Heading2>
					);
				})}
			</div>
		);

		const buildTabContent = () =>
			tabs
				.filter((_: ITabObject, i: number) => i === activeTab)
				.map((tab: ITabObject) => (
					<div key={`content_${tab.title}`}>{tab.component}</div>
				));

		return (
			<div className='HistorySessions'>
				{buildTabButtons()}
				{buildTabContent()}
			</div>
		);
	},
);

export default HistorySessions;
