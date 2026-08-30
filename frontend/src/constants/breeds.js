export const BREEDS = {
  cattle: [
    { id: "boran", label: "Boran" },
    { id: "friesian", label: "Friesian" },
    { id: "ayrshire", label: "Ayrshire" },
    { id: "sahiwal", label: "Sahiwal" },
    { id: "zebu", label: "Zebu" },
    { id: "hereford", label: "Hereford" },
    { id: "angus", label: "Angus" },
  ],
  goat: [
    { id: "galla", label: "Galla" },
    { id: "boer", label: "Boer" },
    { id: "saanen", label: "Saanen" },
    { id: "toggenburg", label: "Toggenburg" },
    { id: "alpine", label: "Alpine" },
    { id: "nubian", label: "Nubian" },
    { id: "jamnapari", label: "Jamnapari" },
  ],
  sheep: [
    { id: "dorper", label: "Dorper" },
    { id: "hampshire", label: "Hampshire" },
    { id: "suffolk", label: "Suffolk" },
    { id: "merino", label: "Merino" },
    { id: "corriedale", label: "Corriedale" },
  ],
  poultry: [
    { id: "broiler", label: "Broiler" },
    { id: "layers", label: "Layers" },
    { id: "kienyeji", label: "Kienyeji" },
    { id: "guinea_fowl", label: "Guinea Fowl" },
    { id: "duck", label: "Duck" },
    { id: "turkey", label: "Turkey" },
  ],
  pig: [
    { id: "large_white", label: "Large White" },
    { id: "landrace", label: "Landrace" },
    { id: "duroc", label: "Duroc" },
    { id: "hampshire", label: "Hampshire" },
  ],
  rabbit: [
    { id: "new_zealand", label: "New Zealand" },
    { id: "californian", label: "Californian" },
    { id: "flemish_giant", label: "Flemish Giant" },
  ],
  donkey: [
    { id: "somali", label: "Somali" },
    { id: "african_wild", label: "African Wild" },
  ],
  camel: [
    { id: "dromedary", label: "Dromedary" },
    { id: "bactrian", label: "Bactrian" },
  ],
};

export function getBreedsForType(type) {
  return BREEDS[type] || [];
}
