import React from 'react';
import './CompanyMission.css';
import vission from '../../../images/settings.png';
import pencil from '../../../images/pencil.png';
import scissor from '../../../images/scissor.png';
const CompanyMission = () => {
    return (
        <div className='row justify-content-center'>
            <div  className="col-lg-4 col-md-6">
              <div className=" mission-card text-center" >
                <img src={pencil} alt=""/>
                <h3 className='mt-3'>Our Mission</h3>
                <p className='mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate praesentium odio eos consequatur, tempore nesciunt?</p>
              </div>
            </div>
            <div  className="col-lg-4 col-md-6">
              <div className="mission-card text-center" >
                <img src={vission} alt=""/>
                <h3 className='mt-3'>Our Vission</h3>
                <p className='mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate praesentium odio eos consequatur, tempore nesciunt?</p>
              </div>
            </div>
            <div  className="col-lg-4 col-md-6">
              <div className="mission-card text-center" >
                <img src={scissor} alt=""/>
                <h3 className='mt-3'>Our Goal</h3>
                <p className='mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate praesentium odio eos consequatur, tempore nesciunt?</p>
              </div>
            </div>
        </div>
    );
};

export default CompanyMission;