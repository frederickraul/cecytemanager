import React from 'react'
import { TodoCardContainer, TodoTime } from './styles'

const TodoCard = ({ item: {data},item,index, handeModalOpen,handleDelete}) => {
    const {priority,desc,category,createdAt} = data;
    let color = '#444444';
    switch (priority){
        case 'baja':
            color = '#509be4';
        break;
        case 'media':
            color = '#f4c745';
        break;
        case 'alta':
            color = '#de5639';
        break;
        default:
            color = '#444444';
    }

  return (
    <TodoCardContainer color={color} onClick={handeModalOpen}>
        <TodoTime><i>{createdAt}</i></TodoTime>
        <b>{category}</b>
       <p> {desc}</p>
    </TodoCardContainer>
  )
}

export default TodoCard