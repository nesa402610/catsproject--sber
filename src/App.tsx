import React, {FC, useEffect, useState} from 'react';
import './App.css'
import ModalAddCat from "./components/modal__addCat";
import ModalEditCat from "./components/modal__editCat";
import ModalCatPreview from "./components/modal__catPreview";

export interface ICat {
  id: number,
  age: number,
  name: string,
  rate: number,
  description: string,
  favourite: boolean,
  img_link: string,
}

const App: FC = () => {
  const [cats, setCats] = useState<ICat[]>([])
  const [editCat, setEditCat] = useState(null)
  const [isModal, setModal] = useState(false)
  const [isModalEdit, setModalEdit] = useState(false)
  const [cat, setCat] = useState<ICat | null>(null);


  useEffect(() => {
    fetch('http://sb-cats.herokuapp.com/api/2/nesa402610/show')
      .then(r => r.json())
      .then(r => setCats(r.data))
  }, [])


  const editCatHandler = (id: number) => {
    setModalEdit(true)
    // @ts-ignore
    setEditCat(cats.filter(c => c.id === id)[0])
  }

  const previewHandler = (e: React.MouseEvent<HTMLDivElement>, cat: ICat) => {
    setCat(cat)
  };

  const deleteCat = (id: number) => {
    fetch('http://sb-cats.herokuapp.com/api/2/nesa402610/delete/' + id, {
      method: 'DELETE'
    })
    setCats(cats.filter(c => c.id !== id))
  };

  return (
    <main>
      <ModalAddCat isModal={isModal} setCats={setCats} setModal={setModal}/>
      <ModalEditCat cats={cats}
                    setCats={setCats}
                    isModal={isModalEdit}
                    curCat={editCat}
                    setNewCat={setEditCat}
                    setModal={setModalEdit}/>
      {cat && <ModalCatPreview cat={cat} setCat={setCat}/>}
      <div className={'grid grid-cols-5 gap-4 m-8'}>
        <div className={'min-h-[100px] bg-gray-600 rounded-lg'}
             onClick={() => setModal(true)}
        >
          Добавить котика
        </div>
        {cats.map(c =>
          <div key={c.id} className={'bg-gray-600 rounded-lg p-4 relative'} onClick={e => previewHandler(e, c)}>
            <div className={'absolute right-0 top-0 flex flex-col'} onClick={e => e.stopPropagation()}>
              <span onClick={() => deleteCat(c.id)}>del</span>
              <span onClick={() => editCatHandler(c.id)}>edit</span>
            </div>
            <div className={'flex gap-2'}>
              <span>Имя: {c.name}</span>
              <span>Возраст: {c.age}</span>
            </div>
            {c.img_link &&
              <div className={'flex justify-center'}>
                <img src={c.img_link} className={'max-h-[250px]'} alt="фото"/>
              </div>}
            <div className={'flex justify-between p-2'}>
              <span>Rate: {c.rate}/10</span>
              <span>{c.favourite ? '♥' : '♡'}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;