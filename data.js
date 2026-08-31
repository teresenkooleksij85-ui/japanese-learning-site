// ============================================================
// 1. HIRAGANA & KATAKANA DATA
// ============================================================

const HIRAGANA_DATA = {
    'あ': ['A', 'I', 'U', 'E'],
    'い': ['I', 'A', 'U', 'E'],
    'う': ['U', 'A', 'I', 'E'],
    'え': ['E', 'A', 'I', 'U'],
    'お': ['O', 'A', 'U', 'E'],
    'か': ['KA', 'KI', 'KU', 'KO'],
    'き': ['KI', 'KA', 'KU', 'KE'],
    'く': ['KU', 'KA', 'KI', 'KE'],
    'け': ['KE', 'KA', 'KI', 'KU'],
    'こ': ['KO', 'KA', 'KU', 'KE'],
    'さ': ['SA', 'SHI', 'SU', 'SO'],
    'し': ['SHI', 'SA', 'SU', 'SE'],
    'す': ['SU', 'SA', 'SHI', 'SE'],
    'せ': ['SE', 'SA', 'SHI', 'SU'],
    'そ': ['SO', 'SA', 'SU', 'SE'],
    'た': ['TA', 'CHI', 'TSU', 'TO'],
    'ち': ['CHI', 'TA', 'TSU', 'TE'],
    'つ': ['TSU', 'TA', 'CHI', 'TE'],
    'て': ['TE', 'TA', 'CHI', 'TSU'],
    'と': ['TO', 'TA', 'TSU', 'TE'],
    'な': ['NA', 'NI', 'NU', 'NO'],
    'に': ['NI', 'NA', 'NU', 'NE'],
    'ぬ': ['NU', 'NA', 'NI', 'NE'],
    'ね': ['NE', 'NA', 'NI', 'NU'],
    'の': ['NO', 'NA', 'NU', 'NE'],
    'は': ['HA', 'HI', 'FU', 'HO'],
    'ひ': ['HI', 'HA', 'FU', 'HE'],
    'ふ': ['FU', 'HA', 'HI', 'HE'],
    'へ': ['HE', 'HA', 'HI', 'FU'],
    'ほ': ['HO', 'HA', 'FU', 'HE'],
    'ま': ['MA', 'MI', 'MU', 'MO'],
    'み': ['MI', 'MA', 'MU', 'ME'],
    'む': ['MU', 'MA', 'MI', 'ME'],
    'め': ['ME', 'MA', 'MI', 'MU'],
    'も': ['MO', 'MA', 'MU', 'ME'],
    'や': ['YA', 'YU', 'YO', 'A'],
    'ゆ': ['YU', 'YA', 'YO', 'U'],
    'よ': ['YO', 'YA', 'YU', 'O'],
    'ら': ['RA', 'RI', 'RU', 'RO'],
    'り': ['RI', 'RA', 'RU', 'RE'],
    'る': ['RU', 'RA', 'RI', 'RE'],
    'れ': ['RE', 'RA', 'RI', 'RU'],
    'ろ': ['RO', 'RA', 'RU', 'RE'],
    'わ': ['WA', 'WO', 'N', 'A'],
    'を': ['WO', 'WA', 'N', 'O'],
    'ん': ['N', 'M', 'NYO', 'NA']
};

const KATAKANA_DATA = {
    'ア': ['A', 'I', 'U', 'E'],
    'イ': ['I', 'A', 'U', 'E'],
    'ウ': ['U', 'A', 'I', 'E'],
    'エ': ['E', 'A', 'I', 'U'],
    'オ': ['O', 'A', 'U', 'E'],
    'カ': ['KA', 'KI', 'KU', 'KO'],
    'キ': ['KI', 'KA', 'KU', 'KE'],
    'ク': ['KU', 'KA', 'KI', 'KE'],
    'ケ': ['KE', 'KA', 'KI', 'KU'],
    'コ': ['KO', 'KA', 'KU', 'KE'],
    'サ': ['SA', 'SHI', 'SU', 'SO'],
    'シ': ['SHI', 'SA', 'SU', 'SE'],
    'ス': ['SU', 'SA', 'SHI', 'SE'],
    'セ': ['SE', 'SA', 'SHI', 'SU'],
    'ソ': ['SO', 'SA', 'SU', 'SE'],
    'タ': ['TA', 'CHI', 'TSU', 'TO'],
    'チ': ['CHI', 'TA', 'TSU', 'TE'],
    'ツ': ['TSU', 'TA', 'CHI', 'TE'],
    'テ': ['TE', 'TA', 'CHI', 'TSU'],
    'ト': ['TO', 'TA', 'TSU', 'TE'],
    'ナ': ['NA', 'NI', 'NU', 'NO'],
    'ニ': ['NI', 'NA', 'NU', 'NE'],
    'ヌ': ['NU', 'NA', 'NI', 'NE'],
    'ネ': ['NE', 'NA', 'NI', 'NU'],
    'ノ': ['NO', 'NA', 'NU', 'NE'],
    'ハ': ['HA', 'HI', 'FU', 'HO'],
    'ヒ': ['HI', 'HA', 'FU', 'HE'],
    'フ': ['FU', 'HA', 'HI', 'HE'],
    'ヘ': ['HE', 'HA', 'HI', 'FU'],
    'ホ': ['HO', 'HA', 'FU', 'HE'],
    'マ': ['MA', 'MI', 'MU', 'MO'],
    'ミ': ['MI', 'MA', 'MU', 'ME'],
    'ム': ['MU', 'MA', 'MI', 'ME'],
    'メ': ['ME', 'MA', 'MI', 'MU'],
    'モ': ['MO', 'MA', 'MU', 'ME'],
    'ヤ': ['YA', 'YU', 'YO', 'A'],
    'ユ': ['YU', 'YA', 'YO', 'U'],
    'ヨ': ['YO', 'YA', 'YU', 'O'],
    'ラ': ['RA', 'RI', 'RU', 'RO'],
    'リ': ['RI', 'RA', 'RU', 'RE'],
    'ル': ['RU', 'RA', 'RI', 'RE'],
    'レ': ['RE', 'RA', 'RI', 'RU'],
    'ロ': ['RO', 'RA', 'RU', 'RE'],
    'ワ': ['WA', 'WO', 'N', 'A'],
    'ヲ': ['WO', 'WA', 'N', 'O'],
    'ン': ['N', 'M', 'NYO', 'NA']
};

const HIRAGANA_DAKUTEN = {
    'が': ['GA', 'GI', 'GU', 'GE'], 'ぎ': ['GI', 'GA', 'GU', 'GO'],
    'ぐ': ['GU', 'GA', 'GI', 'GE'], 'げ': ['GE', 'GA', 'GI', 'GU'],
    'ご': ['GO', 'GA', 'GI', 'GE'], 'ざ': ['ZA', 'JI', 'ZU', 'ZE'],
    'じ': ['JI', 'ZA', 'ZU', 'DZE'], 'ず': ['ZU', 'ZA', 'JI', 'ZE'],
    'ぜ': ['ZE', 'ZA', 'JI', 'ZU'], 'ぞ': ['ZO', 'ZA', 'JI', 'ZE'],
    'だ': ['DA', 'DI', 'DU', 'DE'], 'ぢ': ['DZI', 'DA', 'DU', 'DE'],
    'づ': ['DZU', 'DA', 'DI', 'DE'], 'で': ['DE', 'DA', 'DI', 'DU'],
    'ど': ['DO', 'DA', 'DI', 'DE'], 'ば': ['BA', 'BI', 'BU', 'BE'],
    'び': ['BI', 'BA', 'BU', 'BO'], 'ぶ': ['BU', 'BA', 'BI', 'BE'],
    'べ': ['BE', 'BA', 'BI', 'BU'], 'ぼ': ['BO', 'BA', 'BI', 'BE']
};

const HIRAGANA_HANDAKUTEN = {
    'ぱ': ['PA', 'PI', 'PU', 'PE'], 'ぴ': ['PI', 'PA', 'PU', 'PO'],
    'ぷ': ['PU', 'PA', 'PI', 'PE'], 'ぺ': ['PE', 'PA', 'PI', 'PU'],
    'ぽ': ['PO', 'PA', 'PI', 'PE']
};

const HIRAGANA_COMBOS = {
    'きゃ': ['KYA', 'KYU', 'KYO'], 'きゅ': ['KYU', 'KYA', 'KYO'],
    'きょ': ['KYO', 'KYA', 'KYU'], 'しゃ': ['SHA', 'SHU', 'SHO'],
    'しゅ': ['SHU', 'SHA', 'SHO'], 'しょ': ['SHO', 'SHA', 'SHU'],
    'ちゃ': ['CHA', 'CHU', 'CHO'], 'ちゅ': ['CHU', 'CHA', 'CHO'],
    'ちょ': ['CHO', 'CHA', 'CHU'], 'にゃ': ['NYA', 'NYU', 'NYO'],
    'にゅ': ['NYU', 'NYA', 'NYO'], 'にょ': ['NYO', 'NYA', 'NYU'],
    'ひゃ': ['HYA', 'HYU', 'HYO'], 'ひゅ': ['HYU', 'HYA', 'HYO'],
    'ひょ': ['HYO', 'HYA', 'HYU'], 'みゃ': ['MYA', 'MYU', 'MYO'],
    'みゅ': ['MYU', 'MYA', 'MYO'], 'みょ': ['MYO', 'MYA', 'MYU'],
    'りゃ': ['RYA', 'RYU', 'RYO'], 'りゅ': ['RYU', 'RYA', 'RYO'],
    'りょ': ['RYO', 'RYA', 'RYU'], 'ぎゃ': ['GYA', 'GYU', 'GYO'],
    'ぎゅ': ['GYU', 'GYA', 'GYO'], 'ぎょ': ['GYO', 'GYA', 'GYU'],
    'じゃ': ['JA', 'JU', 'JO'], 'じゅ': ['JU', 'JA', 'JO'],
    'じょ': ['JO', 'JA', 'JU'], 'びゃ': ['BYA', 'BYU', 'BYO'],
    'びゅ': ['BYU', 'BYA', 'BYO'], 'びょ': ['BYO', 'BYA', 'BYU'],
    'ぴゃ': ['PYA', 'PYU', 'PYO'], 'ぴゅ': ['PYU', 'PYA', 'PYO'],
    'ぴょ': ['PYO', 'PYA', 'PYU']
};

