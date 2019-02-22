import * as React from "react";
import Select, {components}  from 'react-select';
import styled from "styled-components";
import FormLabel from "../FormLabel/FormLabel";
import Icon from "../Icon/Icon";
import colors, {FONTS} from "../MentorColor";
import {LIGHT_TEXT, Small1} from '../MentorText';
import {MentorDropDownTheme} from "./MentorDropDown.theme";

export interface IPropsMentorOptionsDropDown {
    label: string;
    value: string;
}

export interface IPropsMentorDropDown {
    options: IPropsMentorOptionsDropDown[];
    label?: string;
    disabled?: boolean;
    error?: string;
    placeholder?: string;
    isSearchable?: boolean;
    value?: string | string[];
    name: string;
    info?: string;
    isMulti?: boolean;
    style?: React.CSSProperties;
    triggerChange(name: string, option: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[]):void;
}

const CustomDropdown = styled.div`
  position: relative;
`;

const DropdownIndicator = (error: boolean, disabled: boolean) => {
    return (props: any) => {
        let color = colors.BACKGROUND_COLORS.background_purple;
        if (disabled) {
            color = colors.BACKGROUND_COLORS.background_disabled;
        } else if (error){
            color = colors.TEXT_COLORS.font_error;
        }
        return (
            <Icon name={"arrow-down"}
                  style={{fill: color, alignSelf: 'flex-end', marginBottom: 7}}/>
        );
    }
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
        this.handleChange = this.handleChange.bind(this);
    }

    public render() {
        const {options, name} = this.props;
        const value = options.filter(option => {
            let isSelected = false;
            if (Array.isArray(this.props.value)) {
                isSelected = this.props.value.indexOf(option.value) !== -1;
            } else {
                isSelected = option.value === this.props.value;
            }
            return isSelected;
        });
        return (
            <CustomDropdown style={{...this.props.style}}>
                <FormLabel label={this.props.label} info={this.props.info} uppercase={true}/>
                <Select
                    isDisabled={!!this.props.disabled}
                    isSearchable={!!this.props.isSearchable}
                    isClearable={false}
                    styles={MentorDropDownTheme.baseStyle(!!this.props.error, !!this.props.disabled)}
                    placeholder={this.props.placeholder || ''}
                    name={name}
                    onChange={this.handleChange}
                    isMulti={!!this.props.isMulti}
                    noOptionsMessage={this.noOptions}
                    components={
                        { DropdownIndicator: DropdownIndicator(!!this.props.error, !!this.props.disabled),
                          MultiValueRemove}}
                    options={options}
                    value={value}/>
                {!!this.props.error &&
                    <Small1 weight={LIGHT_TEXT} color={FONTS.error} style={{
                        bottom: -16,
                        left: 0,
                        position: 'absolute'}}>
                        {this.props.error}
                    </Small1>}
            </CustomDropdown>
        );
    }

    private noOptions() {
        return "Sin opciones";
    }

    private handleChange(selectedOption: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[]) {
        this.props.triggerChange(this.props.name, selectedOption);
    }
}


export default MentorDropDown;
