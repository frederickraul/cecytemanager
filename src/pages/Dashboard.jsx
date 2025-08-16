import React,{useState,useEffect} from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from '../constantes/event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { useAuth } from '../context/AuthContext';
import EventsModal from './EventsModal';
import { CalendarContainer, CalendarSidebar, CalendarSidebarButton } from './styles';
import { BsList } from 'react-icons/bs';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ItemH2 } from './Inventario/styles';

const now = new Date();
const today = moment().format('YYYY-MM-DD');
var createdAt = moment(now).format('YYYY-MM-DD');

const Dashboard = () => {
const [weekendsVisible, setweekendsVisible] = useState(false);
const [currentEvents, setcurrentEvents] = useState([]);
const { getData,setisLoading,saveData, updateData,deleteData,currentUser,isGod } = useAuth();
const [INITIAL_EVENTS, setINITIAL_EVENTS] = useState([]);
const [isModalOpen, setisModalOpen] = useState(false);
const [selectedEvent, setselectedEvent] = useState({title:'',start:'',end:'',allDay:'',userName:''});
const [selectedCalendarEvent, setSelectedCalendarEvent] = useState([]);
const [isEventListOpen, setIsEventListOpen] = useState(false);

const [selectedColor, setselectedColor] = useState('#3788D8')
const [isColorChanged, setisColorChanged] = useState(false);

useEffect(() => {
  getData('events',setINITIAL_EVENTS,'start');
  getData('events',setcurrentEvents,'start');
}, []);



const RenderSidebar = () => {
  
      return (
      <CalendarSidebar isOpen={isEventListOpen}>
        <CalendarSidebarButton isOpen={isEventListOpen} onClick={() => setIsEventListOpen((p) => !p)}>
          <BsList size='1.2em' />
        </CalendarSidebarButton>        
        <div className='CalendarSidebarSection'>
          <h2>Eventos ({INITIAL_EVENTS.filter((event=>new Date(event.start).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0))).length})</h2>
          <ul>
            {INITIAL_EVENTS.filter((event=>new Date(event.start).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0))).map((event) =>(
                  <li key={event.id} className={(moment(event.start).format("YYYY-MM-DD")) === today ? "fc-day-today upcommingEvents" : "upcommingEvents"}>
                    <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
          
                    <br/>
                    {event.allDay ?
                  <b>Todo el dia</b>
                    :
                    event.end ?  
                      `${formatDate(event.start, {hour: 'numeric', minute: '2-digit'})}  -  ${formatDate(event.end, {hour: 'numeric', minute: '2-digit'})}`
                      :
                      formatDate(event.start, {hour: 'numeric', minute: '2-digit'})
                    }

                  <br/>
                  <small>{event.userName}</small>
                  <br/>
                  <i>{event.title}</i>
                </li>
            ))}
          </ul>
        </div>
      </CalendarSidebar>)
    
  }

  const handleCloseModal = () => {
      setisModalOpen(!isModalOpen);
  
  }

  const handleEventClose = ()=>{
      handleCloseModal();
      if(isColorChanged){
        handleEventUpdate(selectedCalendarEvent);
        setisColorChanged(false);
      }
  }

  const handleWeekendsToggle = () => {
    setweekendsVisible(!weekendsVisible);
  }

  const handleDateSelect = (selectInfo) => {
    if(!currentUser) return;
    let title = prompt('Ingresa el nombre o descripción de tu evento')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })
    }
  }

  const handleEventClick = (clickInfo) => {
    const id = clickInfo.event.id;
    const event = INITIAL_EVENTS.find(object => {
      return object.id === id;
    });
    handleCloseModal();
    setselectedEvent(event);
    console.log(event);
    const color = event.color ? event.color : '#3788D8';
    setselectedColor(color);
    setSelectedCalendarEvent(clickInfo)
  }

  const handleEventAdd = async (clickInfo) => {
    //console.log(clickInfo.event.start.toISOString().replace(/.000Z.*$/, ''));
    const userId = currentUser.uid
    
    if(userId === undefined) {
      alert("Debes iniciar sessión para que tu evente quede registrado.")
      return;
    }
    const newEvent = {
        title: clickInfo.event.title,
        start: clickInfo.event.start.toISOString().replace(/.000Z.*$/, ''),
        end: clickInfo.event.end ? clickInfo.event.end.toISOString().replace(/.000Z.*$/, '') : '',
        allDay: clickInfo.event.allDay,
        userName: currentUser.name,
        userId: userId,
    };
    const response = await saveData('events',newEvent);
    newEvent.id = response;
    if(response){
      setINITIAL_EVENTS(INITIAL_EVENTS => [...INITIAL_EVENTS, newEvent]);
      clickInfo.event.setProp( 'id', response );
    }
  }


  const handleEventUpdate = (clickInfo) => {
    if(currentUser.uid === undefined ) return;
    const id = clickInfo.event.id;
    if(!id) return;
   const start = clickInfo.event.start.toISOString().replace(/.000Z.*$/, '');
   const end = clickInfo.event.end ? clickInfo.event.end.toISOString().replace(/.000Z.*$/, '') : '';
   const allDay = clickInfo.event.allDay;
   const title = clickInfo.event.title;
    const userId = currentUser.uid;
    const userName = currentUser.name;
    const newEvent = {
      title: title,
      start: start,
      end:  end,
      allDay: allDay,
      userName: userName,
      userId: userId,
      color: selectedColor,

    };

    updateData('events',newEvent,id);
    //window.location.reload(true);
  }

  const handleConfirmEventDelete = () => {

     if (window.confirm(`Eliminar evento '${selectedCalendarEvent.event.title}'`)) {
       selectedCalendarEvent.event.remove()
     }
  }

  const handleEventDelete = (clickInfo) => {
    const id = clickInfo.event.id;
    const events = INITIAL_EVENTS.filter((event) => event.id !== id );
    setINITIAL_EVENTS(events);
    deleteData('events', id);
    handleCloseModal();
 }
  

 const handleEvents = (events) => {
    setcurrentEvents(events);
  }



const renderEventContent = (eventInfo) => {
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
}

const renderSidebarEvent = (event) => {
  
}

    return (
      <div className=''>
      <div className='products-heading'>
      <Link to='#'>
      <ItemH2>
        Calendario
      </ItemH2>
    </Link>
      <p>Administrar eventos</p>
      </div>
      <div className='CalendarSection bgWhite'>
      <RenderSidebar/>
     <CalendarContainer>
     <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            timeZone='America/Tijuana'

            locale={esLocale}
            editable={currentUser ? true : false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={currentEvents} // alternatively, use the `events` setting to fetch from a feed
            //eventBackgroundColor= '#378006'
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            setcurrentEvents='#ff0000'
            //eventsSet={handleEvents} 
            // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:*/
            eventAdd={handleEventAdd}
            eventChange={handleEventUpdate}
            eventRemove={handleEventDelete}
            
           />
          <EventsModal
            open={isModalOpen}
            action={handleConfirmEventDelete}
            onClose={handleEventClose}
            title={selectedEvent.title}
            start={selectedEvent.start}
            end={selectedEvent.end}
            allDay={selectedEvent.allDay}
            userName={selectedEvent.userName}
            userId={selectedEvent.userId}
            currentUserId={currentUser? currentUser.uid : ''}
            isGod={isGod}
            selectedColor={selectedColor}
            setselectedColor={setselectedColor}
            setisColorChanged={setisColorChanged}
          />
     </CalendarContainer>

        </div>
    </div>
    )

}
export default Dashboard;