const FULL_HIRAGANA = Object.assign({}, HIRAGANA_DATA, HIRAGANA_DAKUTEN, HIRAGANA_HANDAKUTEN, HIRAGANA_COMBOS);
const ALL_FULL_HIRAGANA = Object.keys(FULL_HIRAGANA);
const ALL_HIRAGANA = Object.keys(HIRAGANA_DATA);

const KATAKANA_DAKUTEN = {
    'ガ': ['GA', 'GI', 'GU', 'GE'], 'ギ': ['GI', 'GA', 'GU', 'GO'],
    'グ': ['GU', 'GA', 'GI', 'GE'], 'ゲ': ['GE', 'GA', 'GI', 'GU'],
    'ゴ': ['GO', 'GA', 'GI', 'GE'], 'ザ': ['ZA', 'JI', 'ZU', 'ZE'],
    'ジ': ['JI', 'ZA', 'ZU', 'DZE'], 'ズ': ['ZU', 'ZA', 'JI', 'ZE'],
    'ゼ': ['ZE', 'ZA', 'JI', 'ZU'], 'ゾ': ['ZO', 'ZA', 'JI', 'ZE'],
    'ダ': ['DA', 'DI', 'DU', 'DE'], 'ヂ': ['DZI', 'DA', 'DU', 'DE'],
    'ヅ': ['DZU', 'DA', 'DI', 'DE'], 'デ': ['DE', 'DA', 'DI', 'DU'],
    'ド': ['DO', 'DA', 'DI', 'DE'], 'バ': ['BA', 'BI', 'BU', 'BE'],
    'ビ': ['BI', 'BA', 'BU', 'BO'], 'ブ': ['BU', 'BA', 'BI', 'BE'],
    'ベ': ['BE', 'BA', 'BI', 'BU'], 'ボ': ['BO', 'BA', 'BI', 'BE']
};

const KATAKANA_HANDAKUTEN = {
    'パ': ['PA', 'PI', 'PU', 'PE'], 'ピ': ['PI', 'PA', 'PU', 'PO'],
    'プ': ['PU', 'PA', 'PI', 'PE'], 'ペ': ['PE', 'PA', 'PI', 'PU'],
    'ポ': ['PO', 'PA', 'PI', 'PE']
};

const KATAKANA_COMBOS = {
    'キャ': ['KYA', 'KYU', 'KYO'], 'キュ': ['KYU', 'KYA', 'KYO'],
    'キョ': ['KYO', 'KYA', 'KYU'], 'シャ': ['SHA', 'SHU', 'SHO'],
    'シュ': ['SHU', 'SHA', 'SHO'], 'ショ': ['SHO', 'SHA', 'SHU'],
    'チャ': ['CHA', 'CHU', 'CHO'], 'チュ': ['CHU', 'CHA', 'CHO'],
    'チョ': ['CHO', 'CHA', 'CHU'], 'ニャ': ['NYA', 'NYU', 'NYO'],
    'ニュ': ['NYU', 'NYA', 'NYO'], 'ニョ': ['NYO', 'NYA', 'NYU'],
    'ヒャ': ['HYA', 'HYU', 'HYO'], 'ヒュ': ['HYU', 'HYA', 'HYO'],
    'ヒョ': ['HYO', 'HYA', 'HYU'], 'ミャ': ['MYA', 'MYU', 'MYO'],
    'ミュ': ['MYU', 'MYA', 'MYO'], 'ミョ': ['MYO', 'MYA', 'MYU'],
    'リャ': ['RYA', 'RYU', 'RYO'], 'リュ': ['RYU', 'RYA', 'RYO'],
    'リョ': ['RYO', 'RYA', 'RYU'], 'ギャ': ['GYA', 'GYU', 'GYO'],
    'ギュ': ['GYU', 'GYA', 'GYO'], 'ギョ': ['GYO', 'GYA', 'GYU'],
    'ジャ': ['JA', 'JU', 'JO'], 'ジュ': ['JU', 'JA', 'JO'],
    'ジョ': ['JO', 'JA', 'JU'], 'ビャ': ['BYA', 'BYU', 'BYO'],
    'ビュ': ['BYU', 'BYA', 'BYO'], 'ビョ': ['BYO', 'BYA', 'BYU'],
    'ピャ': ['PYA', 'PYU', 'PYO'], 'ピュ': ['PYU', 'PYA', 'PYO'],
    'ピョ': ['PYO', 'PYA', 'PYU']
};

const FULL_KATAKANA = Object.assign({}, KATAKANA_DATA, KATAKANA_DAKUTEN, KATAKANA_HANDAKUTEN, KATAKANA_COMBOS);
const ALL_FULL_KATAKANA = Object.keys(FULL_KATAKANA);
const ALL_KATAKANA = Object.keys(KATAKANA_DATA);

const ROMAJI = {
    'あ':'a','い':'i','う':'u','え':'e','お':'o',
    'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
    'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
    'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
    'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
    'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
    'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
    'や':'ya','ゆ':'yu','よ':'yo',
    'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
    'わ':'wa','を':'wo','ん':'n',
    'ア':'a','イ':'i','ウ':'u','エ':'e','オ':'o',
    'カ':'ka','キ':'ki','ク':'ku','ケ':'ke','コ':'ko',
    'サ':'sa','シ':'shi','ス':'su','セ':'se','ソ':'so',
    'タ':'ta','チ':'chi','ツ':'tsu','テ':'te','ト':'to',
    'ナ':'na','ニ':'ni','ヌ':'nu','ネ':'ne','ノ':'no',
    'ハ':'ha','ヒ':'hi','フ':'fu','ヘ':'he','ホ':'ho',
    'マ':'ma','ミ':'mi','ム':'mu','メ':'me','モ':'mo',
    'ヤ':'ya','ユ':'yu','ヨ':'yo',
    'ラ':'ra','リ':'ri','ル':'ru','レ':'re','ロ':'ro',
    'ワ':'wa','ヲ':'wo','ン':'n',
    'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
    'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
    'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
    'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
    'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
    'ガ':'ga','ギ':'gi','グ':'gu','ゲ':'ge','ゴ':'go',
    'ザ':'za','ジ':'ji','ズ':'zu','ゼ':'ze','ゾ':'zo',
    'ダ':'da','ヂ':'ji','ヅ':'zu','デ':'de','ド':'do',
    'バ':'ba','ビ':'bi','ブ':'bu','ベ':'be','ボ':'bo',
    'パ':'pa','ピ':'pi','プ':'pu','ペ':'pe','ポ':'po',
    'きゃ':'kya','きゅ':'kyu','きょ':'kyo',
    'しゃ':'sha','しゅ':'shu','しょ':'sho',
    'ちゃ':'cha','ちゅ':'chu','ちょ':'cho',
    'にゃ':'nya','にゅ':'nyu','にょ':'nyo',
    'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo',
    'みゃ':'mya','みゅ':'myu','みょ':'myo',
    'りゃ':'rya','りゅ':'ryu','りょ':'ryo',
    'ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
    'じゃ':'ja','じゅ':'ju','じょ':'jo',
    'びゃ':'bya','びゅ':'byu','びょ':'byo',
    'ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo',
    'キャ':'kya','キュ':'kyu','キョ':'kyo',
    'シャ':'sha','シュ':'shu','ショ':'sho',
    'チャ':'cha','チュ':'chu','チョ':'cho',
    'ニャ':'nya','ニュ':'nyu','ニョ':'nyo',
    'ヒャ':'hya','ヒュ':'hyu','ヒョ':'hyo',
    'ミャ':'mya','ミュ':'myu','ミョ':'myo',
    'リャ':'rya','リュ':'ryu','リョ':'ryo',
    'ギャ':'gya','ギュ':'gyu','ギョ':'gyo',
    'ジャ':'ja','ジュ':'ju','ジョ':'jo',
    'ビャ':'bya','ビュ':'byu','ビョ':'byo',
    'ピャ':'pya','ピュ':'pyu','ピョ':'pyo'
};

const HIRAGANA_ROWS = {
    'あ': ['あ','い','う','え','お'], 'か': ['か','き','く','け','こ'],
    'さ': ['さ','し','す','せ','そ'], 'た': ['た','ち','つ','て','と'],
    'な': ['な','に','ぬ','ね','の'], 'は': ['は','ひ','ふ','へ','ほ'],
    'ま': ['ま','み','む','め','も'], 'や': ['や','ゆ','よ'],
    'ら': ['ら','り','る','れ','ろ'], 'わ': ['わ','を','ん']
};

const KATAKANA_ROWS = {
    'ア': ['ア','イ','ウ','エ','オ'], 'カ': ['カ','キ','ク','ケ','コ'],
    'サ': ['サ','シ','ス','セ','ソ'], 'タ': ['タ','チ','ツ','テ','ト'],
    'ナ': ['ナ','ニ','ヌ','ネ','ノ'], 'ハ': ['ハ','ヒ','フ','ヘ','ホ'],
    'マ': ['マ','ミ','ム','メ','モ'], 'ヤ': ['ヤ','ユ','ヨ'],
    'ラ': ['ラ','リ','ル','レ','ロ'], 'ワ': ['ワ','ヲ','ン']
};

const ROW_GROUPS = {
    'あ': ['あ','い','う','え','お'], 'か': ['か','き','く','け','こ'],
    'さ': ['さ','し','す','せ','そ'], 'た': ['た','ち','つ','て','と'],
    'な': ['な','に','ぬ','ね','の'], 'は': ['は','ひ','ふ','へ','ほ'],
    'ま': ['ま','み','む','め','も'], 'や': ['や','ゆ','よ'],
    'ら': ['ら','り','る','れ','ろ'], 'わ': ['わ','を','ん']
};

