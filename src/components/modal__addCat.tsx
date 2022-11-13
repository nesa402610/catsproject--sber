import React, {useState} from 'react';
import {ICat} from "../App";

const ModalAddCat = ({isModal, setModal, setCats}: any) => {
  const [error, setError] = useState('');
  const [newCat, setNewCat] = useState(
    {
      id: 0,
      age: 0,
      name: '',
      rate: 0,
      description: '',
      favourite: false,
      img_link: '',
    })
  const addNewCat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    fetch('http://sb-cats.herokuapp.com/api/2/nesa402610/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newCat)
    })
      .then(r => r.json())
      .then(r => {
        if (r.message !== 'ok') {
          setError('Скорее всего проблема в ID и он уже занят')
        } else {
          // @ts-ignore
          setCats(p => [...p, newCat])
          setModal(false)
        }

      })
  };

  return (
    <>
      {isModal &&
        <div className={'z-10 absolute w-full h-full bg-stone-700 top-0 flex items-center justify-center'}
             onClick={() => setModal(false)}
        >
          <div className={'bg-stone-800 rounded-lg p-4'} onClick={e => e.stopPropagation()}>
            {error && <h2 className={'font-bold text-xl'}>{error}</h2>}
            <div className={'flex flex-col gap-4'}>
              <div className={'grid grid-cols-2 gap-4'}>
                <label>
                  ID
                  <input type="number" value={newCat.id} onChange={e => setNewCat({...newCat, id: +e.target.value})}/>
                </label>
                <label>
                  Возраст
                  <input type="number"
                         placeholder={'Возраст'}
                         value={newCat.age}
                         onChange={e => setNewCat({...newCat, age: +e.target.value})}/>
                </label>
                <label>
                  Имя
                  <input type="text"
                         placeholder={'Имя'}
                         value={newCat.name}
                         onChange={e => setNewCat({...newCat, name: e.target.value})}/>
                </label>
                <label>
                  Рейтинг
                  <input type="number"
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
                <label className={'flex items-center gap-2'}>
                  Любимый?
                  <input type="checkbox" checked={newCat.favourite}
                         className={'w-auto'}
                         onChange={e => setNewCat({...newCat, favourite: e.target.checked})}/>
                </label>
                <label>
                  Фото
                  <input type="text"
                         placeholder={'Фото'}
                         value={newCat.img_link}
                         onChange={e => setNewCat({...newCat, img_link: e.target.value})}/>
                </label>
              </div>
              <button onClick={(e) => addNewCat(e)}
                      className={'bg-stone-600 p-4 rounded-lg'}
              >Добавить
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ModalAddCat;