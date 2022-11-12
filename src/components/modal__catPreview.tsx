import React from 'react';

const ModalCatPreview = ({cat, setCat}: any) => {
  return (
    <div className={'z-10 absolute w-full h-full bg-stone-700/75 backdrop-blur-lg top-0 flex items-center justify-center'} onClick={()=>setCat(null)}>
      <div className={'bg-gray-600 rounded-lg p-4 relative'} onClick={e=>e.stopPropagation()}>
        <div className={'flex gap-2'}>
          <span>Имя: {cat.name}</span>
          <span>Возраст: {cat.age}</span>
        </div>
        {cat.img_link &&
          <div className={'flex justify-center'}>
            <img src={cat.img_link} className={'max-h-[250px]'} alt="фото"/>
          </div>}
        <div className={'flex flex-col'}>
          <span>Описание: {cat.description}</span>
          <span>Любимый: {cat.favourite ? 'Да' : 'Нет'}</span>
        </div>
      </div>
    </div>
  );
};

export default ModalCatPreview;