const ROW_GROUPS_FULL = {
    'あ': ['あ','い','う','え','お'], 'か': ['か','き','く','け','こ'],
    'さ': ['さ','し','す','せ','そ'], 'た': ['た','ち','つ','て','と'],
    'な': ['な','に','ぬ','ね','の'], 'は': ['は','ひ','ふ','へ','ほ'],
    'ま': ['ま','み','む','め','も'], 'や': ['や','ゆ','よ'],
    'ら': ['ら','り','る','れ','ろ'], 'わ': ['わ','を','ん'],
    'が': ['が','ぎ','ぐ','げ','ご'], 'ざ': ['ざ','じ','ず','ぜ','ぞ'],
    'だ': ['だ','ぢ','づ','で','ど'], 'ば': ['ば','び','ぶ','べ','ぼ'],
    'ぱ': ['ぱ','ぴ','ぷ','ぺ','ぽ'],
    'きゃ': ['きゃ','きゅ','きょ'], 'しゃ': ['しゃ','しゅ','しょ'],
    'ちゃ': ['ちゃ','ちゅ','ちょ'], 'にゃ': ['にゃ','にゅ','にょ'],
    'ひゃ': ['ひゃ','ひゅ','ひょ'], 'みゃ': ['みゃ','みゅ','みょ'],
    'りゃ': ['りゃ','りゅ','りょ'], 'ぎゃ': ['ぎゃ','ぎゅ','ぎょ'],
    'じゃ': ['じゃ','じゅ','じょ'], 'びゃ': ['びゃ','びゅ','びょ'],
    'ぴゃ': ['ぴゃ','ぴゅ','ぴょ']
};

const ROW_GROUPS_KATAKANA = {
    'ア': ['ア','イ','ウ','エ','オ'], 'カ': ['カ','キ','ク','ケ','コ'],
    'サ': ['サ','シ','ス','セ','ソ'], 'タ': ['タ','チ','ツ','テ','ト'],
    'ナ': ['ナ','ニ','ヌ','ネ','ノ'], 'ハ': ['ハ','ヒ','フ','ヘ','ホ'],
    'マ': ['マ','ミ','ム','メ','モ'], 'ヤ': ['ヤ','ユ','ヨ'],
    'ラ': ['ラ','リ','ル','レ','ロ'], 'ワ': ['ワ','ヲ','ン']
};

const ROW_GROUPS_KATAKANA_FULL = {
    'ア': ['ア','イ','ウ','エ','オ'], 'カ': ['カ','キ','ク','ケ','コ'],
    'サ': ['サ','シ','ス','セ','ソ'], 'タ': ['タ','チ','ツ','テ','ト'],
    'ナ': ['ナ','ニ','ヌ','ネ','ノ'], 'ハ': ['ハ','ヒ','フ','ヘ','ホ'],
    'マ': ['マ','ミ','ム','メ','モ'], 'ヤ': ['ヤ','ユ','ヨ'],
    'ラ': ['ラ','リ','ル','レ','ロ'], 'ワ': ['ワ','ヲ','ン'],
    'ガ': ['ガ','ギ','グ','ゲ','ゴ'], 'ザ': ['ザ','ジ','ズ','ゼ','ゾ'],
    'ダ': ['ダ','ヂ','ヅ','デ','ド'], 'バ': ['バ','ビ','ブ','ベ','ボ'],
    'パ': ['パ','ピ','プ','ペ','ポ'],
    'キャ': ['キャ','キュ','キョ'], 'シャ': ['シャ','シュ','ショ'],
    'チャ': ['チャ','チュ','チョ'], 'ニャ': ['ニャ','ニュ','ニョ'],
    'ヒャ': ['ヒャ','ヒュ','ヒョ'], 'ミャ': ['ミャ','ミュ','ミョ'],
    'リャ': ['リャ','リュ','リョ'], 'ギャ': ['ギャ','ギュ','ギョ'],
    'ジャ': ['ジャ','ジュ','ジョ'], 'ビャ': ['ビャ','ビュ','ビョ'],
    'ピャ': ['ピャ','ピュ','ピョ']
};

// ============================================================
// 2. KANJI DATA
// ============================================================

const KANJI_GROUPS = {
    numbers: ['一','二','三','四','五','六','七','八','九','十'],
    time: ['日','月','年','時','間','分','先','前','後'],
    nature: ['山','川','海','空','雨','雪','花','木','林','森'],
    food: ['食','飲','水','茶','米','肉','魚','果','野','物'],
    places: ['家','室','門','店','本','校','学','社','会','国','場'],
    actions: ['行','来','見','聞','言','話','読','書','買','売'],
    descriptions: ['大','小','多','少','高','安','新','古','白','黒','赤','青','黄','好','嫌','楽','悲','笑','泣','怒']
};

const KANJI_FILTER_GROUPS = {
    'numbers': ['一','二','三','四','五','六','七','八','九','十'],
    'time': ['日','月','年','時','間','分','先','前','後'],
    'nature': ['山','川','海','空','雨','雪','花','木','林','森'],
    'food': ['食','飲','水','茶','米','肉','魚','果','野','物'],
    'places': ['家','室','門','店','本','校','学','社','会','国','場'],
    'actions': ['行','来','見','聞','言','話','読','書','買','売'],
    'descriptions': ['大','小','多','少','高','安','新','古','白','黒','赤','青','黄','好','嫌','楽','悲','笑','泣','怒']
};

const KANJI_GROUP_NAMES = {
    'numbers': '🔢 Цифры', 'time': '⏰ Время', 'nature': '🌿 Природа',
    'food': '🍣 Еда', 'places': '🏠 Места', 'actions': '⚡ Действия',
    'descriptions': '📝 Описания'
};

const KANJI_GROUP_NAMES_EN = {
    'numbers': '🔢 Numbers', 'time': '⏰ Time', 'nature': '🌿 Nature',
    'food': '🍣 Food', 'places': '🏠 Places', 'actions': '⚡ Actions',
    'descriptions': '📝 Descriptions'
};

