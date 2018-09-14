"use strict";

/* Color Definitions
============================================================================= */

const NAMED_COLORS = {
    blueMetal: 'rgb(74, 144, 226)',
    greyDark: 'rgb(112, 112, 112)',
    greyLight: 'rgb(193, 193, 193)',
    orangeDark: 'rgb(245, 166, 35)',
    purpleDark: 'rgb(62, 38, 143)',
    purpleLight: 'rgb(144, 19, 254)',
    white: 'rgb(255, 255, 255)',
};

const TEXT_COLORS = {
    ...NAMED_COLORS,
    actionColor: NAMED_COLORS.purpleDark,
    textLight: NAMED_COLORS.white,
    textNormal: NAMED_COLORS.greyDark,
    textNormalSoft: NAMED_COLORS.greyLight,

};


/* Exports
============================================================================= */

export default {
    TEXT_COLORS, // pass through all theme colors (named and by-purpose)

    colorWithAlpha(name: string = "softorange", opacity: number = 1) {
        if (!TEXT_COLORS[name]) {
            name = "blue";
        }
        return TEXT_COLORS[name].split(", 1)").join(`, ${opacity})`);
    }
};
