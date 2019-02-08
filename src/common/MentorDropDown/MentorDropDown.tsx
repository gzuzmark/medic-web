import * as React from "react";
import Select, {components}  from 'react-select';
import styled from "styled-components";
import Icon from "../Icon/Icon";
import colors, {FONTS} from "../MentorColor";
import {DEFAULT_WEIGHT, defaultFont, LIGHT_TEXT, Small1} from '../MentorText';

export interface IPropsMentorOptionsDropDown {
    label: string;
    value: string;
}

export interface IPropsMentorDropDown {
    options: IPropsMentorOptionsDropDown[];
    label?: string;
    error?: string;
    placeholder?: string;
    isSearchable?: boolean;
    value?: string;
    name: string;
    isMulti?: boolean;
    triggerChange(name: string, option: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[]):void;
}

const CustomDropdown = styled.div`
  position: relative;
`;

const baseFont = {
    fontFamily: defaultFont,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: LIGHT_TEXT,
    lineHeight: '20px'
};

const baseStyle = (error: boolean)  => {
    return {
            control: (provided: any, state: any) => {
                const minHeight = 40;
                let borderColor = `${state.isFocused ? colors.MISC_COLORS.dark : colors.MISC_COLORS.background_grey_2}!important`;
                if (error) {
                   borderColor = colors.TEXT_COLORS.font_error;
                }
                const transition = 'border 0.2s ease-in';
                const backgroundColor = `${state.isFocused ? colors.BACKGROUND_COLORS.background_white : 'transparent'}`;
                const boxShadow = "none";
                return { ...provided, backgroundColor, borderColor, boxShadow, minHeight, transition};
            },
            indicatorSeparator: () => {
                return{}
            },
            indicatorsContainer: (provided: any, state: any) => {
                const marginRight = 8;
                return{...provided, marginRight}
            },
            multiValue: (provided: any, state: any) => {
                const display = 'flex';
                const flexDirection = 'row-reverse';
                const backgroundColor = colors.MISC_COLORS.background_grey_1;
                return{...provided, display, flexDirection, backgroundColor};
            },
            multiValueLabel: (provided: any, state: any) => {
                const paddingRight = 6;
                const paddingLeft = 0;
                const color = colors.TEXT_COLORS.font_blue_grey;
                return{...provided, ...baseFont, color, paddingLeft, paddingRight};
            },
            multiValueRemove: (provided: any, state: any) => {
                const cursor = 'pointer';
                const backgroundColor = 'transparent!important';
                return{...provided, backgroundColor, cursor};
            },
            noOptionsMessage: (provided: any, state: any) => {
                const height = 42;
                const display = 'flex';
                const alignItems = 'center';
                return{...provided, alignItems, display, height};
            },
            option: (provided: any, state: any) => {
                let backgroundColor = colors.BACKGROUND_COLORS.background_white;
                if (state.isFocused) {
                    backgroundColor = colors.MISC_COLORS.background_grey_1;
                }
                const color = colors.TEXT_COLORS.font_blue_grey;
                const backgroundColorActive = colors.BACKGROUND_COLORS.background_purple;
                const colorActive = colors.BACKGROUND_COLORS.background_white;
                const cursor = "pointer";
                const fontFamily = DEFAULT_WEIGHT;
                const active = {backgroundColor: backgroundColorActive, color: colorActive};
                return {...provided, ...baseFont, backgroundColor, cursor, color, fontFamily, ":active": active}
            },
            placeholder: (provided: any, state: any) => {
                const color = colors.TEXT_COLORS.font_blue_grey;
                const transition = "color 0.2s ease-in";
                return { ...provided, color, transition, ...baseFont};
            },
            valueContainer: (provided: any, state: any) => {

                return {...provided, ...baseFont}
            }
        }
};

const DropdownIndicatorNormal = (props: any) => {
    return (
        <Icon name={"arrow-down"}
              style={{fill: colors.BACKGROUND_COLORS.background_purple, alignSelf: 'flex-end', marginBottom: 7}}/>
    );
};

const DropdownIndicatorError = (props: any) => {
    return (
        <Icon name={"arrow-down"}
              style={{fill: colors.TEXT_COLORS.font_error, alignSelf: 'flex-end', marginBottom: 7}}/>
    );
};

const MultiValueRemove = (props: any) => {
    return (
        <components.MultiValueRemove {...props}>
            <Icon name={"close"} style={{fill: colors.TEXT_COLORS.font_blue_grey, height: 11, width: 11}}/>
        </components.MultiValueRemove>
    );
};

class MentorDropDown extends React.Component<IPropsMentorDropDown, {}> {
    public static defaultProps = {
        disabled: false
    };

    constructor(props: IPropsMentorDropDown) {
        super(props);
        this.state = {
            focus: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    public render() {
        const {options, name} = this.props;
        const value = options.find(option => option.value === this.props.value);
        return (
            <CustomDropdown>
                {!!this.props.label &&
                <label>
                    <Small1 style={{marginBottom: 3, display: 'block'}}>{this.props.label}</Small1>
                </label>}
                <Select
                    isSearchable={!!this.props.isSearchable}
                    isClearable={false}
                    styles={baseStyle(!!this.props.error)}
                    placeholder={this.props.placeholder || ''}
                    name={name}
                    onChange={this.handleChange}
                    isMulti={!!this.props.isMulti}
                    noOptionsMessage={this.noOptions}
                    components={
                        { DropdownIndicator: !!this.props.error ? DropdownIndicatorError : DropdownIndicatorNormal,
                          MultiValueRemove}}
                    options={options}
                    value={value}/>
                {!!this.props.error &&
                    <Small1 weight={LIGHT_TEXT} color={FONTS.error}>{this.props.error}</Small1>}
            </CustomDropdown>
        );
    }

    private noOptions() {
        return "Sin opciones";
    }

    private handleChange(selectedOption: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[]) {
        // tslint:disable:no-console
        console.log(selectedOption)
        this.props.triggerChange(this.props.name, selectedOption);
    }
}


export default MentorDropDown;