const KANJI_DATA = [
    { kanji: '一', readings: 'いち / ひと', meaning_ru: 'один', meaning_en: 'one' },
    { kanji: '二', readings: 'に / ふた', meaning_ru: 'два', meaning_en: 'two' },
    { kanji: '三', readings: 'さん / みっ', meaning_ru: 'три', meaning_en: 'three' },
    { kanji: '四', readings: 'よん / よっ', meaning_ru: 'четыре', meaning_en: 'four' },
    { kanji: '五', readings: 'ご / いつ', meaning_ru: 'пять', meaning_en: 'five' },
    { kanji: '六', readings: 'ろく / むっ', meaning_ru: 'шесть', meaning_en: 'six' },
    { kanji: '七', readings: 'しち / なな', meaning_ru: 'семь', meaning_en: 'seven' },
    { kanji: '八', readings: 'はち / やっ', meaning_ru: 'восемь', meaning_en: 'eight' },
    { kanji: '九', readings: 'きゅう / ここの', meaning_ru: 'девять', meaning_en: 'nine' },
    { kanji: '十', readings: 'じゅう / とお', meaning_ru: 'десять', meaning_en: 'ten' },
    { kanji: '日', readings: 'にち / ひ', meaning_ru: 'день, солнце', meaning_en: 'day, sun' },
    { kanji: '月', readings: 'げつ / つき', meaning_ru: 'месяц, луна', meaning_en: 'month, moon' },
    { kanji: '年', readings: 'ねん / とし', meaning_ru: 'год', meaning_en: 'year' },
    { kanji: '人', readings: 'じん / ひと', meaning_ru: 'человек', meaning_en: 'person' },
    { kanji: '男', readings: 'だん / おとこ', meaning_ru: 'мужчина', meaning_en: 'man' },
    { kanji: '女', readings: 'じょ / おんな', meaning_ru: 'женщина', meaning_en: 'woman' },
    { kanji: '子', readings: 'し / こ', meaning_ru: 'ребёнок', meaning_en: 'child' },
    { kanji: '父', readings: 'ふ / ちち', meaning_ru: 'отец', meaning_en: 'father' },
    { kanji: '母', readings: 'ぼ / はは', meaning_ru: 'мать', meaning_en: 'mother' },
    { kanji: '友', readings: 'ゆう / とも', meaning_ru: 'друг', meaning_en: 'friend' },
    { kanji: '上', readings: 'じょう / うえ', meaning_ru: 'верх, выше', meaning_en: 'up, above' },
    { kanji: '下', readings: 'か / した', meaning_ru: 'низ, ниже', meaning_en: 'down, below' },
    { kanji: '中', readings: 'ちゅう / なか', meaning_ru: 'внутри, середина', meaning_en: 'inside, middle' },
    { kanji: '外', readings: 'がい / そと', meaning_ru: 'снаружи', meaning_en: 'outside' },
    { kanji: '前', readings: 'ぜん / まえ', meaning_ru: 'перед', meaning_en: 'front, before' },
    { kanji: '後', readings: 'ご / あと', meaning_ru: 'после, позади', meaning_en: 'after, behind' },
    { kanji: '右', readings: 'ゆう / みぎ', meaning_ru: 'право', meaning_en: 'right' },
    { kanji: '左', readings: 'さ / ひだり', meaning_ru: 'лево', meaning_en: 'left' },
    { kanji: '東', readings: 'とう / ひがし', meaning_ru: 'восток', meaning_en: 'east' },
    { kanji: '西', readings: 'せい / にし', meaning_ru: 'запад', meaning_en: 'west' },
    { kanji: '山', readings: 'さん / やま', meaning_ru: 'гора', meaning_en: 'mountain' },
    { kanji: '川', readings: 'せん / かわ', meaning_ru: 'река', meaning_en: 'river' },
    { kanji: '海', readings: 'かい / うみ', meaning_ru: 'море', meaning_en: 'sea' },
    { kanji: '空', readings: 'くう / そら', meaning_ru: 'небо', meaning_en: 'sky' },
    { kanji: '雨', readings: 'う / あめ', meaning_ru: 'дождь', meaning_en: 'rain' },
    { kanji: '雪', readings: 'せつ / ゆき', meaning_ru: 'снег', meaning_en: 'snow' },
    { kanji: '花', readings: 'か / はな', meaning_ru: 'цветок', meaning_en: 'flower' },
    { kanji: '木', readings: 'もく / き', meaning_ru: 'дерево', meaning_en: 'tree' },
    { kanji: '林', readings: 'りん / はやし', meaning_ru: 'лес', meaning_en: 'woods' },
    { kanji: '森', readings: 'しん / もり', meaning_ru: 'густой лес', meaning_en: 'forest' },
    { kanji: '食', readings: 'しょく / た', meaning_ru: 'есть, еда', meaning_en: 'eat, food' },
    { kanji: '飲', readings: 'いん / の', meaning_ru: 'пить', meaning_en: 'drink' },
    { kanji: '水', readings: 'すい / みず', meaning_ru: 'вода', meaning_en: 'water' },
    { kanji: '茶', readings: 'ちゃ / ちゃ', meaning_ru: 'чай', meaning_en: 'tea' },
    { kanji: '米', readings: 'べい / こめ', meaning_ru: 'рис', meaning_en: 'rice' },
    { kanji: '肉', readings: 'にく / にく', meaning_ru: 'мясо', meaning_en: 'meat' },
    { kanji: '魚', readings: 'ぎょ / さかな', meaning_ru: 'рыба', meaning_en: 'fish' },
    { kanji: '果', readings: 'か / は', meaning_ru: 'фрукт', meaning_en: 'fruit' },
    { kanji: '野', readings: 'や / の', meaning_ru: 'поле, дикий', meaning_en: 'field, wild' },
    { kanji: '物', readings: 'ぶつ / もの', meaning_ru: 'вещь', meaning_en: 'thing' },
    { kanji: '家', readings: 'か / いえ', meaning_ru: 'дом', meaning_en: 'house' },
    { kanji: '室', readings: 'しつ / むろ', meaning_ru: 'комната', meaning_en: 'room' },
    { kanji: '門', readings: 'もん / かど', meaning_ru: 'ворота', meaning_en: 'gate' },
    { kanji: '店', readings: 'てん / みせ', meaning_ru: 'магазин', meaning_en: 'shop' },
    { kanji: '本', readings: 'ほん / もと', meaning_ru: 'книга, основа', meaning_en: 'book, origin' },
    { kanji: '字', readings: 'じ / あざ', meaning_ru: 'буква, иероглиф', meaning_en: 'character' },
    { kanji: '学', readings: 'がく / まな', meaning_ru: 'учиться', meaning_en: 'study' },
    { kanji: '校', readings: 'こう / こう', meaning_ru: 'школа', meaning_en: 'school' },
    { kanji: '生', readings: 'せい / い', meaning_ru: 'жизнь, живой', meaning_en: 'life, live' },
    { kanji: '先', readings: 'せん / さき', meaning_ru: 'впереди, предыдущий', meaning_en: 'ahead, previous' },
    { kanji: '行', readings: 'こう / い', meaning_ru: 'идти', meaning_en: 'go' },
    { kanji: '来', readings: 'らい / く', meaning_ru: 'приходить', meaning_en: 'come' },
    { kanji: '見', readings: 'けん / み', meaning_ru: 'видеть', meaning_en: 'see' },
    { kanji: '聞', readings: 'ぶん / き', meaning_ru: 'слушать, слышать', meaning_en: 'listen, hear' },
    { kanji: '言', readings: 'げん / い', meaning_ru: 'говорить', meaning_en: 'say' },
    { kanji: '話', readings: 'わ / はな', meaning_ru: 'разговор', meaning_en: 'talk' },
    { kanji: '読', readings: 'どく / よ', meaning_ru: 'читать', meaning_en: 'read' },
    { kanji: '書', readings: 'しょ / か', meaning_ru: 'писать', meaning_en: 'write' },
    { kanji: '買', readings: 'ばい / か', meaning_ru: 'покупать', meaning_en: 'buy' },
    { kanji: '売', readings: 'ばい / う', meaning_ru: 'продавать', meaning_en: 'sell' },
    { kanji: '大', readings: 'だい / おお', meaning_ru: 'большой', meaning_en: 'big' },
    { kanji: '小', readings: 'しょう / ちい', meaning_ru: 'маленький', meaning_en: 'small' },
    { kanji: '多', readings: 'た / おお', meaning_ru: 'много', meaning_en: 'many' },
    { kanji: '少', readings: 'しょう / すく', meaning_ru: 'мало', meaning_en: 'few' },
    { kanji: '高', readings: 'こう / たか', meaning_ru: 'высокий, дорогой', meaning_en: 'high, expensive' },
    { kanji: '安', readings: 'あん / やす', meaning_ru: 'дешёвый, спокойный', meaning_en: 'cheap, safe' },
    { kanji: '新', readings: 'しん / あたら', meaning_ru: 'новый', meaning_en: 'new' },
    { kanji: '古', readings: 'こ / ふる', meaning_ru: 'старый', meaning_en: 'old' },
    { kanji: '白', readings: 'はく / しろ', meaning_ru: 'белый', meaning_en: 'white' },
    { kanji: '黒', readings: 'こく / くろ', meaning_ru: 'чёрный', meaning_en: 'black' },
    { kanji: '赤', readings: 'せき / あか', meaning_ru: 'красный', meaning_en: 'red' },
    { kanji: '青', readings: 'せい / あお', meaning_ru: 'синий, зелёный', meaning_en: 'blue, green' },
    { kanji: '黄', readings: 'こう / き', meaning_ru: 'жёлтый', meaning_en: 'yellow' },
    { kanji: '好', readings: 'こう / す', meaning_ru: 'любить, нравиться', meaning_en: 'like' },
    { kanji: '嫌', readings: 'けん / きら', meaning_ru: 'ненавидеть, противно', meaning_en: 'hate, dislike' },
    { kanji: '楽', readings: 'らく / たの', meaning_ru: 'весёлый, удобный', meaning_en: 'fun, comfortable' },
    { kanji: '悲', readings: 'ひ / かな', meaning_ru: 'грустный', meaning_en: 'sad' },
    { kanji: '笑', readings: 'しょう / わら', meaning_ru: 'смеяться', meaning_en: 'laugh' },
    { kanji: '泣', readings: 'きゅう / な', meaning_ru: 'плакать', meaning_en: 'cry' },
    { kanji: '怒', readings: 'ど / いか', meaning_ru: 'злиться', meaning_en: 'angry' },
    { kanji: '事', readings: 'じ / こと', meaning_ru: 'дело, вещь', meaning_en: 'thing, matter' },
    { kanji: '時', readings: 'じ / とき', meaning_ru: 'время', meaning_en: 'time' },
    { kanji: '場', readings: 'じょう / ば', meaning_ru: 'место', meaning_en: 'place' },
    { kanji: '国', readings: 'こく / くに', meaning_ru: 'страна', meaning_en: 'country' },
    { kanji: '語', readings: 'ご / かた', meaning_ru: 'язык, слово', meaning_en: 'language, word' },
    { kanji: '文', readings: 'ぶん / ふみ', meaning_ru: 'текст, письмо', meaning_en: 'text, letter' },
    { kanji: '社', readings: 'しゃ / やしろ', meaning_ru: 'компания, святилище', meaning_en: 'company, shrine' },
    { kanji: '会', readings: 'かい / あ', meaning_ru: 'встреча, встречаться', meaning_en: 'meeting, meet' },
    { kanji: '間', readings: 'かん / あいだ', meaning_ru: 'между, промежуток', meaning_en: 'between, interval' },
    { kanji: '分', readings: 'ぶん / わ', meaning_ru: 'часть, минута, понимать', meaning_en: 'part, minute, understand' }
];

// ============================================================
// 3. GRAMMAR DATA (ИСПРАВЛЕНА)
// ============================================================

