import React, { useState } from 'react';
import { NavLink, redirect } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';
import { CaseList } from './caseList';

function Main() {
  return (
    <>
      <Header />
      <div className='main'>
        <div className='container'>
          <CaseList />
        </div>
      </div>
      <Footer />
    </>
  );
}

export { Main };
