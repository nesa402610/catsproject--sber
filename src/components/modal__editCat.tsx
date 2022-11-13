import React, {useEffect, useState} from 'react';


const ModalEditCat = ({isModal, setModal, curCat, setNewCat, cats, setCats}: any) => {
  const [data, setData] = useState({
    rate: 0,
    age: 0,
    description: '',
    favourite: false,
    img_link: '',
  });
  useEffect(() => {
    setData({
      rate: curCat?.rate,
      age: curCat?.age,
      description: curCat?.description,
      favourite: curCat?.favourite,
      img_link: curCat?.img_link
    })
  }, [curCat])
  const updateCatHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //Я хз почему не обновляет. Я могу хоть кило тонну аргументов скинуть, но сервер должен взять только нужные
    fetch('http://sb-cats.herokuapp.com/api/2/nesa402610/update/' + curCat.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        // @ts-ignore
        const updCats = cats.map(c => c.id === curCat.id ? {...curCat, rate: data.rate, age: data.age, description: data.description, favourite: data.favourite, img_link: data.img_link} : c)
        setCats(updCats)
        setModal(false)
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
                     value={data?.age}
                     onChange={e => setData({...data, age: +e.target.value})}/>
            </label>
            <label>
              Рейтинг
              <input type="text"
                     placeholder={'Рейтинг'}
                     value={data?.rate}
                     onChange={e => setData({...data, rate: +e.target.value})}/>
            </label>
            <label>
              Описание
              <input type="text"
                     placeholder={'Описание'}
                     value={data?.description}
                     onChange={e => setData({...data, description: e.target.value})}/>
            </label>
            <label>
              Любимый?
              <input type="checkbox" checked={data?.favourite}
                     onChange={e => setData({...data, favourite: e.target.checked})}/>
            </label>
            <label>
              Фото
              <input type="text"
                     placeholder={'Фото'}
                     value={data?.img_link}
                     onChange={e => setData({...data, img_link: e.target.value})}/>
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