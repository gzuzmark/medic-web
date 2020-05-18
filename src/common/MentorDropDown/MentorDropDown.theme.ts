import colors from "../MentorColor";
import {DEFAULT_WEIGHT, defaultFont, LIGHT_TEXT} from "../MentorText";

const baseFont = {
    fontFamily: defaultFont,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: LIGHT_TEXT,
    lineHeight: '20px'
};

const baseStyle = (error: boolean, disabled: boolean, empty?: boolean)  => {
    return {
        control: (provided: any, state: any) => {
            const minHeight = 40;
            let borderColor = `${state.isFocused ? colors.MISC_COLORS.dark : colors.MISC_COLORS.background_grey_2}!important`;
            if (disabled) {
                borderColor = `${colors.BACKGROUND_COLORS.background_disabled}!important`;
            } else if (error) {
                borderColor = `${colors.TEXT_COLORS.font_error}!important`;
            } else if (!!empty) {
                borderColor = `${colors.TEXT_COLORS.font_error}!important`;
            }
            const transition = 'border 0.2s ease-in';
            const backgroundColor = `${state.isFocused ? colors.BACKGROUND_COLORS.background_white : 'transparent'}`;
            const boxShadow = "none";
            const cursor = "pointer";
            return { ...provided, backgroundColor, borderColor, boxShadow, minHeight, transition, cursor};
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
            const backgroundColor = state.data.disabled ?
                colors.BACKGROUND_COLORS.background_disabled : colors.MISC_COLORS.background_grey_1;
            return{...provided, display, flexDirection, backgroundColor};
        },
        multiValueLabel: (provided: any, state: any) => {
            const paddingRight = 6;
            const paddingLeft = state.data.disabled ? 6 : 0;
            const color = state.data.disabled ?
                colors.TEXT_COLORS.font_disabled : colors.TEXT_COLORS.font_blue_grey;
            return {...provided, ...baseFont, color, paddingLeft, paddingRight};
        },
        multiValueRemove: (provided: any, state: any) => {
            const cursor = 'pointer';
            const backgroundColor = 'transparent!important';
            const display = state.data.disabled ? 'none' : 'flex';
            return{...provided, backgroundColor, cursor, display};
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
            const backgroundColorActive = colors.BACKGROUND_COLORS.background_green;
            const colorActive = colors.BACKGROUND_COLORS.background_white;
            const cursor = "pointer";
            const fontFamily = DEFAULT_WEIGHT;
            const display = 'flex';
            const justifyContent = 'flex-start';
            const active = {backgroundColor: backgroundColorActive, color: colorActive};
            return {...provided, ...baseFont, backgroundColor, cursor, color, fontFamily, ":active": active, display, justifyContent}
        },
        placeholder: (provided: any, state: any) => {
            let color = colors.TEXT_COLORS.font_blue_grey;
            if (disabled) {
                color = colors.TEXT_COLORS.font_disabled;
            }
            const transition = "color 0.2s ease-in";
            return { ...provided, color, transition, ...baseFont};
        },
        valueContainer: (provided: any, state: any) => {
            return {...provided, ...baseFont}
        }
    }
};

export const MentorDropDownTheme = {
    baseStyle
};
