import React from 'react';
import SubscribeForm from '../subscribeForm/SubscribeForm';
import Autocomplete from '../autocomplete/Autocomplete';

const Footer = () => {
    return (
      <footer className="grid grid-cols-4 gap-[32px] max-w-[1525px] px-[50px] m-auto">
            <div>
                <SubscribeForm />
                <Autocomplete/>
        </div>
        <div className="bg-gray-200 p-4">Column 2</div>
        <div className="bg-gray-200 p-4">Column 3</div>
        <div className="bg-gray-200 p-4">Column 4</div>
      </footer>
    );
}

export default Footer;
