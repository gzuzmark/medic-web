import { IPropsMentorOptionsDropDown } from '../../../../../../common/MentorDropDown/MentorDropDown';
import { SAPCODE_SEPARATOR } from '../../../../../../domain/Session/SessionEditPatientHistory';

export interface IMappedText {
	id: string;
	value: string;
}

interface IOptionBuilder {
	mapper: (
		value: string,
		id: string,
	) => IPropsMentorOptionsDropDown | IMappedText;
	getter: (option: IPropsMentorOptionsDropDown | IMappedText) => any;
	comparer: (
		value: string,
	) => (option: IPropsMentorOptionsDropDown | IMappedText) => boolean;
}

interface IOptionTypes {
	dropdown: IOptionBuilder;
	input: IOptionBuilder;
}

export interface IProductInfo {
	concentrations: IPropsMentorOptionsDropDown[];
	administrationRoutes: IPropsMentorOptionsDropDown[];
	pharmaceuticalForms: IPropsMentorOptionsDropDown[];
	brands: IPropsMentorOptionsDropDown[];
	salesUnit: IMappedText[];
}

export const FIELD_BUILDER_TYPES: IOptionTypes = {
	dropdown: {
		comparer: (value: string) => (option: IPropsMentorOptionsDropDown) =>
			option.label === value,
		getter: ({ label, value }: IPropsMentorOptionsDropDown) => ({
			key: value,
			value: label,
		}),
		mapper: (value: string, id: string): IPropsMentorOptionsDropDown => ({
			label: value,
			value: id,
		}),
	},
	input: {
		comparer: (value: string) => (option: IMappedText) =>
			option.value === value,
		getter: ({ value, id }: IMappedText) => ({ key: id, value }),
		mapper: (value: string, id: string): IMappedText => ({
			id,
			value,
		}),
	},
};

export const areSKUsOnValue = (
	skuList: string[],
	type: string = 'dropdown',
) => (option: IPropsMentorOptionsDropDown | IMappedText) => {
	const { getter } = FIELD_BUILDER_TYPES[type];
	const { key: value } = getter(option);
	const currentSKUList = getSKUList(value);
	const currentSKUSet = new Set(currentSKUList);
	return new Set(skuList.filter((s: string) => currentSKUSet.has(s))).size > 0;
};

export const getInfoFromSKUList = (
	skuList: string[] | null,
	info: IProductInfo,
) => {
	if (!skuList) {
		return {
			...info,
			brandsOptions: info.brands,
		};
	}
	const concentrations = info.concentrations.filter(areSKUsOnValue(skuList));
	const administrationRoutes = info.administrationRoutes.filter(
		areSKUsOnValue(skuList),
	);
	const pharmaceuticalForms = info.pharmaceuticalForms.filter(
		areSKUsOnValue(skuList),
	);
	const brandsOptions = info.brands.filter(areSKUsOnValue(skuList));
	const salesUnit = info.salesUnit.filter(areSKUsOnValue(skuList, 'input'));

	return {
		administrationRoutes,
		brandsOptions,
		concentrations,
		pharmaceuticalForms,
		salesUnit,
	};
};

export const buildDropdownOptions = (
	data: any[],
	key: string,
	builder: IOptionBuilder,
): IPropsMentorOptionsDropDown[] | IMappedText[] => {
	const { mapper, getter, comparer } = builder;
	return data
		.map((d) => mapper(d[key], d.skuSap))
		.reduce((acc: any[], option: any) => {
			const { key: skuSap, value: label } = getter(option);
			// Find the index of the current label in the new array
			const indexOfLabel = acc.findIndex(comparer(label));
			const isLabelOnArray = !!acc.length && indexOfLabel >= 0;
			if (isLabelOnArray) {
				// if is on the new array
				// Getting the accumulated key
				const { key: curId } = getter(acc[indexOfLabel]);
				// Appending the sku sap with the accumulated identificato
				const newId = `${skuSap}_${curId}`;
				// Modifying the id param specific object in the new array based on the index found
				acc[indexOfLabel] = mapper(label, newId);
				return acc;
			} else {
				// if is not on the new array (first time)
				// Appending the sku sap code with the original label
				const newId = `${skuSap}_${label}`;
				// Adding the new element
				return [...acc, mapper(label, newId)];
			}
		}, []);
};

export const mapResponse = (
	data: string[],
	id: string = '',
): IPropsMentorOptionsDropDown[] => {
	return data.map(
		(value) =>
			({
				label: value,
				value: id ? `${id}_${value}` : value,
			} as IPropsMentorOptionsDropDown),
	);
};

export const getSKUList = (value: string): string[] => {
	return value
		.split(SAPCODE_SEPARATOR)
		.filter((_: string, i: number, src: any[]) => i !== src.length - 1);
};

export const arrayIntersection = (a1: string[] | null, a2: string[] | null) => {
	if (!a1 && !!a2) {
		return a2;
	}
	if (!a2 && !!a1) {
		return a1;
	}
	return (a1 || []).filter((v) => (a2 || []).includes(v));
};
