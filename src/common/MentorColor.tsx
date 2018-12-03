"use strict";

/* Color Definitions
============================================================================= */

const PRIMARY_COLORS = {
    indigo_purple: '#561cac',
    red: '#d0516a'
};

const SECONDARY_COLORS = {
    dark_gray: '#4a4a4a',
    indigo_dark_purple: '#3F0B8C',
    indigo_light_purple: '#773AD1',
    medium_grey: '#696d6e',
    white: '#ffffff',
};

const MISC = {
    light_grey: '#adb7c4',
    lightest_grey: '#e6edf2',
    red_soft: '#ff8389'
};

const MISC_COLORS = {
    dark_purple: SECONDARY_COLORS.indigo_dark_purple,
    light_purple: SECONDARY_COLORS.indigo_light_purple
};

const TEXT_COLORS = {
    font_dark: SECONDARY_COLORS.dark_gray,
    font_disabled: MISC.light_grey,
    font_error: MISC.red_soft,
    font_light: SECONDARY_COLORS.white,
    font_medium: SECONDARY_COLORS.medium_grey,
};

const BACKGROUND_COLORS = {
    background_disabled: MISC.lightest_grey,
    background_purple: PRIMARY_COLORS.indigo_purple,
    background_red: PRIMARY_COLORS.red,
    background_white: SECONDARY_COLORS.white,
};

/* Exports
============================================================================= */
interface IMentorColor {
    BACKGROUND_COLORS: {
        background_disabled: string;
        background_purple: string;
        background_red: string;
        background_white: string;
    },
    MISC_COLORS: {
        dark_purple: string;
        light_purple: string;
    }
    TEXT_COLORS: {
        font_dark: string;
        font_disabled: string;
        font_error: string;
        font_light: string;
        font_medium: string;
    }
};

const colors: IMentorColor = {
    BACKGROUND_COLORS,
    MISC_COLORS,
    TEXT_COLORS // pass through all theme colors (named and by-purpose)
};

export const FONTS = {
    dark: 'font_dark',
    disabled: 'font_disabled',
    error: 'font_error',
    medium: 'font_medium'
};

export default colors;
