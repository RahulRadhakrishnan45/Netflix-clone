import React, {useEffect, useRef} from 'react'
import cards_data from '../../assets/cards/Cards_data'
import './TitleCards.css'


const TitleCards = () => {
  const cardsRef = useRef(null);

useEffect(() => {
  const element = cardsRef.current
  if (!element) return;

  const handleWheel = (event) => {
      event.preventDefault();
      element.scrollLeft += event.deltaY;
  };

  element.addEventListener('wheel', handleWheel, { passive:false})

  return () => {
    element.removeEventListener('wheel',handleWheel)
  }
},[])

  return (
    <div className='title-cards'>
      <h2>Popular on Netflix</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card,index) => {
          return <div className="card" key={index}>
            <img src={card.image} alt="" />
            <p>{card.name}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards