import { TodoCardContainer, TodoTime } from './styles'
import { DeleteButton} from '../../../components'

const TodoCard = ({ item: {data},item,index, handeModalOpen,handleDelete,onDragStart}) => {
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

    <TodoCardContainer color={color} onClick={handeModalOpen} draggable onDragStart={onDragStart}>
       { handleDelete ?  <DeleteButton onClick={handleDelete}/> : <></>}

        <TodoTime><i>{createdAt}</i></TodoTime>
        <b>{category}</b>
       <p> {desc}</p>
    </TodoCardContainer>
    
  )
}

export default TodoCard