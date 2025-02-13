import React from 'react';
import './Services.css';
import service1 from '../../assets/service1.jpg';
import service2 from '../../assets/service2.jpg';
import service3 from '../../assets/service3.jpg';
import service4 from '../../assets/service4.jpg';
import icon from '../../assets/icon.png';

const Services = () => {
  return (
    <div className='services'>
        <div className='text'>
            <h1> Our Services </h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </p>
        </div>

        <div className='services-container'>
          <div className='service'>
              <img src={service1} alt='' />
              <div className='caption'> 
                  <img src={icon} alt='' />
                  <p>HairCut & Styling</p>
              </div>
          </div>

          <div className='service'>
              <img src={service2} alt='' />
              <div className='caption'> 
                  <img src={icon} alt='' />
                  <p>Hair Coloring</p>
              </div>
          </div>

          <div className='service'>
              <img src={service3} alt='' />
              <div className='caption'> 
                  <img src={icon} alt='' />
                  <p>Hair Chemical Treatment</p>
              </div>
          </div>

          <div className='service'>
              <img src={service4} alt='' />
              <div className='caption'> 
                  <img src={icon} alt='' />
                  <p>Hair Extensions Treatment</p>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Services;
