import Layout from '../components/Layout';
import Case from '../components/Case';
import GTA from '../images/gta.png';
import { useContext } from 'react';
import { userContext } from '../context/context';

const Main = () => {
  return (
    <>
      <Layout
        title='Lucky Koban | Самые дешевые игры!'
        content='Main page'
      ></Layout>
      <div className='main'>
        <div className='container'>
          <section className='popular'>
            <Case img={GTA} title='GTA' old_price='1000p' price='250p'></Case>
          </section>
        </div>
      </div>
    </>
  );
};

export default Main;
