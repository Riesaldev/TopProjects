import type { UserProfileData } from '../types/profile';

export const BADGE_COLORS = [
  { value: '#3713ec', label: 'Primary' },
  { value: '#ff4d4f', label: 'Red' },
  { value: '#f5c518', label: 'Yellow' },
  { value: '#0bda6c', label: 'Green' },
] as const;

export const CHARACTER_CLASSES = ['All Classes', 'Fighter', 'Wizard', 'Rogue'] as const;

export const CAMPAIGN_SYSTEMS = ['All Systems', 'D&D 5e', 'Pathfinder 2e', 'Cyberpunk RED'] as const;

export const mockUserData: UserProfileData = {
  displayName: 'DungeonMaster99',
  email: 'DungeonMaster99@gmail.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALPnNUlc7GZE66xlXiAR_p4tgOeF7_3sroifjyELgHwm-wSCjEynXcW62WJb4gM9raClv7wjLIVIQpyDXrrwuYXOMwaeMn2wlSxJ-pdmBGSOReKcE8I5KhY-OB-kAWzznxncj7NCWuE-LMPQKwe-AL7aTc1WjkYIC5FxATetVKa1opEL2FhFaV52dgA5UHB7OwK40GWAMhpoU1XAwuhJnZ-ObIw_3On9fj7vOpmIBngVuM7ky1MfjuBmkjWtAOA_MekqXiBmeJWv0',
  role: 'Veteran Player',
  level: 42,
  campaigns: 12,
  hoursPlayed: '450h',
  badgeColor: '#00ff9d',
  characters: [
    {
      id: '1',
      name: 'Valeros',
      system: 'D&D 5e',
      class: 'Fighter',
      race: 'Human',
      level: 5,
      hp: 48,
      ac: 18,
      mainStat: 'STR',
      mainStatValue: 16,
      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBBg3ia67AXtYlxNTMGAjEWjb3SyLCyl7ouR7wy-ldI158j2BRG0TZT-kCPkl-0R9-QhUUOwW7UtvIU-2sT2c3KrJCpSzdFeCLQPUY88AMnLKJ4KNi75jq5LMILjQ3Yfz95mHE6klsWOtdtyEMNq-j8p6-9Lp8bOD80Fmhpa1p_Z41FRf1OFPftdIzZGCpK9HC-V49pHOe6elXjht41AvzyKwlxGeH3Fd2ICCVAw3yx5MjI_Nu2zpnWHBUqTACbMxuPvJC32Ta7eKc")',
      portraitImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIu0jDUZcF381rl03Ccv9Bf-kZ2W-hQCc5i8R1JKTDzbyVds8NWR98TZF937ZP7WUNQ90HQTzeX0emPy7WfXQRyWYYEdXHQEO2hI8Rb7R4Zkk4HMRjtF0EUvLDLssx-qK8NA8P7I37pP2nDzSK5GmfQdukmfob8OAK-dl_IUmHEX5xa-9Fs7Phqze66a2cbVqgPLkzSu5tJ4M-XvAsodpyAlNpwOjcUcaJduunOekJU7GdYU09I6jngaMDsPq-UrkjzlHUzz895AI',
    },
    {
      id: '2',
      name: 'Merisiel',
      system: 'D&D 5e',
      class: 'Rogue',
      race: 'Elf',
      level: 3,
      hp: 24,
      ac: 16,
      mainStat: 'DEX',
      mainStatValue: 18,
      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPsaxDRa2kgGINlcJvLdpOyYbS09KvkmInFuuf67U2UF41z5lvNM_e7IYdw2ACKqOcmZ6SpDNNWV7iALVUL7VpuJQcygqcst4W5qsf0QWYu9ETtL51i_RfbPsQM0YiboAeB1Q7Sr9hmcw8ZirtVMUlqin338UAhQ4XDMnz4z23OBUUN5JxKFAPa3hnrTlH6Jfp8G8MsCuNOgj8FLXbgEirCg3xELkqwVGV5nLL_sy9s2LlMRGu1TiHZuw_hYfHQN3gtVVt1HIzCNc")',
      portraitImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Hzskrc9V2kwjdS-DIB5Eac_wc2FwXo_d1fw9Z2BdJRCezlAY04FUvVqRrG_ELJ5Q1HAgan3v_lNVXt_hPppR_lPdjn4RO-UDhlIRD3kalbjBFXl9YFgc7lMt1nG5lCbwpprJ2UgGOvvGadWVYMo0DuGtaMLQlbCPPwIiz2tnNBGmMKQrPUjKa9FbnXy0JoAkY1zOxxnNb0f-ICjw9LdWwcL_2s-kGxjTL3TTdWWdfODxZOTgVvP35UghFcJbm1Zn5x_2H1of3zU',
    },
    {
      id: '3',
      name: 'Ezren',
      system: 'D&D 5e',
      class: 'Wizard',
      race: 'Human',
      level: 9,
      hp: 52,
      ac: 12,
      mainStat: 'INT',
      mainStatValue: 20,
      backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZnhEDwnw0rGhauJExVVNnQR7iuq1MNwVpssQfrUcmu8sUbEzndIBRtkSltNCZqobu7vM1hrbY0zPGM99sBmEp4ddtxxl5We9veJFTuGal7naWg6IZhzCKFnQPvhlbUsWywL2aeBQ4PDW3fjq8WSP8OZ1lJ9zcIKXvUspAQ50M1oPfEuO16dB4XmRwANox6U_ZgRei8mstPXQ14Fzask6D9ldZ0kO8dkvBoh4ENYCW-J-wHDWkXMcsX1D5zqAvS9QRVSkwYD8r330")',
      portraitImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDap-tlbV5WHZfpoU2e7PnCZeCg2owfRMfmjtqX8qcC88v2YmKqLiFIYsix6ZBpDFEs-Pj4-XexRww-QG4zeyWqFqMIHZaMULc31xZ26o9Isni7j14SNEfYzl4u14QS-lRj6hVJ7fwhLMrceCZv6MBI6GbrW4XW7fIOkeMmwISPwMSI1EDqXfypTw2GyYgHM14MEzrr-iLzBKdUuDc7D3WBHFdUSkxoP2cPqvT9pxDliUXvaAifqClcDyyejqyWpK1-9aDkRA6VaMY',
    },
  ],
  notifications: [
    { type: 'email', enabled: true, frequency: 'Instant' },
    { type: 'whatsapp', enabled: false, frequency: 'Instant' },
  ],
  campaign: [
    {
      id: '1',
      name: 'Curse of Strahd',
      system: 'D&D 5e',
      description: 'The mists of Barovia are closing in. Will you survive the night?',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQTwjWWh-JXT1K3bTMSh6UpbPwONNiKyvLbN8fxK8WWr4JpHYtVytpwJIbTh9r7jPQiFRb1iE9K9cBAfLd4u0CqOJ7Pl1WYPXmIGd6hlKWhI77P_-bQq_H3bvYIyZltv7fYj8AxeiJjI5EMfMqyBFxfid-2Dt0DCEfw8hsF00n3zBp2AQMYHjFV4a_xP3Ehj943QJkISH5y_5A-xkL91j1MEZEiryGO_V6QK7CPlmNl1J8j25IEqNPWPo396pAiXMMPxMdU0Y-lLI',
      players: [
        { name: 'Player1', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvONqMBQu7BvurqXTeBmoeY9bTvyQK5gxe1OvGHtdXMkQSGFPsz5-nz8hlEXuYUr900WjpfDg2OwBQ9cus1SKek80IjahgP7Yk4VZkyDj7Xr8xKWPHn3xWOIbCFB-FkXY9AyT-QNRV7LeVCs-Dv8G5MYPJih9w6ERO8wJKxuaMHEz9kRHZ4Zyn64OdIJqebobcuu0qC1mpInHrpGtwklcBw7SPTEUyNaP7Dyc_lBIcFt_XwIGuu9cL6ViI5Z1UC2Npf4FADOsQvO0' },
        { name: 'Player2', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq455EwvaQBEdvuK1HrMYMI3ZUDhMIzKPspYnvIDZyVvHAhOs1j2WUVdRBAsp6qUfnEqkDdjDxoKF7OMOLIYTIRBWLNT-PDnF3BQ_VXkqoZBVhcKOPTJlyYHDYuYzy_Akf32mjGd5FVjRpqZ5pMs1wVEJHwySpqoQfm-Cw-4a7pg6d_TN8e5JT2utYJ3kda_GGc2eXL3Hylg4Y8Qi4eA56LiKPzuynQQ_W4PDAAq9e5qYmjHtliHJoYLgvRoRJsHeREILnh6Wl_zc' },
        { name: 'Player3', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_U0qfklRQvuMBhXphFJXMXr59k9m-nBPbm9MsXmLwyJN2AxfMVdaO300pbkTi0zGb4fT0k4GTHdPwhlMoK86JMjnjgqydoNxJjVgRVdo0kFvGGQNu939exJH0P-886S__iAdu7tWPT-oK51Mofzwq5iKQE30e-u1tFAWQ9uKqJ5f5YR2YJ60rTby-NPPw1t16C6HgI4SAC1D3CClyOJwP5U5ltHXEBgDLhXKe0ntt8Pn7LTZNAENgaAhbIuhUDYPFwRRaIR4sUfo' },
        { name: 'Player4', avatar: '' },
        { name: 'Player5', avatar: '' },
      ],
    },
    {
      id: '2',
      name: 'Lost Omens',
      system: 'Pathfinder 2e',
      description: 'Exploring the Mwangi Expanse in search of lost artifacts.',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDheGOqb-2MOSgOqflVNKZ_Oy8jAlMvE-9Z_2cxNZp9eqPVXXFKug0W8Y2ZO-YD5ngkMWWFg2Lu7gi46Vt3QQPxUEjFp4JEjI7aOoSXxtcZOcA_o1Rv7-C1GP2WyvjkImbcmkoKE_k2QG01ygJ0Hu0PlYZU29l_1W9BpalqTEVJecWdic9Uzcmdgey6trEKRNOP7kFygYazmr19bxbxlO7YhnX0XSn1tV6ziWc4Yzn6lsWPKDEecHPBDBPsrGU0a6V3HTTT5w-j5X0',
      players: [
        { name: 'PlayerA', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsv1dblSWmfc_qYT-xwTNLS9H2Vf1WtUOxwoglggtwVFgNcM2ByOirlylExLD-9hXGN7YWRBIdIFTH5ROMwK370tSct1VeavJdh_tSATNz5R76-bbXtY5nNWpY-TR-iD4rZvDmSn03rLeknKBfb2E5mbnI-9TtJa6uIKmwplAkI4-RuNKUPzzKmorKQXtq1eeX5rQn8eDWUwhp4PXOQVB2NzShzWblieISE5mUtfo-dftKeJFgwXfb7DVWx4fk3vmauB7rDJ_oqKc' },
        { name: 'PlayerB', avatar: '' },
        { name: 'PlayerC', avatar: '' },
        { name: 'PlayerD', avatar: '' },
        { name: 'PlayerE', avatar: '' },
      ],
    },
    {
      id: '3',
      name: 'Neon Nights',
      system: 'Cyberpunk RED',
      description: 'One last job before we leave Night City for good.',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZPjeMHof59u2pbXHGS55YN-d3mDcR-VjbSQEPyOaoVJFMqJw-NDNKLmQT5HnTPJzRPCXSxSuNlCg1A9RSbT7A5ZUTYlI9EeUhXBEvabIJTspB4fROyZOImICfWDMdrz7kLM49QnFDsAfkUdrGb0nJbiShgimqpvepgIU7lA2dNoNcW19OL9Ax4RaD0wt80IkekNWUJahPgLcXYSkoISSobd7L5PGAWHom6o8AK1MKGkpYHbksJz9Lmqc1jSLqVgX1zJdr6wTfTZo',
      players: [
        { name: 'PlayerX', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsTPN7mwAqof8iIsmX6tPDuy3-XrnDbTHoF5EHCg3MMcHFvm1-qsTSAUTC61vrsMQanDP3IHPk7ul1Ip1VaCrrbuPeWKXB9Kdq-gOnAHxTFR1gyjL9mjXeC2Dks_AWNlLTG33LqVzxwBsDgbs60O14MH7-VBOBQDXAMdzIMwqqDg6uS8eeDPxAa17kqB3NOU-EDI0Mptl57WIQ28LXsQfwARwPv1nv2SqEC10ncs9fM892_XBP7pS29dB82KjcxIQ645AnojmDY7c' },
        { name: 'PlayerY', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBURDyh_iZHJ8nuaHIXOs_LdMsFux_s2rdZemBhe4pRjaApt16tO--hBO5k0H1rR0xakyYwzSTj5fIAMhgiprDTLGLxWolHv0RXtXMnJyaV3TeCgDnV3vNPia31-kPzCBymCo-I2tbWZ3g_6ulLGo872aMz-_5YKeQchSVNVu0jSTmTaYNm_Ka8AbFGB9HCMxSfARukQDTd-LHIG3IZw8VwHLppKKOUpS8ijKwvB2UH_u0fovxG2kC2pGz9RGJXJzs_b5q7hiM4CA' },
      ],
    },
  ],
};