const GRAMMAR_DATA = [
    { id: 'masu', pattern: '〜ます', meaning_ru: 'Вежливая форма (настоящее/будущее)',
        meaning_en: 'Polite form (present/future)', question_ru: '私は毎日ご飯を食べ___。',
        question_en: '私は毎日ご飯を食べ___。', answer: 'ます', options: ['ます', 'ません', 'ました', 'ませんでした'] },
    { id: 'masen', pattern: '〜ません', meaning_ru: 'Отрицательная форма (вежливая)',
        meaning_en: 'Negative form (polite)', question_ru: '私は今日ご飯を食べ___。',
        question_en: '私は今日ご飯を食べ___。', answer: 'ません', options: ['ません', 'ます', 'ました', 'ませんでした'] },
    { id: 'mashita', pattern: '〜ました', meaning_ru: 'Прошедшее время (вежливое)',
        meaning_en: 'Past tense (polite)', question_ru: '私は昨日ご飯を食べ___。',
        question_en: '私は昨日ご飯を食べ___。', answer: 'ました', options: ['ました', 'ます', 'ません', 'ませんでした'] },
    { id: 'masendeshita', pattern: '〜ませんでした', meaning_ru: 'Отрицательное прошедшее (вежливое)',
        meaning_en: 'Negative past (polite)', question_ru: '私は昨日ご飯を食べ___。',
        question_en: '私は昨日ご飯を食べ___。', answer: 'ませんでした', options: ['ませんでした', 'ません', 'ました', 'ます'] },
    { id: 'desu', pattern: '〜です', meaning_ru: 'Настоящее время (вежливое)',
        meaning_en: 'Present tense (polite)', question_ru: '私___学生です。', question_en: '私___学生です。',
        answer: 'は', options: ['は', 'が', 'を', 'に'] },
    { id: 'deshita', pattern: '〜でした', meaning_ru: 'Прошедшее время (вежливое)',
        meaning_en: 'Past tense (polite)', question_ru: '学生___。', question_en: '学生___。',
        answer: 'でした', options: ['でした', 'です', 'じゃないです', 'じゃなかったです'] },
    { id: 'janai', pattern: '〜じゃないです', meaning_ru: 'Отрицание (настоящее)',
        meaning_en: 'Negation (present)', question_ru: '学生___。', question_en: '学生___。',
        answer: 'じゃないです', options: ['じゃないです', 'です', 'でした', 'じゃなかったです'] },
    { id: 'particle_wa', pattern: '〜は〜', meaning_ru: '— тема предложения',
        meaning_en: '— topic marker', question_ru: '私___学生です。',
        question_en: '私___学生です。', answer: 'は', options: ['は', 'が', 'を', 'に'] },
    { id: 'particle_ga', pattern: '〜が〜', meaning_ru: '— субъект действия',
        meaning_en: '— subject marker', question_ru: '猫___います。', question_en: '猫___います。',
        answer: 'が', options: ['が', 'は', 'を', 'に'] },
    { id: 'particle_wo', pattern: '〜を〜', meaning_ru: '— прямой объект',
        meaning_en: '— direct object', question_ru: '本___読みます。', question_en: '本___読みます。',
        answer: 'を', options: ['を', 'は', 'が', 'に'] },
    { id: 'particle_ni', pattern: '〜に〜', meaning_ru: '— направление / время / цель',
        meaning_en: '— direction / time / purpose', question_ru: '学校___行きます。',
        question_en: '学校___行きます。', answer: 'に', options: ['に', 'へ', 'で', 'を'] },
    { id: 'particle_de', pattern: '〜で〜', meaning_ru: '— место действия / инструмент',
        meaning_en: '— location / means', question_ru: '公園___遊びます。',
        question_en: '公園___遊びます。', answer: 'で', options: ['で', 'に', 'へ', 'を'] },
    { id: 'particle_to', pattern: '〜と〜', meaning_ru: '— список (и)',
        meaning_en: '— listing (and)', question_ru: 'りんご___バナナ。',
        question_en: 'りんご___バナナ。', answer: 'と', options: ['と', 'や', 'も', 'だけ'] },
    { id: 'particle_mo', pattern: '〜も〜', meaning_ru: '— тоже / даже',
        meaning_en: '— also / even', question_ru: '私___行きます。', question_en: '私___行きます。',
        answer: 'も', options: ['も', 'だけ', 'しか', 'と'] },
    { id: 'mashou', pattern: '〜ましょう', meaning_ru: '— давайте (предложение)',
        meaning_en: '— let\'s (suggestion)', question_ru: '食べ___。', question_en: '食べ___。',
        answer: 'ましょう', options: ['ましょう', 'ましょうか', 'ます', 'ませんか'] },
    { id: 'mashouka', pattern: '〜ましょうか', meaning_ru: '— давайте...? (предложение с вопросом)',
        meaning_en: '— shall we...? (suggestion with question)', question_ru: '食べ___。',
        question_en: '食べ___。', answer: 'ましょうか', options: ['ましょうか', 'ましょう', 'ますか', 'ませんか'] },
    { id: 'te_kudasai', pattern: '〜てください', meaning_ru: '— пожалуйста, сделай',
        meaning_en: '— please do', question_ru: '食べ___。', question_en: '食べ___。',
        answer: 'てください', options: ['てください', 'ないでください', 'てもいいです', 'てはいけません'] },
    { id: 'te_kudasai_negative', pattern: '〜ないでください', meaning_ru: '— пожалуйста, не делай',
        meaning_en: '— please don\'t', question_ru: '食べ___。', question_en: '食べ___。',
        answer: 'ないでください', options: ['ないでください', 'てください', 'てもいいです', 'てはいけません'] },
    { id: 'te_mo_ii', pattern: '〜てもいいです', meaning_ru: '— можно (разрешение)',
        meaning_en: '— may (permission)', question_ru: '食べ___。', question_en: '食べ___。',
        answer: 'てもいいです', options: ['てもいいです', 'てはいけません', 'なくてはいけません', 'たほうがいいです'] },
    { id: 'te_wa_ikenai', pattern: '〜てはいけません', meaning_ru: '— нельзя (запрет)',
        meaning_en: '— must not (prohibition)', question_ru: '食べ___。',
        question_en: '食べ___。', answer: 'てはいけません', options: ['てはいけません', 'てもいいです', 'なくてはいけません',
            'たほうがいいです'] },
    { id: 'nakute_wa_ikenai', pattern: '〜なくてはいけません', meaning_ru: '— надо (обязательство)',
        meaning_en: '— must (obligation)', question_ru: '食べ___。',
        question_en: '食べ___。', answer: 'なくてはいけません', options: ['なくてはいけません', 'てはいけません', 'てもいいです',
            'たほうがいいです'] },
    { id: 'ta_hou_ga_ii', pattern: '〜たほうがいいです', meaning_ru: '— лучше сделать (совет)',
        meaning_en: '— better to do (advice)', question_ru: '食べ___。',
        question_en: '食べ___。', answer: 'たほうがいいです', options: ['たほうがいいです', 'てもいいです', 'てはいけません',
            'なくてはいけません'] },
    { id: 'suki_desu', pattern: '〜するのがすきです', meaning_ru: '— люблю делать',
        meaning_en: '— like doing', question_ru: '食べる___。', question_en: '食べる___。',
        answer: 'のがすきです', options: ['のがすきです', 'がすきです', 'をすきです', 'にすきです'] },
    { id: 'mae_ni', pattern: '〜まえに', meaning_ru: '— перед тем как',
        meaning_en: '— before doing', question_ru: '食べる___。', question_en: '食べる___。',
        answer: 'まえに', options: ['まえに', 'あとで', 'ながら', 'ときに'] },
    { id: 'ato_de', pattern: '〜あとで', meaning_ru: '— после того как',
        meaning_en: '— after doing', question_ru: '食べた___。', question_en: '食べた___。',
        answer: 'あとで', options: ['あとで', 'まえに', 'ながら', 'ときに'] },
    { id: 'nagara', pattern: '〜ながら', meaning_ru: '— одновременно',
        meaning_en: '— while doing', question_ru: '食べ___。', question_en: '食べ___。',
        answer: 'ながら', options: ['ながら', 'まえに', 'あとで', 'ときに'] }
];

// ============================================================
// 4. VOCABULARY DATA
// ============================================================

