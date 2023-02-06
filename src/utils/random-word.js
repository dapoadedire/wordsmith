const randomWord = () => {
  const words = [
    "cataclysmic",
    "circumlocution",
    "defenestration",
    "effervescence",
    "evanescent",
    "flux",
    "germane",
    "incognito",
    "ineffable",
    "juxtaposition",
    "luminescence",
    "mellifluous",
    "nebula",
    "nocturnal",
    "obfuscate",
    "ostentatious",
    "penultimate",
    "prodigal",
    "quintessential",
    "radiant",
    "resplendent",
    "sanguine",
    "solitude",
    "succinct",
    "tenacity",
    "ubiquitous",
    "velocity",
    "vortex",
    "whimsy",
    "xenon",
    "yearning",
    "zenith"
  ];
  return words[Math.floor(Math.random() * words.length)];
};

export default randomWord;
