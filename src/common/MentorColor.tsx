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
    blue: '#81a8d2',
    blue_grey: "#f9fbff",
    light_grey_1: '#adb7c4',
    light_grey_2: '#e6edf2',
    light_grey_3: '#eef2f6',
    light_grey_4: '#ccd6dc',
    red_soft: '#ff8389'
};

const MISC_COLORS = {
    background_blue: MISC.blue_grey,
    background_grey_1: MISC.light_grey_3,
    background_grey_2: MISC.light_grey_4,
    blue: MISC.blue,
    dark: SECONDARY_COLORS.dark_gray,
    dark_purple: SECONDARY_COLORS.indigo_dark_purple,
    light_purple: SECONDARY_COLORS.indigo_light_purple
};

const TEXT_COLORS = {
    font_blue: MISC.blue,
    font_dark: SECONDARY_COLORS.dark_gray,
    font_disabled: MISC.light_grey_1,
    font_error: MISC.red_soft,
    font_grey: MISC_COLORS.background_grey_1,
    font_highlight: MISC.blue,
    font_light: SECONDARY_COLORS.white,
    font_medium: SECONDARY_COLORS.medium_grey,
};

const BACKGROUND_COLORS = {
    background_disabled: MISC.light_grey_2,
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
        blue: string;
        dark: string
        dark_purple: string;
        light_purple: string;
        background_blue: string;
        background_grey_1: string;
        background_grey_2: string;
    }
    TEXT_COLORS: {
        font_blue: string;
        font_dark: string;
        font_disabled: string;
        font_highlight: string;
        font_error: string;
        font_light: string;
        font_medium: string;
        font_grey: string;
    }
};

const colors: IMentorColor = {
    BACKGROUND_COLORS,
    MISC_COLORS,
    TEXT_COLORS // pass through all theme colors (named and by-purpose)
};

export const FONTS = {
    blue: 'font_blue',
    dark: 'font_dark',
    disabled: 'font_disabled',
    error: 'font_error',
    grey: 'font_grey',
    highlight: 'font_highlight',
    medium: 'font_medium'
};

export default colors;