const VOCAB_DATA = [
    { word: '浴びる', reading: 'あびる', type: 'Глагол', meaning_ru: 'принимать ванну / душ', meaning_en: 'to bathe / shower' },
    { word: '危ない', reading: 'あぶない', type: 'Прилагательное', meaning_ru: 'опасный', meaning_en: 'dangerous' },
    { word: 'あっち', reading: 'あっち', type: 'Местоимение', meaning_ru: 'вон там', meaning_en: 'over there' },
    { word: '上げる', reading: 'あげる', type: 'Глагол', meaning_ru: 'поднимать; давать', meaning_en: 'to raise; to give' },
    { word: '赤', reading: 'あか', type: 'Существительное', meaning_ru: 'красный цвет', meaning_en: 'red' },
    { word: '赤い', reading: 'あかい', type: 'Прилагательное', meaning_ru: 'красный', meaning_en: 'red' },
    { word: '明るい', reading: 'あかるい', type: 'Прилагательное', meaning_ru: 'светлый; яркий', meaning_en: 'bright; light' },
    { word: '開ける', reading: 'あける', type: 'Глагол', meaning_ru: 'открывать', meaning_en: 'to open' },
    { word: '秋', reading: 'あき', type: 'Существительное', meaning_ru: 'осень', meaning_en: 'autumn' },
    { word: '開く', reading: 'あく', type: 'Глагол', meaning_ru: 'открываться', meaning_en: 'to open (intransitive)' },
    { word: '甘い', reading: 'あまい', type: 'Прилагательное', meaning_ru: 'сладкий; наивный', meaning_en: 'sweet; naive' },
    { word: '雨', reading: 'あめ', type: 'Существительное', meaning_ru: 'дождь', meaning_en: 'rain' },
    { word: 'あなた', reading: 'あなた', type: 'Местоимение', meaning_ru: 'ты; вы', meaning_en: 'you' },
    { word: '姉', reading: 'あね', type: 'Существительное', meaning_ru: 'старшая сестра', meaning_en: 'older sister' },
    { word: '兄', reading: 'あに', type: 'Существительное', meaning_ru: 'старший брат', meaning_en: 'older brother' },
    { word: 'あの', reading: 'あの', type: 'Определение', meaning_ru: 'тот (вон тот)', meaning_en: 'that (over there)' },
    { word: '青', reading: 'あお', type: 'Существительное', meaning_ru: 'синий цвет', meaning_en: 'blue' },
    { word: '青い', reading: 'あおい', type: 'Прилагательное', meaning_ru: 'синий', meaning_en: 'blue' },
    { word: 'アパート', reading: 'アパート', type: 'Существительное', meaning_ru: 'квартира', meaning_en: 'apartment' },
    { word: '洗う', reading: 'あらう', type: 'Глагол', meaning_ru: 'мыть', meaning_en: 'to wash' },
    { word: 'あれ', reading: 'あれ', type: 'Местоимение', meaning_ru: 'то (вон то)', meaning_en: 'that (over there)' },
    { word: 'ある', reading: 'ある', type: 'Глагол', meaning_ru: 'быть; иметься (неодуш.)', meaning_en: 'to be; to have (inanimate)' },
    { word: '歩く', reading: 'あるく', type: 'Глагол', meaning_ru: 'идти пешком', meaning_en: 'to walk' },
    { word: '朝', reading: 'あさ', type: 'Существительное', meaning_ru: 'утро', meaning_en: 'morning' },
    { word: '朝ご飯', reading: 'あさごはん', type: 'Существительное', meaning_ru: 'завтрак', meaning_en: 'breakfast' },
    { word: '明後日', reading: 'あさって', type: 'Существительное', meaning_ru: 'послезавтра', meaning_en: 'day after tomorrow' },
    { word: '足', reading: 'あし', type: 'Существительное', meaning_ru: 'нога; ступня', meaning_en: 'foot; leg' },
    { word: '明日', reading: 'あした', type: 'Существительное', meaning_ru: 'завтра', meaning_en: 'tomorrow' },
    { word: '遊ぶ', reading: 'あそぶ', type: 'Глагол', meaning_ru: 'играть; веселиться', meaning_en: 'to play; to enjoy oneself' },
    { word: 'あそこ', reading: 'あそこ', type: 'Местоимение', meaning_ru: 'вон там', meaning_en: 'over there' },
    { word: '頭', reading: 'あたま', type: 'Существительное', meaning_ru: 'голова', meaning_en: 'head' },
    { word: '新しい', reading: 'あたらしい', type: 'Прилагательное', meaning_ru: 'новый', meaning_en: 'new' },
    { word: '暖かい', reading: 'あたたかい', type: 'Прилагательное', meaning_ru: 'тёплый', meaning_en: 'warm' },
    { word: '後', reading: 'あと', type: 'Существительное', meaning_ru: 'после; остаток', meaning_en: 'after; remainder' },
    { word: '暑い', reading: 'あつい', type: 'Прилагательное', meaning_ru: 'жарко (о погоде)', meaning_en: 'hot (weather)' },
    { word: '厚い', reading: 'あつい', type: 'Прилагательное', meaning_ru: 'толстый', meaning_en: 'thick' },
    { word: '熱い', reading: 'あつい', type: 'Прилагательное', meaning_ru: 'горячий (на ощупь)', meaning_en: 'hot (to touch)' },
    { word: '会う', reading: 'あう', type: 'Глагол', meaning_ru: 'встречаться', meaning_en: 'to meet' },
    { word: '晩ご飯', reading: 'ばんごはん', type: 'Существительное', meaning_ru: 'ужин', meaning_en: 'dinner' },
    { word: '番号', reading: 'ばんごう', type: 'Существительное', meaning_ru: 'номер', meaning_en: 'number' },
    { word: 'バス', reading: 'バス', type: 'Существительное', meaning_ru: 'автобус', meaning_en: 'bus' },
    { word: 'バター', reading: 'バター', type: 'Существительное', meaning_ru: 'масло (сливочное)', meaning_en: 'butter' },
    { word: 'ベッド', reading: 'ベッド', type: 'Существительное', meaning_ru: 'кровать', meaning_en: 'bed' },
    { word: '勉強', reading: 'べんきょう', type: 'Существительное', meaning_ru: 'учёба; учиться', meaning_en: 'study' },
    { word: '便利', reading: 'べんり', type: 'Прилагательное', meaning_ru: 'удобный', meaning_en: 'convenient' },
    { word: 'ボールペン', reading: 'ボールペン', type: 'Существительное', meaning_ru: 'шариковая ручка', meaning_en: 'ballpoint pen' },
    { word: '帽子', reading: 'ぼうし', type: 'Существительное', meaning_ru: 'шляпа; кепка', meaning_en: 'hat; cap' },
    { word: '豚肉', reading: 'ぶたにく', type: 'Существительное', meaning_ru: 'свинина', meaning_en: 'pork' },
    { word: '病院', reading: 'びょういん', type: 'Существительное', meaning_ru: 'больница', meaning_en: 'hospital' },
    { word: '病気', reading: 'びょうき', type: 'Существительное', meaning_ru: 'болезнь', meaning_en: 'illness' },
    { word: '茶色', reading: 'ちゃいろ', type: 'Существительное', meaning_ru: 'коричневый цвет', meaning_en: 'brown' },
    { word: '茶碗', reading: 'ちゃわん', type: 'Существительное', meaning_ru: 'рисовая чашка; чайная чашка', meaning_en: 'rice bowl; teacup' },
    { word: '父', reading: 'ちち', type: 'Существительное', meaning_ru: 'отец', meaning_en: 'father' },
    { word: '違う', reading: 'ちがう', type: 'Глагол', meaning_ru: 'отличаться', meaning_en: 'to differ' },
    { word: '小さい', reading: 'ちいさい', type: 'Прилагательное', meaning_ru: 'маленький', meaning_en: 'small' },
    { word: '近い', reading: 'ちかい', type: 'Прилагательное', meaning_ru: 'близкий; рядом', meaning_en: 'near; close' },
    { word: '地下鉄', reading: 'ちかてつ', type: 'Существительное', meaning_ru: 'метро', meaning_en: 'subway' },
    { word: '地図', reading: 'ちず', type: 'Существительное', meaning_ru: 'карта', meaning_en: 'map' },
    { word: 'ちょっと', reading: 'ちょっと', type: 'Наречие', meaning_ru: 'немного; чуть-чуть', meaning_en: 'a little' },
    { word: '丁度', reading: 'ちょうど', type: 'Наречие', meaning_ru: 'точно; как раз', meaning_en: 'exactly' },
    { word: '台所', reading: 'だいどころ', type: 'Существительное', meaning_ru: 'кухня', meaning_en: 'kitchen' },
    { word: '大学', reading: 'だいがく', type: 'Существительное', meaning_ru: 'университет', meaning_en: 'university' },
    { word: '大丈夫', reading: 'だいじょうぶ', type: 'Прилагательное', meaning_ru: 'в порядке; хорошо', meaning_en: 'OK; alright' },
    { word: '大好き', reading: 'だいすき', type: 'Прилагательное', meaning_ru: 'очень люблю', meaning_en: 'love; like very much' },
    { word: 'だんだん', reading: 'だんだん', type: 'Наречие', meaning_ru: 'постепенно', meaning_en: 'gradually' },
    { word: '誰', reading: 'だれ', type: 'Местоимение', meaning_ru: 'кто', meaning_en: 'who' },
    { word: '誰か', reading: 'だれか', type: 'Местоимение', meaning_ru: 'кто-то', meaning_en: 'someone' },
    { word: '出す', reading: 'だす', type: 'Глагол', meaning_ru: 'вынимать; показывать', meaning_en: 'to take out; to show' },
    { word: '出口', reading: 'でぐち', type: 'Существительное', meaning_ru: 'выход', meaning_en: 'exit' },
    { word: '出かける', reading: 'でかける', type: 'Глагол', meaning_ru: 'выходить; отправляться', meaning_en: 'to go out' },
    { word: '電気', reading: 'でんき', type: 'Существительное', meaning_ru: 'электричество', meaning_en: 'electricity' },
    { word: '電車', reading: 'でんしゃ', type: 'Существительное', meaning_ru: 'электричка', meaning_en: 'train' },
    { word: '電話', reading: 'でんわ', type: 'Существительное', meaning_ru: 'телефон; звонок', meaning_en: 'telephone; call' },
    { word: 'デパート', reading: 'デパート', type: 'Существительное', meaning_ru: 'универмаг', meaning_en: 'department store' },
    { word: '出る', reading: 'でる', type: 'Глагол', meaning_ru: 'выходить; появляться', meaning_en: 'to leave; to appear' },
    { word: 'ドア', reading: 'ドア', type: 'Существительное', meaning_ru: 'дверь', meaning_en: 'door' },
    { word: 'どっち', reading: 'どっち', type: 'Местоимение', meaning_ru: 'который из двух', meaning_en: 'which one' },
    { word: 'どこ', reading: 'どこ', type: 'Местоимение', meaning_ru: 'где; куда', meaning_en: 'where' },
    { word: 'どなた', reading: 'どなた', type: 'Существительное', meaning_ru: 'кто (вежливо)', meaning_en: 'who (polite)' },
    { word: 'どの', reading: 'どの', type: 'Определение', meaning_ru: 'который', meaning_en: 'which' },
    { word: 'どれ', reading: 'どれ', type: 'Местоимение', meaning_ru: 'который из (3+)', meaning_en: 'which (of 3+)' },
    { word: 'どう', reading: 'どう', type: 'Наречие', meaning_ru: 'как; каким образом', meaning_en: 'how' },
    { word: '動物', reading: 'どうぶつ', type: 'Существительное', meaning_ru: 'животное', meaning_en: 'animal' },
    { word: 'どうも', reading: 'どうも', type: 'Наречие', meaning_ru: 'спасибо; очень', meaning_en: 'thanks; very' },
    { word: 'どうぞ', reading: 'どうぞ', type: 'Наречие', meaning_ru: 'пожалуйста (предложение)', meaning_en: 'please (offer)' },
    { word: '土曜日', reading: 'どようび', type: 'Существительное', meaning_ru: 'суббота', meaning_en: 'Saturday' },
    { word: '絵', reading: 'え', type: 'Существительное', meaning_ru: 'картина; рисунок', meaning_en: 'picture' },
    { word: 'ええ', reading: 'ええ', type: 'Частица', meaning_ru: 'да (неформально)', meaning_en: 'yes (informal)' },
    { word: '映画', reading: 'えいが', type: 'Существительное', meaning_ru: 'кино; фильм', meaning_en: 'movie; film' },
    { word: '映画館', reading: 'えいがかん', type: 'Существительное', meaning_ru: 'кинотеатр', meaning_en: 'movie theater' },
    { word: '英語', reading: 'えいご', type: 'Существительное', meaning_ru: 'английский язык', meaning_en: 'English language' },
    { word: '駅', reading: 'えき', type: 'Существительное', meaning_ru: 'станция', meaning_en: 'station' },
    { word: '鉛筆', reading: 'えんぴつ', type: 'Существительное', meaning_ru: 'карандаш', meaning_en: 'pencil' },
    { word: 'エレベーター', reading: 'エレベーター', type: 'Существительное', meaning_ru: 'лифт', meaning_en: 'elevator' }
];

// ============================================================
// 5. QUESTS DATA
// ============================================================

const XP_PER_20_CORRECT = 5;

