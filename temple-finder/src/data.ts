// Simple Temple Data - All in one file
export interface Temple {
  id: string
  name: string
  deity: string
  description: string
  address: string
  city: string
  state: string
  latitude: number
  longitude: number
  rating: number
  image?: string
}

export interface DeityCategory {
  id: string
  name: string
  icon: string
  description: string
  mantra?: string
}

export interface Festival {
  id: string
  name: string
  dateLabel: string
  description: string
}

export const upcomingFestivals: Festival[] = [
  {
    id: 'f1',
    name: 'Panguni Uthiram',
    dateLabel: 'Mar–Apr',
    description: 'Celebration of divine marriages; Murugan temples across Tamil Nadu.',
  },
  {
    id: 'f2',
    name: 'Chithirai Brahmotsavam',
    dateLabel: 'Apr–May',
    description: 'Meenakshi–Sundareswarar festival in Madurai.',
  },
  {
    id: 'f3',
    name: 'Karthigai Deepam',
    dateLabel: 'Nov–Dec',
    description: 'Lamps and lamps on sacred hills; Thiruvannamalai and temples statewide.',
  },
]


// All Temples Data - Real Chennai Temples from Google Places API
export const temples: Temple[] = [
  {
    id: '1',
    name: 'Thiripura Sundari Amman Koil',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 70 visitors.',
    address: 'No.2/56, First Main Road, M.H.Colony, Thiruvalluvar Puram, Choolaimedu, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0672608,
    longitude: 80.222911,
    rating: 4.4,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mO2RYzguv5Cu3u2O2S5iYxCM47Pum7Nb9YO1oebo9kFohkO2ICL42DFvIUmXX1B_npw60_vjSGtgg5Ilgx8IFF9nxYkw5sJlP_nV-ODTe7xxgK74V90mGmDQOe4yWU-Cw3f-HiZ2ZH4rVbzqXWbW8u-wm2bhn9wMX7Nl3VP7bNCgP68A-kBDv2AMr2I9TsGaFqdORCCRAFn58PJRV77LznZTovt5eC7SPqDHePwTKF60M3NNnu48aYlrxwXJ8NMlzWVni0-lM-nlohOXfUyOvl-siCA72ZS6-NeKCC4Hw5y1DGOdz6IKlY5WESTDSHn-kkhmFWV97OZuV9XwbjcwPhTEoDzIM9wlQSa4wy_FFNKJAy8sm_KuVwkD8rtoVhjwooUQey2eeAJlyVH1OpBy51mAMf47nZUuL8llVD-lnG9eu7DOTgwz0mhiYqDTVy5sMMM9J3jjyHKjr6htSqb5izVhVFUatfLbk-i4u-Fa-Iy_W1NOFz75-aV9VULHUGtjYbWwVgWLmXtPkpYGDFDxNUcVT9lNZiGDHaMGlN7k6A2nPMBJrvYzsVFXeqJ6i-k0brInEMt0w8rfiow8L4iB1ZtT7LMJq6qNbwXKaqPUWxANfLVUC7L8TcWG6rna6r2COBqcee&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '2',
    name: 'Nagathamman Kovil',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 10 visitors.',
    address: '36X7+9GC, near ICF Design & Development Division, National Highway 205, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0984289,
    longitude: 80.2137716,
    rating: 4.6,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3n9UftmNOGDUjScKZZ0Ty2pwRz6m5BPNM12TbLC-drvAhpLicMa4TqncyRdhns7PK3Rq8b69Zvhfp-LZ3RxI-oxP-BRm80lyGjGad1gOJtG5GafeHpL_Rv22T-_9ANCUfy0gK8y3b4mrmvd50cXUGw-u8DSG1VoLuDx6rSkV2MpZ6E-vLa-XyhgnGFNTVDGlSkCrzg7wesq5JpDfaZJKBKxDGCF22KwHmC6ruc2mhUy41ZLhKRG6hB03m3w1Q6tGbcqh5Ncq-o_8gwMdvbMbKm6bHpcMKQ0OSpIMBN7gWBaxmCDOHoQKHfeG3juz9AJqd8nwytBgVe2CzPn3BfR3n1NY1Vz8Zl6r49de3e7QcHJlKQlrJj_iafowFw7Qu-VfvMji2TFvpSCZ9ffB-JTIGoISnij_pBwUBkpRnWXIhzVIcnauEzZ8MtC9XUDqLiwsUf8lVi9EVeIRyJcZ31IH2Ro-wsnNamqvv7q316cLhqqAJ3f8rjZt8hRuJvrXSuX9OkGu4wIL9lNVXgpIR41idS9d_fKp0UuioH8perpLYClkunJcpRg7DIbE5Q2vILTOpDzFeX7cXpOJzmkFkguzhnQDy7nIc4_dy2nbusPx1nlgNXjWA_u3cEjQ9qwifBaYQhTM4Jb&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '3',
    name: 'Kotturpuram Shri Varsiddhi Vinayagar Temple',
    deity: 'Ganesha',
    description: 'Hindu temple in Chennai. Rated by 106 visitors.',
    address: '26FV+H5R, Gandhi Mandapam Road, Chitra Nagar, Kotturpuram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0239874,
    longitude: 80.24290080000002,
    rating: 4.4,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3njdInLNa0-8PpFc2-KjxPrs8AHqTOIKvA-qwMPrRyDbqKrl6UZVQd3-akQhUEhUqeM3eyWR9HhhzqDm8AZ2MyRVUoBwgFngm-20E4GLFom06xBkT08KR0RnoDIU1o-oyaOFNOv-c9oCg7vexhJJjXWat6NUesG_RGJmpKpF9g8-zieN-CRn75slI1Zh4OtIVin4ettFi57gGI8zI_zEcduXG3kbA-C92Ufr6NpmFS1P0Fsv50A2WHdjGDU-UJdNGfFF3AsiMIe_Ch20-I9waX6YjQteO9MkMWId3ZkYCQnZ_ix_qyhaHqnDSTtSA_0r_ONYa6zah_uZt5jW7GUUkXLn-sZJxHOY3OY-SmrvPcDzkS53nppqGm9CtC6UerYnk4CUkL8UcuG6WayvTLfDtjU38FtKN0EEzZbW3aOxZoIVvUryQErgJSiDKnL6lz3htc16Kfb1wtxtcAfZVJ0Z7iUbqNRcOlJFZ-dryKUMtFTldQf6SFSqvGGp9NbBx68xh_tWB-u5RcxzdML2mjjwzMLidoRy19RoLYid198x3AaYjdtn1_o1tGEDZ2jDF6NHfFXm5tRxDm7bz_zgyCkDIny5t6yFAyfBju7TcJHkr0ph2DR74J9bgqb52rvCnIh3aXxA3d51Gsq_esu6hdF1KvztY8&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '4',
    name: 'Amman Temple',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 8 visitors.',
    address: '26FF+GQW, Suriyammapet, Saidapet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0238504,
    longitude: 80.22443799999999,
    rating: 4.8,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3nzBgqeV6ctzsAd1_557TC4u7FBYoXN_Ci7z96I0yQoRoo-BTe51T3ZaLvSTe4hDaauVQhceForPoJz1snAQya_A4EJ5therfOErMpQe5hPhIEE-nULD6LjKa0HQhpG0OtcgXaCj-1YBDg2lOuQeq3iPadNl1U0sPKnLG3diNn57UEd3Q_ylKOZhUPF20vsRuIkumOVh7iXGoNDge08y3VH7AvcSZSV7c-Q6YZgzBoKVA9UEUvfl6Qm8N_8tlGepy8NJKe-YmA2gH6y12TcfGwErr4u2VT1uaV5h0TgWtijbjuI3bM9_GFnnUrqyU3T1Bgi4YaSACpJFM0PwbaIc8Un-upnLS_0IRKHFOKm2UMIemj1fI3jO6fkp3F_a1M41o35wMEPfV3fBU6gAaIq4lWooZmi7iR2ObYQD42V88cbAz0mzLtLVIG1I3eUu8szxYJOETqpo4xFXdG3i6Xec2OR1zsGnJnyY_2rJM3BgwBNiARb6MlFYXXS70KfW4BNPmG3AhQcP2Uk416Nie20Cf9oLpwaMgyv9dqHETfznwgfxljlzkTbR24TFtmcIflIyilAHGoPjs-FCyFMPUZ2-_LiYMZuW5A9LOy49d24K2UvptDLdJm8Bvzo0qEEPrAs3P4S1_9vzs4PqtaeT30PsA&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '5',
    name: 'Arulmigu sri Ellamman Kovil',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 341 visitors.',
    address: '48, Sundaramoorthy Vinayagar Koil Street, Triplicane High Road, Triplicane, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0546029,
    longitude: 80.27414519999999,
    rating: 4.6,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3lj_z28JCOquEnQEsSPpNlHHEr3OA18JkNaqquPZT-wyXd6hw1titvC7EBNLDD7ZWByYWSpZBcuSSP6Cfqv1qYuq7VWNB6-17BbbitStpna7Ncd_RrnZaq8lintkOZi1PUFLpjJ_9RkDp1fIyzu3DGUdHngc7mlDvNliarCrMxPpwzfOglw-L0JKAGyy3qgZmqeDjwUwt-oZswPAevnKWoWq5PqOxG2-BgPs8nqINtV00Y1LeQfWcg0Jgj-2UajxjOYssLyP-BH4jNEMPoP1Ub_9mPo4C5-2qRR0kqOi7mKeIoOoasocKB8Ny7e2grlBu2yuPapv-BklKAgGsiid3HV8P1BcX1rY-OLo-gGerOBbUBRlFwXezpu-oi6Wdi-RXV0OGoqyjC8VT58OFphE5uB-htX8IWSJoggLEpCXXjc1me0kZTvLQHfNQEpfm__nfDSMiXsUk_zF5Pd6r9vi2_HAHyB_-1grliiAOciMD7PKaeARVyFGn3ALvjAnttzf2_4Q65kAwnINOnWiLHAPbEymcx2TzTZM8T4_K75eyEoAAH3_IRKomX_YMjE1ZI9AyfoxE4ehhYdaIoP5aLiSWx1dLkUfwcnrVSBOTN5aAIpCUmOcZRdaRWUweWufLr1WoJ4rR1q&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '6',
    name: 'Arulmigu Kasi Viswanathar Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 264 visitors.',
    address: 'No.13, near, KV Kovil Agraharam Street, Chinna Chembarambakkam, Ayanavaram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0979896,
    longitude: 80.2412178,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3l9dsEieOUB-jRx_dFQnwQ4X5GX0QFq1LCRvobIgKA-fGQMH4z6RTFAffuqA2PIt1c7cm8Fa4yF8TuXEJfPT5-2kPwAlm1ZnxGygC9iyxjeakFlePdlRf9tKJS9dKtF4rJBzaqC5Vm3RdZfpXeDnT7zOW-nt180xGicg9RB_5M9aRCDrBqJK_S5AAEFh9UflNlvCPyg35f73PjV4t8akNNwNb9u1E_HwOBEyvh4kTGPhpvVsdAwOfYTRmZ8BXkXlon6clsvA64R01tsh-uzL8HVEBwpE4z0Y5Dn1LmWrFZRQO_HjenBwKFEOSnxAgNEt4r9ciePF8fqZjxxBLmgYieBZjgwvE0hm8JoUBIWGHftpwA_aqGXbOCZZpaTF-4qa0WcUNTtvlHxvRgq6siU5VWw4XQudCnfS9ToSOCkJkAQw7GDaHYtsF2G_eYO8Ha7kv4ja0y_D19WPjMmP0_klS3SNtsRzeIv2dYoMPIEkXrBf8YRQD9EUpWE5mL1xXUscY8bXdtGtnE7W-0NtkOZ-Fas5lpfQ23ZRescb0xi4YkNptmRXStbSFvoiebY_HvQISvjjEk_VJ4Qg0SeWGNoNprJmTMb3b_uSXOP64LeCiM8YxEGKLVw-ASr-GK6rKRq&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '7',
    name: 'Shree Vasavi Kanyaka Parameswari Temple',
    deity: 'Rama',
    description: 'Hindu temple in Chennai. Rated by 321 visitors.',
    address: '37RM+Q53, Audiappa Naicken Street, Broadway, George Town, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0918948,
    longitude: 80.282916,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3l5ErmOICDBZCgQQNZscyWXjgtihmSkZD5lMUbJO1i9VF2QPzKil3ZPtGMRPQcJrl9yYasPuPva8hmXKFhQuU4Gvtf3R0IFtVM4Q6UasJko9WB1IiiEXTTQooW_W3BptktTcoL6azIssNYt7kX5dv23S67QnoahVYWn4JctNOevLMUG6cQHN4PvHBFurcf6zLpsGgCwKG9SnoPZ5N6SVetU0K-T-YAQhETnVILzO7vTbkmKsunWf8BuKeqjBDSiFQGkDJr3pISOEJPMSgw82uCdEWa9bpifswI9SBzAIgj2A9GESj01TorQZgDCL1wqaZ_hn_Rftm6c7_C8a4SO8EcMkCwevCm4WB2zTyaOBrRRTDY1LVM00Kt-3pa7NZf1OXAU0C185LGPVHcRkM5CjijUoEen4z23GRk4tbPbmJ8ZuBIcYDHUUMMtgERMWdIsVeTNnmazTebSYqM_3a-UPV2kGbsFnYRrwX1QK2V6Ca-G6Qll-fSZg0t9iIvKcRk0e8xM_dadozSSVojWjwnUsMZseHH6XrrhoQYdrPsKf8NNmX-tAGfgMKzS7fSOEjBIN_bawQuejBkEwVoYrKlXXCZ_bNJzVrmsSTx0J_hKKdYAnJQsd_Zmool4eH0X3DyeTDu7JiCx2C-cPAhIQrY9HERdNTo&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '8',
    name: 'Sri Aadhi Mottaiyamman Aalayam',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 52 visitors.',
    address: 'New Street, Kosapet, Purasaiwakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.094906,
    longitude: 80.25581729999999,
    rating: 4.8,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3kB2fiCGl59hWhgozJKKiFjuJybzO8Ld4GdpoUuLsncnYHPWL16JdPmdshco7WX2_JiiLq3numhJjjJgzNDLR-7tWMPZh5T5RLEfYRWPA9N90rSDH2W42RwzzVY2fxndzG0pDMXohm5n6lJIu4DrzKbJiATWk49eGRy0M3HJ4E9ySPJ1lGKEG4IJ6NlXARUFRzH76B2Zfk0xvv6HrHNwBzHkU-58DmU1p2oQtvPwbEIZ0QMDJTKPFEvl_kPDIxIi6dzg9UvIiMUlxkL-qP7qioryLY7PY-c1myXrzn2bNWqvx_-mXRZ2QcGQS0ZLHY7Wx8At1gjBvcKeCNDWjW1nIAM_nRpcwgmbb-JQcVZ9yOLuCcOFZzaI8j2hmkoKMKHy9GwrcByorn7nmdWWtjmKBAD-jlXeOogUfT5OxWglXrTaK5obl3ufPqqmpaTkBbC2xc5ilkXjlL6rvYxY9-v7s04eGVGceTvmMOzi3XUaogn9K_6s9hx739c8tVkJzTdWuKWPVdBhT_xF3psYhTDoycAleY-rODH6Lbhd15F7rYRn45PRMIdD030yxrH2mLLVmgfE2MCJ_acKdKXscNVHQutGzyE57bN1ahJaIjYxTY1zcHdtdnsjzbttm_5qlfmnCdyd5IO0yog9JIKTm3lOOebp4g&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '9',
    name: 'Ahobilam Math, Mylapore',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 37 visitors.',
    address: 'Desika Hall, 28, Sri Vedanta, Venkatesa Agraharam, Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0329214,
    longitude: 80.26640739999999,
    rating: 4.6,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3lO7reUt7ggyNhTR_5sCTNmZrofui6yTQu7Pz7Lt0lAj-Vu3kFLl4IGP_LJkKDHooyWTONeBphZ1BL3cDXmuoa1Hbteri69HQFdEa90MrYkbNBWLwB6JlgvS2RWdGBx14MchcoKZAtU_zlieWl4z7nd61yAUYMvoA81ZPfhukngKJPjlkpb84GUWeE9lVR_M8UJGVkmQqZRUknou4ux0pl5lr2c4Alwy_w3hQfmo_IBAdU6-oa7oeeSxFTj9Una3WERI-7xRLIX9rk_pB8rHZT5UUbRRTtlxNItdTtghLQ3kxWB3xUL5TwjjxM5VlTNNDlb_UswdlSemYY3c76VdlUdBCagIKNhD2mC1Q0aFezi8cp-4j4wL5F058BQp_1cOKslCd6ip62fUJukAYtNKpkga1_5fYqnjEylIVrXdMhA5MTEsiIDbw5NVOaVyU3eRACXLHlGEYCb3fH62BdVIi7VmlDiC7TmkyHUduL2ArgjaGRsNKTskEvFcM5K5GUq4_vZYqvp5SKD4JOPIEN0KLaNqQjeiTNYMBJSSmRs1GLdfbhnRlSa1RuTAi-ZbCeUCG3wjazfJyD0SipFFocolW27hiYOYh54Au92aFH2C-0FFJ1EPISrelZlpr6djyx7T8vO2w&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '10',
    name: 'Sakthipuriswarar Sivan Koil',
    deity: 'Shiva',
    description: 'Hindu temple in Chennai. Rated by 43 visitors.',
    address: 'Sakthi Nagar 2nd Street, Sakthi Nagar, Choolaimedu, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0650612,
    longitude: 80.2258727,
    rating: 4.5,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3kYMVEt3Eq2FSMKaeRmjTQ17ciRKdJbQH0gntDPiU55g8VCuuHhJiI6aAcTSSg3hNk2SzDIImzc5HH6mjZIVZKJwXySA9fd1zMiUlMj8_lYehO97vwmf_M9ENCN_mdpLc9UCR9bxZrkAAn80JdPKm_DM-3gkJ6wNiZKpdkuZGD8rps4_65sPimb5TPTvQLQFJLraxF9ebBRTGOegGHuYCi8jappGu61cVtZf2thjYLUrRIkY5SojkUa5BRii-Ha5wBTn2oVOio2LPIT6UnZ3gDvEJF1HOYSIjEAnE_lMIIkrLpHKS_PTgywgmyY9AQQyhDxYKBgXuFsXNAhRdHMXtjv-GICo5gcFWXJ8dLqBpD-rbD2x3SNwjyHq_RiOkxwp7x8e-vqo9B6o18hlVadxUyeQnIdRFud_o3qFpE70ywnZO7P6V4GLy49vMSyUmE6bmxvaN9KW1wpZdoolNlINohAAVOmNzt5Q0kHZ2xFDWRpzFk2wvVwg8AH4G0U1q5e8hi9zEzTL4hB0KxdixXZLVqwVD8WEMrg4jiCJB1_ZETcnVpEZnf5rUEZzbul5OwCdeAEuaubCqDE8XeDhX5YPfUhN6u9Mo7Y5lv6yb296i16m5N-jHl8yLg2cVvgfA1HTO9xWA&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '11',
    name: 'Sri Periyapalaythamman Temple',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 25 visitors.',
    address: '3736+GHG, Srinivasa Perumal Sannadhi First Street, Srinivasa Perumal Sannadhi Second Street, Ganapathy Colony, Royapettah, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0538057,
    longitude: 80.2614472,
    rating: 4.9,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3lm_Tjv2CUC078gpUWfnlAw3rqQCF6bHmXWyHevYN3Nm2PXQuiUTnAFoZtXO53Y7cEDCvam7HCKrBa3H7Kig-I9mHl4_3bADb5EfYcScBKXydOuCNmgmGODZo-v44sbazelyJzRJ_2-PxgNElja2mhex_Sm9WTry1XmNAnQrXlsPygIwaONUIgkEQbo9GFvF1UAXS2EkKjwKVap-vHplocinJhtmEXXragdixpmkO2kweiSFJtlnptW7MRpQIWaI-CQH76u54jkkb_llxwKpavN3Kd6Xbn3ENcisOtuxJWWkT31xMrkCbtlzk5yi3nLiwPirSsmmYxZ78NuT4Cr00SKEgNTAzAuI6yV_dg5IEfakwghVH6NckCCU7FodrzIPh4B6GjghwsoWw0RQaDlzt4B3YUCARF6H2Qq-Tv76P7HFZ9hkmgBnqLyPLXPRbDh1p4HXGzRNZfGiGBjGOrSFfNvWQMMsD676DfBHF7wdFl6answSKSdFaWw0F-gAVwpE_jZmeQPWGqFgh6y5pjChJZSbr1GD03L6EtgCk-UteqvnB7SMQOU3Rrr3hJ4Ir9u-F49lv5jNpiNPuiHTnUF86Uu7_trekEvSR54v61qXpTqvXQXAU3nj-PY-X_n01Uf4LlOng&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '12',
    name: 'Sri Ramakrishna Math Chennai',
    deity: 'Krishna',
    description: 'Hindu temple in Chennai. Rated by 654 visitors.',
    address: '31, Ramakrishna Mutt Road, Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0310677,
    longitude: 80.2675077,
    rating: 4.8,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3nRTEjf0UjvjF3iiSw0zNbiJ3w08ZfNi6ZCjHZvFaCG-qR4NiOKCTW8EJID_h6seK5LYZKudAh0QxWJGoQ7tqtJZgnc9mfU-3hZvlTK0XTuqSUGkFij3fiJr4F1EhxzqXzCEC_7BzwH4g3EUCIeLXpBo3LtywwYipua41ZNvKzppZXPXNf25iFopPkJfHHM7ZoSYM-D8oXzpT-ESgkXESkhPtm97vO62Gi7pLjzfdMgkDmhS7ChK_FrQch8U6TliYqtgj6EdvkEP2lgwkYiGIk1kOfXEiDMcgwvqz7VOK1_QGOnDQiR9GHno7XJaRMTsobYW6galpzJbGTY-46LD4XlmntIj35VaysqHhuDk1Fdgfrqpmltn8luknvFgrFs7l3lSJJ8WYTE10zUaE4XSjTE3kKhIZceYOfSI3Jpg3--ok6OCPrOqZcI8BQc_QJEJtmHysT3ElkMTpL6IFu8ThrBfoAGv0-s5zX0yi-8-iNu_tUVeagQWYQXSfHk75IZRn4KmdigDdfAegHn6FCnaj8daByN-nX1ZTE84OHNbeSWnfJ38FbOJmuMOOGKxiVdc3bK7KGU7q2GKQhsqhp9tEVmSC-_qveSlhtrG4zq2jW6ppM_HWvE0JwxEbfqMePZRKGCGVgK&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '13',
    name: 'Arulmigu Thelliyasinga Perumal Temple',
    deity: 'Vishnu',
    description: 'Hindu temple in Chennai. Rated by 1181 visitors.',
    address: '373G+HCR, Telising Peruma Tiruvallikeni, Peyalwar Koil Street, Narayana Krishnaraja Puram, Triplicane, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0539921,
    longitude: 80.27601229999999,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3ncTHo2cAiKyweZv_gImgiNS2K90_tz49ddn_h6S_oqpTE8LEF2smTurNWoJLRCq1JaXNUdRcXZ1BdZfzo42TcCjtAt9tQ_vOEQF1y1z8AfbJOeDpcu2g_sFC6pFqwnzJM08Z4_HID_DHsklLsOhvc5EGG4JOV-Nlm3pQPpG4_p2mDq4pAT6L7b5_glBO-QZ_IK7FNJ8WwNwMGCdF1Ge6AXPE8CHx-eN-Rg1ndw3_ElakoCk60ATvyQPdWG1olTvh_HSYeTbV9_gspZquTu3yRoaq8aol0d7QxZ3mqt0OUDpb1_K0q_OHTri02LPw-jqWMuP0Hl6RLFyD-qLAk_ZyG3kUt0bYSHRrEtd0I5cFEFVzLGSdeFz0QKg2NHDAlIUWhGpAKbqIa5DPTTpam_z53fz9MCi_M3TiPSvlgg6O57VINwv5vG_0dllZdrx61RuGSGSjW2RRlbKuiCh7ax800AG2BpXIBoa35BplxYj0dwrSoE9Bptk-FRlsM0n_jDiJM5sjgl06XfTn_TnRTU57Q1RJhvNYfEF9tAMUtOqb6Fqoe0LXNe_bjNGmvkAvZpTb9IInNtu9vbWDKCOVOfcFY0TGr_U24g7LyK4aFYplVsg3NBqfDR62h8qUgvInXxLAQW4kdVjWUSxsoOXLinng&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '14',
    name: 'Sri Sai Easwaram Baktha Samajam',
    deity: 'Rama',
    description: 'Hindu temple in Chennai. Rated by 8 visitors.',
    address: '31, Meenakshi Street, Perambur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1111635,
    longitude: 80.2454274,
    rating: 5,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3k7OxlOFhYTUsCmIjXyrM5HFYFkr6G4ETAo8_ApP-vZb4jSEKUrAGWe158HUeH0koUdmISkClWcLpaqTFt4bosWQsGxEZ9DY4YJ1k28UG086M1ca-5zy2qsVfRHu-BP2F_smPGsztBfBSNBcFxvIrivtJPhqjS8ttCP8YUHfAfo54NjMBidrkGoJdW6HyzFgw6_Gt_QWPB_wlGXsxcHCUFdQ5N7au6j498uzcmuhmJkZCf394xif3kKzU7bCqaNByQVJev4Ray1RmFeaVy1ApmDoSSrwHgaSGQZBiHn40Da6-AozGBjqvMIR-_5po3RoKKqz-dRKA_OtBt1CxtbMO8-ZLV4NKm7Y0ehFDPNYDznnfUt2QKlT5dd0I3UNEGWBGR3aryp67vf2N9WkMxJiMirzLZpykS8AIZBOi0kgbpLNRynXAv0rdB1t60WmJr1i5jfFyArq7UtIaRXtvDep7KrQ-E3DVZhM3BBJn1IqLZPH-R8RqJ9dkqdYbMgssZZXdTTvyu-A2MkQZUwlf_H90J2SI0I9BdyuKWeVkPdxt1eXG6U0nWOH26mcPQ_Jp0U-Vdak-0fpYvVg7zGYZzR0px9Tdu0UwkHOkPD29m-kmTmsyDbAZdIq_8l7K0ZBgc7&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '15',
    name: 'Sri Kasi Viswanathar Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 118 visitors.',
    address: '76, Krishnappa Tank Street, Peddanaickenpet, George Town, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1006219,
    longitude: 80.2777447,
    rating: 4.6,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mnXfNiNlnsUqbkzl2zY1MQa0Fk7eHMVPMnyAU8gc7YHuHUApCxzb6ePXCyWUAHx90AVy0o_jnPhq6FVrZ1kSzk1gNY9D4kfwjUMr2Fp6eCMWZsnB600I0_Rk2EsH4JJzQBeLVu-fmMsrss5o4MucIZ18S5AGnJZsREJ7ZporW40-UL3dmfZ2CmPhN5_DEDe5IrUmCYgPd2zMdVMLdRxXeDgoMUsFqwvm-sTz9ypsGyK1bV_50nrUHxhAkydA_ZfnjrVITS2POmD6YoFznU-f-w6E4dTRraqHkHEPFhW7ku80ifQXmStysvYnEPLZ1pclrLGmg7q3p7ygVWtvm0PqQvDGMxSMCVdap7yEMkBXgCnlF1tf5rmvN3koHGVq3rZ1SaUyS5aYk65OeRR1h9J-1QbhoU7kvr1MgU1iLsf6RXZMntb4_S9Z6u-P_ybznyzJEqJ9kAz0LbX28aO8KQONbQE9wXlrx-37gIPKvlOUEWs-PMf9N65jCUWSM9oe2aVL-WBrbJbvuKS4b5gP2GcAG4GX4Rn0SbRw8sKpV927ZyW8SC2fQF6T9rDvuEbFBogAn9zEDWg6wlVcd2zKB73eemvDbKtPMx5vwsC7usTvdgvIPFBJuzf7M7so4Qsal63XwI1gim&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '16',
    name: 'Sri Vaembu Aadhi Muthumari Amman Temple',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 19 visitors.',
    address: '9, Chinna Thambi Street, Kosapet, Purasaiwakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.095734,
    longitude: 80.25473,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mp3ZCRFQzEyWFJajjRaetQgvO52bGqVdAhUwG1tUkgxdRKZHD9TFa-uF1xs_aANvnSNOi2btnsmMfXRYR_uGGe3KyJmm83gi0S0tUkm0qR3xSkEbR3AQ-zKdz2vNxibXTthf25PuDCaaQgGefg5kcpHtZ957NjQpcyIfP59fOgi2yVSq7PsZdKaPG5s0eOEy4j67XBupYRx6RfhLumUDHAfFdWHL6CnqWAxMXVXE2YMJaddX51aqw6MxttDwdXI2QdFhCsVcalMAtx3ooK8ceLMdfRnldyGsSFtuuRAD75JQjSSigzDoP6tl2U9yqCxQhYaSDGG8il0t72_RAJvp8hG5IcOuILHnjz_YlYu-WU4JjY3OrW6RLOP6cbPAFvYVKBq7DcuZh0MR5YQTkxnyFT8zRhGBWttlgDm6m0n4_1P27YFKV1vGdDYms8RNS3MbJkjMSxLah-pGqrxjEno2iXDuvAxNBK64k9tcxkyI8p092eBbA4OUKhundw4i1mbE7BKZj4jofxQofk0TlkWKm-58de_1OE81dCdykOqN-C9-x2Ah8i83sxKIzMttA4DAKx_jqUOFm973nxHycfmnLxBVFCN6IHuujgnpja1Dlj7KHLc3ffwBd9_yWohkwWWsXLTymh&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '17',
    name: 'Sri Saravana Swamigal',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai.',
    address: 'near secretariat colony, No.8,Kamarajar,2nd st, padauvanchery, near secretariat colony, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0892588,
    longitude: 80.2422971,
    rating: 4.5,
  },
  {
    id: '18',
    name: 'Arulmiku Sathya Narayana Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 494 visitors.',
    address: 'Srinivasa Pillai Street, Gokulam Colony, SM Nagar, Vivekanandapuram, West Mambalam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0393167,
    longitude: 80.2227772,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3m2NVFbxUs5TWF_QASExTFVg60ZMoyEXRHtVucle_ABpdfXUy2HZSAi6PLlZ73Q9wKove-l-q9JZPmqrxbk_Re25ZksgIgOwuO1IpAUmVguzjuPPvnqf3an8eMfLM__3dcXyja9pNRKf9RG4tEMB-1R6Qhl8y8SG9u9TdpuIgIGM7_pP-vJtsrnXneUkJXQIQcq3w3UY8kxqZmkk67Vg4_Fs_kLoyvvmhuW0KGlpO4UqwUgd1Z6btwUYFUGP4Hj5VgXJ_ENssMWyKXcATg9ycXxVCYl4Mh_fHhmx3w-1Dpp3FhIn2SiqeThUZU9BLCI6O5YilLvzuk6AjU5YH2mQW7LiPv-YmN-RdkHzj9gAbX7YDkBsLRFA063V_7M8tPeneHvN19HjoT-RGzAOEXG_EBlUcPyMVv4JMmOm8BPopjr9hX0_MmlLIZaaODr4RsexbDpFZMhVjEPUv0GYT8eZ-VYXdjYJMj_J5uDcYUpkcTNJkeqf3U8cqUWJqFc2wRGJqc806Xv4M2BvIYcTY9Q9e4KowkBDPL0N9Rlakkz7AsuF0hisZDJv1wmCvJ7xybLxjIqDslcBOjaqKF1P4uKcXAOhIh04hb10WN-SLLPjiJiDwlu2oWBSlhtSlcSPuabkTXcXE-0lbG_l5xYR7ko7IMMIwA&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '19',
    name: 'Karparakshambigai Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 31 visitors.',
    address: '366X+5V6, Karparakshambigai Temple AGRAGARAM THIRUKARUKKKAVUR Papanasam (T.K THANJAVUR (D.T, Poombukar Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0604137,
    longitude: 80.2496254,
    rating: 4.8,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3nx3LVIAfht9lGuvEZIKsIdPRVCaMJggknU8LkWaPWd047a6PCkLdGFjlXPCdN3aKxJMvWHcBrqUe9J-CS2gXsXcuzsL-ZonKBTNrtVv6dZJ_kcYPYMGctogRFNhUKMBI6_gYsMzkkTUF65nTMzwZKe3BUU4AufUzyrKTD1KfnWZ6CAxD18yHT9184aDo3YFyvOsXHFOco5fGsQaRfVFAEVA7ROdMSkeBXCVE87omsd4stQsfmAwYZ7c5Io1qmR5IuJfSAwfgiOcn_GWxPypsxSpvjCQCuzNcyuT-rITCGUljtjQVtz2LmgZdeiZFGjtERHMKh-Nxe2FaH4SsW4YCxb8vcSrkllJwqJz3wP66rBgNPQkQkxAFSfQIUCufmIXV7hB4w7rS2f-QpV47lvFz8HDr7mVg7kbtT0U3Avtp0gqYXZjEL0-57hN_kJuyR-a-HtSgfXKZZcWDpTyWjbwE7XUsKZAsw7m5-skyLfCM4ER3FWfrlyaRWjOttTcAwuMeZLW2Gx8_qbGn_0BIoY59l_7FDm0fL1SR53uWdDxUqBNbs2XIDLZxB_Zc2G6A2fmo-WfO5EfjQ0AYAGzIGBlfuH6hqqZHCCBrF-wTdxRrlW-IfRMVwV4StCqfr2vHJF-BxUtg&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '20',
    name: 'Venugopalaswamy Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 8 visitors.',
    address: 'Veeravedu Murugesa Street, Seven Wells North, George Town, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1025414,
    longitude: 80.2814609,
    rating: 4.8,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3nhGtMLBz6FWBvXuV_dugob-ZN5ztX3JOy4iTTY_MGrQlosiaHQHIOklZ7TrJKXqKSTeJ8aOmLj6YUHrWIn-frKa5FMWCRaG02vo8S8SaoIv2lvXGlXS_S0TbgQaSB98dIZYI6o5CSLZ7RdmDVobFByUaH-eZcQIqRFk6CDNNdx93LsfMEafSjavx-uKo6uYlhUYiuHFW0YSn8YnsH6YE0aWTaWsd4H_f8qaUmAv1ttOpPjo3qn762JZ3j0WQyGoaGgkmbnMGBNrRaO3ckscyCGYV85LMbbnKFNyl_Jw0sTelechT8KHEKnh-BUwyuvSiAxTlxjuPRBBJ1XWtRHnKW2iHe9dgwaGANnb5x6sYB2gvubCqsEMAHfAL1pyk1P-8qYvbpXAYdD1lZd-kcMlx7u9pJH3NW_GF4wzzxQLIJf2oluH_dpB4CT8_IMEkTl4YiuNsVN5KL0CYFM_rSn8xxEHkktaVONORKITRG3mHBotBUqy9OIi6X8lFnAhZh5vD1GyOpp6go3wNTirOpUwzcXOhJWohkDB1l6f6F22DxDZKWo-GMYcsg_qLkKK1RT0qzZ4OxbBWFOaDPzWtyc4dJd77WxUzL4EYHga8zkimPkWjB6WS_uPrP3QPRZhCVLOzZXszsg&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '21',
    name: 'Sri Utthara Guruvayoorappan Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 3267 visitors.',
    address: 'X5MV+FH3, Plot No:21, 2nd Main Road, Ram Nagar, Nanganallur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9830654,
    longitude: 80.1933968,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3n7LB9rXsyi1IYz9qsPS9afJA1cbp7hlunO-F5aZ1zIKHDehOHVJRFl1RXkoFhA1Qd1r0usqds8HTLndhfXzOvzFdsTLfk8KptRBndS3Q9lHxetdLJTaMmOJmihWpQ3qHg6vpG7ncLgHxxA3Wd2JK-YQ3FjD4BRp20YkvZWRrjdo5YUS1h9oALEb2Qu0_Eca69vDh4oRYU_GqDpTab_3cKi6ZW5vlPo7jdN2ICZoMikGDx8BIxksPpfXj2Usw22YhkE6JWY0OIRzW514CYXIcuisNxIr6cge2oRB_Wk51TWZAr-RXPw2mAPfOy7qZxpNHK0vU_oIvL444CLS19FD_yuTQed4_0JC_cflvSFQgAOxWs5dIB6sCNpfoEATORGYwzPephTJISDNp64gLDcIsezEAU7__YtONfghK-QGROAHFNBcw5A2K4SQQCDhkSmxNAjBiNGIT5ojF_zx9wEDXqYqG2kXc2U1OVPdfm2H9_WW2NcoAdby1FZMnk8xOMGiamxFNbrbBuwGNkVIf0JHZAAeMKekMycSvrIX1FZTq-px4MqWGsm6In2fZu697r7Fwx-_ZCWIpOzaDJCTd-mI0ezCoGnMSBynb2BGuq7aZ5fla8B806tMYokv0UZrvuD--H7zg&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '22',
    name: 'Arulmigu Kasi Vishwanathar Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 699 visitors.',
    address: '37, 16, Easwaran Koil Street, West Mambalam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0359079,
    longitude: 80.2251744,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mEJuMSPQzDOuAoLegL0Zwtjlkx6qKGMG2E2DrdlpWPieeztqIOkZp-D1EhJGY-40_0GeJyIYiTjgzy7ZKG0doveSzR5e9lv-e5cEKrNA2Tw1mQvzpzTqj2tOqorWqYY4iTGzU3V9T8WWQ9CXCUIC14seBJrO1XDM1eM9XQYpJ_qHtWYlR5MWyP8o2-aRmfCb-V4TjLWfc163iwgdDC_AkT7JOgXKYxJLF_IU_CJiIfew1OjoSVyntVDc0VHgXCBVGnKmZjs-V1XELcbcCEz9I566hhjdIENVsQwJ1YPCNgCZVJdSrYLEvnfCEAmz1e2XLhY3k36iH_AGNJLqa7z7AGqtV4CbOWLyZWn5H6zRMOb3qeNM8GUANG42rNYqzpW1EMFPpLOaGqbs4nsyjYZvo3OlN10bAwLa9pmRs2eZ8BwlDxplv77Ye-WldsXKY89iG6Lz68tBe7ufgtdkvxVRAvaIwY8XEV2Iaf8aFuIFHlPkEMh60yHqNPMKpu0hv2-nkF8kYy14hJizO35z3gKTal1vHwJNsK1b_c1-DYqIXYq6q2vosZOn2AB1gA_xfV2gYIb4hs2aEzgXDTt2ciNTUweRaIqCleoihcjvwRn-gB68PYHSV7AML5JRg_hSK7m8SzWA&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '23',
    name: 'BHAVABHODAKARU EDUCATIONAL TRUST (Regd),',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai.',
    address: 'Old No 9 -A(New 18), I Street, Parameswari Nagar, Adyar,, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.003062,
    longitude: 80.258527,
    rating: 4.5,
  },
  {
    id: '24',
    name: 'Shri Rathina Ganapathi Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 9 visitors.',
    address: '26G5+WQH, Cholan Street, Pari Nagar, West Jafferkhanpet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0273006,
    longitude: 80.2094922,
    rating: 4.6,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3lWBJx2zIuQ1z4ZooWCLA3RJl8JgoBFzW62HNijWltUqjGoz1uzsTcMHqG2Lvhsf6YM7nwzoa6A26AC1YsMO-_V1GFHaNXBJcwqyWf51EmdvlUGpPXgHjMXUYqczax-9T2LTi7OGB0ImgP0ysJ4crpvLJ04k-4pQ09ainm-WMCPMThW1sGOUuHPN6I-lV99XALnH5Cu3joSdGZC_543IHnPxSKh75CQ0KOa8M4xNyGyx9qY7pENHDWvFvRwJen8qVUW_Z-G_QslvCDP4e2NAbigxwK9FFAKu-JrmUneFVAHyuOBN_HJB9bb5MSWsN2208TU-NYmZBS3csqgcyEdQlowxFYF0tS2zQokGA7ifBtjndf6UvmCy-ojIlHnoBkUiicQ3CsXtCl-9XnCNH8Z9zlR2QoWtBdnPwcQhYUjcWrXK0aET4yQD7hPwp5ZACRA6UrNRAtSVsjJlSiud11tc0ocGLB8QEMJ3NpxhRKFwczf_opcU2NiOxTkuowfi9tR1oaNywiHqJAdTH5TIh2J8ZHXYUefm6NOyZDl_2ooYQugf24fn4zVzZG8bWlOBWhdU3OW6Zn43zRPibL0BZvu2tnX2hPCqt2I5-a6xe7Gd4pGzfWWYogCOD2zbvO7I0emTWddnbOS&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '25',
    name: 'Sri Karumari Amman Arul Alayam',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 10 visitors.',
    address: 'Rama Swami Garden, Ramaswamy Garden Street, Adyar (Opp to Malar Hospital and behind Sri Sankara Senior Secondary School), 17/7B, Adyar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0100824,
    longitude: 80.2615428,
    rating: 4.9,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3nif82RUt7R-u6gNyOXOjZ6ykbtImtn6EWDuJyGuIuiTelJ8Dokf_P5hXqlb25uLniC-8NeRLaPsrbmOM6jWY_g1W_m5vSFNYhrRAIQcPx-0ao8MbBtoN0yuCzKeE0qHCqKbk7N1TXk-rXZeqPBCQUNdyVHfKo9PsGXX_tYrcnA7TPGt0k0ZzAHU3JYiHlifrfD5EvyMbFMtBOHhMO3wbNEDHLFffS22R4g8pClP4xp9LlGF9gr8Tbb04rlssJO7ZrtJRmk83hPXs5jXnQ__guOdSal6titE_mx5r80zFxhz8_ZDOqLwCw-4QyZGnFja4FElXIqu3H9vE5GWWHE78rtxm_xLx9l8vWPn5xZYXp-rAjT174fH9TV3SWHNkSDrGv7fLU4Jth2F2yXNOnbDmX298BgCCP2ta0z6jsCu2hqDkf8xR4gAC3tI5rx97Pu_MUxkr5Sk8eYy0mjMYTqHbOBesNxbIIAFyvKaVxsYz1uVGpzI-eXg-nVg4BqOKcgOSuKpjjNVf3fGrIxYEpGmNjr0AoigdO2m9v-tSIA3-df8h_lbukjBosRW2dQb_ToBsI129H-K5BU9a9musMpouRVrqocSGUKswkm9NnzpbKFcar21OnG55zFa1_BxTDANPxW1w&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '26',
    name: 'Sri Sankara Gurukulam',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 103 visitors.',
    address: '8, 20, CP Ramaswamy Street, Abiramapuram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0304133,
    longitude: 80.2593789,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mhHrXylWI5EkiUzm19XYPyhAoAgxwYAdRCFznaiY5lLYogMN4cQUA_kqZa0WXDil8AcuO2IQdkVRJPP9nx_ltkdLlAWTPOXAGs9u4C2bETHNWt1qu_JucRPDkbo9S3ftIUFwuE6-8ISclQJa97mYF8ufRJUi6rGfnXAOroycGz2DYEgiKBh_lP2ayJ6yKy_Bw8t5ZrJqWiBjUvzO8jDNLvQxF58gC677HgBFer4Vo5a3yOQQR6jo3nKCo_hxDqC5xdwtQjPhVL3M_7uBPL1a7XbTtJ3toa5MEXFAetqqGPRdseSqBqUHbceQCNdX_LSHd41RFpVigJDFSO4raYaMM2CQdErbUsL4AwzL-TWpmpH9ZfoDnwM7OcQdf8KAoOPdEQ7H8NqpqiZLdtSlWCoz-pGLJgBljVYqNf6JQNtRa733rn1QMrkSmR2OQ5QeLySDXm7SpcIUIa3izdSd193In3HgzZxTxCaVSEt8koytEnU-RJSFeDOmn02vhL-wdaHctsiqwlYKD0jnZm-Q51iSzmD64tjlK4cc5RoL82Qe6SMB3cx3bJAfu_7-MTaxdYEBbFK6LFBSeo0dTTuChebqp3boorreEkG5aL7StWhFsYyA8DKLrkWk6Fb9HbG5Cmejb0Fg&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '27',
    name: 'Murugan Temple',
    deity: 'Murugan',
    description: 'Hindu temple in Chennai. Rated by 25 visitors.',
    address: '47VW+Q26, Jawaharlal Nehru Street, Thangal, Indira Gandhi Nagar, Port Trust Housing Colony, Tondiarpet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.14441,
    longitude: 80.2950261,
    rating: 4.4,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3ly52bvrnXRz6JzZLn0eFdysenc2Uq39vlBPn-Kv13Osit3Ddc5I-X4uZmv_PQpTT00GoYi1id-s7O8Qs0Z5PFeRpGeEKiMHwyDHtzcID8foAQDLzppHz3RMrQqu__RDKSyGfnG8YThhGrQUIpcYo45RrMblHDxAcxh8_VysnCNjtrqxJ7OoXPZGjDewcGwyP2msNdejnr6UVIv6TwcoCTl0JD5zsItQrNhTPg4mAbjiCyh3Uh7by817pni7oX9TxGD1tivtO4ut37Yp3p5ZbPuPRjEbyusTsjZE139QNaP0coURTdX65SPj2_l4Du5jm1MQ8ICYuCd9mrrb6kyr3MrqKpxerHXkDq_TNT9W1zCRWqTMiblhuCCR7RgHKgAFipXueLIpzShVhxs3C4aGgnFlplhhkd3dwGkjAK3YO3xGC7BqrWrhtNTqsOde8ppYRMANg9b9pD7QRThuBrFRsF_6ELTWVyhiQz0j6_d48gK6xLsycMoD9Jd_6YMAUzhWAjx4Hp8RmTXZJs3P-IMv-4zHtB9HpWkIl1hB8fG0CLZGaSDmpiaG-tNF6Adwg5U9Md9_Pgdf36SDTXmAXASCN04JvQSDGNc0xystvRtpaP5fWlad8zqnM7USxxQ6yA4EI_y9g&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '28',
    name: 'ASTRONOMY & ASTROLOGY',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 2 visitors.',
    address: 'No 135, Thiruvottiyur High Road, Nr pushpa Hotel, Chinna Mettupalaiyam, Kaladipet, Tiruvottiyur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.152955,
    longitude: 80.300243,
    rating: 4,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3nIR6jq6lYnb4FvMEkOAjenwuuqJmGgYmMGcCw37SSEOt6sdmCrqNBS1TTJdOhNOAE5ggIYUMznuNso5EAxahYMQbbV921pIQB0VbFZtaepRXa9W3hdB0gaHUdXicdRWpcr7pPEN00m1lz9IBF7PrXtTJa8X9rBWoQKGmT_ZAutOJVAYM0rqVoTgh8DdhTp-vVzLIdsu8w2nyFMVVYyhppvkEfYAE-WVSEzVgG6-ayQ2NRkHCreOOfChm28imd0-_HoJR1upR_SXnjMdKWhtc1abl_3QksduEG-aEB4fcuwmr93sObXIgE9xXHcZMVI2ndce_WdrDtJFWz-5YwL21HtYsB_Kh-fcJFC0sGICt_xtic99eBc1Qn04vvkOxzvwp4r95LUzOZhzg6AHDyrT3THwm7IK30rHubMCVLnu-nc9QPoHBkWG2GJI35SmHLOUUXAWQtS3sNcvQ8HoJXt8YaiSurdkwCWYhfgQjg_J8kjwmI7CSbRo496-U_Woe37ed9UIY8VEFcdKIPZXeINC6ICgifp43hbn4SOfa_2e48LtPkdIqH-2EYvheaMQNgDlI4DhxNmxqReQCvC-jiq6dOXklRDJZ9GWoUrwxGKUA3e_CFvSYCvhESXNq1SpNw-m3JU1Y3O&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '29',
    name: 'Ayyappan Temple',
    deity: 'Ayyappa',
    description: 'Hindu temple in Chennai. Rated by 11 visitors.',
    address: '25A, North Mada Street, Gopal Nagar, Tiruvottiyur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1620573,
    longitude: 80.30025409999999,
    rating: 4.5,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mSvcEsEoJ9cbrNkGxSJFFf7qwVeTSagZ9DUVKRJdINUDzaE1XlX0bCPKe9OaPG158WRx826qPu9c0fYWbGT7hZ8kHNMAQbRxcxF_5A3Lss3UKG6oOZwrr68AOG3gSp2lCiL7UXwFskrBLeVdlNjp1fUndooItcNRd8PWlWqBYL3Kv3-nxCh97F1TDH5yJHZmrKc1SpJqoiiC9RqpBwdx5hTD5Qh9z5_fTcweQ9oWUb2qMe2a6zap548vumilO58ntrQTWGF4gDDOOP_CgVJBZKpC3opJdd08LIrNUUAyQ4Ly7qVx3_MpNWYpG57OUwVZiFDLGiZt0dDUDPj1URYj-KZcSHUqMy21J3ZHaDpvZnJ65pdXb2TWvFchynIAT0IbKutTPVkS8-rhNaTcwSoVhbxBbGmJ9vF1CYssWcXlXRarMrHkfd5MmxqNsp_dIjItJpZ2ujNY4uFEuFavbTRUP_j-nuwCBLC0qJCClwW82i1vS0SjFpKsS9NMp8OOBXGLdLlara6dkl0NCDwxaFqdEHIbrCYfuZjQkLXk7gDVkaNCrxaRNmDRFTQbP3uiLJHXgVrXyzjx-O3ARPMyt57547uH1gam-HPBF990Hap83iqqkCMk8V7bvy3TDRsytfaQYj0GIWJAqJYmxdOAkeaiXJhb8&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '30',
    name: 'Sri Bhavani Amman Temple',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 17 visitors.',
    address: '19, East Avenue, Mahakavi Bharathiyar Nagar Central, Mahakavi Bharathi Nagar, Vyasarpadi, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1263903,
    longitude: 80.261371,
    rating: 4.6,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mVIZuV6H4VcSJIQEPuza2OzVqcYlIGyroS8dsyKU4JoBn2XLtedqhC-7JvWHaLvg8_R8DqGKUmjjTM9OtuwRGhrenn7NtQqvKvtZUXMfbmKh0MI_7yZphdryPOODn3ePcSTC2Xevw3VP-Vuvu76gUBbbwA8DU0j3hJbGHaeqxk10VtDBLzRDkT8MECKDFFwlMVVMFHaplZGRhuM-yjmRr9elHLqYsTCQfun82rNzHELN9lmJUIbpjzZTreHKtAU8nVhY-Le-smToqDan44lBQidqYc1o3H1Hpxk8E2AbLiav3ru17S8LhGonZBoC70_NiKDJLJtMGcS63t7ux-i1iEryVgPbmYrb_hTHws7r8OfdZccgo6L8OJD_ojjUTxg_lm2BkNbOEmgqLh5-KmyaNuIF1jK6KqYb5_KKbwBBwAeZzXxTsB2RpxupWjLfYKp9PMVD60cHsijOihTvn63MazCEQXVnvCgX-BV7dY3uxhpCfsaANktSr4jSBZaarF5GbDEcCQDCXxzjk5bpXdU3E7qziRKm8GRCtgcTvjpPYZqhwmQt_CdJsQmOYPVWz_6gFn8Juh4-pF5mCoTocun1pefYwWVDwI9zGg7ccX1_2nki7RETG8a-yztUH0FRGF5AVZXfZw&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '31',
    name: 'Prathana Mandhir Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 27 visitors.',
    address: '2nd Street, 2, BC Press Road, Royapuram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1075659,
    longitude: 80.29308979999999,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3l_0vYhG6X1ksJJcEVtf9OKDysaFaxmwt8JvC3iKdf_QlbGiRIjU57sbuXHH755SX-C5ksrNIirsTmta0VcRkFdxvD73T-SCY27GxSdgwFSfsWSMMOjDHss7p0vvzmr_RqkfoV_y__eo9vtqTDdfaBxq1Vh32h9bXS6bpX5lTcPhCDJdufv0Nm56o2ToBB-qT16SGrNxYYXFi6FbxQwJwJk70JwFHYrnK1nX2mdKmHf4St3Zzo_3dY_rpISRawD-StuFskmVPgZqnRQ1Ud7OP5UhQbD1UHhEVstavZ1CMMc2lHzA3s2e_yen6eSB4rEqk-wfwxqlLWMWW47gmbiJNkWmbJCOkSSwGqHvtTfPB9DzmzVc3h1aSn7JtKVKX3kYH0Uv82WStabolMgBtKr5mBl8Yrx_0EWwu4K1MFEVc7p-jlcpj91w5kREg1exYLBLm9oV_ppSs4IheF8MdJmxJvKRiG7siuHz6JNH9-Y7RSrq5IxeOc6tmNCkhFnscbJXU-1Pem6HRrJ0xS6pUKW2o-r5KuWL4v0CFtIAnGiiZ41-GeU20jmqfL6j999-yGhJQWbAYcXefiPF_amoZQOxekxgT8K8980XnuhK0XMiOsR2RbA-9y16raqq-WcBpgq7fRYJg&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '32',
    name: 'Shirdi Shri Sai Baba Mandir',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 21 visitors.',
    address: 'NO:455/B, Thiruvottiyur High Road, Old Washermanpet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1116105,
    longitude: 80.2812739,
    rating: 4.5,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3nI7MNs1XB3aKTGNplw1I8VEgn3bDC1qsZ4ZlQ62ixy3t9Po4usWCOwePua5c9GGiV77Y4YFCR7qpCcQNdaVEDOp5GdIH98UM2YtLNrAoCutu7k_Y1lK1Lwnw87Mg76bJ9qj6BAglY0dzX4uNzCNkdwfjCLxLH31if9yrh-NJBvXo9JP4SVNjBSlu1K1N9mrALn2Tgc-agVcA0aT_i-DVYG0qVaeRMGi6-0ZgFZdRuZVdVWLA6RDCNji6UYDjL9uymPqryHc-ZVZ-cDlqt9b_i9oyJqEHRNUBlKvlnAgS8HQONF1ojbRH8_f1flUrRn_-EOMUbCzXSBhEo0r1tr26JkplXT4dHLpoMC-17Cck-N2U2Tsqrew2dGjgiiS_LqqY9xPsdvF4YgFr39g4AKU2YpXpBHj7b5xWSntEOorBgsq1eVdCEs0rzbSt7iv1q69lA5suXfFQYpSYhOPJ0qbscw96WmoNHWxjWQoH9AnXXoBzN0O_Z-5BlC_4HWFnjzhJb8xU0hX6Op4eOG6YH0fbbOVbXb1S6MCXwR8-lTq05BXCjBo1EZCFkXOCofMUbHL4Cbgu5EjiGYwG_InpkUPvH3n0Wloc4Q0EVdnLWYHYiuMUFoT2ABuHzMQU9zxSl4CiCVfw&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '33',
    name: 'Kalikambal Kamadeswarar Temple',
    deity: 'Shiva',
    description: 'Hindu temple in Chennai. Rated by 13652 visitors.',
    address: 'near DHL Express Courier, 212, Thambu Chetty Street, Mannadi, George Town, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0945949,
    longitude: 80.2891805,
    rating: 4.8,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3m7sZ4q0d5BNofXT4JQInqAyRdBtFt19ZYOjOIDJV9qEAG3WXhqnafJrgGp6OLd82_tFNkz-4cBWdBX5MFGui_9kgDZ5gVcVgk-uD-4nJwVyK80O43GFIlY5ojkHJZYdb5o9WpJNm_Y532DYgVeDJ64An8D69K4Xmov20lIhYcaQionoh5Zi5TdyqRZ4cRzTt41nxws0vZ3I-kk6rVzHs5d91TAnXtdEoJcajQwNB6ZBTkjMv_wFnnamrrKrYeskVfq6AfjSATcH7nFxXcL80kb_JOT-WvFnSHjp9SabLPQnNBXQhiQos7zT3IMJa8OjXioIzS1-NrrL2aheE4wXmqpv8clBh_uOzq6gYDkPS1q1dfRusz5F_BSuTyJal-zj_JdyCr-2sOMPLOOa4kAroUrTAe2CG3Tnh713_2huk575OZCGJZEtXt3ADmwaKrBvUDk9qPMQ3OxKfJukV7YhcB4FT4TqrvbP4xBCDKFZK2Es8kgqtDYERTTCw6IgrYSHw6AeecaTKwY_JfmXRfmPxxqAtDJ2ZpMUL_mK6F-a0AbU1jbJ-gExUPnq8v1pZCpyWHA3axl_HC9YLkSPgLWvR8UG89uM7Fzu8DUyeAX5CTfGXwfmmvIZzgSw1xhiS2p_zoD8g&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '34',
    name: 'Arulmigu Vembu Vinayagar Alayam',
    deity: 'Ganesha',
    description: 'Hindu temple in Chennai. Rated by 2 visitors.',
    address: 'Shop No. 531, Thiruvottiyur High Road, Old Washermanpet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.1168207,
    longitude: 80.2838058,
    rating: 5,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3nHVCpRwX0oEsBvbEvJd6T_rek1eS_Om7UZMCiJso1SKpFSx-cSXWNdLWXbGrhEPEPEp7BWEyIJxv_GLtxHrLi0KMvRCrDHbhuZOqaFw7F-YE0Zdvt0TCs4AEFDR2NHaZ_9CphvObKWxhpPzVc1OLBDDUEvJBV2wHJRIvQlejoIiiD_hUtLviNvV71qNTZm1huWdktkUHSdhqJB3C1vD_rrdpypiUfd9wH4SBwnX6AlZbgfn8IaEf10E-OW7Q9ShsdVNmS38texrk5JHNbrycsMZkgWtseITYT_46El_CVZkxpCh2Vt3SdF4qzsaMJE6Vr4Xb6nkOBUCD8XzQ-dGCUZkE7oNe3zm9Z1H3haHifLIxGp8RyFZMShHtYOTeZWkRv2DWNwr2VLMXkEheeBi1I7oF3qKlJa4o8JEwuUEootKKPwQm2zuZzRQ9lXa8ZIayH23iTfui29fcqQlKc2YfqhMpbYRALod94nzAG2GuN7nWuSU41Kfll8nWMMSH9bxuKvQRpa473lEWT4BcKFU41AicLo6DtSoCwT_7OfUrtBgn-l1voxfRTwL0dqRn187Ci5f6ZF61AgY55wauey2q9YXJDGFntyV4ofeMWgpmwqgwVHzf4OK41MG5ztm9qRHR5sCg&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '35',
    name: '"Marriage arrangements chennai "Rajeshwari Ramachandran',
    deity: 'Rama',
    description: 'Hindu temple in Chennai. Rated by 2 visitors.',
    address: '14, Padmanabha Nagar 2nd Street, Venkateswara Nagar, Adyar, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.003115,
    longitude: 80.260851,
    rating: 3,
  },
  {
    id: '36',
    name: 'Ganapathy Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 2 visitors.',
    address: '27PC+265, Chengalneer Pillaiyar Koil Street, Vinayaka Nagar Colony, Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0350162,
    longitude: 80.270606,
    rating: 3.5,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mTwU5mPxYpAfk-Kw4oUqLAEWC0eKkfHm5Ywex9jRTToINWwMAcHfIqQr6G2aN7A6uQkAc673Hu0noU0CkGI43ZqsValPaEEoRqTnqBVkGN5wjjtAio4ThdIvMi-2wmJ9Sig-vR5WUHYC6TI8SZtW5kwFHD7C0q5TotdggkLddJinAlCqJiob6Nun5JLSeUA2ZS5DnO0HtLLGHT_Q5fPvUmBEjQ5kaFYKT9mYfWUrbgV49M0Vhj3HB7yMPZRsGnG8wlWY038ljaP6KsRGlxzF3Da6hwTVzaV3_YWl4pfgQeTxYSFkdUtZ6xe0xiRPCJ6Cr7A1QonSZAXBzirIlUq200llkvVehBTHvoiRdxj00FDp_WH4o26ye41CEAKsLENL3NDZ1g-yzXspXEjh-REfeqn2HlzZqarJEKtjmX5EHvh1lVJRt5OOahq9jFnFTTSKqP4-yu2hSIoU-NUd6gvPWlCObp2uJmdEogHObcnASd6fA8jf9h7RQV7ItTh_P1fJ9mOh-vZK5CGh5-yXlOkjI0KsKIYzThS7dyZVSk_ofnzUgVG8DioCsgomV09jHjFI1EmUKvgzyY3d4v7xlgQhysnEbmSEjmUOU7s3LeCKD24l0S6PEqbiR4yxkDbED4IQOdbN1e&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '37',
    name: 'Arulmigu Sri Ganapathy Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 3 visitors.',
    address: '27JC+JRC, South Mada Street, Alamelu Manga Puram, Sankarapuram, Mylapore, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0315594,
    longitude: 80.2720101,
    rating: 4,
  },
  {
    id: '38',
    name: 'Pamban Swamy Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 33 visitors.',
    address: 'W63H+GRF, Anna Street, Devaraj Nagar, Sholinganallur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9038048,
    longitude: 80.2295566,
    rating: 4.6,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3n7VMuqOY0ttAMd_OsESDQJQM6YScarjgkmegJJSoBKNvcOlUjltbS19pV43dV1kIimL_TsqE1Oo2Og32pY9DA3cqBSbe0NJVXh4015QqPWfZUeXeAJAi7pxve9jrNmdFJp5VUsbOXQ6cc0Fm57p2nC-MrQ30kJ246sATSzbY7EfLUlj3ClxfV3kwxGgGm1o3OhCSyBtfQM2IX2kMLizWD2wMUlHO7Yam6UVhH_5Cz4uVQkBkvR5M_9G6nYlST00ZBpcweOtom6qUBE5e6R3jfb2bmLPlpS0MKzKXVMVVb2NXL6KKxgssrJFXxDliDUW5gu9iiqoLjsabCxyOYFTG4fW2ZC2t09n9nVo_TEetnm5bt1Zs9euxg3sYRrQz9r4rmFJd2LXlKLwyrUsndjgLberkWX0Gloy2st89PLTLQGpzc9f0YP-8fRAWbrR_ARMOZStspoIdTYUWn2D2EjtVeQw2wB83Lo2_64qDIXQKbvKUXbIwxZt0r8a7OhoPFJEWnwgN3Tag1zOmR8tQq3hVDbSsQDbdvx82g1ZYehqW5kb79471xPpWzL3DomVXrqEg6gHMJgcnSrO9ZMEbLwb_4GB7MeOm8AKKLrhu-Xa0UkNZCa0o_IFCHVoI2vAtyRjNto_z3xQw-hd8-W1QANvOhFiHQ&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '39',
    name: 'Shri Gangai Amman Temple',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 334 visitors.',
    address: '44, Rajiv Gandhi Salai, Karapakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9139372,
    longitude: 80.2296356,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3meKFG9_JS2KBZbRgy1sCOSxFbqeCWMguwRQQcNYz06_qVwltcfRyvuXaR-xKCuU2P8RwpTlr56lH8fEplJuvqspqc-mleBrnP4-X8uKPi-Xn7uCx2onWL42lsxnSDf7q7_kPISCCZ5SNTwPpI4AvawBe7UUHIC57LSu7BE9RIXxXlx2r0_iWkpl2aBh-70PJW4Px4Qjm7mxaWF61kCpuI7_Ntzd3oMfL-jEBgzhcC4TUNpeos_H3YatX2U2HkoaiunHa5aUFncTlQhZ0NlBJkQN1a61Gc1GUaZ1lFImgd0iMS8c8fLZJnze5KQC04BkfdFMp4zWA752-bOw_Xemg6PJyH-I90uwpel6kSrj23JMLMYEWPly64u-ORxuYQvQrtnJBGctbYu4aeee3o3rQ754zc-bico-Jd0zLjlvSs116A06XmN_XDdqW_B_ofLSxTlZOk4FhaxNtpiuE_xjuqlw5mvCJp34sjUKJ3Do-PoO5ikPI-XTi3S8YnU6WaULC5IKu7-AjaBAkC-LDOvXgzwZQgHIVca_dXLhFnrBNzTNL4gBhhfcKo_QmQmstsoJ-QyjjbMuMI_ZdpAZZT2O0iHIX6HsJp-9JjbSHXrs8cgTzhTBHaYwFB0YX9vtUrK56p_rRSbZLFtyTQfH8e4LPD-hE8&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '40',
    name: 'ISKCON Chennai',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 21519 visitors.',
    address: 'Hare Krishna Land, off ECR, Bhakti Vedanta Swami Road, Akkarai, Sholinganallur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.906134,
    longitude: 80.2419164,
    rating: 4.6,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3lH747mPFANVsvGmoJCRi3GOtzTEvIs3pIa2VoITUhInwi8DvZGZ_gPzzMeiuCusXBLgk1Juq9L0aUbGsuGL-bdvOPieGWekaWdlj_3995MIwXi9Fo7xdb-S6LVGvcRWW0H5YGrhzzrXiTKLL0mDNta_i34mfzNae-rYcdwt8wvtdfUiGsMs2TnlKcUEO0wsv37-J8Wzwzd4Co9y_dIYAMHWYxtc_zr6QFwMcnaSfvfpwypbduZG4ZkaU9sGanM5SUJTc_3EyyhvfWuCv97a0WbWxGVSIg6dQuYCRQSAn_Nng5ja9KyxGx2nACCs_ayxhDhpZ1UPw2Rm90iT4vuQuITztcU7TcM7xeOq7jctst8ln7t6xYUZu0FSVwGo_HMsGSAdW9irutskYAJDRMXBGcAmSRJIglrRpf5z28AzWVN--g4yhvTRReg8WdUJ6dUYhyUAkKpBk-s_v9nh2dRuu28qy9PrYns003raHwgkm1hY3vUPHr2AxUWg-I5IlVB55w7Ln4FddfQdetYc2lNJ-d5SFLNY7N4groYMdB7zo1IA5hgOk4YDgSl5HmwRhrsOGCIP2Z3FT4RoU38LbqWs54dYhUabdny_n83-UTSOgUOQN65o9VFsrw4UEKiVCeL2wlJe5YE9rBJmLY-WbV6h0o1oG0&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '41',
    name: 'Sri Rama Anjaneya Temple',
    deity: 'Hanuman',
    description: 'Hindu temple in Chennai. Rated by 180 visitors.',
    address: 'X4MR+J4J, Agatheeswarar Nagar Road, Rajeshwari Nagar, Pozhichalur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9840886,
    longitude: 80.140253,
    rating: 4.6,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3nVxenprMFnbvLVlGXb1K4gfGwfTvauRBvk6PqaAY5XWFbBjMt_TX8xygTFaDTE4Sk2yb7ctfSG6r6Q61ZlnFeW1-JBg-RY9Vhz89XMqb3AlteMM-gI2Pvpn8VM9ZVDmcLo2XPh60MHK_iQ01TDXB3PSiXihwEjjioMxTJeKYeQQYslK_a21i7XFh9GMzLOBIGPvdsKJkbK2ehWyOs83jFXre_9otCMnxTvpdod1KFyaPaHtQLvsmJ9v56sNdYrk6KbrgGd9HN23Q5GcDEx4WtAnd3hmAtUf_en7-ntVmpjwcWCW9EJRSUqVHLc2-ceNwhovniByRrJwwmGb6GqW4aSCSTQ7mHMn2rlgMq7kuH_IGpmqFvr5R1UsYWjXQ_Q-T59gmtZe9vvN1Y82N00OxWEG8J1BgiPru4oVFlFXRDCno5XoMo5l5njpx55JUpdF4zO32d5siGsuLJ1x1co-TCTyOiaihm1ganKhu2e4B5i3ktSVSkuAeAlQYkvyv3TimOtGefsdRQdshUyF3r_EDfU-m2IoZkztjxROKlIIVFxVn8AmlobHd0eQizq-H_QNqPVxLEeIyaXrLAuVvsHBZRjONQgR2VXrcKrlCKprffls9KrmvmldeBFR0bTXTEm8H1jow&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '42',
    name: 'Arulmigu Kodhandaramar Temple',
    deity: 'Rama',
    description: 'Hindu temple in Chennai. Rated by 361 visitors.',
    address: '5/2, Ramar Koil Street, Nandambakkam',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0172945,
    longitude: 80.1911757,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3nFJa5VKmt3tNRxoG0jJAGrANKxKIKpBorAS3OXJSIHYehaCLnpW1BGVbSDh-5ekO46nb0Vl08gHtR4HvVKZ_rn_R8kZMdrWA0kx1XxrZfsfCYnApgQIrwEIlJa9Azr3gH8Fpqr0At2GJJIqArNPuigq6kq4wPJvg5Q-QtWf3VPXH9nW9XhiGEMhSeZiiIdD3KKj__NVQQ8LCHUqNWrl4VbnnDTzopHYK_ZRKdt5qQw3VNny2YTO-oiRBNYNsdmggrBmb0Z0JRhMYI4BZfgeGLa8DSAkCXVf4Sa2GZ39VFjCS_79y-i5doH_R8qcMbKAfPzXavOvwSB0SIg5CZ8t7Yl7BkXJc-uXXnnhg5R7P1Sz7ntiJSCbg-UIO4Qop9wd0IsksLl9UjcFX0mK6vcozsZLr9eSxApP2B3XcI4hSHSdMyLlqD9vqkc6_GMCb2MHQtLGQkhj-krQeh-_-o4_WJHQD6LFIEJTadeeRQRDsWgoloaAoO7egxSvnPBSWqHhsHaaC1RiR9to4BjOsq5vNSV7XUXpk3xSAfnYLyzGGAL3Y7SYXY23mI5nSov61BfNvb1vvV5xgHMQtgiE2bJa8gGEfH8dQjn-BFPa_oBOgHtd0gmtKmNmIiCwwYH5PortPFsIw&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '43',
    name: 'Sri Karpaga Vinayagar Sri Pandurangan Sri Saradhambal Temple',
    deity: 'Ganesha',
    description: 'Hindu temple in Chennai. Rated by 341 visitors.',
    address: 'X6P2+J3C, Bharath Nagar Vaigai Street, Shanthi Nagar, Adambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9865642,
    longitude: 80.2001319,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3k8GO4wv7KO8JB3WxupO2nnPKmRucglaneAcW2x7KT3_HWkAYIu8FZAISqbuDh6irTmvKMVuiMguf48hwzbv3TwCNQsw1lBpN28pjXzoVzwCvmSEjPvOMSpWvAIJ2yiG-1MUUQyLqbPh0GLsCVeH2hJqLTAYIak8IDez4u2tF2iU-ZWSuLFb8-FFLgNTKY52pmum4cT8hZEO_OCxBSJnWnRzOIiIvvv4lIQiNV_b2QBp6eZR5IrGJV-t1DlkNUZxBq97fktzdE7tvRo9ZMGI-y6E8ypljmK9g83wHuRjno9yxiEgMvAu_9RcZG7dphu7Bjmgj7ShpqOwC32Vvwcg0UTlXPhvaJT0xtHcwaxkXoaSMJzD71yyj5Z9v12rigvLq1OgHwvpu5pyhxW-7C25UVgYQtOq0fJs3xVW4N3gyxd8edhDHaUjkVZAwsIbZpNLvx2rA8qa1Pw9JFML9BHYaGM6hMbam7phWodwwlWPU1SySAoOG2oQ3xGj4Pn8ZShm-wveVaSQNsBmQC3i_C5s7IT5f4pE3-My8DZYCQcKdhMuECt6-2EpvdDOO3PbcUCFVHNEQCHNO9wEJgxIRthK3i1DfulPhnt3AZxGmEFX1ST2G8-BsyRleq09DPWCqZm4f77TpTTxiYnX4Vz1o2M_Mk6k88&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '44',
    name: 'Shri Aadhipureeswarar Temple',
    deity: 'Shiva',
    description: 'Hindu temple in Chennai. Rated by 1901 visitors.',
    address: 'W6M3+QGR, Major Mukund Varadharajan Road, Pallikaranai, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9344778,
    longitude: 80.2037615,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3lHt8xzak9Y-kgLyV7pQrH5OScmJvB445HVGs_1KfKHcxw2tyRoW5IWBdSh_gDD5gL2C8WGu6IKJivF9sOMrjbYHDHkonbGYq9vNl9w3XUjliIZUo8tdwIfmFOoghIta-b-J6NcDchLMihNoSSJIbVsdpP_eK89ZbhizrNSBnonUxaKV3QOrdGs4T6a6_cb5xU8aGx4Gpy8xJlD6uG_KfWskEapSGfByVlsZa0x9H7fnvQb4XCvpgWUMVaB062AHp86v2SiyjdGAls8Q7h1mxlDLLpIDdKFl4tj4exYLoqwsooOzqfVpV-LH1G3CjM_EOAbG2T3iBD7OTqSoVUCcxtr6MWn7WlPIrO9GNzUTx_AFe6Q7qgP4uMyP759U-HqObLZxhGeiRI7Inq6VucfFApyhCnu3OqDAHChGH3Fb3gXd_J0PMhajKbuCDIfNs3By8HLBdWi4n8v5FD0kAQ-HLb1DLVWt5vV4p6lXU6WEWa6oVGW3G9mmsPEOkxyv9-PXU4Ze_wrJi7UhsBChLMuJ_rrqhKeZk_rIft81S6oYBeyyCSUOs-Qa0cziITQ2L_5Onl-mK_NlqxzCEMD0C4L3OaagKrnNqHGLPZoxMpYp8r9b4o1PHFkQEX8-2uJWQ0ibPIq2g&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '45',
    name: 'Navasakthi Kamakshi Amman Temple',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 479 visitors.',
    address: 'X56R+CX3, Erikarai Street, Lake View Road, Karthikeyapuram, Madipakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9610134,
    longitude: 80.1924106,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3luoeth_PEn1Ghc0rzx594EKKMoIHPUzAlA8Wek8Xy_GAdppwIQoRHX6V82fE97ZQ9sKaK5c9IZLIj1v-xZP2LcGWp2nzwhkX3zuz7cq1_cEoLt130vQ2hQM1OiJIvPSjR7yOmHx4twxsCGKqUKbP_Ngu81buXmdlGAkf86wI-OohSuWHAaszAIfhDFiU0O_2Gp25OsNCOFol1cQ-o1TDfwia2ft4OtxJfdK60_YeekMUjfPJRxAEYtYGe9ZrOV8HqcteHVnxtwGPZRzEn4uQxLzZr4EjAzzYJtMpYlihTGO7TKbIMBSp-ftX-ANiXgiHgCFnOhd8-VxBTjX6N55pJLpjSpERgo8P9m2bNSc2dtOBVBUivJV5o25pWU_HyjNidL7m5_1zdcbJmLuVX_VgD5m2Zj6FCNIWCM2YOjCqm7oJAFyVcr0vq8W9XSOEubIqAX0-_aCCif3Phvx_xdzjAscqJtZWJqPIe464PaL3a4euGPlaIlZDWQGQfP_K_5S0JhrTA0d7TV_GO-eggnhhj0F1RCcXqWb6LruASHDqMAGA7q5IxVKWB-mm9e2LQgJT-BZr2FsC9fDB3WTp2eIsRJS3oNZop5iIp6E93nOPwp1jbEKoBi6P35rISyd6UOc5PM9g&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '46',
    name: 'Sri Thenupureeswarar Temple',
    deity: 'Shiva',
    description: 'Hindu temple in Chennai. Rated by 8594 visitors.',
    address: 'Madambakkam Main Road, Madambakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.8986419,
    longitude: 80.16015329999999,
    rating: 4.8,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mw8tyV8okDwFzEkAgVI7ZbqFPisPWY2mZqMQ3lE9CUaLfSPghde-IxqurUDxymJJqvLv2MjmaMLzxvQLfY1nc0EnaAlA9MndNtIkR-Uva867cxopb5knumtTJyhk-pjhT5Nzf7T3q_mrLA8J6xj_j7VbMwbqho9J-04zk3zkzPLyW5AMTx_kglj4jF_xGkcpuw-VIx292g7XV_iW2Jq7oIRgzZBze5UQLWygKgELHZyEkaZNWPPD5D2mKyfsP8ihVz7spp5Lz_iLzOPmoQLwz9bdrV4R3z0RKu3OB_3e3YWBop7mYm2JoIP5BXctekATtThxxwCHZeg7LfJaZmzk2wH532wghWBrN3uYnecN-1Xx_QVMtV7RtoghLrnHN8WM0DadeyvpSOdwQyvmkaRr96oWIWyfaLiQ4y5DozTJohgwkU4UbHqb9roNJ7GpSQ1alyCfqiaBUZsWkeVGDu6qh49iGn6UGe5F_k1EmRwK87s4bTHdWCfy94Edkay-FBuMhJ4k84GhRDSGuGxM1gPrHonNeSohAPrXPsNHIDi-rGbogiQcbrvXxhIloT7nzy89YbjOaBJjKOFkROhRWfru5BNjQg-16lv3PuSR2a-kS0c5RYoQjkLetWlqJvWNRtpY33Kw&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '47',
    name: 'Sri Devi Mangaliamman Temple',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 58 visitors.',
    address: 'Dharga Road, Chavadi Street, Pallavaram, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9654472,
    longitude: 80.14977879999999,
    rating: 4.3,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mGMqhbPNVb63c812OIOQQuiJva1xKOLE88Tgvp1gOmm_naVOGVQ_3MxRuGOihQLdEa7wiIY5Vx1ii3x4tBblu0eThisUDgUttSeEXbPA5cr4U2Rt_wi6GltPRH4v-yMgG0iYU7zvW5lPEGSjpgXGhK7vuhMEiAE2uPBhife5EMzKeBsRvPrFOtNui4ngrl9ce8kDBDXJ-s3bCqIVImiSTeUBYUf4VOmrDoiXp2i_JacTsOSdMUzU5QmPaGxANpOt6DksbBFrrZQcMj5LmSUqNQfDVYI4FRS7y-a6MSoEDaa9TytEoixZ1-ZjFc2_7jNki6PdU3ulCIvKwKswec2tYCYjt3xQ8uIAVdTbElAK4LGcuzHMwobbbnKKPJqHqn-OUxUlGAAkfbJKY85yP38sBehJvQSqA_FJrCqZBo-TmL-7XztkO4-YgYZwOvQxAZPLPwHJ3ajJRwq9NPZ7BfDVu0Pb40EgFWgnp8YJklFNcGF4lMjqYH0UjBzZTyNe-IZ4XL2HZ9AB-9GjiooLKUqa2bwunhmaQCfTzDEQO2vOAd7E4Vq8pjL9Z1xUKahg6fXPIHGyrVQkNLWH5Ao7xyAUWl6sz0EDFUBZAtTiQSl854T2ztad9Kg0DfPwyS0jMyQJkYWTkL&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '48',
    name: 'Sri Mahasakthi Sheethala Devi Koil',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 159 visitors.',
    address: 'X654+JF8, Kubera Nagar Extension 5th Cross Street, Kubera Nagar, 5th Cross Street, Kuberan Nagar, Madipakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9590566,
    longitude: 80.2049375,
    rating: 4.6,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3k_6DK8CIDDvUcV3QzQyhJqk9vwoR0PCZsX31ewi5mLJ9Q6Esjr-byGjabfG3QWruQloAYbSGJFFSDlUJhFwW4c9zX-9UtiLoQKniqnWHrU4sdVVFrr8dv9BL5g-AGW_qG3wkYrwluyvG3IBDw9KbrT7VYa8NxC7dIxrRxPGqbzkDqQlPTNuY7JRIcem_AzznnGLOHO8bYroXObrrlQ0UQU0lKu3WNHazaEedC0z6K5Tg5YsCbE4BY0E_0PWGf6JSRh4xI3wheDjBxgPMfl1eItoojJGN4d6dvas8Z75U3-EEA_w0OvoGCfK2np8Y_TtbTcz2fXaTTn1GohzBOeRKOyjWb5zwYmplfwF22dAK4yvt9vKyFpusCc3rcyU9OEDIRJSOvwDiVKHE2nDx2fpiRJXLeq-2PKbvLKZq28gC7F68wRY-JOrsnJlyGrV2QcXZrSXjUfTOnVtYZi5GeJotmSCb1q50921FgNuCWrbGuw0yWaNsSpunxVGjmK1YLVz9JvPKtE_u4Yi-Oxln4jHsHOcmYWh-ouUmVM2XudbrjzDP8C5P3vMjZVd4csVP2V0wrKQrNPYQaan81NSWM_jMiP4WHnFcoib6wOSNarVCyEH3phbOm1ib_Yar1GNR7f&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '49',
    name: 'Om Gangaiamman Temple',
    deity: 'Devi',
    description: 'Hindu temple in Chennai. Rated by 95 visitors.',
    address: '63/24, Five Furlong Road, Maduvinkarai, Guindy, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0024604,
    longitude: 80.2120688,
    rating: 4.3,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3k5f36Jad94BZ2i68iGWLiiM0eWEboOdhOMdcJM-B7Pz5CIV6j2kpGl5Rx5E-QuY541viJWZ_0Fmll4KDOQI6l8IMweOtDt7awZ3e8WqhFdYUF1O8Lp3eLofGSybcmf_-OSqZlVuG6BOUBLEScw9zpExGUW2TBHGhlsapat62ZE4KmuGAw3RH7pwGS2WQgNbx-7qrXs4G1KjR1pWsBElEyZfhHKjeXYjvEybzw8Q4bjMIwVR_IviEIq4kA8xR-uRlr3LhMrYMkvtFf3VvngnzYnTisCcIODHCDIRGc0Fv-pAERK7j5AI5bgmrUiAAolJe5cLsK06CuWbybQUMbwtsQLCU_F8mNplodne0OM3sLuyqNnnudhFEsnruT7ttBdFT0hotclTZAWCh6X6XqP9-Di0nX4FhMUU674vyFYJwle23pqbnIA6Y-TJJr0IShAdjBAMI2SqZH2W3yxQi7iRoXKT_0Yxh7-UCcGYbj_5lkUJMIKswtwYR_mLkGBuXAWYy_H83mBTkwHC5GtH2x6kRCNMoiok9laMX6sGabQzPAC6TS4mdJGPOoF_cCpZ1px1jfcEBgKOmwd8zEm1hfzu54AK1ZfvguGHz8A2T0MCk2WnK_pQoh0uwwAXIGrlPAMyQOldXYE&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '50',
    name: 'Sathguru Sri Viboothi Sai Baba Temple',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 444 visitors.',
    address: '83, 1st Main Road, MC Nagar, Chitlapakkam, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9395204,
    longitude: 80.14448759999999,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mlZsU8qvu4CzPV-Csjo2xvUKGeLZEbrSZ6Lv6sWCVINjxieMH5g8yvq0JcBnBQazPy8eMp10f9VRji3u916WJAK1ZCtAK2GMtdYM8X8sdQtuWnPzuJZRC_9SWafY2P_RhFalcMC1clY-8ri8ZWqdYJL2fj3MtA8N_gNNWtR8f7mdqygHY8zkIf1gMw2Mdr9rIGnFtJJLIwl-H1N93pd37VQ4Ps0MRtqEs8VbRfEaQlN6ufRjSzPub81sE9fba-O8JGCCNSY5PBrVbyHxVnyM3ZWSiswYcOVFY2kkbXL7RfWqA0A__95BHyQ__wrN7jH46P-SxybK2J22tUy9tPx-7QNvbnqgZXm1CQcvG_Kq1HOysT80MarofcWt6GJnnC-XL0rTleLBP7wuVasRFfW1J3hMOCU6Jouafnj7_C6x8-rYcpd2ZyZ85COkVvqmxBdXGXPjMupMPj2YOBLdnYOrh_3jARTxpzXl__MI0oWLUqU_73LlyyrqDTvhpp3AWmJ8Y7OyvbhFK1xbxiImcO5oemoEl1rucrX5sXmdyH04h1Iuge-jPAi2QqMHSs5nD9liF_kdm-YqpjDcq1fChgvJhBJ4nwrOW8DCG14r31a4k_dhkYHmY8q6ETXmb-KhVahe1nft_j&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '51',
    name: 'Panchamukha Hanuman Temple',
    deity: 'Hanuman',
    description: 'Hindu temple in Chennai. Rated by 438 visitors.',
    address: '28, Lake View Street, Tharamani, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9826136,
    longitude: 80.2380232,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3mO0CSgs3SLQdIZ35rssSQ85WCU6qEtLZmjPHFuurRNHH2p7t5zivZfucTiZ1SGzL-eZZt8-ZazCHoDOsvv-5qfdMjAwGdHbH5ECTI2gFP-GKxJ64ArVd3rimIsTavl2yxJG6Eu7kCZAhh0Ap6nzEbHqukjOwEr67xVxueOqeKtrDozAh5KHfRyx8AmvP47428SZqyFch0k6Aj0fTs3vTblqkCFGqCz41MGruZp8eQZi8zSpzZl7IjpMlO5hjlOjqUrmKf-NDLU66WCeEVKRai3Ab_QA4Atfkui8LcDDZh91fMhtf_txpEOSUDqsY8v5SRgO9Kfn_rQ_BZ5ynZvUBTa5mQgsk5eRRJC2_CmDHLrb34t3piJp2xzCBEdltuBeATP5pNYPrbg2oMRsMrZP9OpXe_smKGkH6AHGsVt2EwcbypwgagABPA2Y8p_F12uwrhirtQ-A6RML_m6Cxg47bGVJgNQMBKDOceCcN-VLkLkp2Xh-4TnAn54lifuHGZnLa0ShfXx2chOzpSmgp54HFtI3rn4zs8-RHf8-UDXt40NgK0vq-xbhL9UMe_KLUlMWmPBlN52ZPkCLL6INQoEGzGTgxUP8t2aOEpoS4VX_dEkHtGFsZtTxU5io97sw-88RfhAKA&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '52',
    name: 'Shri Guru Raghavendra Mrithika Brindavan',
    deity: 'Hindu',
    description: 'Hindu temple in Chennai. Rated by 239 visitors.',
    address: '14/2, Karumariamman II Street, Padmanabha Nagar, Chromepet, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 12.9444253,
    longitude: 80.15111069999999,
    rating: 4.7,
    image: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AaVGc3kUsT-SKDFur3tPGsR9_GBLiKk7adH1jmqLBFiZVFg_9a3FgvyJ5J4kcsly-nJoPgUdE7fsmzvW3KEJWu7hpiuF8UgAdsJ7CYvHsCVvEn-W3mI7ZJfk2RcvFjMP--QnbZNoPfiKNDjaoiJhrp_YscXNLidIlt225zgnRa1Na1Nj9xJGLifrPuqbdcyVBR3CvminT0uQHDOikQJZCgnKKX-4xXzqErazSU4B1QzBbczHQCicsaXq3CJgj-9UtbXgoiTKnyEN-g8UBojryKShA6BV29iLN0w4hwGZ-zbU9JWLAHVSXiNyd0depX5BmgxWR8vRntgC5JBxHXUyhx9pAWcqG5Uy3Ukz5FxK3fpOwi5xGob188h_syo7nABrUYGEyBCp3qF-eZysG0am8cLh8o8x7NXhdIpfkKtzJchEgS9yzLe22g-VnUnDzKZaFVp3Aopu19D9BwrmunBhN1575CTyAtcDanrOQ0Ny6yiK-PAl1dMCP_gIHZOUp6frcR4E_GgkOauvKa4CvkmrXeMXKlv10tPWry8Fr1KmczqVpk9JSa9ybxjm6kcOjBUymXTALJ4loGeL35iKCu_AjwO88u9VhOxSr_jJnPNxAWRlRTQ0ojUmF-448JXsohw1E3me&key=AIzaSyAUBTAF_woPUdB8TpfhHtrDcuEUZNFS_sU'
  },
  {
    id: '53',
    name: 'Arulmigu Sri Subramaniya Swami Thirukovil',
    deity: 'Rama',
    description: 'Hindu temple in Chennai. Rated by 3 visitors.',
    address: 'Bharathi street, Pallavaram Road, Prathish Avune, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.0007293,
    longitude: 80.14683339999999,
    rating: 4.7,
  }]


