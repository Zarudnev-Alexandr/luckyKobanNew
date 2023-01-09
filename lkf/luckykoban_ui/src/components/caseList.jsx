import React, { useState } from 'react';
import { CaseItem } from './caseItem';

import gta from '../images/gta.png';
import csgo from '../images/csgo.jpg';
import r6s from '../images/r6s.jpg';
import battlefield1 from '../images/battlefield1.jpg';
import minecraft from '../images/minecraft.jpg';
import cyberpunk from '../images/cyberpunk.jpg';
import watchdogs2 from '../images/watchdogs2.jpg';
import huntsd from '../images/huntsd.jpg';
import dl2 from '../images/dl2.jpg';
import detroit from '../images/detroit.jpg';
import phasma from '../images/phasma.jpg';
import aegis from '../images/aegis.jpg';

const CaseList = () => {
  const [cases, setCases] = useState([
    {
      name: 'Grand Theft Auto V',
      priceNow: '250р',
      priceLast: '400р',
      poster: gta,
    },
    {
      name: 'Counter-Strike: Global Offensive',
      priceNow: '50р',
      priceLast: '150р',
      poster: csgo,
    },
    {
      name: 'Rainbow six siege',
      priceNow: '350р',
      priceLast: '550р',
      poster: r6s,
    },
    {
      name: 'Battlefield 1',
      priceNow: '199р',
      priceLast: '400р',
      poster: battlefield1,
    },
    {
      name: 'Minecraft',
      priceNow: '349p',
      priceLast: '1100p',
      poster: minecraft,
    },
    {
      name: 'Cyberpunk 2077',
      priceNow: '550p',
      priceLast: '1900p',
      poster: cyberpunk,
    },
    {
      name: 'Watch Dogs 2',
      priceNow: '330p',
      priceLast: '800p',
      poster: watchdogs2,
    },
    {
      name: 'Hunt: Showdown',
      priceNow: '650p',
      priceLast: '1100p',
      poster: huntsd,
    },
    {
      name: 'Dying Light 2',
      priceNow: '750p',
      priceLast: '1400p',
      poster: dl2,
    },
    {
      name: 'Detroit: Become Human',
      priceNow: '600p',
      priceLast: '1000p',
      poster: detroit,
    },
    {
      name: 'Phasmophobia',
      priceNow: '25p',
      priceLast: '320',
      poster: phasma,
    },
    {
      name: 'ДЕД АЕГИС',
      priceNow: '1000p',
      priceLast: '3500р',
      poster: aegis,
    },
  ]);

  return (
    <>
      <div className='caseList'>
        <div className='container'>
          <div className='caseList__inner'>
            {cases.map((myCase) => (
              <CaseItem myCase={myCase} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { CaseList };