const ALL_QUESTS = [
    { id: 'visit', name_ru: 'Зайти на сайт', name_en: 'Visit the site', xp: 5, level: 'N5', minXP: 0, check: function(p) { return true; } },
    { id: 'auth', name_ru: 'Авторизоваться', name_en: 'Log in', xp: 10, level: 'N5', minXP: 0, check: function(p) { return true; } },
    { id: 'hiragana_10', name_ru: '10 правильных ответов (хирагана)', name_en: '10 correct answers (hiragana)', xp: 8, level: 'N5', minXP: 0, check: function(p) { return (p.correct || 0) >= 10; } },
    { id: 'hiragana_20', name_ru: '20 правильных ответов (хирагана)', name_en: '20 correct answers (hiragana)', xp: 12, level: 'N5', minXP: 0, check: function(p) { return (p.correct || 0) >= 20; } },
    { id: 'hiragana_50', name_ru: '50 правильных ответов (хирагана)', name_en: '50 correct answers (hiragana)', xp: 20, level: 'N5', minXP: 10, check: function(p) { return (p.correct || 0) >= 50; } },
    { id: 'hiragana_100', name_ru: '100 правильных ответов (хирагана)', name_en: '100 correct answers (hiragana)', xp: 30, level: 'N5', minXP: 30, check: function(p) { return (p.correct || 0) >= 100; } },
    { id: 'hiragana_200', name_ru: '200 правильных ответов (хирагана)', name_en: '200 correct answers (hiragana)', xp: 40, level: 'N5', minXP: 60, check: function(p) { return (p.correct || 0) >= 200; } },
    { id: 'hiragana_500', name_ru: '500 правильных ответов (хирагана)', name_en: '500 correct answers (hiragana)', xp: 60, level: 'N5', minXP: 120, check: function(p) { return (p.correct || 0) >= 500; } },
    { id: 'hiragana_1000', name_ru: '1000 правильных ответов (хирагана)', name_en: '1000 correct answers (hiragana)', xp: 80, level: 'N5', minXP: 250, check: function(p) { return (p.correct || 0) >= 1000; } },
    { id: 'kanji_5', name_ru: '5 кандзи', name_en: '5 kanji', xp: 15, level: 'N4', minXP: 50, check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 5; } },
    { id: 'kanji_10', name_ru: '10 кандзи', name_en: '10 kanji', xp: 25, level: 'N4', minXP: 80, check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 10; } },
    { id: 'kanji_20', name_ru: '20 кандзи', name_en: '20 kanji', xp: 35, level: 'N3', minXP: 150, check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 20; } },
    { id: 'kanji_50', name_ru: '50 кандзи', name_en: '50 kanji', xp: 50, level: 'N3', minXP: 250, check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 50; } },
    { id: 'kanji_100', name_ru: '100 кандзи', name_en: '100 kanji', xp: 70, level: 'N3', minXP: 400, check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 100; } },
    { id: 'grammar_5', name_ru: '5 тем грамматики', name_en: '5 grammar topics', xp: 20, level: 'N4', minXP: 80, check: function(p) { var grammar = p.grammar || {}; var completed = Object.values(grammar.completed || {}).filter(function(v) { return v; }); return completed.length >= 5; } },
    { id: 'grammar_10', name_ru: '10 тем грамматики', name_en: '10 grammar topics', xp: 30, level: 'N4', minXP: 150, check: function(p) { var grammar = p.grammar || {}; var completed = Object.values(grammar.completed || {}).filter(function(v) { return v; }); return completed.length >= 10; } },
    { id: 'grammar_20', name_ru: '20 тем грамматики', name_en: '20 grammar topics', xp: 45, level: 'N3', minXP: 250, check: function(p) { var grammar = p.grammar || {}; var completed = Object.values(grammar.completed || {}).filter(function(v) { return v; }); return completed.length >= 20; } },
    { id: 'vocab_10', name_ru: '10 слов', name_en: '10 words', xp: 12, level: 'N5', minXP: 30, check: function(p) { var vocab = p.vocab || {}; var learned = Object.values(vocab.learned || {}).filter(function(v) { return v; }); return learned.length >= 10; } },
    { id: 'vocab_25', name_ru: '25 слов', name_en: '25 words', xp: 20, level: 'N5', minXP: 80, check: function(p) { var vocab = p.vocab || {}; var learned = Object.values(vocab.learned || {}).filter(function(v) { return v; }); return learned.length >= 25; } },
    { id: 'vocab_50', name_ru: '50 слов', name_en: '50 words', xp: 35, level: 'N4', minXP: 150, check: function(p) { var vocab = p.vocab || {}; var learned = Object.values(vocab.learned || {}).filter(function(v) { return v; }); return learned.length >= 50; } },
    { id: 'vocab_100', name_ru: '100 слов', name_en: '100 words', xp: 50, level: 'N4', minXP: 300, check: function(p) { var vocab = p.vocab || {}; var learned = Object.values(vocab.learned || {}).filter(function(v) { return v; }); return learned.length >= 100; } }
];

// ============================================================
// 6. ACHIEVEMENTS DATA
// ============================================================

