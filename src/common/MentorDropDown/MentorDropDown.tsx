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
    disabled?: boolean
}

export interface IPropsMentorDropDown {
    options: IPropsMentorOptionsDropDown[];
    label?: string;
    disabled?: boolean;
    empty?: boolean;
    error?: string;
    placeholder?: string;
    isSearchable?: boolean;
    isClearable?: boolean;
    value?: string | string[];
    name: string;
    info?: string;
    isMulti?: boolean;
    style?: React.CSSProperties;
    lowercaseLabel?: boolean;
    onBlur?: (e: any) => {};
    triggerChange(name: string, option: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[]):void;
}

const CustomDropdown = styled.div`
  position: relative;
`;

const DropdownIndicator = (error: boolean, disabled: boolean) => {
    return (props: any) => {
        let color = colors.BACKGROUND_COLORS.background_green;
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
                isSelected = !!this.props.value && option.value.includes(this.props.value);
            }
            return isSelected;
        });
        return (
            <CustomDropdown style={{...this.props.style}}>
                {this.props.label && <FormLabel label={this.props.label} info={this.props.info} uppercase={!this.props.lowercaseLabel}/>}
                <Select
                    isDisabled={!!this.props.disabled}
                    isSearchable={!!this.props.isSearchable}
                    isClearable={!!this.props.isClearable}
                    styles={MentorDropDownTheme.baseStyle(!!this.props.error, !!this.props.disabled, !!this.props.empty)}
                    placeholder={this.props.placeholder || ''}
                    name={name}
                    onBlur={this.props.onBlur}
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

    private handleChange(selectedOption: IPropsMentorOptionsDropDown | IPropsMentorOptionsDropDown[], { action, removedValue }: any) {
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


export default MentorDropDown;
