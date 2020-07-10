import * as React from 'react';
import { components } from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import styled from 'styled-components';
import FormLabel from '../FormLabel/FormLabel';
import Icon from '../Icon/Icon';
import colors, { FONTS } from '../MentorColor';
import { LIGHT_TEXT, Small1 } from '../MentorText';
import { MentorTypeAheadTheme } from './MentorTypeAhead.theme';

export interface IPropsMentorOptionsDropDown {
	label: string;
	value: string;
	disabled?: boolean;
}

export interface IPropsMentorTypeAhead {
	options?: IPropsMentorOptionsDropDown[];
	label?: string;
	disabled?: boolean;
	empty?: boolean;
	error?: string;
	placeholder?: string;
	value?: string | string[];
	name: string;
	info?: string;
	isMulti?: boolean;
	style?: React.CSSProperties;
	onBlur?: (e: any) => {};
	loadOptions: (value: string) => Promise<any>;
	triggerChange(
		name: string,
		option: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[],
	): void;
}

const CustomDropdown = styled.div`
	position: relative;
`;

const DropdownIndicator = (error: boolean, disabled: boolean) => {
	return (props: any) => {
		let color = colors.BACKGROUND_COLORS.background_green;
		if (disabled) {
			color = colors.BACKGROUND_COLORS.background_disabled;
		} else if (error) {
			color = colors.TEXT_COLORS.font_error;
		}
		return (
			<Icon
				name={'arrow-down'}
				style={{ fill: color, alignSelf: 'flex-end', marginBottom: 7 }}
			/>
		);
	};
};

const MultiValueRemove = (props: any) => {
	return (
		<components.MultiValueRemove {...props}>
			<Icon
				name={'close'}
				style={{
					fill: colors.TEXT_COLORS.font_blue_grey,
					height: 11,
					width: 11,
				}}
			/>
		</components.MultiValueRemove>
	);
};

class MentorTypeAhead extends React.Component<IPropsMentorTypeAhead, {}> {
	public static defaultProps = {
		disabled: false,
	};

	constructor(props: IPropsMentorTypeAhead) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	public render() {
		const { options, name } = this.props;
		const value =
			options &&
			options.filter((option) => {
				let isSelected = false;
				if (Array.isArray(this.props.value)) {
					isSelected = this.props.value.indexOf(option.value) !== -1;
				} else {
					isSelected = option.value === this.props.value;
				}
				return isSelected;
			});
		return (
			<CustomDropdown style={{ ...this.props.style }}>
				{this.props.label && (
					<FormLabel
						label={this.props.label}
						info={this.props.info}
						uppercase={true}
					/>
				)}
				<AsyncSelect
					cacheOptions={true}
					isDisabled={!!this.props.disabled}
					isClearable={false}
					styles={MentorTypeAheadTheme.baseStyle(
						!!this.props.error,
						!!this.props.disabled,
						!!this.props.empty,
					)}
					placeholder={this.props.placeholder || ''}
					name={name}
					onBlur={this.props.onBlur}
					onChange={this.handleChange}
					isMulti={!!this.props.isMulti}
					noOptionsMessage={this.noOptions}
					loadingMessage={this.loading}
					components={{
						DropdownIndicator: DropdownIndicator(
							!!this.props.error,
							!!this.props.disabled,
						),
						MultiValueRemove,
					}}
					loadOptions={this.props.loadOptions}
					value={value}
				/>
				{!!this.props.error && (
					<Small1
						weight={LIGHT_TEXT}
						color={FONTS.error}
						style={{
							bottom: -16,
							left: 0,
							position: 'absolute',
						}}
					>
						{this.props.error}
					</Small1>
				)}
			</CustomDropdown>
		);
	}

	private noOptions() {
		return 'Sin opciones';
	}

	private loading() {
		return 'Cargando...';
	}

	private handleChange(
		selectedOption: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[],
		{ action, removedValue }: any,
	) {
		switch (action) {
			case 'remove-value':
			case 'pop-value':
				if (!!removedValue.disabled) {
					return;
				}
				break;
		}
		this.props.triggerChange(this.props.name, selectedOption);
	}
}

export default MentorTypeAhead;