var ACHIEVEMENTS = {
    'first_visit': { id: 'first_visit', name_ru: '👋 Первый визит', name_en: '👋 First visit', desc_ru: 'Впервые зашёл на сайт', desc_en: 'First time on the site', icon: '👋', xp: 5, category: 'first_steps', check: function(p) { return p.visitCount >= 1; } },
    'first_registration': { id: 'first_registration', name_ru: '🔐 Первая регистрация', name_en: '🔐 First registration', desc_ru: 'Создал аккаунт', desc_en: 'Created an account', icon: '🔐', xp: 10, category: 'first_steps', check: function(p) { return p.isRegistered === true; } },
    'first_correct': { id: 'first_correct', name_ru: '✅ Первый правильный ответ', name_en: '✅ First correct answer', desc_ru: 'Дал 1 правильный ответ', desc_en: 'Got 1 correct answer', icon: '✅', xp: 5, category: 'first_steps', check: function(p) { return (p.correct || 0) >= 1; } },
    'first_word': { id: 'first_word', name_ru: '📖 Первое слово', name_en: '📖 First word', desc_ru: 'Выучил первое слово', desc_en: 'Learned first word', icon: '📖', xp: 10, category: 'first_steps', check: function(p) { var vocab = p.vocab || {}; var learned = Object.values(vocab.learned || {}).filter(function(v) { return v; }); return learned.length >= 1; } },
    'first_kanji': { id: 'first_kanji', name_ru: '🀄 Первый кандзи', name_en: '🀄 First kanji', desc_ru: 'Выучил первый кандзи', desc_en: 'Learned first kanji', icon: '🀄', xp: 10, category: 'first_steps', check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 1; } },
    'first_grammar': { id: 'first_grammar', name_ru: '🎯 Первая тема грамматики', name_en: '🎯 First grammar topic', desc_ru: 'Пройдена первая тема грамматики', desc_en: 'Completed first grammar topic', icon: '🎯', xp: 10, category: 'first_steps', check: function(p) { var grammar = p.grammar || {}; var completed = Object.values(grammar.completed || {}).filter(function(v) { return v; }); return completed.length >= 1; } },
    'streak_3': { id: 'streak_3', name_ru: '🔥 3 дня подряд', name_en: '🔥 3 days streak', desc_ru: 'Занимался 3 дня подряд', desc_en: 'Studied 3 days in a row', icon: '🔥', xp: 15, category: 'streaks', check: function(p) { return calculateStreak() >= 3; } },
    'streak_7': { id: 'streak_7', name_ru: '🔥 7 дней подряд', name_en: '🔥 7 days streak', desc_ru: 'Занимался 7 дней подряд', desc_en: 'Studied 7 days in a row', icon: '🔥', xp: 30, category: 'streaks', check: function(p) { return calculateStreak() >= 7; } },
    'streak_15': { id: 'streak_15', name_ru: '🔥 15 дней подряд', name_en: '🔥 15 days streak', desc_ru: 'Занимался 15 дней подряд', desc_en: 'Studied 15 days in a row', icon: '🔥', xp: 50, category: 'streaks', check: function(p) { return calculateStreak() >= 15; } },
    'streak_30': { id: 'streak_30', name_ru: '🔥 30 дней подряд', name_en: '🔥 30 days streak', desc_ru: 'Занимался 30 дней подряд!', desc_en: 'Studied 30 days in a row!', icon: '🔥', xp: 100, category: 'streaks', check: function(p) { return calculateStreak() >= 30; } },
    'streak_100': { id: 'streak_100', name_ru: '🔥 100 дней подряд', name_en: '🔥 100 days streak', desc_ru: 'Занимался 100 дней подряд! Легенда!', desc_en: 'Studied 100 days in a row! Legend!', icon: '🔥', xp: 200, category: 'streaks', check: function(p) { return calculateStreak() >= 100; } },
    'correct_10': { id: 'correct_10', name_ru: '📚 10 правильных ответов', name_en: '📚 10 correct answers', desc_ru: 'Дал 10 правильных ответов', desc_en: 'Got 10 correct answers', icon: '📚', xp: 10, category: 'studying', check: function(p) { return (p.correct || 0) >= 10; } },
    'correct_50': { id: 'correct_50', name_ru: '📚 50 правильных ответов', name_en: '📚 50 correct answers', desc_ru: 'Дал 50 правильных ответов', desc_en: 'Got 50 correct answers', icon: '📚', xp: 20, category: 'studying', check: function(p) { return (p.correct || 0) >= 50; } },
    'correct_100': { id: 'correct_100', name_ru: '📚 100 правильных ответов', name_en: '📚 100 correct answers', desc_ru: 'Дал 100 правильных ответов', desc_en: 'Got 100 correct answers', icon: '📚', xp: 35, category: 'studying', check: function(p) { return (p.correct || 0) >= 100; } },
    'correct_500': { id: 'correct_500', name_ru: '📚 500 правильных ответов', name_en: '📚 500 correct answers', desc_ru: 'Дал 500 правильных ответов!', desc_en: 'Got 500 correct answers!', icon: '📚', xp: 60, category: 'studying', check: function(p) { return (p.correct || 0) >= 500; } },
    'correct_1000': { id: 'correct_1000', name_ru: '📚 1000 правильных ответов', name_en: '📚 1000 correct answers', desc_ru: '1000 правильных ответов! Ты монстр!', desc_en: '1000 correct answers! You\'re a monster!', icon: '📚', xp: 100, category: 'studying', check: function(p) { return (p.correct || 0) >= 1000; } },
    'kanji_5': { id: 'kanji_5', name_ru: '🀄 5 кандзи выучено', name_en: '🀄 5 kanji learned', desc_ru: 'Выучил 5 кандзи', desc_en: 'Learned 5 kanji', icon: '🀄', xp: 20, category: 'kanji', check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 5; } },
    'kanji_10': { id: 'kanji_10', name_ru: '🀄 10 кандзи выучено', name_en: '🀄 10 kanji learned', desc_ru: 'Выучил 10 кандзи', desc_en: 'Learned 10 kanji', icon: '🀄', xp: 35, category: 'kanji', check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 10; } },
    'kanji_25': { id: 'kanji_25', name_ru: '🀄 25 кандзи выучено', name_en: '🀄 25 kanji learned', desc_ru: 'Выучил 25 кандзи', desc_en: 'Learned 25 kanji', icon: '🀄', xp: 50, category: 'kanji', check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 25; } },
    'kanji_50': { id: 'kanji_50', name_ru: '🀄 50 кандзи выучено', name_en: '🀄 50 kanji learned', desc_ru: 'Выучил 50 кандзи', desc_en: 'Learned 50 kanji', icon: '🀄', xp: 75, category: 'kanji', check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 50; } },
    'kanji_100': { id: 'kanji_100', name_ru: '🀄 100 кандзи выучено', name_en: '🀄 100 kanji learned', desc_ru: '100 кандзи! Ты настоящий сэнсэй!', desc_en: '100 kanji! You\'re a true sensei!', icon: '🀄', xp: 150, category: 'kanji', check: function(p) { var kanji = p.kanji || {}; var learned = Object.values(kanji.learned || {}).filter(function(v) { return v; }); return learned.length >= 100; } },
    'vocab_10': { id: 'vocab_10', name_ru: '📖 10 слов выучено', name_en: '📖 10 words learned', desc_ru: 'Выучил 10 слов', desc_en: 'Learned 10 words', icon: '📖', xp: 15, category: 'vocab', check: function(p) { var vocab = p.vocab || {}; var learned = Object.values(vocab.learned || {}).filter(function(v) { return v; }); return learned.length >= 10; } },
    'vocab_25': { id: 'vocab_25', name_ru: '📖 25 слов выучено', name_en: '📖 25 words learned', desc_ru: 'Выучил 25 слов', desc_en: 'Learned 25 words', icon: '📖', xp: 30, category: 'vocab', check: function(p) { var vocab = p.vocab || {}; var learned = Object.values(vocab.learned || {}).filter(function(v) { return v; }); return learned.length >= 25; } },
    'vocab_50': { id: 'vocab_50', name_ru: '📖 50 слов выучено', name_en: '📖 50 words learned', desc_ru: 'Выучил 50 слов', desc_en: 'Learned 50 words', icon: '📖', xp: 50, category: 'vocab', check: function(p) { var vocab = p.vocab || {}; var learned = Object.values(vocab.learned || {}).filter(function(v) { return v; }); return learned.length >= 50; } },
    'vocab_100': { id: 'vocab_100', name_ru: '📖 100 слов выучено', name_en: '📖 100 words learned', desc_ru: '100 слов! Отличный словарный запас!', desc_en: '100 words! Great vocabulary!', icon: '📖', xp: 80, category: 'vocab', check: function(p) { var vocab = p.vocab || {}; var learned = Object.values(vocab.learned || {}).filter(function(v) { return v; }); return learned.length >= 100; } },
    'grammar_5': { id: 'grammar_5', name_ru: '📚 5 тем грамматики пройдено', name_en: '📚 5 grammar topics completed', desc_ru: 'Пройдено 5 тем грамматики', desc_en: 'Completed 5 grammar topics', icon: '📚', xp: 20, category: 'grammar', check: function(p) { var grammar = p.grammar || {}; var completed = Object.values(grammar.completed || {}).filter(function(v) { return v; }); return completed.length >= 5; } },
    'grammar_10': { id: 'grammar_10', name_ru: '📚 10 тем грамматики пройдено', name_en: '📚 10 grammar topics completed', desc_ru: 'Пройдено 10 тем грамматики', desc_en: 'Completed 10 grammar topics', icon: '📚', xp: 35, category: 'grammar', check: function(p) { var grammar = p.grammar || {}; var completed = Object.values(grammar.completed || {}).filter(function(v) { return v; }); return completed.length >= 10; } },
    'grammar_20': { id: 'grammar_20', name_ru: '📚 20 тем грамматики пройдено', name_en: '📚 20 grammar topics completed', desc_ru: 'Пройдено 20 тем грамматики', desc_en: 'Completed 20 grammar topics', icon: '📚', xp: 50, category: 'grammar', check: function(p) { var grammar = p.grammar || {}; var completed = Object.values(grammar.completed || {}).filter(function(v) { return v; }); return completed.length >= 20; } },
    'grammar_all': { id: 'grammar_all', name_ru: '📚 Все темы грамматики пройдены!', name_en: '📚 All grammar topics completed!', desc_ru: 'Пройдена вся грамматика JLPT N5!', desc_en: 'All JLPT N5 grammar completed!', icon: '📚', xp: 100, category: 'grammar', check: function(p) { var grammar = p.grammar || {}; var completed = Object.values(grammar.completed || {}).filter(function(v) { return v; }); return completed.length >= GRAMMAR_DATA.length; } },
    'level_10': { id: 'level_10', name_ru: '👑 Уровень 10', name_en: '👑 Level 10', desc_ru: 'Достигнут уровень 10', desc_en: 'Reached level 10', icon: '👑', xp: 30, category: 'special', check: function(p) { return getLevel(p.xp || 0) >= 10; } },
    'level_25': { id: 'level_25', name_ru: '👑 Уровень 25', name_en: '👑 Level 25', desc_ru: 'Достигнут уровень 25', desc_en: 'Reached level 25', icon: '👑', xp: 60, category: 'special', check: function(p) { return getLevel(p.xp || 0) >= 25; } },
    'level_50': { id: 'level_50', name_ru: '👑 Уровень 50', name_en: '👑 Level 50', desc_ru: 'Достигнут уровень 50!', desc_en: 'Reached level 50!', icon: '👑', xp: 100, category: 'special', check: function(p) { return getLevel(p.xp || 0) >= 50; } },
    'emperor': { id: 'emperor', name_ru: '👑 Император', name_en: '👑 Emperor', desc_ru: 'Достигнуто звание Император!', desc_en: 'Reached Emperor rank!', icon: '👑', xp: 200, category: 'special', check: function(p) { var level = getLevel(p.xp || 0); var rank = getRankByLevel(level); return rank.title.indexOf('Император') !== -1 || rank.title.indexOf('Emperor') !== -1; } },
    'hangman_win_1': { id: 'hangman_win_1', name_ru: '🎮 Первая победа в виселице', name_en: '🎮 First hangman win', desc_ru: 'Победил в виселице в первый раз', desc_en: 'Won hangman for the first time', icon: '🎮', xp: 10, category: 'special', check: function(p) { return (p.hangman?.wins || 0) >= 1; } },
    'hangman_win_10': { id: 'hangman_win_10', name_ru: '🎮 10 побед в виселице', name_en: '🎮 10 hangman wins', desc_ru: 'Одержал 10 побед в виселице!', desc_en: 'Got 10 hangman wins!', icon: '🎮', xp: 30, category: 'special', check: function(p) { return (p.hangman?.wins || 0) >= 10; } }
};

var ACHIEVEMENT_CATEGORIES = {
    'first_steps': { name_ru: '🎯 Первые шаги', name_en: '🎯 First Steps' },
    'streaks': { name_ru: '🔥 Стрики', name_en: '🔥 Streaks' },
    'studying': { name_ru: '📚 Учёба', name_en: '📚 Studying' },
    'kanji': { name_ru: '🀄 Кандзи', name_en: '🀄 Kanji' },
    'vocab': { name_ru: '📖 Слова', name_en: '📖 Vocabulary' },
    'grammar': { name_ru: '📚 Грамматика', name_en: '📚 Grammar' },
    'special': { name_ru: '🏅 Особые', name_en: '🏅 Special' }
};

// ============================================================
// 7. HANGMAN WORDS
// ============================================================

var HANGMAN_WORDS = [];

function hasKanji(text) {
    var kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/;
    return kanjiRegex.test(text);
}

// Берём слова из VOCAB_DATA (без кандзи)
for (var i = 0; i < VOCAB_DATA.length; i++) {
    var word = VOCAB_DATA[i];
    if (word.word.length <= 8 && word.word.length >= 2 && !hasKanji(word.word)) {
        HANGMAN_WORDS.push({
            word: word.word,
            reading: word.reading,
            meaning_ru: word.meaning_ru,
            meaning_en: word.meaning_en,
            type: word.type
        });
    }
}

// Если слов мало — берём больше
if (HANGMAN_WORDS.length < 30) {
    for (var i = 0; i < VOCAB_DATA.length; i++) {
        var word = VOCAB_DATA[i];
        if (word.word.length <= 10 && word.word.length >= 2 && !hasKanji(word.word)) {
            var alreadyAdded = HANGMAN_WORDS.some(function(w) { return w.word === word.word; });
            if (!alreadyAdded) {
                HANGMAN_WORDS.push({
                    word: word.word,
                    reading: word.reading,
                    meaning_ru: word.meaning_ru,
                    meaning_en: word.meaning_en,
                    type: word.type
                });
            }
        }
        if (HANGMAN_WORDS.length >= 50) break;
    }
}

// Перемешиваем
for (var i = HANGMAN_WORDS.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = HANGMAN_WORDS[i];
    HANGMAN_WORDS[i] = HANGMAN_WORDS[j];
    HANGMAN_WORDS[j] = temp;
}

console.log('✅ data.js загружен! (' + HANGMAN_WORDS.length + ' слов для виселицы)');