// Deity Categories
export const categories: DeityCategory[] = [
  {
    id: 'shiva',
    name: 'Shiva',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Shiva',
    mantra: 'Om Namah Shivaya'
  },
  {
    id: 'vishnu',
    name: 'Vishnu',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Vishnu',
    mantra: 'Om Namo Bhagavate Vasudevaya'
  },
  {
    id: 'murugan',
    name: 'Murugan',
    icon: '🕉️',
    description: 'Temples dedicated to Lord Murugan',
    mantra: 'Om Saravana Bhava'
  },
  {
    id: 'devi',
    name: 'Devi',
    icon: '🕉️',
    description: 'Temples dedicated to Goddess',
    mantra: 'Om Dum Durgayei Namaha'
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi',
    icon: '🕉️',
    description: 'Temples dedicated to Goddess Lakshmi',
    mantra: 'Om Shreem Mahalakshmiyei Namaha'
  }
]

// Helper Functions
export function searchTemples(query: string): Temple[] {
  const lowerQuery = query.toLowerCase()
  return temples.filter(temple =>
    temple.name.toLowerCase().includes(lowerQuery) ||
    temple.deity.toLowerCase().includes(lowerQuery) ||
    temple.city.toLowerCase().includes(lowerQuery) ||
    temple.description.toLowerCase().includes(lowerQuery)
  )
}

export function getTempleById(id: string): Temple | undefined {
  return temples.find(temple => temple.id === id)
}

export function getTemplesByDeity(deity: string): Temple[] {
  return temples.filter(temple => 
    temple.deity.toLowerCase() === deity.toLowerCase()
  )
}

export function getNearbyTemples(lat: number, lng: number, radiusKm: number = 50): (Temple & { distance: number })[] {
  return temples
    .map(temple => ({
      ...temple,
      distance: calculateDistance(lat, lng, temple.latitude, temple.longitude)
    }))
    .filter(temple => temple.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
