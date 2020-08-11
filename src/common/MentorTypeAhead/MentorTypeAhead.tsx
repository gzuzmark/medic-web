import * as React from 'react';
import { components, Creatable } from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import { InputActionMeta, OptionsType } from 'react-select/lib/types';
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
	lowercaseLabel?: boolean;
	creatable?: boolean;
	isClearable?: boolean;
	defaultOptions?:
		| boolean
		| OptionsType<IPropsMentorOptionsDropDown>
		| undefined;
	inputValue?: string | undefined;
	onBlur?: (e: any) => {};
	loadOptions?: (value: string) => Promise<any>;
	handleInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
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
		const propsValue = this.props.value || '';
		let creatableValue = '' as string | any;
		if (propsValue) {
			creatableValue =
				value && value.length > 0
					? value
					: ({
							label: propsValue,
							value: propsValue,
					  } as IPropsMentorOptionsDropDown);
		}
		return (
			<CustomDropdown style={{ ...this.props.style }}>
				{this.props.label && (
					<FormLabel
						label={this.props.label}
						info={this.props.info}
						uppercase={!this.props.lowercaseLabel}
					/>
				)}
				{!!this.props.creatable && (
					<Creatable
						isDisabled={!!this.props.disabled}
						isClearable={!!this.props.isClearable}
						styles={MentorTypeAheadTheme.baseStyle(
							!!this.props.error,
							!!this.props.disabled,
							!!this.props.empty,
						)}
						placeholder={this.props.placeholder || ''}
						name={name}
						onBlur={this.props.onBlur}
						onChange={this.handleChange}
						onInputChange={this.props.handleInputChange}
						options={this.props.options}
						isMulti={!!this.props.isMulti}
						noOptionsMessage={this.noOptions}
						loadingMessage={this.loading}
						defaultInputValue={this.props.inputValue}
						components={{
							DropdownIndicator: DropdownIndicator(
								!!this.props.error,
								!!this.props.disabled,
							),
							MultiValueRemove,
						}}
						value={creatableValue}
					/>
				)}
				{!this.props.creatable && (
					<AsyncSelect
						cacheOptions={true}
						isDisabled={!!this.props.disabled}
						isClearable={!!this.props.isClearable}
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
						defaultOptions={this.props.defaultOptions}
						maxMenuHeight={250}
						components={{
							DropdownIndicator: DropdownIndicator(
								!!this.props.error,
								!!this.props.disabled,
							),
							MultiValueRemove,
						}}
						loadOptions={this.props.loadOptions}
						value={value}
						defaultInputValue={this.props.inputValue}
					/>
				)}
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
