export const symbolObjects: {
  [key: string]: {
    ar: string;
    transliteration: string;
    en?: string;
    audioURL: string | undefined;
  }[];
} = {
  'ا': [ { ar: 'ا', transliteration: '', audioURL: '' } ],
  ' أ, إ': [
    { ar: 'أ', transliteration: "'", audioURL: '' },
    { ar: 'إ', transliteration: '', audioURL: '' }
  ],
  'آ': [ { ar: ' آ', transliteration: ' a', audioURL: undefined} ],
  'ـَ, ـً': [
    { ar: 'اَ', transliteration: 'a', audioURL: undefined},
    { ar: 'اً', transliteration: 'an', audioURL: undefined}
  ],
  'ـِ, ـٍ': [
    { ar: 'اِ', transliteration: 'i', audioURL: undefined},
    { ar: 'اٍ', transliteration: 'in', audioURL: undefined}
  ],
  ' ّ': [ { ar: 'اّ', transliteration: 'W', audioURL: undefined} ],
  'ب': [
    { ar: 'آبٌ', transliteration: 'abun', audioURL: undefined},
    { ar: 'بآٌ', transliteration: 'baun', audioURL: undefined},
    { ar: 'آٌ بآٌ', transliteration: 'aun baun', audioURL: undefined},
    { ar: 'بَبُّبْ', transliteration: 'babWub', audioURL: undefined},
    { ar: 'بِبْبِبَ', transliteration: 'bibbiba', audioURL: undefined},
    { ar: 'بُبْبُبِّ', transliteration: 'bubbubWi', audioURL: undefined},
    { ar: 'بَبْبَبَّ', transliteration: 'babbabWa', audioURL: undefined},
    { ar: 'بِبَّبْبِ', transliteration: 'bibWabbi', audioURL: undefined}
  ],
  'ت': [
    {
      ar: 'تُبَبَّة',
      transliteration: 'tubabWa@',
      en: 'a small berry',
      audioURL: undefined
    },
    {
      ar: 'تَبَّتْ',
      transliteration: 'tabWat',
      en: 'destroyed or perished',
      audioURL: undefined
    },
    { ar: 'تِبَبْتَبَ', transliteration: 'tibabtaba', audioURL: undefined},
    { ar: 'تُبِبِّتْ', transliteration: 'tubibWit', audioURL: undefined},
    {
      ar: 'تَبَّتِ',
      transliteration: 'tabWati',
      en: 'she perished',
      audioURL: undefined
    },
    { ar: 'تَتَّبِبْ', transliteration: 'tatWabib', audioURL: undefined},
    { ar: 'تُبِّبْتَ', transliteration: 'tubWibta', audioURL: undefined},
    { ar: 'تِبَبَتَّ', transliteration: 'tibabatWa', audioURL: undefined},
    { ar: 'تُبْبَتِّ', transliteration: 'tubbatWi', audioURL: undefined},
    { ar: 'تَبِّتِ', transliteration: 'tabWiti', audioURL: undefined}
  ],
  'ث': [
    {
      ar: 'ثُمَّة',
      transliteration: 'thumWa@',
      en: 'there is/are',
      audioURL: undefined
    },
    {
      ar: 'ثَمَّة',
      transliteration: 'thamWa@',
      en: 'there is/are',
      audioURL: undefined
    },
    { ar: 'ثِبَبْثَبَ', transliteration: 'thibabthaba', audioURL: undefined},
    { ar: 'ثُبِبِّثْ', transliteration: 'thubibWith', audioURL: undefined},
    {
      ar: 'ثَبَّثِ',
      transliteration: 'thabWathi',
      en: 'he stuttered',
      audioURL: undefined
    },
    { ar: 'ثَتَّبِبْ', transliteration: 'thatWabib', audioURL: undefined},
    { ar: 'ثُبِّبْثَ', transliteration: 'thubWibtha', audioURL: undefined},
    { ar: 'ثِبَبَثَّ', transliteration: 'thibabathWa', audioURL: undefined},
    { ar: 'ثُبْبَثِّ', transliteration: 'thubbathWi', audioURL: undefined},
    { ar: 'ثَبِّثِ', transliteration: 'thabWithi', audioURL: undefined}
  ],
  'ج': [
    {
      ar: 'جَبَبَّة',
      transliteration: 'jababWa@',
      en: 'a large berry',
      audioURL: undefined
    },
    {
      ar: 'جُبَّتْ',
      transliteration: 'jubWat',
      en: 'collected or gathered',
      audioURL: undefined
    },
    { ar: 'جِبَبْتَبَ', transliteration: 'jibabtaba', audioURL: undefined},
    { ar: 'جُبِبِّتْ', transliteration: 'jubibWit', audioURL: undefined},
    {
      ar: 'جَبَّتِ',
      transliteration: 'jabWati',
      en: 'she collected',
      audioURL: undefined
    },
    { ar: 'جَتَّبِبْ', transliteration: 'jatWabib', audioURL: undefined},
    { ar: 'جُبِّبْتَ', transliteration: 'jubWibta', audioURL: undefined},
    { ar: 'جِبَبَتَّ', transliteration: 'jibabatWa', audioURL: undefined},
    { ar: 'جُبْبَتِّ', transliteration: 'jubbatWi', audioURL: undefined},
    { ar: 'جَبِّتِ', transliteration: 'jabWiti', audioURL: undefined}
  ],
  'ح': [
    {
      ar: 'حُبَبَّة',
      transliteration: 'HubabWa@',
      en: 'a loved one',
      audioURL: undefined
    },
    {
      ar: 'حَبَّتْ',
      transliteration: 'HabWat',
      en: 'loved or adored',
      audioURL: undefined
    },
    { ar: 'حِبَبْتَبَ', transliteration: 'Hibabtaba', audioURL: undefined},
    { ar: 'حُبِبِّتْ', transliteration: 'HubibWit', audioURL: undefined},
    {
      ar: 'حَبَّتِ',
      transliteration: 'HabWati',
      en: 'she loved',
      audioURL: undefined
    },
    { ar: 'حَتَّبِبْ', transliteration: 'HatWabib', audioURL: undefined},
    { ar: 'حُبِّبْتَ', transliteration: 'HubWibta', audioURL: undefined},
    { ar: 'حِبَبَتَّ', transliteration: 'HibabatWa', audioURL: undefined},
    { ar: 'حُبْبَتِّ', transliteration: 'HubbatWi', audioURL: undefined},
    { ar: 'حَبِّتِ', transliteration: 'HabWiti', audioURL: undefined}
  ],
  'خ': [
    {
      ar: 'خُبَبَّة',
      transliteration: 'khubabWa@',
      en: 'a bite-sized',
      audioURL: undefined
    },
    {
      ar: 'خَبَّتْ',
      transliteration: 'khabWat',
      en: 'hid or concealed',
      audioURL: undefined
    },
    { ar: 'خِبَبْتَبَ', transliteration: 'khibabtaba', audioURL: undefined},
    { ar: 'خُبِبِّتْ', transliteration: 'khubibWit', audioURL: undefined},
    {
      ar: 'خَبَّتِ',
      transliteration: 'khabWati',
      en: 'she hid',
      audioURL: undefined
    },
    { ar: 'خَتَّبِبْ', transliteration: 'khatWabib', audioURL: undefined},
    { ar: 'خُبِّبْتَ', transliteration: 'khubWibta', audioURL: undefined},
    { ar: 'خِبَبَتَّ', transliteration: 'khibabatWa', audioURL: undefined},
    { ar: 'خُبْبَتِّ', transliteration: 'khubbatWi', audioURL: undefined},
    { ar: 'خَبِّتِ', transliteration: 'khabWiti', audioURL: undefined}
  ],
  'د': [
    {
      ar: 'دُبَبَّة',
      transliteration: 'dubabWa@',
      en: 'a teddy bear',
      audioURL: undefined
    },
    {
      ar: 'دَبَّتْ',
      transliteration: 'dabWat',
      en: 'pressed or flattened',
      audioURL: undefined
    },
    { ar: 'دِبَبْتَبَ', transliteration: 'dibabtaba', audioURL: undefined},
    { ar: 'دُبِبِّتْ', transliteration: 'dubibWit', audioURL: undefined},
    {
      ar: 'دَبَّتِ',
      transliteration: 'dabWati',
      en: 'she pressed',
      audioURL: undefined
    },
    { ar: 'دَتَّبِبْ', transliteration: 'datWabib', audioURL: undefined},
    { ar: 'دُبِّبْتَ', transliteration: 'dubWibta', audioURL: undefined},
    { ar: 'دِبَبَتَّ', transliteration: 'dibabatWa', audioURL: undefined},
    { ar: 'دُبْبَتِّ', transliteration: 'dubbatWi', audioURL: undefined},
    { ar: 'دَبِّتِ', transliteration: 'dabWiti', audioURL: undefined}
  ],
  'ذ': [
    {
      ar: 'ذَكَاء',
      transliteration: 'dhaka',
      en: 'intelligence',
      audioURL: undefined
    },
    {
      ar: 'ذُهَب',
      transliteration: 'dhuhab',
      en: 'gold',
      audioURL: undefined
    },
    {
      ar: 'ذِئْب',
      transliteration: "dhiy'b",
      en: 'wolf',
      audioURL: undefined
    },
    { ar: 'جَذْر', transliteration: 'jadhr', en: 'root', audioURL: undefined},
    {
      ar: 'جَذْع',
      transliteration: 'jadhaa',
      en: 'trunk',
      audioURL: undefined
    },
    {
      ar: 'حَذَاء',
      transliteration: 'Hadha',
      en: 'shoe',
      audioURL: undefined
    },
    {
      ar: 'حُجَاب',
      transliteration: 'Hujab',
      en: 'veil',
      audioURL: undefined
    },
    {
      ar: 'خَبَر',
      transliteration: 'khabar',
      en: 'news',
      audioURL: undefined
    },
    {
      ar: 'خَزَانَة',
      transliteration: 'khazana@',
      en: 'wardrobe',
      audioURL: undefined
    },
    {
      ar: 'دَرْس',
      transliteration: 'dars',
      en: 'lesson',
      audioURL: undefined
    }
  ],
  'ر': [
    { ar: 'رَأْس', transliteration: "ra's", en: 'head', audioURL: undefined},
    { ar: 'رَجُل', transliteration: 'rajul', en: 'man', audioURL: undefined},
    { ar: 'رَحِم', transliteration: 'raHim', en: 'womb', audioURL: undefined},
    { ar: 'جَرْح', transliteration: 'jarH', en: 'wound', audioURL: undefined},
    {
      ar: 'جَرِيدَة',
      transliteration: 'jariyda@',
      en: 'newspaper',
      audioURL: undefined
    },
    {
      ar: 'حَرِير',
      transliteration: 'Hariyr',
      en: 'silk',
      audioURL: undefined
    },
    {
      ar: 'حُرَّة',
      transliteration: 'HurWa@',
      en: 'freedom',
      audioURL: undefined
    },
    {
      ar: 'خَرِيف',
      transliteration: 'khariyf',
      en: 'autumn',
      audioURL: undefined
    },
    {
      ar: 'خُرُوج',
      transliteration: 'khuruwj',
      en: 'exit',
      audioURL: undefined
    },
    {
      ar: 'دَرَّاجَة',
      transliteration: 'darWaja@',
      en: 'bicycle',
      audioURL: undefined
    }
  ],
  'ز': [
    {
      ar: 'زَمَان',
      transliteration: 'zaman',
      en: 'time',
      audioURL: undefined
    },
    {
      ar: 'زَهْرَة',
      transliteration: 'zahra@',
      en: 'flower',
      audioURL: undefined
    },
    {
      ar: 'زَرَافَة',
      transliteration: 'zarafa@',
      en: 'giraffe',
      audioURL: undefined
    },
    {
      ar: 'جَزَر',
      transliteration: 'jazar',
      en: 'carrot',
      audioURL: undefined
    },
    {
      ar: 'جَزِيرَة',
      transliteration: 'jaziyra@',
      en: 'island',
      audioURL: undefined
    },
    {
      ar: 'حَزَام',
      transliteration: 'Hazam',
      en: 'belt',
      audioURL: undefined
    },
    {
      ar: 'حُزْمَة',
      transliteration: 'Huzma@',
      en: 'bundle',
      audioURL: undefined
    },
    {
      ar: 'خَزَان',
      transliteration: 'khazan',
      en: 'tank',
      audioURL: undefined
    },
    {
      ar: 'خُزَامَى',
      transliteration: 'khuzama~',
      en: 'lavender',
      audioURL: undefined
    },
    {
      ar: 'دَزَنَة',
      transliteration: 'dazana@',
      en: 'basket',
      audioURL: undefined
    }
  ],
  'س': [
    { ar: 'سَمَاء', transliteration: 'sama', en: 'sky', audioURL: undefined},
    {
      ar: 'سَفِينَة',
      transliteration: 'safiyna@',
      en: 'ship',
      audioURL: undefined
    },
    {
      ar: 'سَاعَة',
      transliteration: 'saaaa@',
      en: 'clock',
      audioURL: undefined
    },
    { ar: 'جَسَم', transliteration: 'jasam', en: 'body', audioURL: undefined},
    {
      ar: 'جَسِيم',
      transliteration: 'jasiym',
      en: 'particle',
      audioURL: undefined
    },
    {
      ar: 'حَسَاب',
      transliteration: 'Hasab',
      en: 'account',
      audioURL: undefined
    },
    {
      ar: 'حُسْن',
      transliteration: 'Husn',
      en: 'beauty',
      audioURL: undefined
    },
    {
      ar: 'خَسَارَة',
      transliteration: 'khasara@',
      en: 'loss',
      audioURL: undefined
    },
    {
      ar: 'خَسِر',
      transliteration: 'khasir',
      en: 'lose',
      audioURL: undefined
    },
    {
      ar: 'دَسَاتِين',
      transliteration: 'dasatiyn',
      en: 'dresses',
      audioURL: undefined
    }
  ],
  'ش': [
    { ar: 'شَمْس', transliteration: 'shams', en: 'sun', audioURL: undefined},
    {
      ar: 'شَجَرَة',
      transliteration: 'shajara@',
      en: 'tree',
      audioURL: undefined
    },
    {
      ar: 'شَهْر',
      transliteration: 'shahr',
      en: 'month',
      audioURL: undefined
    },
    {
      ar: 'جَشَع',
      transliteration: 'jashaaa',
      en: 'greedy',
      audioURL: undefined
    },
    {
      ar: 'جَشَم',
      transliteration: 'jasham',
      en: 'big nose',
      audioURL: undefined
    },
    {
      ar: 'حَشَرَة',
      transliteration: 'Hashara@',
      en: 'insect',
      audioURL: undefined
    },
    {
      ar: 'حَشِيش',
      transliteration: 'Hashiysh',
      en: 'cannabis',
      audioURL: undefined
    },
    {
      ar: 'خَشَب',
      transliteration: 'khashab',
      en: 'wood',
      audioURL: undefined
    },
    {
      ar: 'خَشِن',
      transliteration: 'khashin',
      en: 'rough',
      audioURL: undefined
    },
    {
      ar: 'دَشَّنَا',
      transliteration: 'dashWana',
      en: 'we showered',
      audioURL: undefined
    }
  ],
  'ص': [
    {
      ar: 'صَلاة',
      transliteration: 'Sal@',
      en: 'prayer',
      audioURL: undefined
    },
    { ar: 'صَحْن', transliteration: 'SaHn', en: 'plate', audioURL: undefined},
    { ar: 'صَوْت', transliteration: 'Sawt', en: 'sound', audioURL: undefined},
    {
      ar: 'جَصَاصَة',
      transliteration: 'jaSaSa@',
      en: 'scissors',
      audioURL: undefined
    },
    {
      ar: 'جَصَم',
      transliteration: 'jaSam',
      en: 'thick',
      audioURL: undefined
    },
    {
      ar: 'حَصَان',
      transliteration: 'HaSan',
      en: 'horse',
      audioURL: undefined
    },
    {
      ar: 'حَصِيرَة',
      transliteration: 'HaSiyra@',
      en: 'mat',
      audioURL: undefined
    },
    {
      ar: 'خَصْلَة',
      transliteration: 'khaSla@',
      en: 'trait',
      audioURL: undefined
    },
    {
      ar: 'خَصِيصَة',
      transliteration: 'khaSiySa@',
      en: 'specialty',
      audioURL: undefined
    },
    {
      ar: 'دَصَاصَة',
      transliteration: 'daSaSa@',
      en: 'clip',
      audioURL: undefined
    }
  ],
  'ض': [
    { ar: 'ضَوْء', transliteration: 'Daw', en: 'light', audioURL: undefined},
    {
      ar: 'ضَبْط',
      transliteration: 'DabT',
      en: 'control',
      audioURL: undefined
    },
    {
      ar: 'ضَحِك',
      transliteration: 'DaHik',
      en: 'laugh',
      audioURL: undefined
    },
    {
      ar: 'جَضَل',
      transliteration: 'jaDal',
      en: 'confuse',
      audioURL: undefined
    },
    {
      ar: 'جَضَم',
      transliteration: 'jaDam',
      en: 'molar tooth',
      audioURL: undefined
    },
    {
      ar: 'حَضَانَة',
      transliteration: 'HaDana@',
      en: 'nursery',
      audioURL: undefined
    },
    {
      ar: 'حَضِيرَة',
      transliteration: 'HaDiyra@',
      en: 'shed',
      audioURL: undefined
    },
    {
      ar: 'خَضْرَاء',
      transliteration: 'khaDra',
      en: 'green',
      audioURL: undefined
    },
    {
      ar: 'خَضِيرَة',
      transliteration: 'khaDiyra@',
      en: 'vegetable',
      audioURL: undefined
    },
    {
      ar: 'دَضَاضَة',
      transliteration: 'daDaDa@',
      en: 'teether',
      audioURL: undefined
    }
  ],
  'ط': [
    {
      ar: 'طَاقَة',
      transliteration: 'Taqa@',
      en: 'energy',
      audioURL: undefined
    },
    {
      ar: 'طَبِيعَة',
      transliteration: 'Tabiyaaa@',
      en: 'nature',
      audioURL: undefined
    },
    {
      ar: 'طَلَب',
      transliteration: 'Talab',
      en: 'request',
      audioURL: undefined
    },
    {
      ar: 'جَطَح',
      transliteration: 'jaTaH',
      en: 'trample',
      audioURL: undefined
    },
    {
      ar: 'جَطَم',
      transliteration: 'jaTam',
      en: 'thick-necked',
      audioURL: undefined
    },
    {
      ar: 'حَطَب',
      transliteration: 'HaTab',
      en: 'firewood',
      audioURL: undefined
    },
    {
      ar: 'حَطِيئَة',
      transliteration: "HaTiyy'a@",
      en: 'hasty',
      audioURL: undefined
    },
    {
      ar: 'خَطَأ',
      transliteration: "khaTa'",
      en: 'mistake',
      audioURL: undefined
    },
    {
      ar: 'خَطِير',
      transliteration: 'khaTiyr',
      en: 'dangerous',
      audioURL: undefined
    },
    {
      ar: 'دَطَاطِيّ',
      transliteration: 'daTaTiyW',
      en: 'squishy',
      audioURL: undefined
    }
  ],
  'ظ': [
    {
      ar: 'ظَلِيل',
      transliteration: 'Zaliyl',
      en: 'shadowy',
      audioURL: undefined
    },
    { ar: 'ظَفِر', transliteration: 'Zafir', en: 'nail', audioURL: undefined},
    {
      ar: 'ظَهِيرَة',
      transliteration: 'Zahiyra@',
      en: 'afternoon',
      audioURL: undefined
    },
    {
      ar: 'ظَرِيف',
      transliteration: 'Zariyf',
      en: 'funny',
      audioURL: undefined
    },
    {
      ar: 'جَظِيم',
      transliteration: 'jaZiym',
      en: 'great',
      audioURL: undefined
    },
    {
      ar: 'حَظَّة',
      transliteration: 'HaZWa@',
      en: 'moment',
      audioURL: undefined
    },
    {
      ar: 'حَظِيرَة',
      transliteration: 'HaZiyra@',
      en: 'shed',
      audioURL: undefined
    },
    {
      ar: 'خَظَم',
      transliteration: 'khaZam',
      en: 'dome',
      audioURL: undefined
    },
    { ar: 'حَظّ', transliteration: 'HaZW', en: 'luck', audioURL: undefined},
    {
      ar: 'دَظَر',
      transliteration: 'daZar',
      en: 'patience',
      audioURL: undefined
    }
  ],
  'ع': [
    { ar: 'عَيْن', transliteration: 'aaayn', en: 'eye', audioURL: undefined},
    { ar: 'عُمْر', transliteration: 'aaumr', en: 'age', audioURL: undefined},
    { ar: 'عَقْل', transliteration: 'aaaql', en: 'mind', audioURL: undefined},
    {
      ar: 'جَعَل',
      transliteration: 'jaaaal',
      en: 'make',
      audioURL: undefined
    },
    {
      ar: 'جَمْعَة',
      transliteration: 'jamaaa@',
      en: 'Friday',
      audioURL: undefined
    },
    { ar: 'حَقْل', transliteration: 'Haql', en: 'field', audioURL: undefined},
    {
      ar: 'حَصَاة',
      transliteration: 'HaSa@',
      en: 'pebble',
      audioURL: undefined
    },
    {
      ar: 'خَبِيئَة',
      transliteration: "khabiyy'a@",
      en: 'hideout',
      audioURL: undefined
    },
    {
      ar: 'خُزَامَى',
      transliteration: 'khuzama~',
      en: 'lavender',
      audioURL: undefined
    },
    {
      ar: 'دَعْبَة',
      transliteration: 'daaaba@',
      en: 'playfulness',
      audioURL: undefined
    }
  ],
  'غ': [
    { ar: 'غَيْم', transliteration: 'Gaym', en: 'cloud', audioURL: undefined},
    {
      ar: 'غُرْبَة',
      transliteration: 'Gurba@',
      en: 'loneliness',
      audioURL: undefined
    },
    {
      ar: 'غَدَاء',
      transliteration: 'Gada',
      en: 'lunch',
      audioURL: undefined
    },
    {
      ar: 'جَغَرَفِيَا',
      transliteration: 'jaGarafiya',
      en: 'geography',
      audioURL: undefined
    },
    {
      ar: 'جَغَل',
      transliteration: 'jaGal',
      en: 'foolish',
      audioURL: undefined
    },
    {
      ar: 'حَغْل',
      transliteration: 'HaGl',
      en: 'burden',
      audioURL: undefined
    },
    {
      ar: 'حَرَاغ',
      transliteration: 'HaraG',
      en: 'idle',
      audioURL: undefined
    },
    {
      ar: 'خَغَايَة',
      transliteration: 'khaGaya@',
      en: 'extreme',
      audioURL: undefined
    },
    {
      ar: 'خُغْتَة',
      transliteration: 'khuGta@',
      en: 'deception',
      audioURL: undefined
    },
    {
      ar: 'دَغَشْ',
      transliteration: 'daGash',
      en: 'dirty',
      audioURL: undefined
    }
  ],
  'ف': [
    { ar: 'فَرَح', transliteration: 'faraH', en: 'joy', audioURL: undefined},
    {
      ar: 'فَكَرَة',
      transliteration: 'fakara@',
      en: 'idea',
      audioURL: undefined
    },
    {
      ar: 'فُصُول',
      transliteration: 'fuSuwl',
      en: 'seasons',
      audioURL: undefined
    },
    {
      ar: 'جَفَاف',
      transliteration: 'jafaf',
      en: 'drought',
      audioURL: undefined
    },
    {
      ar: 'جَفَل',
      transliteration: 'jafal',
      en: 'cross-eyed',
      audioURL: undefined
    },
    {
      ar: 'حَفَلَة',
      transliteration: 'Hafala@',
      en: 'celebration',
      audioURL: undefined
    },
    {
      ar: 'حَفْرَة',
      transliteration: 'Hafra@',
      en: 'hole',
      audioURL: undefined
    },
    {
      ar: 'خَفَاش',
      transliteration: 'khafash',
      en: 'bat',
      audioURL: undefined
    },
    {
      ar: 'خِفَافِيَة',
      transliteration: 'khifafiya@',
      en: 'lightweight',
      audioURL: undefined
    },
    {
      ar: 'دَفَء',
      transliteration: 'dafa',
      en: 'warmth',
      audioURL: undefined
    }
  ],
  'ق': [
    { ar: 'قَمَر', transliteration: 'qamar', en: 'moon', audioURL: undefined},
    { ar: 'قَلَم', transliteration: 'qalam', en: 'pen', audioURL: undefined},
    {
      ar: 'قُرْص',
      transliteration: 'qurS',
      en: 'tablet',
      audioURL: undefined
    },
    {
      ar: 'جَقَدَة',
      transliteration: 'jaqada@',
      en: 'necklace',
      audioURL: undefined
    },
    {
      ar: 'جَقَف',
      transliteration: 'jaqaf',
      en: 'stumble',
      audioURL: undefined
    },
    {
      ar: 'حَقِيقَة',
      transliteration: 'Haqiyqa@',
      en: 'truth',
      audioURL: undefined
    },
    { ar: 'حَقْل', transliteration: 'Haql', en: 'field', audioURL: undefined},
    {
      ar: 'حَقَبَة',
      transliteration: 'Haqaba@',
      en: 'era',
      audioURL: undefined
    },
    {
      ar: 'خَطَأ',
      transliteration: "khaTa'",
      en: 'mistake',
      audioURL: undefined
    },
    {
      ar: 'دَقَة',
      transliteration: 'daqa@',
      en: 'precision',
      audioURL: undefined
    }
  ],
  'ك': [
    {
      ar: 'كَتَاب',
      transliteration: 'katab',
      en: 'book',
      audioURL: undefined
    },
    {
      ar: 'كَلِمَة',
      transliteration: 'kalima@',
      en: 'word',
      audioURL: undefined
    },
    {
      ar: 'كُرْسِي',
      transliteration: 'kursiy',
      en: 'chair',
      audioURL: undefined
    },
    {
      ar: 'كَرِيم',
      transliteration: 'kariym',
      en: 'generous',
      audioURL: undefined
    },
    {
      ar: 'حَكَى',
      transliteration: 'Haka~',
      en: 'narrated',
      audioURL: undefined
    },
    {
      ar: 'حَكْمَة',
      transliteration: 'Hakma@',
      en: 'wisdom',
      audioURL: undefined
    },
    {
      ar: 'حَكِيم',
      transliteration: 'Hakiym',
      en: 'wise',
      audioURL: undefined
    },
    {
      ar: 'خَبْز',
      transliteration: 'khabz',
      en: 'bread',
      audioURL: undefined
    },
    {
      ar: 'خَبِيث',
      transliteration: 'khabiyth',
      en: 'evil',
      audioURL: undefined
    },
    {
      ar: 'دَكَّة',
      transliteration: 'dakWa@',
      en: 'bench',
      audioURL: undefined
    }
  ],
  'ل': [
    { ar: 'لَوْن', transliteration: 'lawn', en: 'color', audioURL: undefined},
    {
      ar: 'لِسَان',
      transliteration: 'lisan',
      en: 'tongue',
      audioURL: undefined
    },
    {
      ar: 'لَوْحَة',
      transliteration: 'lawHa@',
      en: 'board',
      audioURL: undefined
    },
    { ar: 'جَلَد', transliteration: 'jalad', en: 'skin', audioURL: undefined},
    {
      ar: 'جَلَبَة',
      transliteration: 'jalaba@',
      en: 'commotion',
      audioURL: undefined
    },
    {
      ar: 'حَلَاق',
      transliteration: 'Halaq',
      en: 'barber',
      audioURL: undefined
    },
    { ar: 'حَلْم', transliteration: 'Halm', en: 'dream', audioURL: undefined},
    {
      ar: 'خَلَاصَة',
      transliteration: 'khalaSa@',
      en: 'summary',
      audioURL: undefined
    },
    {
      ar: 'دَلِيل',
      transliteration: 'daliyl',
      en: 'guide',
      audioURL: undefined
    },
    { ar: 'لَيْل', transliteration: 'layl', en: 'night', audioURL: undefined}
  ],
  'م': [
    { ar: 'مَاء', transliteration: 'ma', en: 'water', audioURL: undefined},
    {
      ar: 'مَدَرَسَة',
      transliteration: 'madarasa@',
      en: 'school',
      audioURL: undefined
    },
    {
      ar: 'مَكْتَب',
      transliteration: 'maktab',
      en: 'office',
      audioURL: undefined
    },
    { ar: 'جَمْ', transliteration: 'jam', en: 'collect', audioURL: undefined},
    {
      ar: 'جَمَعَة',
      transliteration: 'jamaaaa@',
      en: 'Friday',
      audioURL: undefined
    },
    {
      ar: 'حَمَام',
      transliteration: 'Hamam',
      en: 'bathroom',
      audioURL: undefined
    },
    {
      ar: 'حُمْرَة',
      transliteration: 'Humra@',
      en: 'redness',
      audioURL: undefined
    },
    {
      ar: 'خَمْسَة',
      transliteration: 'khamsa@',
      en: 'five',
      audioURL: undefined
    },
    {
      ar: 'خَمَر',
      transliteration: 'khamar',
      en: 'wine',
      audioURL: undefined
    },
    { ar: 'دَمّ', transliteration: 'damW', en: 'blood', audioURL: undefined}
  ],
  'ن': [
    { ar: 'نَار', transliteration: 'nar', en: 'fire', audioURL: undefined},
    { ar: 'نَجْم', transliteration: 'najm', en: 'star', audioURL: undefined},
    {
      ar: 'نَصِيب',
      transliteration: 'naSiyb',
      en: 'share',
      audioURL: undefined
    },
    {
      ar: 'نَصْر',
      transliteration: 'naSr',
      en: 'victory',
      audioURL: undefined
    },
    {
      ar: 'جَنَاح',
      transliteration: 'janaH',
      en: 'wing',
      audioURL: undefined
    },
    {
      ar: 'حَنَان',
      transliteration: 'Hanan',
      en: 'tenderness',
      audioURL: undefined
    },
    {
      ar: 'دَنِيء',
      transliteration: 'daniy',
      en: 'lowly',
      audioURL: undefined
    },
    {
      ar: 'خَنْزِير',
      transliteration: 'khanziyr',
      en: 'pig',
      audioURL: undefined
    },
    {
      ar: 'خَنَافِق',
      transliteration: 'khanafiq',
      en: 'hypocrites',
      audioURL: undefined
    },
    {
      ar: 'دَنَّة',
      transliteration: 'danWa@',
      en: 'valley',
      audioURL: undefined
    }
  ],
  'ه': [
    {
      ar: 'هَمْس',
      transliteration: 'hams',
      en: 'whisper',
      audioURL: undefined
    },
    {
      ar: 'هُدَى',
      transliteration: 'huda~',
      en: 'guidance',
      audioURL: undefined
    },
    {
      ar: 'هَمَسَة',
      transliteration: 'hamasa@',
      en: 'gesture',
      audioURL: undefined
    },
    {
      ar: 'جَهَاد',
      transliteration: 'jahad',
      en: 'struggle',
      audioURL: undefined
    },
    {
      ar: 'جَهَد',
      transliteration: 'jahad',
      en: 'effort',
      audioURL: undefined
    },
    { ar: 'حَوَاء', transliteration: 'Hawa', en: 'Eve', audioURL: undefined},
    { ar: 'حَوْض', transliteration: 'HawD', en: 'basin', audioURL: undefined},
    { ar: 'خَوْف', transliteration: 'khawf', en: 'fear', audioURL: undefined},
    {
      ar: 'خَيْط',
      transliteration: 'khayT',
      en: 'thread',
      audioURL: undefined
    },
    {
      ar: 'دَهْمَاء',
      transliteration: 'dahma',
      en: 'torrential rain',
      audioURL: undefined
    }
  ],
  'و': [
    {
      ar: 'وَرْدَة',
      transliteration: 'warda@',
      en: 'rose',
      audioURL: undefined
    },
    {
      ar: 'وَطَن',
      transliteration: 'waTan',
      en: 'homeland',
      audioURL: undefined
    },
    { ar: 'وَقْت', transliteration: 'waqt', en: 'time', audioURL: undefined},
    {
      ar: 'وَرَقَة',
      transliteration: 'waraqa@',
      en: 'paper',
      audioURL: undefined
    },
    {
      ar: 'جَوَاز',
      transliteration: 'jawaz',
      en: 'passport',
      audioURL: undefined
    },
    {
      ar: 'حَوْل',
      transliteration: 'Hawl',
      en: 'around',
      audioURL: undefined
    },
    {
      ar: 'خَطَوَة',
      transliteration: 'khaTawa@',
      en: 'step',
      audioURL: undefined
    },
    { ar: 'خَوْف', transliteration: 'khawf', en: 'fear', audioURL: undefined},
    {
      ar: 'خَطَا',
      transliteration: 'khaTa',
      en: 'mistake',
      audioURL: undefined
    },
    {
      ar: 'دَوْرَة',
      transliteration: 'dawra@',
      en: 'course',
      audioURL: undefined
    }
  ],
  'ى': [
    {
      ar: 'رَؤْيَتِهَا',
      transliteration: "raw'yatiha",
      en: 'her vision',
      audioURL: undefined
    },
    {
      ar: 'سَعِدْتِي',
      transliteration: 'saaaidtiy',
      en: 'my happiness',
      audioURL: undefined
    },
    {
      ar: 'شُكْرَاهِي',
      transliteration: 'shukrahiy',
      en: 'my gratitude',
      audioURL: undefined
    },
    {
      ar: 'صَدِيقِي',
      transliteration: 'Sadiyqiy',
      en: 'my friend',
      audioURL: undefined
    },
    {
      ar: 'ضَحِكْتِي',
      transliteration: 'DaHiktiy',
      en: 'my laughter',
      audioURL: undefined
    }
  ],
  'ة': [
    {
      ar: 'بَيْتَة',
      transliteration: 'bayta@',
      en: 'a small house',
      audioURL: undefined
    },
    {
      ar: 'تَعَلَّمْتَ',
      transliteration: 'taaaalWamta',
      en: 'you learned',
      audioURL: undefined
    },
    {
      ar: 'حُبَّتِي',
      transliteration: 'HubWatiy',
      en: 'my love',
      audioURL: undefined
    },
    {
      ar: 'جَلَسْتَ',
      transliteration: 'jalasta',
      en: 'you sat',
      audioURL: undefined
    },
    {
      ar: 'دَرَسَتَ',
      transliteration: 'darasata',
      en: 'she studied',
      audioURL: undefined
    }
  ],
  'ي': [
    {
      ar: 'رَؤْيَتِي',
      transliteration: "raw'yatiy",
      en: 'my vision',
      audioURL: undefined
    },
    {
      ar: 'سَعِدْتُ',
      transliteration: 'saaaidtu',
      en: 'I was happy',
      audioURL: undefined
    },
    {
      ar: 'شُكْرَاكَ',
      transliteration: 'shukraka',
      en: 'your gratitude',
      audioURL: undefined
    },
    {
      ar: 'صَدِيقِي',
      transliteration: 'Sadiyqiy',
      en: 'my friend',
      audioURL: undefined
    },
    {
      ar: 'ضَحِكَتْ',
      transliteration: 'DaHikat',
      en: 'she laughed',
      audioURL: undefined
    }
  ]
};
export const arabicLetters = [
  {
    symbol: "ا",
    name: "Alef",
    description:
      'Represents the short vowel "a" sound, similar to the "a" sound in the English word "cat."',
    audioURL: undefined,
    transliteration: "a",
  },
  {
    symbol: "آ",
    name: "Alef with Madda",
    description:
      'Represents a prolonged "a" sound, similar to the "a" sound in the English word "father" or the "a" sound in the word "car.',
    audioURL: undefined,
    transliteration: "a",
  },
  {
    symbol: "أ, إ",
    name: "Alef with Hamza",
    description: "Alef with Hamza",
    audioURL: undefined,
    transliteration: "', ",
  },
  {
    symbol: "ـَ, ـً",
    name: "Fatha and Tanween Fatha",
    description:
      'Fatha and Tanween Fatha: Fatha represents the short "a" sound, similar to the "a" sound in the English word "cat." Tanween Fatha is a combination of Fatha and Nun, indicating a nasalized "a" sound.',
    audioURL: undefined,
    transliteration: "a, an",
  },
  {
    symbol: "ـِ, ـٍ",
    name: "Kasra and Tanween Kasra",
    description:
      'Kasra and Tanween Kasra: Kasra represents the short "i" sound, similar to the "i" sound in the English word "sit." Tanween Kasra is a combination of Kasra and Nun, indicating a nasalized short "i" sound.',
    audioURL: undefined,
    transliteration: "i, in",
  },
  {
    symbol: "ـُ, ـٌ",
    name: "Damma and Tanween Damma",
    description:
      'Damma and Tanween Damma: Damma represents the short "u" sound, similar to the "u" sound in the English word "put." Tanween Damma is a combination of Damma and Nun, indicating a nasalized "u" sound.',
    audioURL: undefined,
    transliteration: "u, un",
  },
  {
    symbol: " ّ",
    name: "Shadda",
    description:
      "Represents the doubling or gemination of a consonant sound within a word. When a letter is marked with Shadda, it is pronounced with an emphasis or lengthening of its sound.",
    audioURL: undefined,
    transliteration: " W",
  },
  {
    symbol: "ب",
    name: "Ba",
    description: 'Represents the sound "b" as in the English word "bat."',
    audioURL: undefined,
    transliteration: "b",
  },
  {
    symbol: "ت",
    name: "Ta",
    description: 'Represents the sound "t" as in the English word "top."',
    audioURL: undefined,
    transliteration: "t",
  },
  {
    symbol: "ث",
    name: "Tha",
    description: 'Represents the sound "th" as in the English word "think."',
    audioURL: undefined,
    transliteration: "th",
  },
  {
    symbol: "ج",
    name: "Jim",
    description: 'Represents the sound "j" as in the English word "jam."',
    audioURL: undefined,
    transliteration: "j",
  },
  {
    symbol: "ح",
    name: "Ha",
    description: 'Represents the sound "h" as in the English word "hot."',
    audioURL: undefined,
    transliteration: "H",
  },
  {
    symbol: "خ",
    name: "Kha",
    description:
      'Represents a guttural "kh" sound, similar to the "ch" sound in the Scottish word "loch."',
    audioURL: undefined,
    transliteration: "kh",
  },
  {
    symbol: "د",
    name: "Dal",
    description: 'Represents the sound "d" as in the English word "dog."',
    audioURL: undefined,
    transliteration: "d",
  },
  {
    symbol: "ذ",
    name: "Thal",
    description: 'Represents the sound "th" as in the English word "that."',
    audioURL: undefined,
    transliteration: "dh",
  },
  {
    symbol: "ر",
    name: "Ra",
    description: 'Represents the sound "r" as in the English word "red."',
    audioURL: undefined,
    transliteration: "r",
  },
  {
    symbol: "ز",
    name: "Zain",
    description: 'Represents the sound "z" as in the English word "zero."',
    audioURL: undefined,
    transliteration: "z",
  },
  {
    symbol: "س",
    name: "Seen",
    description: 'Represents the sound "s" as in the English word "sun."',
    audioURL: undefined,
    transliteration: "s",
  },
  {
    symbol: "ش",
    name: "Sheen",
    description:
      'Sheen: Represents the sound "sh" as in the English word "sheep."',
    audioURL: undefined,
    transliteration: "sh",
  },
  {
    symbol: "ص",
    name: "Sad",
    description:
      'Represents the sound "s" but pronounced with the tongue pressed against the upper gum ridge, similar to the "s" sound in the English word "sun."',
    audioURL: undefined,
    transliteration: "S",
  },
  {
    symbol: "ض",
    name: "Dad",
    description:
      'Represents the sound "d" but pronounced with the tongue pressed against the upper gum ridge, similar to the "d" sound in the English word "dog."',
    audioURL: undefined,
    transliteration: "D",
  },
  {
    symbol: "ط",
    name: "Ta with Slight Emphasis",
    description:
      'Represents the sound "t" but pronounced with a slight emphasis, similar to the "t" sound in the English word "top."',
    audioURL: undefined,
    transliteration: "T",
  },
  {
    symbol: "ظ",
    name: "Za with Slight Emphasis",
    description:
      'Represents the sound "z" but pronounced with a slight emphasis, similar to the "z" sound in the English word "zero."',
    audioURL: undefined,
    transliteration: "Z",
  },
  {
    symbol: "ع",
    name: "Ain",
    description:
      'Represents a guttural sound made deep in the throat, similar to the sound of a "g" followed by a "h," but without fully pronouncing either. No equivalent sound in English.',
    audioURL: undefined,
    transliteration: "aa",
  },
  {
    symbol: "غ",
    name: "Ghain",
    description:
      'Represents a guttural sound made deep in the throat, similar to the "r" sound in the French word "rue." No equivalent sound in English.',
    audioURL: undefined,
    transliteration: "G",
  },
  {
    symbol: "ف",
    name: "Fa",
    description: 'Represents the sound "f" as in the English word "fun."',
    audioURL: undefined,
    transliteration: "f",
  },
  {
    symbol: "ق",
    name: "Qaf",
    description:
      'Represents a guttural "k" sound, similar to the "k" sound in the English word "key."',
    audioURL: undefined,
    transliteration: "q",
  },
  {
    symbol: "ك",
    name: "Kaf",
    description: 'Represents the sound "k" as in the English word "key."',
    audioURL: undefined,
    transliteration: "k",
  },
  {
    symbol: "ل",
    name: "Lam",
    description: 'Represents the sound "l" as in the English word "love."',
    audioURL: undefined,
    transliteration: "l",
  },
  {
    symbol: "م",
    name: "Meem",
    description: 'Represents the sound "m" as in the English word "moon."',
    audioURL: undefined,
    transliteration: "m",
  },
  {
    symbol: "ن",
    name: "Noon",
    description: 'Represents the sound "n" as in the English word "nice."',
    audioURL: undefined,
    transliteration: "n",
  },
  {
    symbol: "ه",
    name: "Ha",
    description: 'Represents the sound "h" as in the English word "hot."',
    audioURL: undefined,
    transliteration: "h",
  },
  {
    symbol: "ة",
    name: "Ta Marbuta",
    description:
      'Represents the sound "h" as in the English word "hot." It is a feminine marker and not pronounced in isolation.',
    audioURL: undefined,
    transliteration: "@",
  },
  {
    symbol: "و",
    name: "Waw",
    description: 'Represents the sound "w" as in the English word "water."',
    audioURL: undefined,
    transliteration: "w",
  },
  {
    symbol: "ى",
    name: "Alef Maqsurah",
    description:
      'Represents the short vowel "a" sound, similar to the "a" sound in the English word "cat." It appears only at the end of words and functions as a long "a."',
    audioURL: undefined,
    transliteration: "~",
  },
  {
    symbol: "ي",
    name: "Ya",
    description: 'Represents the sound "y" as in the English word "yes."',
    audioURL: undefined,
    transliteration: "y",
  },
] as const;
