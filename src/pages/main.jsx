import React from 'react';
import Slider from '../components/slider';
import Cards from '../components/cards';
import SubscriptionForm from '../components/subscribe';

const Main = ({ animals }) => {
  return (
    <div>
      <Slider pets={[...animals].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)} />
      <Cards animals={[...animals].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)} />
      <SubscriptionForm />
    </div>
  );
};

export default Main;