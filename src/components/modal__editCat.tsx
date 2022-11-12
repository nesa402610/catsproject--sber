import React from 'react';


const ModalEditCat = ({isModal, setModal, newCat, setNewCat, cats, setCats}: any) => {
  const updateCatHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //Я хз почему не обновляет. Я могу хоть кило тонну аргументов скинуть, но сервер должен взять только нужные
    fetch('http://sb-cats.herokuapp.com/api/2/nesa402610/update/' + newCat.id, {
      method: 'PUT',
      body: JSON.stringify(newCat)
    })
      .then(() => {
        // @ts-ignore
        const updCats = cats.map(c => c.id === newCat.id ? newCat : c)
        setCats(updCats)
      })

  };

  return (
    <>
      {isModal &&
        <div className={'z-10 absolute w-full h-full bg-stone-700 top-0 flex items-center justify-center'}
             onClick={() => setModal(false)}
        >
          <div className={'flex bg-stone-800 p-4 flex-wrap gap-4'} onClick={e => e.stopPropagation()}>
            <label>
              Возраст
              <input type="text"
                     placeholder={'Возраст'}
                     value={newCat.age}
                     onChange={e => setNewCat({...newCat, age: +e.target.value})}/>
            </label>
            <label>
              Рейтинг
              <input type="text"
                     placeholder={'Рейтинг'}
                     value={newCat.rate}
                     onChange={e => setNewCat({...newCat, rate: +e.target.value})}/>
            </label>
            <label>
              Описание
              <input type="text"
                     placeholder={'Описание'}
                     value={newCat.description}
                     onChange={e => setNewCat({...newCat, description: e.target.value})}/>
            </label>
            <label>
              Любимый?
              <input type="checkbox" checked={newCat.favourite}
                     onChange={e => setNewCat({...newCat, favourite: e.target.checked})}/>
            </label>
            <label>
              Фото
              <input type="text"
                     placeholder={'Фото'}
                     value={newCat.img_link}
                     onChange={e => setNewCat({...newCat, img_link: e.target.value})}/>
            </label>
            <button
              className={'bg-stone-600 p-4 rounded-lg'}
              onClick={(e) => updateCatHandler(e)}
            >Обновить
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default ModalEditCat;