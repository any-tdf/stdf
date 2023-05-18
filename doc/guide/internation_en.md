## Configuring Language Pack

The STDF component uses Svelte's [Context](https://svelte.dev/docs#run-time-svelte-setcontext) to implement internationalization configuration of text, with the default configuration being in Simplified Chinese. Usually, the Context is configured in the entry file `App.svelte`. For example:

```svelte
<!-- App.svelte -->
<script>
    import { setContext } from 'svelte'; // import setContext
    import en_US from 'stdf/lang/en_US'; // import language file

    setContext('STDF_lang', en_US); // set language
</script>
```

All child components of this component (including STDF components) can obtain the current language configuration using `getContext('STDF_lang')`. More flexible is that another language can be configured in some parts of the application.

Note that **Context switching is not reactive**, and language switching in most applications does not require real-time response.

Currently supported languages:

| Language                              | lang   |
| ------------------------------------- | ------ |
| Arabic                                | ar_EG  |
| Azerbaijani                           | az_AZ  |
| Bulgarian                             | bg_BG  |
| Bengali (Bangladesh)                  | bn_BD  |
| Catalan                               | ca_ES  |
| Czech                                 | cs_CZ  |
| Danish                                | da_DK  |
| German                                | de_DE  |
| Greek                                 | el_GR  |
| English                               | en_GB  |
| English (US)                          | en_US  |
| Spanish                               | es_ES  |
| Basque                                | eu_ES  |
| Estonian                              | et_EE  |
| Persian                               | fa_IR  |
| Finnish                               | fi_FI  |
| French (Belgium)                      | fr_BE  |
| French (Canada)                       | fr_CA  |
| French (France)                       | fr_FR  |
| Irish                                 | ga_IE  |
| Galician (Spain)                      | gl_ES  |
| Hebrew                                | he_IL  |
| Hindi                                 | hi_IN  |
| Croatian                              | hr_HR  |
| Hungarian                             | hu_HU  |
| Armenian                              | hy_AM  |
| Indonesian                            | id_ID  |
| Italian                               | it_IT  |
| Icelandic                             | is_IS  |
| Japanese                              | ja_JP  |
| Georgian                              | ka_GE  |
| Khmer                                 | km_KH  |
| Kurdish (Northern)                    | kmr_IQ |
| Kannada                               | kn_IN  |
| Kazakh                                | kk_KZ  |
| Korean                                | ko_KR  |
| Lithuanian                            | lt_LT  |
| Latvian                               | lv_LV  |
| Macedonian                            | mk_MK  |
| Malayalam                             | ml_IN  |
| Mongolian                             | mn_MN  |
| Malay (Malaysia)                      | ms_MY  |
| Norwegian                             | nb_NO  |
| Nepali                                | ne_NP  |
| Dutch (Belgium)                       | nl_BE  |
| Dutch                                 | nl_NL  |
| Polish                                | pl_PL  |
| Portuguese (Brazil)                   | pt_BR  |
| Portuguese                            | pt_PT  |
| Romanian                              | ro_RO  |
| Russian                               | ru_RU  |
| Sinhalese                             | si_LK  |
| Slovak                                | sk_SK  |
| Serbian                               | sr_RS  |
| Slovenian                             | sl_SI  |
| Swedish                               | sv_SE  |
| Tamil                                 | ta_IN  |
| Thai                                  | th_TH  |
| Turkish                               | tr_TR  |
| Turkmen                               | tk_TK  |
| Urdu (Pakistan)                       | ur_PK  |
| Ukrainian                             | uk_UA  |
| Vietnamese                            | vi_VN  |
| Simplified Chinese                    | zh_CN  |
| Traditional Chinese (China Hong Kong) | zh_HK  |
| Traditional Chinese (China Taiwan)    | zh_TW  |

The multilingual files are translated by machine. If there are any inaccuracies, please submit a PR for correction.

## Adding a Language Pack

If you cannot find the language pack you need, you are welcome to create a new language pack based on the [Chinese language pack](https://github.com/dufu1991/stdf/blob/main/components/lang/zh_CN.js) or [English language pack](https://github.com/dufu1991/stdf/blob/main/components/lang/en_US.js) and submit it as a Pull Request. [Language code table](http://www.lingoes.net/en/translator/langcode.htm)

The basic steps are as follows:

1. Add the language pack in the `components/lang` folder.
2. (Optional) Update the documentation. Update the `internation.md` and `internation_en.md` files in the `site/doc/guide` folder. Please update the language list in alphabetical order by `lang`.
