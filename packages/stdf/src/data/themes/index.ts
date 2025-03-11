import { STDFTheme } from '../../lib/theme/index.js';
import Chameleon from './chameleon.js';
import AzurePink from './azurePink.js';
import SmartLive from './smartLive.js';
import CamelliaRed from './camelliaRed.js';
import Nintendo from './nintendo.js';

export default [
	{ name_CN: 'STDF', name: STDFTheme.name, theme: STDFTheme },
	{ name_CN: '任天堂', name: Nintendo.name, theme: Nintendo },
	{ name_CN: '蔚蓝粉', name: AzurePink.name, theme: AzurePink },
	{ name_CN: '变色龙', name: Chameleon.name, theme: Chameleon },
	{ name_CN: '慧活力', name: SmartLive.name, theme: SmartLive },
	{ name_CN: '山茶红', name: CamelliaRed.name, theme: CamelliaRed }
];
