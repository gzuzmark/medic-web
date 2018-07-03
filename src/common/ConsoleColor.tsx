"use strict";

/* Color Definitions
============================================================================= */

const NAMED_COLORS = {
    greyDark: 'rgb(112, 112, 112)',
    greyLight: 'rgb(193, 193, 193)',
    white: 'rgb(255, 255, 255)'
};

const TEXT_COLORS = {
    ...NAMED_COLORS,
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
