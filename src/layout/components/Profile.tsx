import React from 'react';

interface ProfileProps {
  name?: string;
  img?: string;
}

const Profile: React.FC<ProfileProps> = ({ name = 'Admin', img = 'https://randomuser.me/api/portraits/men/44.jpg' }) => {
  return (
    <div className='flex items-center gap-4 text-white'>
      <div>
        <h4 className='text-lg'>Hey,</h4>
        <h2 className='text-xl'>{name}</h2>
      </div>
      <img src={img} alt='profile' className='w-14 h-10 rounded-md' />
    </div>
  );
};

export default Profile;